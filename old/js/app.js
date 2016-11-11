define([
    'angular',
    'angular-route',
    'angular-aria',
    'angular-material',
    './controllers/index',
    './directives/index',
    './filters/index',
    './services/index'
], function (angular) {
    'use strict';

    return angular.module('adminModule', [
        'adminModule.controllers',
        'adminModule.directives',
        'adminModule.filters',
        'adminModule.services',
        'ui.router',
        'ngAnimate',
        'ngMaterial',
        'angular-loading-bar',
        'ui.sortable'
    ]);
});
