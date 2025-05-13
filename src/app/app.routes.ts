import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WorkInProgressComponent } from './pages/work-in-progress/work-in-progress.component';
import { Title } from '@angular/platform-browser';

export const routes: Routes = [
    {
        path :'',
        redirectTo:"login",
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
            path:'dashboard',
            component:DashboardComponent
        },
        {
            path:'history',
            component:WorkInProgressComponent, data:{title:'History'}
        },
        {
            path:'reports',
            component:WorkInProgressComponent,data:{title:'Reports'}
        }
        ]
    }
];
