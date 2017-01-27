import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { CampaignRootComponent } from './campaign-root.component';

const COMPONENTS = [
  CampaignRootComponent
];

const routeConfig: Route[] = [
  {
    path: '', component: CampaignRootComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routeConfig)
  ],
  declarations: COMPONENTS
})
export class CampaignModule { }