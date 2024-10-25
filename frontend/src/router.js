
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


import UserUserManager from "./components/listers/UserUserCards"
import UserUserDetail from "./components/listers/UserUserDetail"

import DriverDriverManager from "./components/listers/DriverDriverCards"
import DriverDriverDetail from "./components/listers/DriverDriverDetail"

import VehicleVehicleManager from "./components/listers/VehicleVehicleCards"
import VehicleVehicleDetail from "./components/listers/VehicleVehicleDetail"


export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
            {
                path: '/users/users',
                name: 'UserUserManager',
                component: UserUserManager
            },
            {
                path: '/users/users/:id',
                name: 'UserUserDetail',
                component: UserUserDetail
            },

            {
                path: '/drivers/drivers',
                name: 'DriverDriverManager',
                component: DriverDriverManager
            },
            {
                path: '/drivers/drivers/:id',
                name: 'DriverDriverDetail',
                component: DriverDriverDetail
            },

            {
                path: '/vehicles/vehicles',
                name: 'VehicleVehicleManager',
                component: VehicleVehicleManager
            },
            {
                path: '/vehicles/vehicles/:id',
                name: 'VehicleVehicleDetail',
                component: VehicleVehicleDetail
            },



    ]
})
