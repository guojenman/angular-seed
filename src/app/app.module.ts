import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { MdInputModule } from '@angular/material/input';
import { MdDialogModule } from '@angular/material/dialog';
import { MdTabsModule } from '@angular/material/tabs';
import { MdProgressCircleModule } from '@angular/material/progress-spinner';


import { AppComponent } from './app.component';
import { HttpModule, ConnectionBackend, XHRBackend, Http } from '@angular/http';

const COMPONENTS = [
  AppComponent,
];

const routeConfig: Route[] = [
  { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule?chunkName=projects' },
  { path: '**', redirectTo: 'projects', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MdDialogModule,
    MdInputModule,
    MdTabsModule,
    MdProgressCircleModule,
    RouterModule.forRoot(routeConfig, { useHash: true }),
  ],
  providers: [
  ],
  declarations: COMPONENTS,
  bootstrap: [AppComponent]
})
export class AppModule {

}