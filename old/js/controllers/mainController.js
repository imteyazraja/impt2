define(['./module'], function (adminModuleApp) {
	adminModuleApp.controller('mainController',function($scope,APIServices,$rootScope,$state,$location,$http,$timeout,$mdToast,$mdDialog,$mdMedia,$mdSidenav) {
		
		$rootScope.employees = null;
		/*APIServices.getEmployeesInfo($scope.id).success(function (response) {	
			$rootScope.employees = response;	
		});*/
		
		
		$scope.logoutBudgetModule	=	function() {
			window.location = SSO_LOGOUT;
		};
		//Calling Service for fetching all vertical list
		
		
		$scope.toggleRight = buildToggler('left');
		
		function buildToggler(navID) {
			return function() {
				$mdSidenav(navID)
				.toggle()
				.then(function () {
				
				});
			}
		}
	});
});
