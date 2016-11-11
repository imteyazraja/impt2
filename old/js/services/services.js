define(['./module'], function (tmeModuleApp) {
	'use strict';
	tmeModuleApp.constant('CONSTANTS',{
		ServerUrl:window.location.host,
		pathUrl:window.location.pathname,
	});
	tmeModuleApp.factory('APIServices', function($http,$rootScope,CONSTANTS) {
		var expPathUrl	=	CONSTANTS.pathUrl.split('/');
		if(expPathUrl[1]	==	'megenio' || expPathUrl[1]	==	'megenionew' || expPathUrl[1]	==	'MEGENIO') {
			var APIURL	=	'http://'+CONSTANTS.ServerUrl+'/'+expPathUrl[1]+'/budgetInfo';
		} else {
			var APIURL	=	'http://'+CONSTANTS.ServerUrl+'/budgetInfo';
		}
		
		var APIService = {};
		
		APIService.getEmployeesInfo = function() {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/empInfo/getEmployeesInfo/'+UCODE+'/'
		  });
		}
		APIService.getEmpAccessInfo = function() {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/empInfo/getEmpAccessInfo/',
			data : {
				empcode  : UCODE
			}
		  });
		}
		APIService.getBudgetLog = function(campaign) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/addInfo/getBudgetLog/',
			data : {
				campaign 	: campaign
			}
		  });
		}
		
		//Package Related APIs
		
		APIService.getTier1PackageBudget = function(cityval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pkgbudget/getTier1PackageBudget/',
			data : {
				data_city 	: cityval
			}
		  });
		}
		APIService.getTier2TeamBdgtPkg = function(cityval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pkgbudget/getTier2TeamBdgtPkg/',
			data : {
				data_city 	: cityval
			}
		  });
		}
		APIService.getTier2CatBdgtPkg = function(cityval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pkgbudget/getTier2CatBdgtPkg/',
			data : {
				data_city 	: cityval
			}
		  });
		}
		APIService.getTier2ExpBdgtPkg = function(cityval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pkgbudget/getTier2ExpBdgtPkg/',
			data : {
				data_city 	: cityval
			}
		  });
		}
		APIService.getTier3TeamBdgtPkg = function(cityval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pkgbudget/getTier3TeamBdgtPkg/',
			data : {
				data_city 	: cityval
			}
		  });
		}
		APIService.getTier3CatBdgtPkg = function(cityval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pkgbudget/getTier3CatBdgtPkg/',
			data : {
				data_city 	: cityval
			}
		  });
		}
		APIService.getTier3ExpBdgtPkg = function(cityval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pkgbudget/getTier3ExpBdgtPkg/',
			data : {
				data_city 	: cityval
			}
		  });
		}
		APIService.getZoneTeamBdgtPkg = function(cityval,zoneval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pkgbudget/getZoneTeamBdgtPkg/',
			data : {
				data_city 	: cityval,
				zone_name 	: zoneval
			}
		  });
		}
		APIService.getZoneCatBdgtPkg = function(cityval,zoneval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pkgbudget/getZoneCatBdgtPkg/',
			data : {
				data_city 	: cityval,
				zone_name 	: zoneval
			}
		  });
		}
		APIService.getZoneExpBdgtPkg = function(cityval,zoneval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pkgbudget/getZoneExpBdgtPkg/',
			data : {
				data_city 	: cityval,
				zone_name 	: zoneval
			}
		  });
		}
		APIService.getRemoteBudgetPkg = function(cityval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pkgbudget/getRemoteBudgetPkg/',
			data : {
				data_city 	: cityval
			}
		  });
		}
		APIService.showTier2PkgBudget = function() {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pkgbudget/showTier2PkgBudget/'
		  });
		}
		APIService.showTier3PkgBudget = function(pgno) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pkgbudget/showTier3PkgBudget/',
			data : {
					pgno:pgno
				}
		  });
		}
		APIService.updateTier1Package = function(tierpkgdata,data_city) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pkgbudget/updateTier1Package/',
			data : {
					tier1bdgt 		: tierpkgdata,
					data_city 		: data_city,
					ucode  			: UCODE,
					uname  			: UNAME,
					ipaddr 			: IP_ADDRESS
				}
		  });
		}
		APIService.updateTier2Package = function(type,tier2pkgdata,data_city) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pkgbudget/updateTier2Package/',
			data : {
					type 			: type,
					tier2bdgt 		: tier2pkgdata,
					data_city 		: data_city,
					ucode  			: UCODE,
					uname  			: UNAME,
					ipaddr 			: IP_ADDRESS
				}
		  });
		}
		APIService.updateTier3Package = function(type,tier3pkgdata,data_city) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pkgbudget/updateTier3Package/',
			data : {
					type 			: type,
					tier3bdgt 		: tier3pkgdata,
					data_city 		: data_city,
					ucode  			: UCODE,
					uname  			: UNAME,
					ipaddr 			: IP_ADDRESS
				}
		  });
		}
		APIService.updateZonePackage = function(type,zonepkgdata,data_city,zone_name) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pkgbudget/updateZonePackage/',
			data : {
					type 			: type,
					zonebdgt 		: zonepkgdata,
					data_city 		: data_city,
					zone_name 		: zone_name,
					ucode  			: UCODE,
					uname  			: UNAME,
					ipaddr 			: IP_ADDRESS
				}
		  });
		}
		APIService.updateRemoteBudgetPkg = function(remotepkgdata,data_city) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pkgbudget/updateRemoteBudgetPkg/',
			data : {
					remotebdgt 		: remotepkgdata,
					data_city 		: data_city,
					ucode  			: UCODE,
					uname  			: UNAME,
					ipaddr 			: IP_ADDRESS
				}
		  });
		}
		
		
		//PDG Related APIs
		
		APIService.getTier1PDGBudget = function(cityval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pdgbudget/getTier1PDGBudget/',
			data : {
				data_city 	: cityval
			}
		  });
		}
		APIService.getTier2TeamBdgtPdg = function(cityval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pdgbudget/getTier2TeamBdgtPdg/',
			data : {
				data_city 	: cityval
			}
		  });
		}
		APIService.getTier2CatBdgtPdg = function(cityval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pdgbudget/getTier2CatBdgtPdg/',
			data : {
				data_city 	: cityval
			}
		  });
		}
		APIService.getTier3TeamBdgtPdg = function(cityval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pdgbudget/getTier3TeamBdgtPdg/',
			data : {
				data_city 	: cityval
			}
		  });
		}
		APIService.getTier3CatBdgtPdg = function(cityval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pdgbudget/getTier3CatBdgtPdg/',
			data : {
				data_city 	: cityval
			}
		  });
		}
		APIService.getZoneTeamBdgtPdg = function(cityval,zoneval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pdgbudget/getZoneTeamBdgtPdg/',
			data : {
				data_city 	: cityval,
				zone_name 	: zoneval
			}
		  });
		}
		APIService.getZoneCatBdgtPdg = function(cityval,zoneval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pdgbudget/getZoneCatBdgtPdg/',
			data : {
				data_city 	: cityval,
				zone_name 	: zoneval
			}
		  });
		}
		APIService.getRemoteBudgetPdg = function(cityval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pdgbudget/getRemoteBudgetPdg/',
			data : {
				data_city 	: cityval
			}
		  });
		}
		APIService.updateTier1PDG = function(tierpdgdata,data_city) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pdgbudget/updateTier1PDG/',
			data : {
					tier1bdgt 		: tierpdgdata,
					data_city 		: data_city,
					ucode  			: UCODE,
					uname  			: UNAME,
					ipaddr 			: IP_ADDRESS
				}
		  });
		}
		APIService.updateTier2PDG = function(type,tier2pdgdata,data_city) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pdgbudget/updateTier2PDG/',
			data : {
					type 			: type,
					tier2bdgt 		: tier2pdgdata,
					data_city 		: data_city,
					ucode  			: UCODE,
					uname  			: UNAME,
					ipaddr 			: IP_ADDRESS
				}
		  });
		}
		APIService.updateTier3PDG = function(type,tier3pdgdata,data_city) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pdgbudget/updateTier3PDG/',
			data : {
					type 			: type,
					tier3bdgt 		: tier3pdgdata,
					data_city 		: data_city,
					ucode  			: UCODE,
					uname  			: UNAME,
					ipaddr 			: IP_ADDRESS
				}
		  });
		}
		APIService.updateZonePDG = function(type,zonepdgdata,data_city,zone_name) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pdgbudget/updateZonePDG/',
			data : {
					type 			: type,
					zonebdgt 		: zonepdgdata,
					data_city 		: data_city,
					zone_name 		: zone_name,
					ucode  			: UCODE,
					uname  			: UNAME,
					ipaddr 			: IP_ADDRESS
				}
		  });
		}
		APIService.updateRemoteBudgetPdg = function(remotepdgdata,data_city) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/pdgbudget/updateRemoteBudgetPdg/',
			data : {
					remotebdgt 		: remotepdgdata,
					data_city 		: data_city,
					ucode  			: UCODE,
					uname  			: UNAME,
					ipaddr 			: IP_ADDRESS
				}
		  });
		}
		//Banner Related APIs
		
		APIService.getBannerBudgetInfo = function(cityval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/miscbudget/getBannerBudgetInfo/',
			data : {
				data_city 	: cityval
			}
		  });
		}
		APIService.updateBannerBudget = function(bannerbdgt,data_city) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/miscbudget/updateBannerBudget/',
			data : {
					bannerbdgt 		: bannerbdgt,
					data_city 		: data_city,
					ucode  			: UCODE,
					uname  			: UNAME,
					ipaddr 			: IP_ADDRESS
				}
		  });
		}
		
		//JDRR Related APIs
		
		
		APIService.getJdrrBudgetInfo = function(cityval) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/miscbudget/getJdrrBudgetInfo/',
			data : {
				data_city 	: cityval
			}
		  });
		}
		
		APIService.updateJdrrBudget = function(jdrrbdgt,data_city) {
		  return $http({
			method: 'POST', 
			url: APIURL+'/budget_services/miscbudget/updateJdrrBudget/',
			data : {
					jdrrbdgt 		: jdrrbdgt,
					data_city 		: data_city,
					ucode  			: UCODE,
					uname  			: UNAME,
					ipaddr 			: IP_ADDRESS
				}
		  });
		}
		
		// National Listing APIs
		
		APIService.getCities	=	function(srchcity,campaign) {
			return $http({
				method:'POST',
				url:APIURL+'/budget_services/addInfo/getCities/',
				data : {
					srchcity : srchcity,
					campaign : campaign
				}
			});
		}
		APIService.getNationalListingBudget	=	function(data_city) {
			return $http({
				method:'POST',
				url:APIURL+'/budget_services/miscbudget/getNationalListingBudget/',
				data : {
					data_city : data_city
				}
			});
		}
		APIService.updateNationalBudget	=	function(natbdgt,data_city) {
			return $http({
				method:'POST',
				url:APIURL+'/budget_services/miscbudget/updateNationalBudget/',
				data : {
					natbdgt 		: natbdgt,
					data_city 		: data_city,
					ucode  			: UCODE,
					uname  			: UNAME,
					ipaddr 			: IP_ADDRESS
				}
			});
		}
		
		return APIService;
	});

	tmeModuleApp.factory('Paths', function($location) {
		return {
			appname: "vfdfvdfv" ,
			appurl: $location.url(),
			apppath: $location.path(),
			applocation: $location
		};
	});
});
