import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/core/interceptor/jwt.interceptor';

@NgModule({
  imports: [
    DashboardRoutingModule,
    HttpClientModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([JwtInterceptor]))
  ]
})
export class DashboardModule {}
