import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

const COMPONENTS = [
  AppComponent,
];

const routeConfig: Route[] = [
  {
    path: '', component: AppComponent,
    children: [
      { path: 'campaign-project', loadChildren: './campaign-project/campaign.module#CampaignModule' },
      { path: '**', redirectTo: 'campaign-project', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routeConfig, { useHash: true }),
  ],
  declarations: COMPONENTS,
  bootstrap: [AppComponent]
})
export class AppModule {

}