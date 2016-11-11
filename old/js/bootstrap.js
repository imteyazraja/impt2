define([
    'require',
    'angular',
    'jquery',
    'jquery-ui',
    'angular-animate',
    'angular-sortable',
    'angular-chart',
    'angular-chart-more',
    'angular-chart-solid',
    'angular-aria',
    'angular-material',
    'angular-loader',
    'app',
    'routes'
], function (require, ng,ngAnimate) {
    'use strict';
    
    require(['domReady!'], function (document) {
        ng.bootstrap(document, ['adminModule']);
    });
});
