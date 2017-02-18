import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { MdInputModule } from '@angular/material/input';


import { ProjectsRootResolver } from './projects-root.resolver';
import { ProjectsRootComponent } from './projects-root.component';
import { MdProgressCircleModule } from '@angular/material/progress-spinner';

const routeConfig: Route[] = [
  {
    path: '', component: ProjectsRootComponent, resolve: { root: ProjectsRootResolver }
  }
];

const COMPONENTS = [
  ProjectsRootComponent,
];

const ENTRY_COMPONENTS = [
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdInputModule,
    MdProgressCircleModule,
    RouterModule.forChild(routeConfig),
  ],
  providers: [
    ProjectsRootResolver,
  ],
  declarations: [...COMPONENTS, ...ENTRY_COMPONENTS],
  entryComponents: [...ENTRY_COMPONENTS],
  exports: [...COMPONENTS, ...ENTRY_COMPONENTS]
})
export class ProjectsModule {
  ngDoBootstrap() { }
}