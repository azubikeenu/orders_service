import express, { Router } from 'express'

import { HealthRoutes } from './health.routes';

import { adminRoute } from './admin.routes';

import { vendorRoutes } from './vendor.routes';


const router = Router();

interface Route {
    path: string;
    routes: Router;
}




const routes: Route[] = [
    {
        path: '/health-check',
        routes: HealthRoutes,
    },

    {
        path: '/admin',
        routes: adminRoute,
    },


    {
        path: '/vendors',
        routes: vendorRoutes,
    },
];

routes.forEach((route: Route) => {
    router.use(route.path, route.routes);
});

export { router };