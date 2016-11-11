define(['./app'], function (adminModuleApp) {
		'use strict';
		return adminModuleApp.config(function($stateProvider, $urlRouterProvider,$locationProvider,$httpProvider,cfpLoadingBarProvider) {
		cfpLoadingBarProvider.includeSpinner = true;
		$urlRouterProvider.otherwise('/wrongPath');
		$stateProvider.
		state("wrongPath",{url:'/wrongPath',
			views:{
				"initload@": {templateUrl:"partials/notAuthorised.html"}
			}
		,authenticated:false}).
		state("appHome", {
			url:'^/budget',
			views : {
				"initload@" : {
					templateUrl: "partials/appHome.html",
					onEnter: function(){
						$scope.$new;
					},
					onExit: function(){
						$scope.$destroy;
					}
				},
				"pageload@appHome" : {
					templateUrl: "partials/budget.html",
					resolve:{
						returnState:function($stateParams){
							return {stateParam:$stateParams.srchparam,whichParam:$stateParams.srchWhich};
						}
					},
					controller:'budgetController',
					onEnter: function(){
						$scope.$new;
					},
					onExit: function(){
						$scope.$destroy;
					}
				}
			}, 
		authenticated:true}).
		state("notAuthorised", {url:'/notAuthorised',
			views:{
				"initload": {templateUrl:"partials/notAuthorised.html"}
			}
		,authenticated:false});
		$locationProvider.html5Mode(true);
	}).run(function($location,$rootScope,$stateParams,$state) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		$rootScope.$on('$locationChangeStart', function (event,newUrl,oldUrl) {
			var locUrl	=	$location.url();
			var locUrlSpl	=	locUrl.split('/');
			$rootScope.activeMenu	=	locUrlSpl[1];
			$rootScope.activeFilter	=	locUrlSpl[4];
			$('.reportDiv').addClass('ng-hide');
			$rootScope.oldPath	=	$location.url();
			if(AUTH_USER !=1){
				$location.url('/notAuthorised');
			}
		});
	});
});
