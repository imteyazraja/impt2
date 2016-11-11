require.config({
    paths: {
        'angular': '../bower_components/angular/angular',
        'angular-route': '../bower_components/angular-route/angular-ui-route',
        'angular-animate': '../bower_components/angular/angular-animate',
        'angular-aria'	:	'../bower_components/angular/angular-aria',
        'angular-material'	:	'../bower_components/angular/angular-material',
        'jquery': '../vendor/jquery-1.7.1.min',
		'jquery-ui': '../vendor/jquery-ui-1.10.4.custom.min',
        'angular-sortable': '../bower_components/angular/angular-sortable',
        'angular-chart':'../vendor/highcharts',
        'angular-chart-more':'../vendor/highcharts-more',
        'angular-chart-solid':'../vendor/highcharts-solid',
        'angular-loader': '../vendor/loading-bar',
        'domReady': '../bower_components/requirejs-domready'
    },
    waitSeconds: 0,
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-animate': ['angular'],
        'angular-aria'	:	['angular','angular-animate'],
        'angular-material'	:	['angular','angular-animate','angular-aria'],
        'jquery': {
			exports: 'jquery'
		},
		'jquery-ui': ['jquery'],
        'angular-sortable': ['angular','jquery','jquery-ui'],
        'angular-chart' : ['angular','jquery','jquery-ui'],	
        'angular-chart-more' : ['angular','jquery','jquery-ui','angular-chart'],	
        'angular-chart-solid' : ['angular','jquery','jquery-ui','angular-chart','angular-chart-more'],
        'angular-loader' : ['angular']
    },
    deps: [
        './bootstrap'
    ],
    urlArgs: "ver=2.16.31"
});
