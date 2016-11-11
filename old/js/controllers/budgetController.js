define(['./module'], function (adminModuleApp) {
	adminModuleApp.controller('budgetController',function($scope,APIServices,$rootScope,$state,$location,$http,$timeout,$mdToast,$mdDialog,$mdMedia,$mdSidenav) {
		
		$scope.pkgcitylist = ["Mumbai","Delhi","Kolkata","Bangalore","Chennai","Pune","Hyderabad","Ahmedabad","Jaipur","Chandigarh","Coimbatore","Remote - Tier 2","Remote - Tier 3","Zone Wise","Individual Remote City"];
		$scope.pkgzonelist = ["Mumbai","Delhi","Kolkata","Bangalore","Chennai","Pune","Hyderabad","Ahmedabad","Jaipur","Chandigarh","Coimbatore"];
		$scope.pdgcitylist = ["Mumbai","Delhi","Kolkata","Bangalore","Chennai","Pune","Hyderabad","Ahmedabad","Jaipur","Chandigarh","Coimbatore","Remote - Tier 2","Remote - Tier 3","Zone Wise","Individual Remote City"];
		$scope.pdgzonelist = ["Mumbai","Delhi","Kolkata","Bangalore","Chennai","Pune","Hyderabad","Ahmedabad","Jaipur","Chandigarh","Coimbatore"];
		
		$scope.limited_access_flag = 0;
		APIServices.getEmpAccessInfo().success(function (response) {	
			$scope.empaccessinfo = response;
			if($scope.empaccessinfo.limited_flg){
				$scope.limited_access_flag = $scope.empaccessinfo.limited_flg;
			}
			if($scope.limited_access_flag == 1){
				$scope.pkgcitylist = $scope.empaccessinfo.pkg_city.split(",");
				$scope.pkgzonelist = $scope.empaccessinfo.pkg_zone.split(",");
				$scope.pdgcitylist = $scope.empaccessinfo.pdg_city.split(",");
				$scope.pdgzonelist = $scope.empaccessinfo.pdg_zone.split(",");
			}
		});
		
		$rootScope.cityselcampaign 	= 	[];
		
		$scope.save_btn = 1;
		$scope.show_log = 0;
		if(UCODE == '10000760'){
			$scope.show_log = 1;
		}
		$scope.show_log = 1;
		$scope.packageReset = function() {
            $rootScope.$emit("callPkgController", {});
        }
        $scope.pdgReset = function() {
            $rootScope.$emit("callPdgController", {});
        }
        $scope.jdrrReset = function() {
            $rootScope.$emit("callJdrrController", {});
        }
        $scope.bannerReset = function() {
            $rootScope.$emit("callBannerController", {});
        }
        $scope.nationalReset = function() {
            $rootScope.$emit("callNationalController", {});
        }
		
	});
	
	adminModuleApp.controller('packageController',function($scope,APIServices,$rootScope,$state,$location,$http,$timeout,$mdToast,$mdDialog,$mdMedia,$mdSidenav) {
		
		$rootScope.$on("callPkgController", function(){
           $scope.resetPkgScope();
        });
		
		$rootScope.updatedCampaign = '';
		$scope.selPkgCity = {};
		$scope.selectedCity = '';
		$scope.remote_tier2 = 0;
		$scope.remote_tier3 = 0;
		$scope.zone_wise = 0;
		$scope.individual_remote = 0;
		$scope.selectedTier2BdgtType = '';
		$scope.selectedTier3BdgtType = '';
		$scope.selectedZoneFlg = 0;
		$scope.selectedZoneName = '';
		$scope.selectedZoneBdgtType = '';
		$scope.selectedPkgCity = '';
		
		$scope.setCity = function(event){
			$scope.selectedTier2BdgtType = '';
			$scope.selectedTier3BdgtType = '';
			$scope.selectedZoneFlg = 0;
			$scope.selectedZoneName = '';
			$scope.selectedZoneBdgtType = '';
			$scope.selectedPkgCity = '';
			$rootScope.cityselcampaign['package'] = '';
			
			$scope.selectedCity = this.selPkgCity[0];
			if($scope.selectedCity == 'Remote - Tier 2'){
				$scope.remote_tier2 = 1;
			}else{
				$scope.remote_tier2 = 0;
			}
			if($scope.selectedCity == 'Remote - Tier 3'){
				$scope.remote_tier3 = 1;
			}else{
				$scope.remote_tier3 = 0;
			}
			if($scope.selectedCity == 'Zone Wise'){
				$scope.zone_wise = 1;
			}else{
				$scope.zone_wise = 0;
			}
			if($scope.selectedCity == 'Individual Remote City'){
				$scope.individual_remote = 1;
			}else{
				$scope.individual_remote = 0;
			}
			$scope.pkgTier1Bdgt	=	{};
			if($scope.selectedCity !='' && $scope.selectedCity !='Remote - Tier 2' && $scope.selectedCity !='Remote - Tier 3' && $scope.selectedCity !='Zone Wise' && $scope.selectedCity !='Individual Remote City'){
				$scope.pkgbdgtArr		=	{};
				$scope.pkgcattypeArr		=	{};
				$scope.pkgexpireArr		=	{};
				$rootScope.pkgTier1BudgetData = {};
				APIServices.getTier1PackageBudget($scope.selectedCity).success(function(response) {
					$scope.pkgTier1Bdgt	=	response;
					if(response.errorcode == 0) {
						$rootScope.pkgTier1BudgetData = response;
						$scope.teaminfo = response.teaminfo;
						angular.forEach(response.data,function(teamdata,cityname) {
							$scope.pkgbdgtArr[cityname]	=	{};
							angular.forEach(teamdata,function(teambdgt,teamabbr) {
								$scope.pkgbdgtArr[cityname][teamabbr] = {};
								$scope.pkgbdgtArr[cityname][teamabbr]['bdgt'] = teambdgt;
								$scope.pkgbdgtArr[cityname][teamabbr]['teamnm'] = $scope.teaminfo[teamabbr];
							});
						});
						angular.forEach(response.catbdgt,function(catdata,cityname) {
							$scope.pkgcattypeArr[cityname]	=	{};
							angular.forEach(catdata,function(catbdgt,cattype) {
								$scope.pkgcattypeArr[cityname][cattype] = catbdgt;
							});
						});
						angular.forEach(response.expire,function(expiredata,cityname) {
							$scope.pkgexpireArr[cityname]	=	{};
							angular.forEach(expiredata,function(expireval,expirekey) {
								$scope.pkgexpireArr[cityname][expirekey] = expireval;
							});
						});
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Some error occurred while fetching data. Please contact Software Team.')
							.content("Error in getTier1PackageBudget - API")
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}
		}
		
		
		$scope.submitTier1Package  = function(event){
			
			$scope.t1PkgBdgtChngFlg = 0;
			$scope.t1PkgSubmitData			 = {};
			$scope.t1PkgSubmitData['L'] 	 = {}; // log node
			$scope.t1PkgSubmitData['L']['A'] = {}; // log action
			$scope.t1PkgSubmitData['L']['C'] = {}; // log changes flag
			$scope.t1PkgSubmitData['L']['O'] = {}; // log old value node
			$scope.t1PkgSubmitData['L']['N'] = {}; // log new value node
			$scope.t1PkgSubmitData['top200'] = $scope.pkgcattypeArr[$scope.selectedCity].top200;
			$scope.t1PkgSubmitData['normal'] = $scope.pkgcattypeArr[$scope.selectedCity].normal;
			
			$scope.t1PkgSubmitData['expday'] 	= $scope.pkgexpireArr[$scope.selectedCity].expday;
			$scope.t1PkgSubmitData['exp1yrbdgt'] = $scope.pkgexpireArr[$scope.selectedCity].exp1yrbdgt;
			$scope.t1PkgSubmitData['exp2yrbdgt'] = $scope.pkgexpireArr[$scope.selectedCity].exp2yrbdgt;
			
			$scope.t1PkgSubmitData['teamwise'] 		= {};
			$scope.t1PkgSubmitData['L']['O']['TW'] 	= {}; // log old teamwise
			$scope.t1PkgSubmitData['L']['N']['TW'] 	= {}; // log new teamwise
			angular.forEach($rootScope.pkgTier1BudgetData.data[$scope.selectedCity],function(t1bdgt,t1tmabbr) {
				$scope.t1PkgSubmitData['teamwise'][t1tmabbr] = $scope.pkgbdgtArr[$scope.selectedCity][t1tmabbr].bdgt;
				if(parseInt($scope.t1PkgSubmitData['teamwise'][t1tmabbr]) != parseInt(t1bdgt)){
					$scope.t1PkgBdgtChngFlg = 1;
				}
				$scope.t1PkgSubmitData['L']['O']['TW'][t1tmabbr] = parseInt(t1bdgt);
				$scope.t1PkgSubmitData['L']['N']['TW'][t1tmabbr] = parseInt($scope.t1PkgSubmitData['teamwise'][t1tmabbr]);
				
			});
			if(parseInt($scope.t1PkgSubmitData['top200']) != parseInt($rootScope.pkgTier1BudgetData.catbdgt[$scope.selectedCity].top200)){
				$scope.t1PkgBdgtChngFlg = 1;
			}
			$scope.t1PkgSubmitData['L']['O']['TOP'] = parseInt($rootScope.pkgTier1BudgetData.catbdgt[$scope.selectedCity].top200);
			$scope.t1PkgSubmitData['L']['N']['TOP'] = parseInt($scope.t1PkgSubmitData['top200']);
			if(parseInt($scope.t1PkgSubmitData['normal']) != parseInt($rootScope.pkgTier1BudgetData.catbdgt[$scope.selectedCity].normal)){
				$scope.t1PkgBdgtChngFlg = 1;
			}
			$scope.t1PkgSubmitData['L']['O']['NORM'] = parseInt($rootScope.pkgTier1BudgetData.catbdgt[$scope.selectedCity].normal);
			$scope.t1PkgSubmitData['L']['N']['NORM'] = parseInt($scope.t1PkgSubmitData['normal']);
			if(parseInt($scope.t1PkgSubmitData['exp1yrbdgt']) != parseInt($rootScope.pkgTier1BudgetData.expire[$scope.selectedCity].exp1yrbdgt)){
				$scope.t1PkgBdgtChngFlg = 1;
			}
			$scope.t1PkgSubmitData['L']['O']['EXP1'] = parseInt($rootScope.pkgTier1BudgetData.expire[$scope.selectedCity].exp1yrbdgt);
			$scope.t1PkgSubmitData['L']['N']['EXP1'] = parseInt($scope.t1PkgSubmitData['exp1yrbdgt']);
			if(parseInt($scope.t1PkgSubmitData['exp2yrbdgt']) != parseInt($rootScope.pkgTier1BudgetData.expire[$scope.selectedCity].exp2yrbdgt)){
				$scope.t1PkgBdgtChngFlg = 1;
			}
			$scope.t1PkgSubmitData['L']['O']['EXP2'] = parseInt($rootScope.pkgTier1BudgetData.expire[$scope.selectedCity].exp2yrbdgt);
			$scope.t1PkgSubmitData['L']['N']['EXP2'] = parseInt($scope.t1PkgSubmitData['exp2yrbdgt']);
			$scope.t1PkgSubmitData['L']['C'] 		= $scope.t1PkgBdgtChngFlg;
			$scope.t1PkgSubmitData['L']['A']			= 'pkgtier1';
			
			var check_flag = 1;
			if($scope.t1PkgBdgtChngFlg !=1){
				check_flag = 0;
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.content("Kindly do any changes in budget before clicking on Save Button.")
					.ariaLabel('Alert Dialog Demo')
					.ok('ok')
					.targetEvent(event)
				);
				return false;
			}
			if((parseInt($scope.t1PkgSubmitData['top200']) < MIN_PKG_TIER1) || (parseInt($scope.t1PkgSubmitData['normal']) < MIN_PKG_TIER1)){
				check_flag = 0;
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.content("Package Top 200 / Normal Category Budget can't be less than "+MIN_PKG_TIER1+" in "+$scope.selectedCity)
					.ariaLabel('Alert Dialog Demo')
					.ok('ok')
					.targetEvent(event)
				);
				return false;
			}
			if(check_flag ==1){
				APIServices.updateTier1Package($scope.t1PkgSubmitData,$scope.selectedCity).success(function(response) {
					console.log(response);
					if(response.errorcode == 0) {
						$rootScope.updatedCampaign = "Package";
						$scope.budgetConfirmationPopup(event);
					} else {
							$mdDialog.show(
								$mdDialog.alert()
								.parent(angular.element(document.querySelector('#popupContainer')))
								.clickOutsideToClose(true)
								.title('Error in submitting budget for Package.')
								.content('Data Cannot be submitted. Please try again later.')
								.ariaLabel('Alert Dialog Demo')
								.ok('Got it!')
								.targetEvent(event)
							);
						return false;
					}
				});
			}
		}
		
		$scope.tire2BudgetSel = function(event){
			$scope.selectedTier2BdgtType = this.tier2bdgtType;
			
			if($scope.selectedTier2BdgtType == 'Team Wise Budget'){
				$scope.pkgTier2TeamBdgtFlg = 0;
				$scope.pkgTier2TeamBdgt	=	{};
				$scope.pkgTier2bdgtArr		=	{};
				$rootScope.pkgTier2TeamBudgetData = {};
				
				APIServices.getTier2TeamBdgtPkg($scope.selectedCity).success(function(response) {
					if(response.errorcode == 0) {
						$rootScope.pkgTier2TeamBudgetData =	response;
						$scope.pkgTier2TeamBdgt	=	response;
						$scope.pkgTier2TeamBdgtFlg = 1;
						$scope.teaminfo = response.teaminfo;
						angular.forEach(response.tier2data,function(tier2bdgt,tier2tmabbr) {
							$scope.pkgTier2bdgtArr[tier2tmabbr] = {};
							$scope.pkgTier2bdgtArr[tier2tmabbr]['bdgt']  = tier2bdgt;
							$scope.pkgTier2bdgtArr[tier2tmabbr]['teamnm'] = $scope.teaminfo[tier2tmabbr];
						});
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Some error occurred while fetching data. Please contact Software Team.')
							.content("Error in getTier2TeamBdgtPkg - API")
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}else if($scope.selectedTier2BdgtType == 'Category Wise Budget'){
				$scope.pkgTier2CatBdgtFlg = 0;
				$scope.pkgTier2CatBdgt	=	{};
				$scope.pkgTier2CatDiffBdgt		=	{};
				$scope.tier2diffCity = {};
				$scope.pkgtier2_citydiffbdgt = 0;
				$rootScope.pkgTier2CatBudgetData = {};
				APIServices.getTier2CatBdgtPkg($scope.selectedCity).success(function(response) {
					if(response.errorcode == 0) {
						$rootScope.pkgTier2CatBudgetData = response;
						$scope.pkgTier2CatBdgt['top200']	=	response.tier2top200;
						$scope.pkgTier2CatBdgt['normal']	=	response.tier2normal;
						$scope.pkgTier2CatBdgtFlg = 1;
						$rootScope.pkgTier2CityMismatch = {};
						if(response.tire2mismatch){
							$scope.pkgtier2_citydiffbdgt = 1;
							$rootScope.pkgTier2CityMismatch = response.tire2mismatch;
							angular.forEach(response.tire2mismatch,function(tire2diffbdgt,cityname) {
								$scope.pkgTier2CatDiffBdgt[cityname]	=	{};
								$scope.tier2diffCity[cityname] = true;
								angular.forEach(tire2diffbdgt,function(diffbdgtval,diffbdgtkey) {
									$scope.pkgTier2CatDiffBdgt[cityname][diffbdgtkey] = diffbdgtval;									
								});
							});
						}
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Some error occurred while fetching data. Please contact Software Team.')
							.content("Error in getTier2CatBdgtPkg - API")
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}else if($scope.selectedTier2BdgtType == 'Package Expiry Budget'){
				$scope.pkgTier2ExpBdgtFlg = 0;
				$scope.pkgTier2ExpBdgt	=	{};
				$scope.pkgTier2ExpDiffBdgt		=	{};
				$scope.tier2ExpdiffCity = {};
				$scope.pkgtier2_expdiffbdgt = 0;
				$rootScope.pkgTier2ExpBudgetData = {};
				APIServices.getTier2ExpBdgtPkg($scope.selectedCity).success(function(response) {
					if(response.errorcode == 0) {
						$rootScope.pkgTier2ExpBudgetData = response;
						$scope.pkgTier2ExpBdgt['tenure']	=	response.expday;
						$scope.pkgTier2ExpBdgt['oneyrbdgt']	=	response.exp1yrbdgt;
						$scope.pkgTier2ExpBdgt['twoyrbdgt']	=	response.exp2yrbdgt;
						$scope.pkgTier2ExpBdgtFlg = 1;
						$rootScope.pkgTier2ExpMismatch = {};
						if(response.tire2expmismatch){
							$scope.pkgtier2_expdiffbdgt = 1;
							$rootScope.pkgTier2ExpMismatch = response.tire2expmismatch;
							angular.forEach(response.tire2expmismatch,function(tire2expdiffbdgt,cityname) {
								$scope.pkgTier2ExpDiffBdgt[cityname]	=	{};
								$scope.tier2ExpdiffCity[cityname] = true;
								angular.forEach(tire2expdiffbdgt,function(diffbdgtval,diffbdgtkey) {
									$scope.pkgTier2ExpDiffBdgt[cityname][diffbdgtkey] = diffbdgtval;
								});
							});
						}
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Some error occurred while fetching data. Please contact Software Team.')
							.content("Error in getTier2ExpBdgtPkg - API")
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}
		}
		$scope.submitTier2Package  = function(type,event){
			if(type == 'catwise'){
				
				$scope.t2PkgCatBdgtChngFlg 	= 0;
				$scope.t2PkgCatSubmitData	=	{};
				$scope.t2PkgCatSubmitData['L'] 		= {}; // log node
				$scope.t2PkgCatSubmitData['L']['A'] = {}; // log action
				$scope.t2PkgCatSubmitData['L']['C'] = {}; // log changes flag
				$scope.t2PkgCatSubmitData['L']['O'] = {}; // log old value node
				$scope.t2PkgCatSubmitData['L']['N'] = {}; // log new value node
				
				
				$scope.t2PkgCatSubmitData['top200'] = $scope.pkgTier2CatBdgt.top200;
				$scope.t2PkgCatSubmitData['normal'] = $scope.pkgTier2CatBdgt.normal;

				if(parseInt($scope.t2PkgCatSubmitData['top200']) != parseInt($rootScope.pkgTier2CatBudgetData.tier2top200)){
					$scope.t2PkgCatBdgtChngFlg = 1;
				}
				$scope.t2PkgCatSubmitData['L']['O']['TOP'] = parseInt($rootScope.pkgTier2CatBudgetData.tier2top200);
				$scope.t2PkgCatSubmitData['L']['N']['TOP'] = parseInt($scope.t2PkgCatSubmitData['top200']);
				
				if(parseInt($scope.t2PkgCatSubmitData['normal']) != parseInt($rootScope.pkgTier2CatBudgetData.tier2normal)){
					$scope.t2PkgCatBdgtChngFlg = 1;
				}
				$scope.t2PkgCatSubmitData['L']['O']['NORM'] = parseInt($rootScope.pkgTier2CatBudgetData.tier2normal);
				$scope.t2PkgCatSubmitData['L']['N']['NORM'] = parseInt($scope.t2PkgCatSubmitData['normal']);
				
				var t2_diffcity_sel = [];
				if($scope.isEmpty($rootScope.pkgTier2CityMismatch) == false) {
					angular.forEach($rootScope.pkgTier2CityMismatch,function(t2catdiffbdgtpkg,cityname) {
						if($scope.tier2diffCity[cityname]){
							t2_diffcity_sel.push(cityname);
						}
					});
					if(t2_diffcity_sel.length >0){
						$scope.t2PkgCatSubmitData['t2diffcitypkg'] = t2_diffcity_sel.join("|");
					}else{
						$scope.t2PkgCatSubmitData['t2diffcitypkg'] = "";
					}
					$scope.t2PkgCatSubmitData['L']['DIFFCITY'] = $scope.t2PkgCatSubmitData['t2diffcitypkg']; 
				}
				$scope.t2PkgCatSubmitData['L']['C'] 		= $scope.t2PkgCatBdgtChngFlg;
				$scope.t2PkgCatSubmitData['L']['A']			= 'pkgt2cat';
				console.log($scope.t2PkgCatSubmitData);
				
				var check_flag = 1;
				if($scope.t2PkgCatBdgtChngFlg !=1){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("Kindly do any changes in budget before clicking on Save Button.")
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if((parseInt($scope.t2PkgCatSubmitData['top200']) < MIN_PKG_REMOTE) || (parseInt($scope.t2PkgCatSubmitData['normal']) < MIN_PKG_REMOTE)){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("Package Top 200 / Normal Category Budget can't be less than "+MIN_PKG_REMOTE+" in "+$scope.selectedCity)
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if(check_flag ==1){
					APIServices.updateTier2Package('catwise',$scope.t2PkgCatSubmitData,$scope.selectedCity).success(function(response) {
						console.log(response);
						if(response.errorcode == 0) {
							$rootScope.updatedCampaign = "Package";
							$scope.budgetConfirmationPopup(event);
						} else {
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.querySelector('#popupContainer')))
									.clickOutsideToClose(true)
									.title('Error in submitting budget for Package.')
									.content('Data Cannot be submitted. Please try again later.')
									.ariaLabel('Alert Dialog Demo')
									.ok('Got it!')
									.targetEvent(event)
								);
							return false;
						}
					});
				}
			}else if(type == 'teamwise'){
				
				$scope.t2PkgTeamBdgtChngFlg = 0;
				$scope.t2PkgTeamSubmitData					= {};
				$scope.t2PkgTeamSubmitData['L'] 			= {}; // log node
				$scope.t2PkgTeamSubmitData['L']['A'] 		= {}; // log action
				$scope.t2PkgTeamSubmitData['L']['C'] 		= {}; // log changes flag
				$scope.t2PkgTeamSubmitData['L']['O'] 		= {}; // log old value node
				$scope.t2PkgTeamSubmitData['L']['N'] 		= {}; // log new value node
				$scope.t2PkgTeamSubmitData['L']['O']['TW'] 	= {}; // log old teamwise
				$scope.t2PkgTeamSubmitData['L']['N']['TW'] 	= {}; // log new teamwise
				$scope.t2PkgTeamSubmitData['t2pkgtmbdgt']	= {};
				
				angular.forEach($rootScope.pkgTier2TeamBudgetData.tier2data,function(t2bdgt,t2tmabbr) {
					$scope.t2PkgTeamSubmitData['t2pkgtmbdgt'][t2tmabbr] = $scope.pkgTier2bdgtArr[t2tmabbr].bdgt;
					if(parseInt($scope.t2PkgTeamSubmitData['t2pkgtmbdgt'][t2tmabbr]) != parseInt(t2bdgt)){
						$scope.t2PkgTeamBdgtChngFlg = 1;
					}
					$scope.t2PkgTeamSubmitData['L']['O']['TW'][t2tmabbr] = parseInt(t2bdgt);
					$scope.t2PkgTeamSubmitData['L']['N']['TW'][t2tmabbr] = parseInt($scope.t2PkgTeamSubmitData['t2pkgtmbdgt'][t2tmabbr]);
				});
				$scope.t2PkgTeamSubmitData['L']['C'] 	= $scope.t2PkgTeamBdgtChngFlg;
				$scope.t2PkgTeamSubmitData['L']['A']	= 'pkgt2team';
				
				console.log($scope.t2PkgTeamSubmitData);
				
				var check_flag = 1;
				if($scope.t2PkgTeamBdgtChngFlg !=1){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("Kindly do any changes in budget before clicking on Save Button.")
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if(check_flag ==1){
					APIServices.updateTier2Package('teamwise',$scope.t2PkgTeamSubmitData,$scope.selectedCity).success(function(response) {
						console.log(response);
						if(response.errorcode == 0) {
							$rootScope.updatedCampaign = "Package";
							$scope.budgetConfirmationPopup(event);
						} else {
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.querySelector('#popupContainer')))
									.clickOutsideToClose(true)
									.title('Error in submitting budget for Package.')
									.content('Data Cannot be submitted. Please try again later.')
									.ariaLabel('Alert Dialog Demo')
									.ok('Got it!')
									.targetEvent(event)
								);
							return false;
						}
					});
				}
			}else if(type == 'expire'){
				
				$scope.t2PkgExpBdgtChngFlg = 0;
				$scope.t2PkgExpireSubmitData			= {};
				$scope.t2PkgExpireSubmitData['L'] 		= {}; // log node
				$scope.t2PkgExpireSubmitData['L']['A'] 	= {}; // log action
				$scope.t2PkgExpireSubmitData['L']['C'] 	= {}; // log changes flag
				$scope.t2PkgExpireSubmitData['L']['O'] 	= {}; // log old value node
				$scope.t2PkgExpireSubmitData['L']['N'] 	= {}; // log new value node
				
				$scope.t2PkgExpireSubmitData['expday'] 		= $scope.pkgTier2ExpBdgt.tenure;
				$scope.t2PkgExpireSubmitData['exp1yrbdgt'] 	= $scope.pkgTier2ExpBdgt.oneyrbdgt;
				$scope.t2PkgExpireSubmitData['exp2yrbdgt'] 	= $scope.pkgTier2ExpBdgt.twoyrbdgt;
				
				if(parseInt($scope.t2PkgExpireSubmitData['exp1yrbdgt']) != parseInt($rootScope.pkgTier2ExpBudgetData.exp1yrbdgt)){
					$scope.t2PkgExpBdgtChngFlg = 1;
				}
				$scope.t2PkgExpireSubmitData['L']['O']['EXP1'] = parseInt($rootScope.pkgTier2ExpBudgetData.exp1yrbdgt);
				$scope.t2PkgExpireSubmitData['L']['N']['EXP1'] = parseInt($scope.t2PkgExpireSubmitData['exp1yrbdgt']);
				
				if(parseInt($scope.t2PkgExpireSubmitData['exp2yrbdgt']) != parseInt($rootScope.pkgTier2ExpBudgetData.exp2yrbdgt)){
					$scope.t2PkgExpBdgtChngFlg = 1;
				}
				$scope.t2PkgExpireSubmitData['L']['O']['EXP2'] = parseInt($rootScope.pkgTier2ExpBudgetData.exp2yrbdgt);
				$scope.t2PkgExpireSubmitData['L']['N']['EXP2'] = parseInt($scope.t2PkgExpireSubmitData['exp2yrbdgt']);
				
				var t2_diffcityexp_sel = [];
				if($scope.isEmpty($rootScope.pkgTier2ExpMismatch) == false) {
					angular.forEach($rootScope.pkgTier2ExpMismatch,function(t2catdiffbdgtpkg,cityname) {
						if($scope.tier2ExpdiffCity[cityname]){
							t2_diffcityexp_sel.push(cityname);
						}
					});
					if(t2_diffcityexp_sel.length >0){
						$scope.t2PkgExpireSubmitData['t2diffcityexppkg'] = t2_diffcityexp_sel.join("|");
					}else{
						$scope.t2PkgExpireSubmitData['t2diffcityexppkg'] = "";
					}
					$scope.t2PkgExpireSubmitData['L']['DIFFCITY'] = $scope.t2PkgExpireSubmitData['t2diffcityexppkg']; 
				}
				$scope.t2PkgExpireSubmitData['L']['C'] 	= $scope.t2PkgExpBdgtChngFlg;
				$scope.t2PkgExpireSubmitData['L']['A']	= 'pkgt2exp';
				console.log($scope.t2PkgExpireSubmitData);
				var check_flag = 1;
				if($scope.t2PkgExpBdgtChngFlg !=1){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("Kindly do any changes in budget before clicking on Save Button.")
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if(check_flag ==1){
					APIServices.updateTier2Package('expire',$scope.t2PkgExpireSubmitData,$scope.selectedCity).success(function(response) {
						console.log(response);
						if(response.errorcode == 0) {
							$rootScope.updatedCampaign = "Package";
							$scope.budgetConfirmationPopup(event);
						} else {
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.querySelector('#popupContainer')))
									.clickOutsideToClose(true)
									.title('Error in submitting budget for Package.')
									.content('Data Cannot be submitted. Please try again later.')
									.ariaLabel('Alert Dialog Demo')
									.ok('Got it!')
									.targetEvent(event)
								);
							return false;
						}
					});
				}
			}
		}
		
		$scope.tire3BudgetSel = function(event){
			$scope.selectedTier3BdgtType = this.tier3bdgtType;
			
			if($scope.selectedTier3BdgtType == 'Team Wise Budget'){
				$scope.pkgTier3TeamBdgtFlg = 0;
				$scope.pkgTier3TeamBdgt	=	{};
				$scope.pkgTier3bdgtArr		=	{};
				$rootScope.pkgTier3TeamBudgetData = {};
				
				APIServices.getTier3TeamBdgtPkg($scope.selectedCity).success(function(response) {
					$rootScope.pkgTier3TeamBudgetData =	response;
					if(response.errorcode == 0) {
						$scope.pkgTier3TeamBdgt	=	response;
						$scope.pkgTier3TeamBdgtFlg = 1;
						$scope.teaminfo = response.teaminfo;
						angular.forEach(response.tier3data,function(tier3bdgt,tier3tmabbr) {
							$scope.pkgTier3bdgtArr[tier3tmabbr] = {};
							$scope.pkgTier3bdgtArr[tier3tmabbr]['bdgt']  = tier3bdgt;
							$scope.pkgTier3bdgtArr[tier3tmabbr]['teamnm'] = $scope.teaminfo[tier3tmabbr];
						});
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Some error occurred while fetching data. Please contact Software Team.')
							.content("Error in getTier3TeamBdgtPkg - API")
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}else if($scope.selectedTier3BdgtType == 'Category Wise Budget'){
				$scope.pkgTier3CatBdgtFlg = 0;
				$scope.pkgTier3CatBdgt	=	{};
				$scope.pkgTier3CatDiffBdgt		=	{};
				$scope.tier3diffCity = {};
				$scope.pkgtier3_citydiffbdgt = 0;
				$rootScope.pkgTier3CatBudgetData = {};
				APIServices.getTier3CatBdgtPkg($scope.selectedCity).success(function(response) {
					if(response.errorcode == 0) {
						$rootScope.pkgTier3CatBudgetData = response;
						$scope.pkgTier3CatBdgt['top200']	=	response.tier3top200;
						$scope.pkgTier3CatBdgt['normal']	=	response.tier3normal;
						$scope.pkgTier3CatBdgtFlg = 1;
						$rootScope.pkgTier3CityMismatch = {};
						if(response.tire3mismatch){
							$scope.pkgtier3_citydiffbdgt = 1;
							$rootScope.pkgTier3CityMismatch = response.tire3mismatch;
							angular.forEach(response.tire3mismatch,function(tire3diffbdgt,cityname) {
								$scope.pkgTier3CatDiffBdgt[cityname]	=	{};
								$scope.tier3diffCity[cityname] = true;
								angular.forEach(tire3diffbdgt,function(diffbdgtval,diffbdgtkey) {
									$scope.pkgTier3CatDiffBdgt[cityname][diffbdgtkey] = diffbdgtval;
								});
							});
						}
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Some error occurred while fetching data. Please contact Software Team.')
							.content("Error in getTier3CatBdgtPkg - API")
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}else if($scope.selectedTier3BdgtType == 'Package Expiry Budget'){
				$scope.pkgTier3ExpBdgtFlg = 0;
				$scope.pkgTier3ExpBdgt	=	{};
				$scope.pkgTier3ExpDiffBdgt		=	{};
				$scope.tier3ExpdiffCity = {};
				$scope.pkgtier3_expdiffbdgt = 0;
				$rootScope.pkgTier3ExpBudgetData = {};
				APIServices.getTier3ExpBdgtPkg($scope.selectedCity).success(function(response) {
					if(response.errorcode == 0) {
						$rootScope.pkgTier3ExpBudgetData 	= response;
						$scope.pkgTier3ExpBdgt['tenure']	=	response.expday;
						$scope.pkgTier3ExpBdgt['oneyrbdgt']	=	response.exp1yrbdgt;
						$scope.pkgTier3ExpBdgt['twoyrbdgt']	=	response.exp2yrbdgt;
						$scope.pkgTier3ExpBdgtFlg = 1;
						$rootScope.pkgTier3ExpMismatch = {};
						if(response.tire3expmismatch){
							$scope.pkgtier3_expdiffbdgt = 1;
							$rootScope.pkgTier3ExpMismatch = response.tire3expmismatch;
							angular.forEach(response.tire3expmismatch,function(tire3expdiffbdgt,cityname) {
								$scope.pkgTier3ExpDiffBdgt[cityname]	=	{};
								$scope.tier3ExpdiffCity[cityname] = true;
								angular.forEach(tire3expdiffbdgt,function(diffbdgtval,diffbdgtkey) {
									$scope.pkgTier3ExpDiffBdgt[cityname][diffbdgtkey] = diffbdgtval;
								});
							});
						}
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Some error occurred while fetching data. Please contact Software Team.')
							.content("Error in getTier3ExpBdgtPkg - API")
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}
		}
		$scope.submitTier3Package  = function(type,event){
			if(type == 'catwise'){
				$scope.t3PkgCatBdgtChngFlg 	= 0;
				$scope.t3PkgCatSubmitData	=	{};
				$scope.t3PkgCatSubmitData['L'] 		= {}; // log node
				$scope.t3PkgCatSubmitData['L']['A'] = {}; // log action
				$scope.t3PkgCatSubmitData['L']['C'] = {}; // log changes flag
				$scope.t3PkgCatSubmitData['L']['O'] = {}; // log old value node
				$scope.t3PkgCatSubmitData['L']['N'] = {}; // log new value node
				
				$scope.t3PkgCatSubmitData['top200'] = $scope.pkgTier3CatBdgt.top200;
				$scope.t3PkgCatSubmitData['normal'] = $scope.pkgTier3CatBdgt.normal;

				if(parseInt($scope.t3PkgCatSubmitData['top200']) != parseInt($rootScope.pkgTier3CatBudgetData.tier3top200)){
					$scope.t3PkgCatBdgtChngFlg = 1;
				}
				$scope.t3PkgCatSubmitData['L']['O']['TOP'] = parseInt($rootScope.pkgTier3CatBudgetData.tier3top200);
				$scope.t3PkgCatSubmitData['L']['N']['TOP'] = parseInt($scope.t3PkgCatSubmitData['top200']);
				
				if(parseInt($scope.t3PkgCatSubmitData['normal']) != parseInt($rootScope.pkgTier3CatBudgetData.tier3normal)){
					$scope.t3PkgCatBdgtChngFlg = 1;
				}
				$scope.t3PkgCatSubmitData['L']['O']['NORM'] = parseInt($rootScope.pkgTier3CatBudgetData.tier3normal);
				$scope.t3PkgCatSubmitData['L']['N']['NORM'] = parseInt($scope.t3PkgCatSubmitData['normal']);
				
				
				var t3_diffcity_sel = [];
				if($scope.isEmpty($rootScope.pkgTier3CityMismatch) == false) {
					angular.forEach($rootScope.pkgTier3CityMismatch,function(t3catdiffbdgtpkg,cityname) {
						if($scope.tier3diffCity[cityname]){
							t3_diffcity_sel.push(cityname);
						}
					});
					if(t3_diffcity_sel.length >0){
						$scope.t3PkgCatSubmitData['t3diffcitypkg'] = t3_diffcity_sel.join("|");
					}else{
						$scope.t3PkgCatSubmitData['t3diffcitypkg'] = "";
					}
					$scope.t3PkgCatSubmitData['L']['DIFFCITY'] = $scope.t3PkgCatSubmitData['t3diffcitypkg']; 
				}
				$scope.t3PkgCatSubmitData['L']['C'] 		= $scope.t3PkgCatBdgtChngFlg;
				$scope.t3PkgCatSubmitData['L']['A']			= 'pkgt3cat';
				console.log($scope.t3PkgCatSubmitData);
				var check_flag = 1;
				if($scope.t3PkgCatBdgtChngFlg !=1){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("Kindly do any changes in budget before clicking on Save Button.")
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if((parseInt($scope.t3PkgCatSubmitData['top200']) < MIN_PKG_REMOTE) || (parseInt($scope.t3PkgCatSubmitData['normal']) < MIN_PKG_REMOTE)){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("Package Top 200 / Normal Category Budget can't be less than "+MIN_PKG_REMOTE+" in "+$scope.selectedCity)
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if(check_flag ==1){
					APIServices.updateTier3Package('catwise',$scope.t3PkgCatSubmitData,$scope.selectedCity).success(function(response) {
						console.log(response);
						if(response.errorcode == 0) {
							$rootScope.updatedCampaign = "Package";
							$scope.budgetConfirmationPopup(event);
						} else {
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.querySelector('#popupContainer')))
									.clickOutsideToClose(true)
									.title('Error in submitting budget for Package.')
									.content('Data Cannot be submitted. Please try again later.')
									.ariaLabel('Alert Dialog Demo')
									.ok('Got it!')
									.targetEvent(event)
								);
							return false;
						}
					});
				}
			}else if(type == 'teamwise'){
				$scope.t3PkgTeamBdgtChngFlg = 0;
				$scope.t3PkgTeamSubmitData	=	{};
				$scope.t3PkgTeamSubmitData['L'] 			= {}; // log node
				$scope.t3PkgTeamSubmitData['L']['A'] 		= {}; // log action
				$scope.t3PkgTeamSubmitData['L']['C'] 		= {}; // log changes flag
				$scope.t3PkgTeamSubmitData['L']['O'] 		= {}; // log old value node
				$scope.t3PkgTeamSubmitData['L']['N'] 		= {}; // log new value node
				$scope.t3PkgTeamSubmitData['L']['O']['TW'] 	= {}; // log old teamwise
				$scope.t3PkgTeamSubmitData['L']['N']['TW'] 	= {}; // log new teamwise
				$scope.t3PkgTeamSubmitData['t3pkgtmbdgt']	= {};
				
				angular.forEach($rootScope.pkgTier3TeamBudgetData.tier3data,function(t3bdgt,t3tmabbr) {
					$scope.t3PkgTeamSubmitData['t3pkgtmbdgt'][t3tmabbr] = $scope.pkgTier3bdgtArr[t3tmabbr].bdgt;
					if(parseInt($scope.t3PkgTeamSubmitData['t3pkgtmbdgt'][t3tmabbr]) != parseInt(t3bdgt)){
						$scope.t3PkgTeamBdgtChngFlg = 1;
					}
					$scope.t3PkgTeamSubmitData['L']['O']['TW'][t3tmabbr] = parseInt(t3bdgt);
					$scope.t3PkgTeamSubmitData['L']['N']['TW'][t3tmabbr] = parseInt($scope.t3PkgTeamSubmitData['t3pkgtmbdgt'][t3tmabbr]);
				});
				$scope.t3PkgTeamSubmitData['L']['C'] 	= $scope.t3PkgTeamBdgtChngFlg;
				$scope.t3PkgTeamSubmitData['L']['A']	= 'pkgt3team';
				console.log($scope.t3PkgTeamSubmitData);
				
				var check_flag = 1;
				if($scope.t3PkgTeamBdgtChngFlg !=1){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("Kindly do any changes in budget before clicking on Save Button.")
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if(check_flag ==1){
					APIServices.updateTier3Package('teamwise',$scope.t3PkgTeamSubmitData,$scope.selectedCity).success(function(response) {
						console.log(response);
						if(response.errorcode == 0) {
							$rootScope.updatedCampaign = "Package";
							$scope.budgetConfirmationPopup(event);
						} else {
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.querySelector('#popupContainer')))
									.clickOutsideToClose(true)
									.title('Error in submitting budget for Package.')
									.content('Data Cannot be submitted. Please try again later.')
									.ariaLabel('Alert Dialog Demo')
									.ok('Got it!')
									.targetEvent(event)
								);
							return false;
						}
					});
				}
			}else if(type == 'expire'){
				
				$scope.t3PkgExpBdgtChngFlg = 0;
				$scope.t3PkgExpireSubmitData			= {};
				$scope.t3PkgExpireSubmitData['L'] 		= {}; // log node
				$scope.t3PkgExpireSubmitData['L']['A'] 	= {}; // log action
				$scope.t3PkgExpireSubmitData['L']['C'] 	= {}; // log changes flag
				$scope.t3PkgExpireSubmitData['L']['O'] 	= {}; // log old value node
				$scope.t3PkgExpireSubmitData['L']['N'] 	= {}; // log new value node
				
				$scope.t3PkgExpireSubmitData['expday'] 		= $scope.pkgTier3ExpBdgt.tenure;
				$scope.t3PkgExpireSubmitData['exp1yrbdgt'] 	= $scope.pkgTier3ExpBdgt.oneyrbdgt;
				$scope.t3PkgExpireSubmitData['exp2yrbdgt'] 	= $scope.pkgTier3ExpBdgt.twoyrbdgt;
				
				if(parseInt($scope.t3PkgExpireSubmitData['exp1yrbdgt']) != parseInt($rootScope.pkgTier3ExpBudgetData.exp1yrbdgt)){
					$scope.t3PkgExpBdgtChngFlg = 1;
				}
				$scope.t3PkgExpireSubmitData['L']['O']['EXP1'] = parseInt($rootScope.pkgTier3ExpBudgetData.exp1yrbdgt);
				$scope.t3PkgExpireSubmitData['L']['N']['EXP1'] = parseInt($scope.t3PkgExpireSubmitData['exp1yrbdgt']);
				
				if(parseInt($scope.t3PkgExpireSubmitData['exp2yrbdgt']) != parseInt($rootScope.pkgTier3ExpBudgetData.exp2yrbdgt)){
					$scope.t3PkgExpBdgtChngFlg = 1;
				}
				$scope.t3PkgExpireSubmitData['L']['O']['EXP2'] = parseInt($rootScope.pkgTier3ExpBudgetData.exp2yrbdgt);
				$scope.t3PkgExpireSubmitData['L']['N']['EXP2'] = parseInt($scope.t3PkgExpireSubmitData['exp2yrbdgt']);
				
				
				var t3_diffcityexp_sel = [];
				if($scope.isEmpty($rootScope.pkgTier3ExpMismatch) == false) {
					angular.forEach($rootScope.pkgTier3ExpMismatch,function(t3catdiffbdgtpkg,cityname) {
						if($scope.tier3ExpdiffCity[cityname]){
							t3_diffcityexp_sel.push(cityname);
						}
					});
					if(t3_diffcityexp_sel.length >0){
						$scope.t3PkgExpireSubmitData['t3diffcityexppkg'] = t3_diffcityexp_sel.join("|");
					}else{
						$scope.t3PkgExpireSubmitData['t3diffcityexppkg'] = "";
					}
					$scope.t3PkgExpireSubmitData['L']['DIFFCITY'] = $scope.t3PkgExpireSubmitData['t3diffcityexppkg']; 
				}
				$scope.t3PkgExpireSubmitData['L']['C'] 	= $scope.t3PkgExpBdgtChngFlg;
				$scope.t3PkgExpireSubmitData['L']['A']	= 'pkgt3exp';
				console.log($scope.t3PkgExpireSubmitData);
				var check_flag = 1;
				if($scope.t3PkgExpBdgtChngFlg !=1){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("Kindly do any changes in budget before clicking on Save Button.")
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if(check_flag ==1){
					APIServices.updateTier3Package('expire',$scope.t3PkgExpireSubmitData,$scope.selectedCity).success(function(response) {
						console.log(response);
						if(response.errorcode == 0) {
							$rootScope.updatedCampaign = "Package";
							$scope.budgetConfirmationPopup(event);
						} else {
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.querySelector('#popupContainer')))
									.clickOutsideToClose(true)
									.title('Error in submitting budget for Package.')
									.content('Data Cannot be submitted. Please try again later.')
									.ariaLabel('Alert Dialog Demo')
									.ok('Got it!')
									.targetEvent(event)
								);
							return false;
						}
					});
				}
			}
		}
		$scope.zonebdgtType = {};
		$scope.selectedZoneBdgtType = '';
		$scope.zoneCitySel = function(event){
			$scope.zonebdgtType[0] = '';
			$scope.selectedZoneBdgtType = '';
			$scope.selectedZoneName = this.selZone;
			$scope.selectedZoneFlg = 0;
			if($scope.selectedZoneName != '' && $scope.selectedZoneName != 'Select'){
				$scope.selectedZoneFlg = 1;
			}
		}
		$scope.zoneBudgetSel = function(event){
			$scope.selectedZoneBdgtType = this.zonebdgtType[0];
			
			if($scope.selectedZoneBdgtType == 'Team Wise Budget'){
				$scope.pkgZoneTeamBdgtFlg = 0;
				$scope.pkgZoneTeamBdgt	=	{};
				$scope.pkgZonebdgtArr		=	{};
				$rootScope.pkgZoneTeamBudgetData = {};
				
				APIServices.getZoneTeamBdgtPkg($scope.selectedCity,$scope.selectedZoneName).success(function(response) {
					$rootScope.pkgZoneTeamBudgetData =	response;
					if(response.errorcode == 0) {
						$scope.pkgZoneTeamBdgt	=	response;
						$scope.pkgZoneTeamBdgtFlg = 1;
						$scope.teaminfo = response.teaminfo;
						angular.forEach(response.zonedata,function(zonebdgt,zonetmabbr) {
							$scope.pkgZonebdgtArr[zonetmabbr] = {};
							$scope.pkgZonebdgtArr[zonetmabbr]['bdgt']  	= zonebdgt;
							$scope.pkgZonebdgtArr[zonetmabbr]['teamnm'] = $scope.teaminfo[zonetmabbr];
						});
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Some error occurred while fetching data. Please contact Software Team.')
							.content("Error in getZoneTeamBdgtPkg - API")
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}else if($scope.selectedZoneBdgtType == 'Category Wise Budget'){
				$scope.pkgZoneCatBdgtFlg = 0;
				$scope.pkgZoneCatBdgt	 = {};
				$scope.pkgZoneCatDiffBdgt		=	{};
				$scope.zonediffCity = {};
				$scope.pkgzone_citydiffbdgt = 0;
				$rootScope.pkgZoneCatBudgetData = {};
				APIServices.getZoneCatBdgtPkg($scope.selectedCity,$scope.selectedZoneName).success(function(response) {
					if(response.errorcode == 0) {
						$rootScope.pkgZoneCatBudgetData = response;						
						$scope.pkgZoneCatBdgt['top200']	=	response.zonetop200;
						$scope.pkgZoneCatBdgt['normal']	=	response.zonenormal;
						$scope.pkgZoneCatBdgtFlg = 1;
						$rootScope.pkgZoneCityMismatch = {};
						if(response.zonemismatch){
							$scope.pkgzone_citydiffbdgt = 1;
							$rootScope.pkgZoneCityMismatch = response.zonemismatch;
							angular.forEach(response.zonemismatch,function(zonediffbdgt,cityname) {
								$scope.pkgZoneCatDiffBdgt[cityname]	=	{};
								$scope.zonediffCity[cityname] = true;
								angular.forEach(zonediffbdgt,function(diffbdgtval,diffbdgtkey) {
									$scope.pkgZoneCatDiffBdgt[cityname][diffbdgtkey] = diffbdgtval;
								});
							});
						}
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Some error occurred while fetching data. Please contact Software Team.')
							.content("Error in getZoneCatBdgtPkg - API")
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}else if($scope.selectedZoneBdgtType == 'Package Expiry Budget'){
				$scope.pkgZoneExpBdgtFlg = 0;
				$scope.pkgZoneExpBdgt	=	{};
				$scope.pkgZoneExpDiffBdgt		=	{};
				$scope.zoneExpdiffCity = {};
				$scope.pkgzone_expdiffbdgt = 0;
				$rootScope.pkgZoneExpBudgetData = {};
				APIServices.getZoneExpBdgtPkg($scope.selectedCity,$scope.selectedZoneName).success(function(response) {
					if(response.errorcode == 0) {
						$rootScope.pkgZoneExpBudgetData 	= response;
						$scope.pkgZoneExpBdgt['tenure']		=	response.expday;
						$scope.pkgZoneExpBdgt['oneyrbdgt']	=	response.exp1yrbdgt;
						$scope.pkgZoneExpBdgt['twoyrbdgt']	=	response.exp2yrbdgt;
						$scope.pkgZoneExpBdgtFlg = 1;
						$rootScope.pkgZoneExpMismatch = {};
						if(response.zoneexpmismatch){
							$scope.pkgzone_expdiffbdgt = 1;
							$rootScope.pkgZoneExpMismatch = response.zoneexpmismatch;
							angular.forEach(response.zoneexpmismatch,function(zoneexpdiffbdgt,cityname) {
								$scope.pkgZoneExpDiffBdgt[cityname]	=	{};
								$scope.zoneExpdiffCity[cityname] = true;
								angular.forEach(zoneexpdiffbdgt,function(diffbdgtval,diffbdgtkey) {
									$scope.pkgZoneExpDiffBdgt[cityname][diffbdgtkey] = diffbdgtval;
								});
							});
						}
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Some error occurred while fetching data. Please contact Software Team.')
							.content("Error in getZoneExpBdgtPkg - API")
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}
		}
		
		
		
		$scope.submitZonePackage  = function(type,event){
			if(type == 'catwise'){
				
				$scope.zonePkgCatBdgtChngFlg 	= 0;
				$scope.zonePkgCatSubmitData	=	{};
				$scope.zonePkgCatSubmitData['L'] 		= {}; // log node
				$scope.zonePkgCatSubmitData['L']['A'] = {}; // log action
				$scope.zonePkgCatSubmitData['L']['C'] = {}; // log changes flag
				$scope.zonePkgCatSubmitData['L']['O'] = {}; // log old value node
				$scope.zonePkgCatSubmitData['L']['N'] = {}; // log new value node
				
				$scope.zonePkgCatSubmitData['top200'] = $scope.pkgZoneCatBdgt.top200;
				$scope.zonePkgCatSubmitData['normal'] = $scope.pkgZoneCatBdgt.normal;

				if(parseInt($scope.zonePkgCatSubmitData['top200']) != parseInt($rootScope.pkgZoneCatBudgetData.zonetop200)){
					$scope.zonePkgCatBdgtChngFlg = 1;
				}
				$scope.zonePkgCatSubmitData['L']['O']['TOP'] = parseInt($rootScope.pkgZoneCatBudgetData.zonetop200);
				$scope.zonePkgCatSubmitData['L']['N']['TOP'] = parseInt($scope.zonePkgCatSubmitData['top200']);
				
				if(parseInt($scope.zonePkgCatSubmitData['normal']) != parseInt($rootScope.pkgZoneCatBudgetData.zonenormal)){
					$scope.zonePkgCatBdgtChngFlg = 1;
				}
				$scope.zonePkgCatSubmitData['L']['O']['NORM'] = parseInt($rootScope.pkgZoneCatBudgetData.zonenormal);
				$scope.zonePkgCatSubmitData['L']['N']['NORM'] = parseInt($scope.zonePkgCatSubmitData['normal']);
				
				var zone_diffcity_sel = [];
				if($scope.isEmpty($rootScope.pkgZoneCityMismatch) == false) {
					angular.forEach($rootScope.pkgZoneCityMismatch,function(zonecatdiffbdgtpkg,cityname) {
						if($scope.zonediffCity[cityname]){
							zone_diffcity_sel.push(cityname);
						}
					});
					if(zone_diffcity_sel.length >0){
						$scope.zonePkgCatSubmitData['zonediffcitypkg'] = zone_diffcity_sel.join("|");
					}else{
						$scope.zonePkgCatSubmitData['zonediffcitypkg'] = "";
					}
					$scope.zonePkgCatSubmitData['L']['DIFFCITY'] = $scope.zonePkgCatSubmitData['zonediffcitypkg']; 
				}
				$scope.zonePkgCatSubmitData['L']['C'] 		= $scope.zonePkgCatBdgtChngFlg;
				$scope.zonePkgCatSubmitData['L']['A']		= 'pkgzonecat';
				console.log($scope.zonePkgCatSubmitData);
				var check_flag = 1;
				if($scope.zonePkgCatBdgtChngFlg !=1){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("Kindly do any changes in budget before clicking on Save Button.")
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if((parseInt($scope.zonePkgCatSubmitData['top200']) < MIN_PKG_REMOTE) || (parseInt($scope.zonePkgCatSubmitData['normal']) < MIN_PKG_REMOTE)){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("Package Top 200 / Normal Category Budget can't be less than "+MIN_PKG_REMOTE+" in "+$scope.selectedZoneName+" Remote Zone.")
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if(check_flag ==1){
					APIServices.updateZonePackage('catwise',$scope.zonePkgCatSubmitData,$scope.selectedCity,$scope.selectedZoneName).success(function(response) {
						console.log(response);
						if(response.errorcode == 0) {
							$rootScope.updatedCampaign = "Package";
							$scope.budgetConfirmationPopup(event);
						} else {
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.querySelector('#popupContainer')))
									.clickOutsideToClose(true)
									.title('Error in submitting budget for Package Zone.')
									.content('Data Cannot be submitted. Please try again later.')
									.ariaLabel('Alert Dialog Demo')
									.ok('Got it!')
									.targetEvent(event)
								);
							return false;
						}
					});
				}
			}else if(type == 'teamwise'){
				
				$scope.zonekgTeamBdgtChngFlg = 0;
				$scope.zonePkgTeamSubmitData	=	{};
				$scope.zonePkgTeamSubmitData['L'] 			= {}; // log node
				$scope.zonePkgTeamSubmitData['L']['A'] 		= {}; // log action
				$scope.zonePkgTeamSubmitData['L']['C'] 		= {}; // log changes flag
				$scope.zonePkgTeamSubmitData['L']['O'] 		= {}; // log old value node
				$scope.zonePkgTeamSubmitData['L']['N'] 		= {}; // log new value node
				$scope.zonePkgTeamSubmitData['L']['O']['TW'] 	= {}; // log old teamwise
				$scope.zonePkgTeamSubmitData['L']['N']['TW'] 	= {}; // log new teamwise
				$scope.zonePkgTeamSubmitData['zonepkgtmbdgt']	= {};
				
				angular.forEach($rootScope.pkgZoneTeamBudgetData.zonedata,function(zonebdgt,zonetmabbr) {
					$scope.zonePkgTeamSubmitData['zonepkgtmbdgt'][zonetmabbr] = $scope.pkgZonebdgtArr[zonetmabbr].bdgt;
					if(parseInt($scope.zonePkgTeamSubmitData['zonepkgtmbdgt'][zonetmabbr]) != parseInt(zonebdgt)){
						$scope.zonekgTeamBdgtChngFlg = 1;
					}
					$scope.zonePkgTeamSubmitData['L']['O']['TW'][zonetmabbr] = parseInt(zonebdgt);
					$scope.zonePkgTeamSubmitData['L']['N']['TW'][zonetmabbr] = parseInt($scope.zonePkgTeamSubmitData['zonepkgtmbdgt'][zonetmabbr]);
					
				});
				$scope.zonePkgTeamSubmitData['L']['C'] 	= $scope.zonekgTeamBdgtChngFlg;
				$scope.zonePkgTeamSubmitData['L']['A']	= 'pkgzoneteam';
				console.log($scope.zonePkgTeamSubmitData);
				
				var check_flag = 1;
				if($scope.zonekgTeamBdgtChngFlg !=1){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("Kindly do any changes in budget before clicking on Save Button.")
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if(check_flag ==1){
					APIServices.updateZonePackage('teamwise',$scope.zonePkgTeamSubmitData,$scope.selectedCity,$scope.selectedZoneName).success(function(response) {
						console.log(response);
						if(response.errorcode == 0) {
							$rootScope.updatedCampaign = "Package";
							$scope.budgetConfirmationPopup(event);
						} else {
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.querySelector('#popupContainer')))
									.clickOutsideToClose(true)
									.title('Error in submitting budget for Package.')
									.content('Data Cannot be submitted. Please try again later.')
									.ariaLabel('Alert Dialog Demo')
									.ok('Got it!')
									.targetEvent(event)
								);
							return false;
						}
					});
				}
			}else if(type == 'expire'){
			
				$scope.zonePkgExpBdgtChngFlg 				= 0;
				$scope.zonePkgExpireSubmitData				= {};
				$scope.zonePkgExpireSubmitData['L'] 		= {}; // log node
				$scope.zonePkgExpireSubmitData['L']['A'] 	= {}; // log action
				$scope.zonePkgExpireSubmitData['L']['C'] 	= {}; // log changes flag
				$scope.zonePkgExpireSubmitData['L']['O'] 	= {}; // log old value node
				$scope.zonePkgExpireSubmitData['L']['N'] 	= {}; // log new value node
				
				$scope.zonePkgExpireSubmitData['expday'] 		= $scope.pkgZoneExpBdgt.tenure;
				$scope.zonePkgExpireSubmitData['exp1yrbdgt'] 	= $scope.pkgZoneExpBdgt.oneyrbdgt;
				$scope.zonePkgExpireSubmitData['exp2yrbdgt'] 	= $scope.pkgZoneExpBdgt.twoyrbdgt;
				
				if(parseInt($scope.zonePkgExpireSubmitData['exp1yrbdgt']) != parseInt($rootScope.pkgZoneExpBudgetData.exp1yrbdgt)){
					$scope.zonePkgExpBdgtChngFlg = 1;
				}
				$scope.zonePkgExpireSubmitData['L']['O']['EXP1'] = parseInt($rootScope.pkgZoneExpBudgetData.exp1yrbdgt);
				$scope.zonePkgExpireSubmitData['L']['N']['EXP1'] = parseInt($scope.zonePkgExpireSubmitData['exp1yrbdgt']);
				
				if(parseInt($scope.zonePkgExpireSubmitData['exp2yrbdgt']) != parseInt($rootScope.pkgZoneExpBudgetData.exp2yrbdgt)){
					$scope.zonePkgExpBdgtChngFlg = 1;
				}
				$scope.zonePkgExpireSubmitData['L']['O']['EXP2'] = parseInt($rootScope.pkgZoneExpBudgetData.exp2yrbdgt);
				$scope.zonePkgExpireSubmitData['L']['N']['EXP2'] = parseInt($scope.zonePkgExpireSubmitData['exp2yrbdgt']);
				
			
				var zone_diffcityexp_sel = [];
				if($scope.isEmpty($rootScope.pkgZoneExpMismatch) == false) {
					angular.forEach($rootScope.pkgZoneExpMismatch,function(zoneexpdiffbdgtpkg,cityname) {
						if($scope.zoneExpdiffCity[cityname]){
							zone_diffcityexp_sel.push(cityname);
						}
					});
					if(zone_diffcityexp_sel.length >0){
						$scope.zonePkgExpireSubmitData['zonediffcityexppkg'] = zone_diffcityexp_sel.join("|");
					}else{
						$scope.zonePkgExpireSubmitData['zonediffcityexppkg'] = "";
					}
					$scope.zonePkgExpireSubmitData['L']['DIFFCITY'] = $scope.zonePkgExpireSubmitData['zonediffcityexppkg']; 
				}
				
				$scope.zonePkgExpireSubmitData['L']['C'] 	= $scope.zonePkgExpBdgtChngFlg;
				$scope.zonePkgExpireSubmitData['L']['A']	= 'pkgzoneexp';
				console.log($scope.zonePkgExpireSubmitData);
				var check_flag = 1;
				if($scope.zonePkgExpBdgtChngFlg !=1){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("Kindly do any changes in budget before clicking on Save Button.")
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if(check_flag ==1){
					APIServices.updateZonePackage('expire',$scope.zonePkgExpireSubmitData,$scope.selectedCity,$scope.selectedZoneName).success(function(response) {
						console.log(response);
						if(response.errorcode == 0) {
							$rootScope.updatedCampaign = "Package";
							$scope.budgetConfirmationPopup(event);
						} else {
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.querySelector('#popupContainer')))
									.clickOutsideToClose(true)
									.title('Error in submitting budget for Package.')
									.content('Data Cannot be submitted. Please try again later.')
									.ariaLabel('Alert Dialog Demo')
									.ok('Got it!')
									.targetEvent(event)
								);
							return false;
						}
					});
				}
			}
		}
		$scope.selectedPkgCity = '';
		$scope.selCityPackage = function(event){
			console.log($rootScope.cityselcampaign['package']);
			$rootScope.remoteCityPkgBdgtData = {};
			$scope.remoteIndividualPkgBdgt = {};
			if (typeof $rootScope.cityselcampaign['package'] != 'undefined' && $rootScope.cityselcampaign['package'] != null && $rootScope.cityselcampaign['package'] !=''){
				APIServices.getRemoteBudgetPkg($rootScope.cityselcampaign['package']).success(function(response) {
					if(response.errorcode == 0) {
						$rootScope.remoteCityPkgBdgtData = response;
						$scope.remoteIndividualPkgBdgt['top200']	=	response.remotetop;
						$scope.remoteIndividualPkgBdgt['normal']	=	response.remotenorm;
						$scope.selectedPkgCity = $rootScope.cityselcampaign['package'];
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Individual Remote City Package Budget Error.')
							.content("No Result Found for Selected City : "+$rootScope.cityselcampaign['package'])
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}else{
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.content("Please Select City to update Remote City Package Budget.")
					.ariaLabel('Alert Dialog Demo')
					.ok('ok')
					.targetEvent(event)
				);
			}
		}
		$scope.changeCityPackage = function(event){
			$scope.selectedPkgCity = '';
			$rootScope.cityselcampaign['package'] = '';
		}
		
		$scope.submitRemoteBudgetPkg = function(event){
			
			$scope.remotePkgCatBdgtChngFlg 	= 0;
			$scope.remotePkgSubmitData	=	{};
			$scope.remotePkgSubmitData['L'] 		= {}; // log node
			$scope.remotePkgSubmitData['L']['A'] = {}; // log action
			$scope.remotePkgSubmitData['L']['C'] = {}; // log changes flag
			$scope.remotePkgSubmitData['L']['O'] = {}; // log old value node
			$scope.remotePkgSubmitData['L']['N'] = {}; // log new value node
			
			$scope.remotePkgSubmitData['top200'] = $scope.remoteIndividualPkgBdgt.top200;
			$scope.remotePkgSubmitData['normal'] = $scope.remoteIndividualPkgBdgt.normal;

			if(parseInt($scope.remotePkgSubmitData['top200']) != parseInt($rootScope.remoteCityPkgBdgtData.remotetop)){
				$scope.remotePkgCatBdgtChngFlg = 1;
			}
			$scope.remotePkgSubmitData['L']['O']['TOP'] = parseInt($rootScope.remoteCityPkgBdgtData.remotetop);
			$scope.remotePkgSubmitData['L']['N']['TOP'] = parseInt($scope.remotePkgSubmitData['top200']);
			
			if(parseInt($scope.remotePkgSubmitData['normal']) != parseInt($rootScope.remoteCityPkgBdgtData.remotenorm)){
				$scope.remotePkgCatBdgtChngFlg = 1;
			}
			$scope.remotePkgSubmitData['L']['O']['NORM'] = parseInt($rootScope.remoteCityPkgBdgtData.remotenorm);
			$scope.remotePkgSubmitData['L']['N']['NORM'] = parseInt($scope.remotePkgSubmitData['normal']);
			$scope.remotePkgSubmitData['L']['C'] 	= $scope.remotePkgCatBdgtChngFlg;
			$scope.remotePkgSubmitData['L']['A']	= 'pkgremotecat';
			
			console.log($scope.remotePkgSubmitData);
			var check_flag = 1;
			if($scope.remotePkgCatBdgtChngFlg !=1){
				check_flag = 0;
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.content("Kindly do any changes in budget before clicking on Save Button.")
					.ariaLabel('Alert Dialog Demo')
					.ok('ok')
					.targetEvent(event)
				);
				return false;
			}
			if((parseInt($scope.remotePkgSubmitData['top200']) < MIN_PKG_REMOTE) || (parseInt($scope.remotePkgSubmitData['normal']) < MIN_PKG_REMOTE)){
				check_flag = 0;
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.content("Package Top 200 / Normal Category Budget can't be less than "+MIN_PKG_REMOTE+" in Remote City - "+$scope.selectedPkgCity+".")
					.ariaLabel('Alert Dialog Demo')
					.ok('ok')
					.targetEvent(event)
				);
				return false;
			}
			if(check_flag ==1){
				APIServices.updateRemoteBudgetPkg($scope.remotePkgSubmitData,$scope.selectedPkgCity).success(function(response) {
					console.log(response);
					if(response.errorcode == 0) {
						$rootScope.updatedCampaign = "Package";
						$scope.budgetConfirmationPopup(event);
					} else {
							$mdDialog.show(
								$mdDialog.alert()
								.parent(angular.element(document.querySelector('#popupContainer')))
								.clickOutsideToClose(true)
								.title('Error in submitting Remote City budget for Package.')
								.content('Data Cannot be submitted. Please try again later.')
								.ariaLabel('Alert Dialog Demo')
								.ok('Got it!')
								.targetEvent(event)
							);
						return false;
					}
				});
			}
		}
		
		
		
		$scope.budgetConfirmationPopup	=	function(event) {
			$mdDialog.show({
				controller: budgetConfirmationController,
				templateUrl: 'partials/dialogConfirmation.html',
				parent: angular.element(document.body),
				targetEvent:event
			})
			.then(function(answer) {
				$scope.alert = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.alert = 'You cancelled the dialog.';
			});
			$scope.resetPkgScope();
		};
		
		$scope.resetPkgScope = function(){
			$scope.selectedCity = '';
			$scope.selPkgCity[0] = '';
			$scope.remote_tier2 = 0;
			$scope.remote_tier3 = 0;
			$scope.zone_wise = 0;
			$scope.individual_remote = 0;
			$scope.selectedTier2BdgtType = '';
			$scope.selectedTier3BdgtType = '';
			$scope.selectedZoneFlg = 0;
			$scope.selectedZoneName = '';
			$scope.selectedZoneBdgtType = '';
			$scope.selectedPkgCity = '';
		}
		
		$scope.pkgMoreOption	=	function(action,event) {
			$rootScope.pkgMoreAction = '';
			var pkgMorePage = '';
			switch(action){
				case 'pkgbdgtlog' : 
					pkgMorePage = 'partials/packageBudgetLog.html';
					$rootScope.pkgMoreAction = action;
				break;
				case 'fetcht2pkgbdgt' : 
					pkgMorePage = 'partials/tier2PkgBudgetInfo.html';
					$rootScope.pkgMoreAction = action;
				break;
				case 'fetcht3pkgbdgt' : 
					pkgMorePage = 'partials/tier3PkgBudgetInfo.html';
					$rootScope.pkgMoreAction = action;
				break;
			}
			$mdDialog.show({
				controller: packageMoreController,
				templateUrl: pkgMorePage,
				parent: angular.element(document.body),
				targetEvent:event
			})
			.then(function(answer) {
				$scope.alert = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.alert = 'You cancelled the dialog.';
			});
			$scope.resetPkgScope();
		};
		$scope.notSorted = function(obj){
			if (!obj) {
				return [];
			}
			return Object.keys(obj);
		}
		$scope.isEmpty	=	function (obj) {
			for(var prop in obj) {
				if(obj.hasOwnProperty(prop))
					return false;
			}
			return true;
		};
		function budgetConfirmationController($scope,$mdDialog) {
			$scope.hide = function() {
				$mdDialog.hide();
			};
			$scope.updatedCampaign	=   $rootScope.updatedCampaign;
		}
		function packageMoreController($scope,$mdDialog) {
			$scope.hide = function() {
				$mdDialog.hide();
			};
			switch($rootScope.pkgMoreAction){
				case 'pkgbdgtlog' :
					APIServices.getBudgetLog('package').success(function(response) {
							$scope.pkgLogData = response;
					});
				break;
				case 'fetcht2pkgbdgt' : 
					$scope.orderByField = 'zone';
					$scope.reverseSort = false;
					APIServices.showTier2PkgBudget().success(function(response) {
							$scope.pkgT2BudgetHtml = response;
					});
				break;
				case 'fetcht3pkgbdgt' : 
					/*$scope.orderByField = 'zone';
					$scope.reverseSort = false;
					APIServices.showTier3PkgBudget().success(function(response) {
							$scope.pkgT3BudgetHtml = response;
					});*/
					
					$scope.pgno	=	1;
					$scope.budgetData	=	{};
					APIServices.showTier3PkgBudget($scope.pgno).success(function(response) {
						if(response.errorcode == 0) {
							$scope.budgetData	=	response;
						}
					});
				break;
			}
		}
	});	
	adminModuleApp.controller('pdgController',function($scope,APIServices,$rootScope,$state,$location,$http,$timeout,$mdToast,$mdDialog,$mdMedia,$mdSidenav) {
		
		$rootScope.$on("callPdgController", function(){
           $scope.resetPdgScope();
        });
		
		$rootScope.updatedCampaign = '';
		
		$scope.selPdgCity = {};
		$scope.selectedCity = '';
		$scope.remote_tier2 = 0;
		$scope.remote_tier3 = 0;		
		$scope.zone_wise = 0;
		$scope.individual_remote = 0;
		$scope.selectedTier2BdgtType = '';
		$scope.selectedTier3BdgtType = '';
		$scope.selectedZoneFlg = 0;
		$scope.selectedZoneName = '';
		$scope.selectedZoneBdgtType = '';
		$scope.selectedPdgCity = '';
		
		$scope.setCity = function(event){
			$scope.selectedTier2BdgtType = '';
			$scope.selectedTier3BdgtType = '';
			$scope.selectedCity = this.selPdgCity[0];
			if($scope.selectedCity == 'Remote - Tier 2'){
				$scope.remote_tier2 = 1;
			}else{
				$scope.remote_tier2 = 0;
			}
			if($scope.selectedCity == 'Remote - Tier 3'){
				$scope.remote_tier3 = 1;
			}else{
				$scope.remote_tier3 = 0;
			}
			if($scope.selectedCity == 'Zone Wise'){
				$scope.zone_wise = 1;
			}else{
				$scope.zone_wise = 0;
			}
			if($scope.selectedCity == 'Individual Remote City'){
				$scope.individual_remote = 1;
			}else{
				$scope.individual_remote = 0;
			}
			if($scope.selectedCity !='' && $scope.selectedCity !='Remote - Tier 2' && $scope.selectedCity !='Remote - Tier 3' && $scope.selectedCity !='Zone Wise' && $scope.selectedCity !='Individual Remote City'){
				$scope.pdgTier1Bdgt	=	{};
				$scope.pdgbdgtArr		=	{};
				$scope.pdgcattypeArr		=	{};
				$rootScope.pdgTier1BudgetData = {};
				APIServices.getTier1PDGBudget($scope.selectedCity).success(function(response) {
					$rootScope.pdgTier1BudgetData = response;
					$scope.pdgTier1Bdgt	=	response;
					if(response.errorcode == 0) {
						$scope.teaminfo = response.teaminfo;
						angular.forEach(response.data,function(teamdata,cityname) {
							$scope.pdgbdgtArr[cityname]	=	{};
							angular.forEach(teamdata,function(teambdgt,teamabbr) {
								$scope.pdgbdgtArr[cityname][teamabbr] = {};
								$scope.pdgbdgtArr[cityname][teamabbr]['bdgt'] = teambdgt;
								$scope.pdgbdgtArr[cityname][teamabbr]['teamnm'] = $scope.teaminfo[teamabbr];
							});
						});
						angular.forEach(response.catbdgt,function(catdata,cityname) {
							$scope.pdgcattypeArr[cityname]	=	{};
							angular.forEach(catdata,function(catbdgt,cattype) {
								$scope.pdgcattypeArr[cityname][cattype] = catbdgt;
							});
						});
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Some error occurred while fetching data. Please contact Software Team.')
							.content("Error in getTier1PDGBudget - API")
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}
		}
		
		
		$scope.submitTier1PDG  = function(event){
			
			$scope.t1PdgBdgtChngFlg = 0;
			$scope.t1PdgSubmitData			  = {};
			$scope.t1PdgSubmitData['L'] 	  = {}; // log node
			$scope.t1PdgSubmitData['L']['A'] = {}; // log action
			$scope.t1PdgSubmitData['L']['C'] = {}; // log changes flag
			$scope.t1PdgSubmitData['L']['O'] = {}; // log old value node
			$scope.t1PdgSubmitData['L']['N'] = {}; // log new value node
			
			$scope.t1PdgSubmitData['top200'] = $scope.pdgcattypeArr[$scope.selectedCity].top200;
			$scope.t1PdgSubmitData['normal'] = $scope.pdgcattypeArr[$scope.selectedCity].normal;
			$scope.t1PdgSubmitData['teamwise'] = {};
			$scope.t1PdgSubmitData['L']['O']['TW'] 	= {}; // log old teamwise
			$scope.t1PdgSubmitData['L']['N']['TW'] 	= {}; // log new teamwise
			angular.forEach($rootScope.pdgTier1BudgetData.data[$scope.selectedCity],function(t1bdgt,t1tmabbr) {
				$scope.t1PdgSubmitData['teamwise'][t1tmabbr] = $scope.pdgbdgtArr[$scope.selectedCity][t1tmabbr].bdgt;
				if(parseInt($scope.t1PdgSubmitData['teamwise'][t1tmabbr]) != parseInt(t1bdgt)){
					$scope.t1PdgBdgtChngFlg = 1;
				}
				$scope.t1PdgSubmitData['L']['O']['TW'][t1tmabbr] = parseInt(t1bdgt);
				$scope.t1PdgSubmitData['L']['N']['TW'][t1tmabbr] = parseInt($scope.t1PdgSubmitData['teamwise'][t1tmabbr]);
			});
			if(parseInt($scope.t1PdgSubmitData['top200']) != parseInt($rootScope.pdgTier1BudgetData.catbdgt[$scope.selectedCity].top200)){
				$scope.t1PdgBdgtChngFlg = 1;
			}
			$scope.t1PdgSubmitData['L']['O']['TOP'] = parseInt($rootScope.pdgTier1BudgetData.catbdgt[$scope.selectedCity].top200);
			$scope.t1PdgSubmitData['L']['N']['TOP'] = parseInt($scope.t1PdgSubmitData['top200']);
			if(parseInt($scope.t1PdgSubmitData['normal']) != parseInt($rootScope.pdgTier1BudgetData.catbdgt[$scope.selectedCity].normal)){
				$scope.t1PdgBdgtChngFlg = 1;
			}
			$scope.t1PdgSubmitData['L']['O']['NORM'] = parseInt($rootScope.pdgTier1BudgetData.catbdgt[$scope.selectedCity].normal);
			$scope.t1PdgSubmitData['L']['N']['NORM'] = parseInt($scope.t1PdgSubmitData['normal']);
			$scope.t1PdgSubmitData['L']['C'] 		 = $scope.t1PdgBdgtChngFlg;
			$scope.t1PdgSubmitData['L']['A']		 = 'pdgtier1';
			console.log($scope.t1PdgSubmitData);
			var check_flag = 1;
			if($scope.t1PdgBdgtChngFlg !=1){
				check_flag = 0;
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.content("Kindly do any changes in budget before clicking on Save Button.")
					.ariaLabel('Alert Dialog Demo')
					.ok('ok')
					.targetEvent(event)
				);
				return false;
			}
			if((parseInt($scope.t1PdgSubmitData['top200']) < MIN_PDG_TIER1) || (parseInt($scope.t1PdgSubmitData['normal']) < MIN_PDG_TIER1)){
				check_flag = 0;
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.content("PDG Top 200 / Normal Category Budget can't be less than "+MIN_PDG_TIER1+" in "+$scope.selectedCity)
					.ariaLabel('Alert Dialog Demo')
					.ok('ok')
					.targetEvent(event)
				);
				return false;
			}
			if(check_flag ==1){
				APIServices.updateTier1PDG($scope.t1PdgSubmitData,$scope.selectedCity).success(function(response) {
					console.log(response);
					if(response.errorcode == 0) {
						$rootScope.updatedCampaign = "PDG";
						$scope.budgetConfirmationPopup(event);
					} else {
							$mdDialog.show(
								$mdDialog.alert()
								.parent(angular.element(document.querySelector('#popupContainer')))
								.clickOutsideToClose(true)
								.title('Error in submitting budget for PDG.')
								.content('Data Cannot be submitted. Please try again later.')
								.ariaLabel('Alert Dialog Demo')
								.ok('Got it!')
								.targetEvent(event)
							);
						return false;
					}
				});
			}
			//~ 
			
			
		}
		
		$scope.tire2BudgetSel = function(event){
			$scope.selectedTier2BdgtType = this.tier2bdgtType;
			
			if($scope.selectedTier2BdgtType == 'Team Wise Budget'){
				$scope.pdgTier2TeamBdgtFlg = 0;
				$scope.pdgTier2TeamBdgt	=	{};
				$scope.pdgTier2bdgtArr		=	{};
				$rootScope.pdgTier2TeamBudgetData = {};
				
				APIServices.getTier2TeamBdgtPdg($scope.selectedCity).success(function(response) {
					$rootScope.pdgTier2TeamBudgetData =	response;
					if(response.errorcode == 0) {
						$scope.pdgTier2TeamBdgt	=	response;
						$scope.pdgTier2TeamBdgtFlg = 1;
						$scope.teaminfo = response.teaminfo;
						angular.forEach(response.tier2data,function(tier2bdgt,tier2tmabbr) {
							$scope.pdgTier2bdgtArr[tier2tmabbr] = {};
							$scope.pdgTier2bdgtArr[tier2tmabbr]['bdgt']  = tier2bdgt;
							$scope.pdgTier2bdgtArr[tier2tmabbr]['teamnm'] = $scope.teaminfo[tier2tmabbr];
						});
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Some error occurred while fetching data. Please contact Software Team.')
							.content("Error in getTier2TeamBdgtPdg - API")
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}else if($scope.selectedTier2BdgtType == 'Category Wise Budget'){
				$scope.pdgTier2CatBdgtFlg = 0;
				$scope.pdgTier2CatBdgt	=	{};
				$scope.pdgTier2CatDiffBdgt		=	{};
				$scope.tier2diffCity = {};
				$scope.pdgtier2_citydiffbdgt = 0;
				$rootScope.pdgTier2CatBudgetData = {};
				APIServices.getTier2CatBdgtPdg($scope.selectedCity).success(function(response) {
					if(response.errorcode == 0) {
						$rootScope.pdgTier2CatBudgetData = response;
						$scope.pdgTier2CatBdgt['top200']	=	response.tier2top200;
						$scope.pdgTier2CatBdgt['normal']	=	response.tier2normal;
						$scope.pdgTier2CatBdgtFlg = 1;
						$rootScope.pdgTier2CityMismatch = {};
						if(response.tire2mismatch){
							$scope.pdgtier2_citydiffbdgt = 1;
							$rootScope.pdgTier2CityMismatch = response.tire2mismatch;
							angular.forEach(response.tire2mismatch,function(tire2diffbdgt,cityname) {
								$scope.pdgTier2CatDiffBdgt[cityname]	=	{};
								$scope.tier2diffCity[cityname] = true;
								angular.forEach(tire2diffbdgt,function(diffbdgtval,diffbdgtkey) {
									
									$scope.pdgTier2CatDiffBdgt[cityname]['top'] = diffbdgtval;
									$scope.pdgTier2CatDiffBdgt[cityname]['norm'] = diffbdgtval;
								});
							});
						}
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Some error occurred while fetching data. Please contact Software Team.')
							.content("Error in getTier2CatBdgtPdg - API")
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}
		}
		$scope.submitTier2PDG  = function(type,event){
			if(type == 'catwise'){
				
				
				$scope.t2PdgCatBdgtChngFlg 	= 0;
				$scope.t2PdgCatSubmitData	=	{};
				$scope.t2PdgCatSubmitData['L'] 		= {}; // log node
				$scope.t2PdgCatSubmitData['L']['A'] = {}; // log action
				$scope.t2PdgCatSubmitData['L']['C'] = {}; // log changes flag
				$scope.t2PdgCatSubmitData['L']['O'] = {}; // log old value node
				$scope.t2PdgCatSubmitData['L']['N'] = {}; // log new value node
				
				$scope.t2PdgCatSubmitData['top200'] = $scope.pdgTier2CatBdgt.top200;
				$scope.t2PdgCatSubmitData['normal'] = $scope.pdgTier2CatBdgt.normal;

				if(parseInt($scope.t2PdgCatSubmitData['top200']) != parseInt($rootScope.pdgTier2CatBudgetData.tier2top200)){
					$scope.t2PdgCatBdgtChngFlg = 1;
				}
				$scope.t2PdgCatSubmitData['L']['O']['TOP'] = parseInt($rootScope.pdgTier2CatBudgetData.tier2top200);
				$scope.t2PdgCatSubmitData['L']['N']['TOP'] = parseInt($scope.t2PdgCatSubmitData['top200']);
				
				if(parseInt($scope.t2PdgCatSubmitData['normal']) != parseInt($rootScope.pdgTier2CatBudgetData.tier2normal)){
					$scope.t2PdgCatBdgtChngFlg = 1;
				}
				$scope.t2PdgCatSubmitData['L']['O']['NORM'] = parseInt($rootScope.pdgTier2CatBudgetData.tier2normal);
				$scope.t2PdgCatSubmitData['L']['N']['NORM'] = parseInt($scope.t2PdgCatSubmitData['normal']);
				
				
				var t2_diffcity_sel = [];
				if($scope.isEmpty($rootScope.pdgTier2CityMismatch) == false) {
					angular.forEach($rootScope.pdgTier2CityMismatch,function(t2catdiffbdgtpdg,cityname) {
						if($scope.tier2diffCity[cityname]){
							t2_diffcity_sel.push(cityname);
						}
					});
					if(t2_diffcity_sel.length >0){
						$scope.t2PdgCatSubmitData['t2diffcitypdg'] = t2_diffcity_sel.join("|");
					}else{
						$scope.t2PdgCatSubmitData['t2diffcitypdg'] = "";
					}
					$scope.t2PdgCatSubmitData['L']['DIFFCITY'] = $scope.t2PdgCatSubmitData['t2diffcitypdg']; 
				}
				$scope.t2PdgCatSubmitData['L']['C'] 		= $scope.t2PdgCatBdgtChngFlg;
				$scope.t2PdgCatSubmitData['L']['A']			= 'pdgt2cat';
				console.log($scope.t2PdgCatSubmitData);
				
				var check_flag = 1;
				if($scope.t2PdgCatBdgtChngFlg !=1){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("Kindly do any changes in budget before clicking on Save Button.")
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if((parseInt($scope.t2PdgCatSubmitData['top200']) < MIN_PDG_REMOTE) || (parseInt($scope.t2PdgCatSubmitData['normal']) < MIN_PDG_REMOTE)){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("PDG Top 200 / Normal Category Budget can't be less than "+MIN_PDG_REMOTE+" in "+$scope.selectedCity)
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if(check_flag ==1){
					APIServices.updateTier2PDG('catwise',$scope.t2PdgCatSubmitData,$scope.selectedCity).success(function(response) {
						console.log(response);
						if(response.errorcode == 0) {
							$rootScope.updatedCampaign = "PDG";
							$scope.budgetConfirmationPopup(event);
						} else {
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.querySelector('#popupContainer')))
									.clickOutsideToClose(true)
									.title('Error in submitting budget for PDG.')
									.content('Data Cannot be submitted. Please try again later.')
									.ariaLabel('Alert Dialog Demo')
									.ok('Got it!')
									.targetEvent(event)
								);
							return false;
						}
					});
				}
			}else if(type == 'teamwise'){
				
				$scope.t2PdgTeamBdgtChngFlg = 0;
				$scope.t2PdgTeamSubmitData	=	{};
				$scope.t2PdgTeamSubmitData['L'] 		= {}; // log node
				$scope.t2PdgTeamSubmitData['L']['A'] = {}; // log action
				$scope.t2PdgTeamSubmitData['L']['C'] = {}; // log changes flag
				$scope.t2PdgTeamSubmitData['L']['O'] = {}; // log old value node
				$scope.t2PdgTeamSubmitData['L']['N'] = {}; // log new value node
				$scope.t2PdgTeamSubmitData['L']['O']['TW'] 	= {}; // log old teamwise
				$scope.t2PdgTeamSubmitData['L']['N']['TW'] 	= {}; // log new teamwise
				$scope.t2PdgTeamSubmitData['t2pdgtmbdgt']	= {};
				
				angular.forEach($rootScope.pdgTier2TeamBudgetData.tier2data,function(t2bdgt,t2tmabbr) {
					$scope.t2PdgTeamSubmitData['t2pdgtmbdgt'][t2tmabbr] = $scope.pdgTier2bdgtArr[t2tmabbr].bdgt;
					if(parseInt($scope.t2PdgTeamSubmitData['t2pdgtmbdgt'][t2tmabbr]) != parseInt(t2bdgt)){
						$scope.t2PdgTeamBdgtChngFlg = 1;
					}
					$scope.t2PdgTeamSubmitData['L']['O']['TW'][t2tmabbr] = parseInt(t2bdgt);
					$scope.t2PdgTeamSubmitData['L']['N']['TW'][t2tmabbr] = parseInt($scope.t2PdgTeamSubmitData['t2pdgtmbdgt'][t2tmabbr]);
				});
				$scope.t2PdgTeamSubmitData['L']['C'] 	= $scope.t2PdgTeamBdgtChngFlg;
				$scope.t2PdgTeamSubmitData['L']['A']	= 'pdgt2team';
				console.log($scope.t2PdgTeamSubmitData);
				
				var check_flag = 1;
				if($scope.t2PdgTeamBdgtChngFlg !=1){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("Kindly do any changes in budget before clicking on Save Button.")
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if(check_flag ==1){
					APIServices.updateTier2PDG('teamwise',$scope.t2PdgTeamSubmitData,$scope.selectedCity).success(function(response) {
						console.log(response);
						if(response.errorcode == 0) {
							$rootScope.updatedCampaign = "PDG";
							$scope.budgetConfirmationPopup(event);
						} else {
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.querySelector('#popupContainer')))
									.clickOutsideToClose(true)
									.title('Error in submitting budget for PDG.')
									.content('Data Cannot be submitted. Please try again later.')
									.ariaLabel('Alert Dialog Demo')
									.ok('Got it!')
									.targetEvent(event)
								);
							return false;
						}
					});
				}
				
			}
		}
		
		$scope.tire3BudgetSel = function(event){
			$scope.selectedTier3BdgtType = this.tier3bdgtType;
			
			if($scope.selectedTier3BdgtType == 'Team Wise Budget'){
				$scope.pdgTier3TeamBdgtFlg = 0;
				$scope.pdgTier3TeamBdgt	=	{};
				$scope.pdgTier3bdgtArr		=	{};
				$rootScope.pdgTier3TeamBudgetData = {};
				
				APIServices.getTier3TeamBdgtPdg($scope.selectedCity).success(function(response) {
					$rootScope.pdgTier3TeamBudgetData =	response;
					if(response.errorcode == 0) {
						$scope.pdgTier3TeamBdgt	=	response;
						$scope.pdgTier3TeamBdgtFlg = 1;
						$scope.teaminfo = response.teaminfo;
						angular.forEach(response.tier3data,function(tier3bdgt,tier3tmabbr) {
							$scope.pdgTier3bdgtArr[tier3tmabbr] = {};
							$scope.pdgTier3bdgtArr[tier3tmabbr]['bdgt']  = tier3bdgt;
							$scope.pdgTier3bdgtArr[tier3tmabbr]['teamnm'] = $scope.teaminfo[tier3tmabbr];
						});
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Some error occurred while fetching data. Please contact Software Team.')
							.content("Error in getTier3TeamBdgtPdg - API")
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}else if($scope.selectedTier3BdgtType == 'Category Wise Budget'){
				$scope.pdgTier3CatBdgtFlg = 0;
				$scope.pdgTier3CatBdgt	=	{};
				$scope.pdgTier3CatDiffBdgt		=	{};
				$scope.tier3diffCity = {};
				$scope.pdgtier3_citydiffbdgt = 0;
				$rootScope.pdgTier3CatBudgetData = {};
				APIServices.getTier3CatBdgtPdg($scope.selectedCity).success(function(response) {
					if(response.errorcode == 0) {
						$rootScope.pdgTier3CatBudgetData 	= response;
						$scope.pdgTier3CatBdgt['top200']	=	response.tier3top200;
						$scope.pdgTier3CatBdgt['normal']	=	response.tier3normal;
						$scope.pdgTier3CatBdgtFlg = 1;
						$rootScope.pdgTier3CityMismatch = {};
						if(response.tire3mismatch){
							$scope.pdgtier3_citydiffbdgt = 1;
							$rootScope.pdgTier3CityMismatch = response.tire3mismatch;
							angular.forEach(response.tire3mismatch,function(tire3diffbdgt,cityname) {
								$scope.pdgTier3CatDiffBdgt[cityname]	=	{};
								$scope.tier3diffCity[cityname] = true;
								angular.forEach(tire3diffbdgt,function(diffbdgtval,diffbdgtkey) {
									
									$scope.pdgTier3CatDiffBdgt[cityname]['top'] = diffbdgtval;
									$scope.pdgTier3CatDiffBdgt[cityname]['norm'] = diffbdgtval;
								});
							});
						}
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Some error occurred while fetching data. Please contact Software Team.')
							.content("Error in getTier3CatBdgtPdg - API")
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}
		}
		$scope.submitTier3PDG  = function(type,event){
			if(type == 'catwise'){
				
				$scope.t3PdgCatBdgtChngFlg 	= 0;
				$scope.t3PdgCatSubmitData	=	{};
				$scope.t3PdgCatSubmitData['L'] 		= {}; // log node
				$scope.t3PdgCatSubmitData['L']['A'] = {}; // log action
				$scope.t3PdgCatSubmitData['L']['C'] = {}; // log changes flag
				$scope.t3PdgCatSubmitData['L']['O'] = {}; // log old value node
				$scope.t3PdgCatSubmitData['L']['N'] = {}; // log new value node 
				
				$scope.t3PdgCatSubmitData['top200'] = $scope.pdgTier3CatBdgt.top200;
				$scope.t3PdgCatSubmitData['normal'] = $scope.pdgTier3CatBdgt.normal;

				if(parseInt($scope.t3PdgCatSubmitData['top200']) != parseInt($rootScope.pdgTier3CatBudgetData.tier3top200)){
					$scope.t3PdgCatBdgtChngFlg = 1;
				}
				$scope.t3PdgCatSubmitData['L']['O']['TOP'] = parseInt($rootScope.pdgTier3CatBudgetData.tier3top200);
				$scope.t3PdgCatSubmitData['L']['N']['TOP'] = parseInt($scope.t3PdgCatSubmitData['top200']);
				
				if(parseInt($scope.t3PdgCatSubmitData['normal']) != parseInt($rootScope.pdgTier3CatBudgetData.tier3normal)){
					$scope.t3PdgCatBdgtChngFlg = 1;
				}
				$scope.t3PdgCatSubmitData['L']['O']['NORM'] = parseInt($rootScope.pdgTier3CatBudgetData.tier3normal);
				$scope.t3PdgCatSubmitData['L']['N']['NORM'] = parseInt($scope.t3PdgCatSubmitData['normal']);
				
				var t3_diffcity_sel = [];
				if($scope.isEmpty($rootScope.pdgTier3CityMismatch) == false) {
					angular.forEach($rootScope.pdgTier3CityMismatch,function(t3catdiffbdgtpdg,cityname) {
						if($scope.tier3diffCity[cityname]){
							t3_diffcity_sel.push(cityname);
						}
					});
					if(t3_diffcity_sel.length >0){
						$scope.t3PdgCatSubmitData['t3diffcitypdg'] = t3_diffcity_sel.join("|");
					}else{
						$scope.t3PdgCatSubmitData['t3diffcitypdg'] = "";
					}
					$scope.t3PdgCatSubmitData['L']['DIFFCITY'] = $scope.t3PdgCatSubmitData['t3diffcitypdg']; 
				}
				$scope.t3PdgCatSubmitData['L']['C'] 		= $scope.t3PdgCatBdgtChngFlg;
				$scope.t3PdgCatSubmitData['L']['A']			= 'pdgt3cat';
				console.log($scope.t3PdgCatSubmitData);
				var check_flag = 1;
				if($scope.t3PdgCatBdgtChngFlg !=1){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("Kindly do any changes in budget before clicking on Save Button.")
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if((parseInt($scope.t3PdgCatSubmitData['top200']) < MIN_PDG_REMOTE) || (parseInt($scope.t3PdgCatSubmitData['normal']) < MIN_PDG_REMOTE)){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("PDG Top 200 / Normal Category Budget can't be less than "+MIN_PDG_REMOTE+" in "+$scope.selectedCity)
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if(check_flag ==1){
					APIServices.updateTier3PDG('catwise',$scope.t3PdgCatSubmitData,$scope.selectedCity).success(function(response) {
						console.log(response);
						if(response.errorcode == 0) {
							$rootScope.updatedCampaign = "PDG";
							$scope.budgetConfirmationPopup(event);
						} else {
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.querySelector('#popupContainer')))
									.clickOutsideToClose(true)
									.title('Error in submitting budget for PDG.')
									.content('Data Cannot be submitted. Please try again later.')
									.ariaLabel('Alert Dialog Demo')
									.ok('Got it!')
									.targetEvent(event)
								);
							return false;
						}
					});
				}
			}else if(type == 'teamwise'){
				
				
				$scope.t3PdgTeamBdgtChngFlg = 0;
				$scope.t3PdgTeamSubmitData	=	{};
				$scope.t3PdgTeamSubmitData['L'] 			= {}; // log node
				$scope.t3PdgTeamSubmitData['L']['A'] 		= {}; // log action
				$scope.t3PdgTeamSubmitData['L']['C'] 		= {}; // log changes flag
				$scope.t3PdgTeamSubmitData['L']['O'] 		= {}; // log old value node
				$scope.t3PdgTeamSubmitData['L']['N'] 		= {}; // log new value node
				$scope.t3PdgTeamSubmitData['L']['O']['TW'] 	= {}; // log old teamwise
				$scope.t3PdgTeamSubmitData['L']['N']['TW'] 	= {}; // log new teamwise
				$scope.t3PdgTeamSubmitData['t3pdgtmbdgt']	= {};
				
				angular.forEach($rootScope.pdgTier3TeamBudgetData.tier3data,function(t3bdgt,t3tmabbr) {
					$scope.t3PdgTeamSubmitData['t3pdgtmbdgt'][t3tmabbr] = $scope.pdgTier3bdgtArr[t3tmabbr].bdgt;
					if(parseInt($scope.t3PdgTeamSubmitData['t3pdgtmbdgt'][t3tmabbr]) != parseInt(t3bdgt)){
						$scope.t3PdgTeamBdgtChngFlg = 1;
					}
					$scope.t3PdgTeamSubmitData['L']['O']['TW'][t3tmabbr] = parseInt(t3bdgt);
					$scope.t3PdgTeamSubmitData['L']['N']['TW'][t3tmabbr] = parseInt($scope.t3PdgTeamSubmitData['t3pdgtmbdgt'][t3tmabbr]);
				});
				$scope.t3PdgTeamSubmitData['L']['C'] 	= $scope.t3PdgTeamBdgtChngFlg;
				$scope.t3PdgTeamSubmitData['L']['A']	= 'pdgt3team';
				console.log($scope.t3PdgTeamSubmitData);
				
				var check_flag = 1;
				if($scope.t3PdgTeamBdgtChngFlg !=1){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("Kindly do any changes in budget before clicking on Save Button.")
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if(check_flag ==1){
					APIServices.updateTier3PDG('teamwise',$scope.t3PdgTeamSubmitData,$scope.selectedCity).success(function(response) {
						console.log(response);
						if(response.errorcode == 0) {
							$rootScope.updatedCampaign = "PDG";
							$scope.budgetConfirmationPopup(event);
						} else {
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.querySelector('#popupContainer')))
									.clickOutsideToClose(true)
									.title('Error in submitting budget for PDG.')
									.content('Data Cannot be submitted. Please try again later.')
									.ariaLabel('Alert Dialog Demo')
									.ok('Got it!')
									.targetEvent(event)
								);
							return false;
						}
					});
				}
				
			}
		}
		
		$scope.zonebdgtType = {};
		$scope.selectedZoneBdgtType = '';
		$scope.zoneCitySel = function(event){
			$scope.zonebdgtType[0] = '';
			$scope.selectedZoneBdgtType = '';
			$scope.selectedZoneName = this.selZone;
			$scope.selectedZoneFlg = 0;
			if($scope.selectedZoneName != '' && $scope.selectedZoneName != 'Select'){
				$scope.selectedZoneFlg = 1;
			}
		}
		$scope.zoneBudgetSel = function(event){
			$scope.selectedZoneBdgtType = this.zonebdgtType[0];
			
			if($scope.selectedZoneBdgtType == 'Team Wise Budget'){
				$scope.pdgZoneTeamBdgtFlg = 0;
				$scope.pdgZoneTeamBdgt	=	{};
				$scope.pdgZonebdgtArr		=	{};
				$rootScope.pdgZoneTeamBudgetData = {};
				
				APIServices.getZoneTeamBdgtPdg($scope.selectedCity,$scope.selectedZoneName).success(function(response) {
					$rootScope.pdgZoneTeamBudgetData =	response;
					if(response.errorcode == 0) {
						$scope.pdgZoneTeamBdgt	=	response;
						$scope.pdgZoneTeamBdgtFlg = 1;
						$scope.teaminfo = response.teaminfo;
						angular.forEach(response.zonedata,function(zonebdgt,zonetmabbr) {
							$scope.pdgZonebdgtArr[zonetmabbr] = {};
							$scope.pdgZonebdgtArr[zonetmabbr]['bdgt']  	= zonebdgt;
							$scope.pdgZonebdgtArr[zonetmabbr]['teamnm'] = $scope.teaminfo[zonetmabbr];
						});
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Some error occurred while fetching data. Please contact Software Team.')
							.content("Error in getZoneTeamBdgtPdg - API")
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}else if($scope.selectedZoneBdgtType == 'Category Wise Budget'){
				$scope.pdgZoneCatBdgtFlg = 0;
				$scope.pdgZoneCatBdgt	 = {};
				$scope.pdgZoneCatDiffBdgt		=	{};
				$scope.zonediffCity = {};
				$scope.pdgzone_citydiffbdgt = 0;
				$rootScope.pdgZoneCatBudgetData = {};
				APIServices.getZoneCatBdgtPdg($scope.selectedCity,$scope.selectedZoneName).success(function(response) {
					if(response.errorcode == 0) {
						$rootScope.pdgZoneCatBudgetData = response;						
						$scope.pdgZoneCatBdgt['top200']	=	response.zonetop200;
						$scope.pdgZoneCatBdgt['normal']	=	response.zonenormal;
						$scope.pdgZoneCatBdgtFlg = 1;
						$rootScope.pdgZoneCityMismatch = {};
						if(response.zonemismatch){
							$scope.pdgzone_citydiffbdgt = 1;
							$rootScope.pdgZoneCityMismatch = response.zonemismatch;
							angular.forEach(response.zonemismatch,function(zonediffbdgt,cityname) {
								$scope.pdgZoneCatDiffBdgt[cityname]	=	{};
								$scope.zonediffCity[cityname] = true;
								angular.forEach(zonediffbdgt,function(diffbdgtval,diffbdgtkey) {
									$scope.pdgZoneCatDiffBdgt[cityname][diffbdgtkey] = diffbdgtval;
								});
							});
						}
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Some error occurred while fetching data. Please contact Software Team.')
							.content("Error in getZoneCatBdgtPdg - API")
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}
		}
		
		
		
		$scope.submitZonePDG  = function(type,event){
			if(type == 'catwise'){
				
				$scope.zonePdgCatBdgtChngFlg 	= 0;
				$scope.zonePdgCatSubmitData	=	{};
				$scope.zonePdgCatSubmitData['L'] 		= {}; // log node
				$scope.zonePdgCatSubmitData['L']['A'] = {}; // log action
				$scope.zonePdgCatSubmitData['L']['C'] = {}; // log changes flag
				$scope.zonePdgCatSubmitData['L']['O'] = {}; // log old value node
				$scope.zonePdgCatSubmitData['L']['N'] = {}; // log new value node
				
				$scope.zonePdgCatSubmitData['top200'] = $scope.pdgZoneCatBdgt.top200;
				$scope.zonePdgCatSubmitData['normal'] = $scope.pdgZoneCatBdgt.normal;

				if(parseInt($scope.zonePdgCatSubmitData['top200']) != parseInt($rootScope.pdgZoneCatBudgetData.zonetop200)){
					$scope.zonePdgCatBdgtChngFlg = 1;
				}
				$scope.zonePdgCatSubmitData['L']['O']['TOP'] = parseInt($rootScope.pdgZoneCatBudgetData.zonetop200);
				$scope.zonePdgCatSubmitData['L']['N']['TOP'] = parseInt($scope.zonePdgCatSubmitData['top200']);
				
				if(parseInt($scope.zonePdgCatSubmitData['normal']) != parseInt($rootScope.pdgZoneCatBudgetData.zonenormal)){
					$scope.zonePdgCatBdgtChngFlg = 1;
				}
				$scope.zonePdgCatSubmitData['L']['O']['NORM'] = parseInt($rootScope.pdgZoneCatBudgetData.zonenormal);
				$scope.zonePdgCatSubmitData['L']['N']['NORM'] = parseInt($scope.zonePdgCatSubmitData['normal']);
				
				var zone_diffcity_sel = [];
				if($scope.isEmpty($rootScope.pdgZoneCityMismatch) == false) {
					angular.forEach($rootScope.pdgZoneCityMismatch,function(zonecatdiffbdgtpdg,cityname) {
						if($scope.zonediffCity[cityname]){
							zone_diffcity_sel.push(cityname);
						}
					});
					if(zone_diffcity_sel.length >0){
						$scope.zonePdgCatSubmitData['zonediffcitypdg'] = zone_diffcity_sel.join("|");
					}else{
						$scope.zonePdgCatSubmitData['zonediffcitypdg'] = "";
					}
					$scope.zonePdgCatSubmitData['L']['DIFFCITY'] = $scope.zonePdgCatSubmitData['zonediffcitypdg']; 
				}
				$scope.zonePdgCatSubmitData['L']['C'] 		= $scope.zonePdgCatBdgtChngFlg;
				$scope.zonePdgCatSubmitData['L']['A']		= 'pdgzonecat';
				console.log($scope.zonePdgCatSubmitData);
				var check_flag = 1;
				if($scope.zonePdgCatBdgtChngFlg !=1){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("Kindly do any changes in budget before clicking on Save Button.")
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if((parseInt($scope.zonePdgCatSubmitData['top200']) < MIN_PDG_REMOTE) || (parseInt($scope.zonePdgCatSubmitData['normal']) < MIN_PDG_REMOTE)){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("PDG Top 200 / Normal Category Budget can't be less than "+MIN_PDG_REMOTE+" in "+$scope.selectedZoneName+" Remote Zone.")
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if(check_flag ==1){
					APIServices.updateZonePDG('catwise',$scope.zonePdgCatSubmitData,$scope.selectedCity,$scope.selectedZoneName).success(function(response) {
						console.log(response);
						if(response.errorcode == 0) {
							$rootScope.updatedCampaign = "PDG";
							$scope.budgetConfirmationPopup(event);
						} else {
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.querySelector('#popupContainer')))
									.clickOutsideToClose(true)
									.title('Error in submitting budget for PDG Zone.')
									.content('Data Cannot be submitted. Please try again later.')
									.ariaLabel('Alert Dialog Demo')
									.ok('Got it!')
									.targetEvent(event)
								);
							return false;
						}
					});
				}
			}else if(type == 'teamwise'){
				
				$scope.zonePdgTeamBdgtChngFlg = 0;
				$scope.zonePdgTeamSubmitData	=	{};
				$scope.zonePdgTeamSubmitData['L'] 			= {}; // log node
				$scope.zonePdgTeamSubmitData['L']['A'] 		= {}; // log action
				$scope.zonePdgTeamSubmitData['L']['C'] 		= {}; // log changes flag
				$scope.zonePdgTeamSubmitData['L']['O'] 		= {}; // log old value node
				$scope.zonePdgTeamSubmitData['L']['N'] 		= {}; // log new value node
				$scope.zonePdgTeamSubmitData['L']['O']['TW'] 	= {}; // log old teamwise
				$scope.zonePdgTeamSubmitData['L']['N']['TW'] 	= {}; // log new teamwise
				$scope.zonePdgTeamSubmitData['zonepdgtmbdgt']	= {};
				
				angular.forEach($rootScope.pdgZoneTeamBudgetData.zonedata,function(zonebdgt,zonetmabbr) {
					$scope.zonePdgTeamSubmitData['zonepdgtmbdgt'][zonetmabbr] = $scope.pdgZonebdgtArr[zonetmabbr].bdgt;
					if(parseInt($scope.zonePdgTeamSubmitData['zonepdgtmbdgt'][zonetmabbr]) != parseInt(zonebdgt)){
						$scope.zonePdgTeamBdgtChngFlg = 1;
					}
					$scope.zonePdgTeamSubmitData['L']['O']['TW'][zonetmabbr] = parseInt(zonebdgt);
					$scope.zonePdgTeamSubmitData['L']['N']['TW'][zonetmabbr] = parseInt($scope.zonePdgTeamSubmitData['zonepdgtmbdgt'][zonetmabbr]);
					
				});
				$scope.zonePdgTeamSubmitData['L']['C'] 	= $scope.zonePdgTeamBdgtChngFlg;
				$scope.zonePdgTeamSubmitData['L']['A']	= 'pdgzoneteam';
				console.log($scope.zonePdgTeamSubmitData);
				
				var check_flag = 1;
				if($scope.zonePdgTeamBdgtChngFlg !=1){
					check_flag = 0;
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.content("Kindly do any changes in budget before clicking on Save Button.")
						.ariaLabel('Alert Dialog Demo')
						.ok('ok')
						.targetEvent(event)
					);
					return false;
				}
				if(check_flag ==1){
					APIServices.updateZonePDG('teamwise',$scope.zonePdgTeamSubmitData,$scope.selectedCity,$scope.selectedZoneName).success(function(response) {
						console.log(response);
						if(response.errorcode == 0) {
							$rootScope.updatedCampaign = "PDG";
							$scope.budgetConfirmationPopup(event);
						} else {
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.querySelector('#popupContainer')))
									.clickOutsideToClose(true)
									.title('Error in submitting budget for PDG.')
									.content('Data Cannot be submitted. Please try again later.')
									.ariaLabel('Alert Dialog Demo')
									.ok('Got it!')
									.targetEvent(event)
								);
							return false;
						}
					});
				}
			}
		}
		$scope.selectedPdgCity = '';
		$scope.selCityPDG = function(event){
			console.log($rootScope.cityselcampaign['pdg']);
			$rootScope.remoteCityPdgBdgtData = {};
			$scope.remoteIndividualPdgBdgt = {};
			if (typeof $rootScope.cityselcampaign['pdg'] != 'undefined' && $rootScope.cityselcampaign['pdg'] != null && $rootScope.cityselcampaign['pdg'] !=''){
				APIServices.getRemoteBudgetPdg($rootScope.cityselcampaign['pdg']).success(function(response) {
					if(response.errorcode == 0) {
						$rootScope.remoteCityPdgBdgtData = response;
						$scope.remoteIndividualPdgBdgt['top200']	=	response.remotetop;
						$scope.remoteIndividualPdgBdgt['normal']	=	response.remotenorm;
						$scope.selectedPdgCity = $rootScope.cityselcampaign['pdg'];
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Individual Remote City PDG Budget Error.')
							.content("No Result Found for Selected City : "+$rootScope.cityselcampaign['pdg'])
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}else{
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.content("Please Select City to update Remote City PDG Budget.")
					.ariaLabel('Alert Dialog Demo')
					.ok('ok')
					.targetEvent(event)
				);
			}
		}
		$scope.changeCityPDG = function(event){
			$scope.selectedPdgCity = '';
			$rootScope.cityselcampaign['pdg'] = '';
		}
		$scope.submitRemoteBudgetPdg = function(event){
			
			$scope.remotePdgCatBdgtChngFlg 	= 0;
			$scope.remotePdgSubmitData	=	{};
			$scope.remotePdgSubmitData['L'] 		= {}; // log node
			$scope.remotePdgSubmitData['L']['A'] = {}; // log action
			$scope.remotePdgSubmitData['L']['C'] = {}; // log changes flag
			$scope.remotePdgSubmitData['L']['O'] = {}; // log old value node
			$scope.remotePdgSubmitData['L']['N'] = {}; // log new value node
			
			$scope.remotePdgSubmitData['top200'] = $scope.remoteIndividualPdgBdgt.top200;
			$scope.remotePdgSubmitData['normal'] = $scope.remoteIndividualPdgBdgt.normal;

			if(parseInt($scope.remotePdgSubmitData['top200']) != parseInt($rootScope.remoteCityPdgBdgtData.remotetop)){
				$scope.remotePdgCatBdgtChngFlg = 1;
			}
			$scope.remotePdgSubmitData['L']['O']['TOP'] = parseInt($rootScope.remoteCityPdgBdgtData.remotetop);
			$scope.remotePdgSubmitData['L']['N']['TOP'] = parseInt($scope.remotePdgSubmitData['top200']);
			
			if(parseInt($scope.remotePdgSubmitData['normal']) != parseInt($rootScope.remoteCityPdgBdgtData.remotenorm)){
				$scope.remotePdgCatBdgtChngFlg = 1;
			}
			$scope.remotePdgSubmitData['L']['O']['NORM'] = parseInt($rootScope.remoteCityPdgBdgtData.remotenorm);
			$scope.remotePdgSubmitData['L']['N']['NORM'] = parseInt($scope.remotePdgSubmitData['normal']);
			$scope.remotePdgSubmitData['L']['C'] 	= $scope.remotePdgCatBdgtChngFlg;
			$scope.remotePdgSubmitData['L']['A']	= 'pdgremotecat';
			
			console.log($scope.remotePdgSubmitData);
			var check_flag = 1;
			if($scope.remotePdgCatBdgtChngFlg !=1){
				check_flag = 0;
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.content("Kindly do any changes in budget before clicking on Save Button.")
					.ariaLabel('Alert Dialog Demo')
					.ok('ok')
					.targetEvent(event)
				);
				return false;
			}
			if((parseInt($scope.remotePdgSubmitData['top200']) < MIN_PDG_REMOTE) || (parseInt($scope.remotePdgSubmitData['normal']) < MIN_PDG_REMOTE)){
				check_flag = 0;
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.content("PDG Top 200 / Normal Category Budget can't be less than "+MIN_PDG_REMOTE+" in Remote City - "+$scope.selectedPdgCity+".")
					.ariaLabel('Alert Dialog Demo')
					.ok('ok')
					.targetEvent(event)
				);
				return false;
			}
			if(check_flag ==1){
				APIServices.updateRemoteBudgetPdg($scope.remotePdgSubmitData,$scope.selectedPdgCity).success(function(response) {
					console.log(response);
					if(response.errorcode == 0) {
						$rootScope.updatedCampaign = "PDG";
						$scope.budgetConfirmationPopup(event);
					} else {
							$mdDialog.show(
								$mdDialog.alert()
								.parent(angular.element(document.querySelector('#popupContainer')))
								.clickOutsideToClose(true)
								.title('Error in submitting Remote City budget for PDG.')
								.content('Data Cannot be submitted. Please try again later.')
								.ariaLabel('Alert Dialog Demo')
								.ok('Got it!')
								.targetEvent(event)
							);
						return false;
					}
				});
			}
		}
		$scope.budgetConfirmationPopup	=	function(event) {
			$mdDialog.show({
				controller: budgetConfirmationController,
				templateUrl: 'partials/dialogConfirmation.html',
				parent: angular.element(document.body),
				targetEvent:event
			})
			.then(function(answer) {
				$scope.alert = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.alert = 'You cancelled the dialog.';
			});
			$scope.resetPdgScope();
		};
		
		$scope.resetPdgScope = function(){
			$scope.selectedCity = '';
			$scope.selPdgCity[0] = '';
			$scope.remote_tier2 = 0;
			$scope.remote_tier3 = 0;
			$scope.selectedTier2BdgtType = '';
			$scope.selectedTier3BdgtType = '';
			$scope.zone_wise = 0;
			$scope.individual_remote = 0;		
			$scope.selectedZoneFlg = 0;
			$scope.selectedZoneName = '';
			$scope.selectedZoneBdgtType = '';
			$scope.selectedPdgCity = '';
		}
		$scope.pdgMoreOption	=	function(action,event) {
			var pdgMorePage = '';
			switch(action){
				case 'pdgbdgtlog' : 
					pdgMorePage = 'partials/pdgBudgetLog.html';
				break;
			}
			$mdDialog.show({
				controller: pdgMoreController,
				templateUrl: pdgMorePage,
				parent: angular.element(document.body),
				targetEvent:event
			})
			.then(function(answer) {
				$scope.alert = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.alert = 'You cancelled the dialog.';
			});
			$scope.resetPdgScope();
		};
		$scope.notSorted = function(obj){
			if (!obj) {
				return [];
			}
			return Object.keys(obj);
		}
		$scope.isEmpty	=	function (obj) {
			for(var prop in obj) {
				if(obj.hasOwnProperty(prop))
					return false;
			}
			return true;
		};
		function budgetConfirmationController($scope,$mdDialog) {
			$scope.hide = function() {
				$mdDialog.hide();
			};
			$scope.updatedCampaign	=   $rootScope.updatedCampaign;
		}
		function pdgMoreController($scope,$mdDialog) {
			$scope.hide = function() {
				$mdDialog.hide();
			};
			APIServices.getBudgetLog('pdg').success(function(response) {
					$scope.pdgLogData = response;
			});
		}
	});	
	
	
	adminModuleApp.controller('jdrrController',function($scope,APIServices,$rootScope,$state,$location,$http,$timeout,$mdToast,$mdDialog,$mdMedia,$mdSidenav) {
		
		$rootScope.$on("callJdrrController", function(){
           $scope.resetJdrrScope();
        });
		
		$scope.jdrrcitylist = ["Mumbai","Delhi","Kolkata","Bangalore","Chennai","Pune","Hyderabad","Ahmedabad","Remote"];
		$scope.selJdrrCity = {};
		$rootScope.updatedCampaign = '';
		$scope.jddr_budget = 0;
		$scope.selectedJdrrCity = '';
		$rootScope.jdrrBudgetData = {};
		$scope.setJdrrCity = function(event){
			$scope.selectedJdrrCity = this.selJdrrCity[0];
			if($scope.selectedJdrrCity !=''){
				$scope.jdrrBdgt = {};
				APIServices.getJdrrBudgetInfo($scope.selectedJdrrCity).success(function(response) {
					if(response.errorcode == 0) {
						$scope.jddr_budget = 1;
						$rootScope.jdrrBudgetData 		= response;
						$scope.jdrrBdgt['upfrontbdgt'] 	= response.upfront;
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Some error occurred while fetching data. Please contact Software Team.')
							.content("Error in getJdrrBudgetInfo - API")
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}
		}
		$scope.submitJdrrBudget = function(event){
			
			$scope.jdrrBdgtChngFlg 	= 0;
			$scope.jdrrSubmitData	= {};
			$scope.jdrrSubmitData['L'] 		= {}; // log node
			$scope.jdrrSubmitData['L']['A'] = {}; // log action
			$scope.jdrrSubmitData['L']['C'] = {}; // log changes flag
			$scope.jdrrSubmitData['L']['O'] = {}; // log old value node
			$scope.jdrrSubmitData['L']['N'] = {}; // log new value node
			
			$scope.jdrrSubmitData['upfront'] = $scope.jdrrBdgt.upfrontbdgt;
			if(parseInt($scope.jdrrSubmitData['upfront']) != parseInt($rootScope.jdrrBudgetData.upfront)){
				$scope.jdrrBdgtChngFlg = 1;
			}
			$scope.jdrrSubmitData['L']['O']['UPFRNT'] = parseInt($rootScope.jdrrBudgetData.upfront);
			$scope.jdrrSubmitData['L']['N']['UPFRNT'] = parseInt($scope.jdrrSubmitData['upfront']);
			
			$scope.jdrrSubmitData['L']['C'] = $scope.jdrrBdgtChngFlg;
			$scope.jdrrSubmitData['L']['A']	= 'jdrrbdgt';
			
			console.log($scope.jdrrSubmitData);
			var check_flag = 1;
			if($scope.jdrrBdgtChngFlg !=1){
				check_flag = 0;
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.content("Kindly do any changes in budget before clicking on Save Button.")
					.ariaLabel('Alert Dialog Demo')
					.ok('ok')
					.targetEvent(event)
				);
				return false;
			}
			if(check_flag ==1){
				APIServices.updateJdrrBudget($scope.jdrrSubmitData,$scope.selectedJdrrCity).success(function(response) {
					console.log(response);
					if(response.errorcode == 0) {
						$rootScope.updatedCampaign = "JDRR";
						$scope.budgetConfirmationPopup(event);
					} else {
							$mdDialog.show(
								$mdDialog.alert()
								.parent(angular.element(document.querySelector('#popupContainer')))
								.clickOutsideToClose(true)
								.title('Error in submitting budget for JDRR.')
								.content('Data Cannot be submitted. Please try again later.')
								.ariaLabel('Alert Dialog Demo')
								.ok('Got it!')
								.targetEvent(event)
							);
						return false;
					}
				});
			}
		}
		$scope.budgetConfirmationPopup	=	function(event) {
			$mdDialog.show({
				controller: budgetConfirmationController,
				templateUrl: 'partials/dialogConfirmation.html',
				parent: angular.element(document.body),
				targetEvent:event
			})
			.then(function(answer) {
				$scope.alert = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.alert = 'You cancelled the dialog.';
			});
			$scope.resetJdrrScope();
		};
		
		$scope.resetJdrrScope = function(){
			$scope.selectedJdrrCity = '';
			$scope.selJdrrCity[0] = '';
			$scope.jddr_budget = 0;
		}
		$scope.jdrrMoreOption	=	function(action,event) {
			var jddrMorePage = '';
			switch(action){
				case 'jdrrbdgtlog' : 
					jddrMorePage = 'partials/jdrrBudgetLog.html';
				break;
			}
			$mdDialog.show({
				controller: jdrrMoreController,
				templateUrl: jddrMorePage,
				parent: angular.element(document.body),
				targetEvent:event
			})
			.then(function(answer) {
				$scope.alert = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.alert = 'You cancelled the dialog.';
			});
			$scope.resetJdrrScope();
		};
		function budgetConfirmationController($scope,$mdDialog) {
			$scope.hide = function() {
				$mdDialog.hide();
			};
			$scope.updatedCampaign	=   $rootScope.updatedCampaign;
		}
		function jdrrMoreController($scope,$mdDialog) {
			$scope.hide = function() {
				$mdDialog.hide();
			};
			APIServices.getBudgetLog('jdrr').success(function(response) {
					$scope.jdrrLogData = response;
			});
		}
	});
	
	
	adminModuleApp.controller('bannerController',function($scope,APIServices,$rootScope,$state,$location,$http,$timeout,$mdToast,$mdDialog,$mdMedia,$mdSidenav) {
		
		$rootScope.$on("callBannerController", function(){
           $scope.resetBannerScope();
        });
		$scope.bannercitylist = ["Mumbai","Delhi","Kolkata","Bangalore","Chennai","Pune","Hyderabad","Ahmedabad","Jaipur","Chandigarh","Coimbatore","Remote - Others"];
		$scope.selBannerCity = {};
		$rootScope.updatedCampaign = '';
		
		$scope.selectedBnrCity = '';
		$scope.banner_budget = 0;
		$scope.bannerBdgt = {};
		$rootScope.bannerBudgetData = {};
		$scope.setBannerCity = function(event){
			$scope.selectedBnrCity = this.selBannerCity[0];
			if($scope.selectedBnrCity !=''){
				APIServices.getBannerBudgetInfo($scope.selectedBnrCity).success(function(response) {
					if(response.errorcode == 0) {
						$rootScope.bannerBudgetData = response;
						$scope.banner_budget = 1;
						$scope.bannerBdgt['bfee'] 		= response.bnrfees;
						$scope.bannerBdgt['bfee_ecs'] 	= response.bnrfees_ecs;
					
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('Some error occurred while fetching data. Please contact Software Team.')
							.content("Error in getBannerBudgetInfo - API")
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}
		}
		$scope.submitBannerBudget = function(event){
			
			$scope.bnrBdgtChngFlg 	= 0;
			$scope.bannerSubmitData	= {};
			$scope.bannerSubmitData['L'] 		= {}; // log node
			$scope.bannerSubmitData['L']['A'] = {}; // log action
			$scope.bannerSubmitData['L']['C'] = {}; // log changes flag
			$scope.bannerSubmitData['L']['O'] = {}; // log old value node
			$scope.bannerSubmitData['L']['N'] = {}; // log new value node
			
			$scope.bannerSubmitData['bfee'] 	= $scope.bannerBdgt.bfee;
			$scope.bannerSubmitData['bfee_ecs'] = $scope.bannerBdgt.bfee_ecs;
			
			if(parseInt($scope.bannerSubmitData['bfee']) != parseInt($rootScope.bannerBudgetData.bnrfees)){
				$scope.bnrBdgtChngFlg = 1;
			}
			$scope.bannerSubmitData['L']['O']['UPFRNT'] = parseInt($rootScope.bannerBudgetData.bnrfees);
			$scope.bannerSubmitData['L']['N']['UPFRNT'] = parseInt($scope.bannerSubmitData['bfee']);
			
			if(parseInt($scope.bannerSubmitData['bfee_ecs']) != parseInt($rootScope.bannerBudgetData.bnrfees_ecs)){
				$scope.bnrBdgtChngFlg = 1;
			}
			$scope.bannerSubmitData['L']['O']['ECS'] = parseInt($rootScope.bannerBudgetData.bnrfees_ecs);
			$scope.bannerSubmitData['L']['N']['ECS'] = parseInt($scope.bannerSubmitData['bfee_ecs']);
			
			$scope.bannerSubmitData['L']['C'] = $scope.bnrBdgtChngFlg;
			$scope.bannerSubmitData['L']['A']	= 'bnrbdgt';
			
			console.log($scope.bannerSubmitData);
			var check_flag = 1;
			if($scope.bnrBdgtChngFlg !=1){
				check_flag = 0;
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.content("Kindly do any changes in budget before clicking on Save Button.")
					.ariaLabel('Alert Dialog Demo')
					.ok('ok')
					.targetEvent(event)
				);
				return false;
			}
			if(check_flag ==1){
				APIServices.updateBannerBudget($scope.bannerSubmitData,$scope.selectedBnrCity).success(function(response) {
					console.log(response);
					if(response.errorcode == 0) {
						$rootScope.updatedCampaign = "Banner";
						$scope.budgetConfirmationPopup(event);
					} else {
							$mdDialog.show(
								$mdDialog.alert()
								.parent(angular.element(document.querySelector('#popupContainer')))
								.clickOutsideToClose(true)
								.title('Error in submitting budget for Banner.')
								.content('Data Cannot be submitted. Please try again later.')
								.ariaLabel('Alert Dialog Demo')
								.ok('Got it!')
								.targetEvent(event)
							);
						return false;
					}
				});
			}
		}
		$scope.budgetConfirmationPopup	=	function(event) {
			$mdDialog.show({
				controller: budgetConfirmationController,
				templateUrl: 'partials/dialogConfirmation.html',
				parent: angular.element(document.body),
				targetEvent:event
			})
			.then(function(answer) {
				$scope.alert = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.alert = 'You cancelled the dialog.';
			});
			$scope.resetBannerScope();
		};
		$scope.resetBannerScope = function(){
			$scope.selectedBnrCity = '';
			$scope.selBannerCity[0] = '';
			$scope.banner_budget = 0;
		}
		$scope.bannerMoreOption	=	function(action,event) {
			var bnrMorePage = '';
			switch(action){
				case 'bnrbdgtlog' : 
					bnrMorePage = 'partials/bannerBudgetLog.html';
				break;
			}
			$mdDialog.show({
				controller: bannerMoreController,
				templateUrl: bnrMorePage,
				parent: angular.element(document.body),
				targetEvent:event
			})
			.then(function(answer) {
				$scope.alert = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.alert = 'You cancelled the dialog.';
			});
			$scope.resetBannerScope();
		};
		function budgetConfirmationController($scope,$mdDialog) {
			$scope.hide = function() {
				$mdDialog.hide();
			};
			$scope.updatedCampaign	=   $rootScope.updatedCampaign;
		}
		function bannerMoreController($scope,$mdDialog) {
			$scope.hide = function() {
				$mdDialog.hide();
			};
			APIServices.getBudgetLog('banner').success(function(response) {
					$scope.bannerLogData = response;
			});
		}		
	});	
	
	adminModuleApp.controller('nationalListingController',function($scope,APIServices,$rootScope,$state,$location,$http,$timeout,$mdToast,$mdDialog,$mdMedia,$mdSidenav) {
		
		$rootScope.$on("callNationalController", function(){
           $scope.resetNationalScope();
        });
		
		$rootScope.updatedCampaign = '';
		
		$scope.selectedNatCity = '';
		$scope.nationalBdgt = {};
		$rootScope.nationalBudgetData = {};
		$scope.selCityNational = function(event){
			console.log($rootScope.cityselcampaign['national']);
			if (typeof $rootScope.cityselcampaign['national'] != 'undefined' && $rootScope.cityselcampaign['national'] != null && $rootScope.cityselcampaign['national'] !=''){
				APIServices.getNationalListingBudget($rootScope.cityselcampaign['national']).success(function(response) {
					if(response.errorcode == 0) {
						$rootScope.nationalBudgetData = response;
						$scope.nationalBdgt['budget'] = response.natbdgt
						$scope.selectedNatCity = $rootScope.cityselcampaign['national'];
					}else{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('National Listing Budget Error.')
							.content("No Result Found for Selected City : "+$rootScope.cityselcampaign['national'])
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(event)
						);
					}
				});
			}else{
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.content("Please Select City to update National Listing Budget.")
					.ariaLabel('Alert Dialog Demo')
					.ok('ok')
					.targetEvent(event)
				);
			}
		}
		$scope.changeCityNational = function(event){
			$scope.selectedNatCity = '';
			$rootScope.cityselcampaign['national'] = '';
		}
		$scope.submitNationalBudget = function(event){
			
			$scope.natBdgtChngFlg 	= 0;
			$scope.nationalSubmitData	= {};
			$scope.nationalSubmitData['L'] 		= {}; // log node
			$scope.nationalSubmitData['L']['A'] = {}; // log action
			$scope.nationalSubmitData['L']['C'] = {}; // log changes flag
			$scope.nationalSubmitData['L']['O'] = {}; // log old value node
			$scope.nationalSubmitData['L']['N'] = {}; // log new value node
			
			$scope.nationalSubmitData['budget'] 	= $scope.nationalBdgt.budget;
			if(parseInt($scope.nationalSubmitData['budget']) != parseInt($rootScope.nationalBudgetData.natbdgt)){
				$scope.natBdgtChngFlg = 1;
			}
			$scope.nationalSubmitData['L']['O']['natbdgt'] = parseInt($rootScope.nationalBudgetData.natbdgt);
			$scope.nationalSubmitData['L']['N']['natbdgt'] = parseInt($scope.nationalSubmitData['budget']);
			
			$scope.nationalSubmitData['L']['C'] = $scope.natBdgtChngFlg;
			$scope.nationalSubmitData['L']['A']	= 'nationalbdgt';
			
			console.log($scope.nationalSubmitData);
			var check_flag = 1;
			if($scope.natBdgtChngFlg !=1){
				check_flag = 0;
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.content("Kindly do any changes in budget before clicking on Save Button.")
					.ariaLabel('Alert Dialog Demo')
					.ok('ok')
					.targetEvent(event)
				);
				return false;
			}		
			if(check_flag ==1){
				APIServices.updateNationalBudget($scope.nationalSubmitData,$scope.selectedNatCity).success(function(response) {
					console.log(response);
					if(response.errorcode == 0) {
						$rootScope.updatedCampaign = "National Listing";
						$scope.budgetConfirmationPopup(event);
					} else {
							$mdDialog.show(
								$mdDialog.alert()
								.parent(angular.element(document.querySelector('#popupContainer')))
								.clickOutsideToClose(true)
								.title('Error in submitting budget for National Listing.')
								.content('Data Cannot be submitted. Please try again later.')
								.ariaLabel('Alert Dialog Demo')
								.ok('Got it!')
								.targetEvent(event)
							);
						return false;
					}
				});
			}
		}
		$scope.budgetConfirmationPopup	=	function(event) {
			$mdDialog.show({
				controller: budgetConfirmationController,
				templateUrl: 'partials/dialogConfirmation.html',
				parent: angular.element(document.body),
				targetEvent:event
			})
			.then(function(answer) {
				$scope.alert = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.alert = 'You cancelled the dialog.';
			});
			$scope.resetNationalScope();
		};
		
		$scope.resetNationalScope = function(){
			$scope.selectedNatCity = '';
			$rootScope.cityselcampaign['national'] = '';
		}
		$scope.nationalMoreOption	=	function(action,event) {
			var natMorePage = '';
			switch(action){
				case 'natbdgtlog' : 
					natMorePage = 'partials/nationalBudgetLog.html';
				break;
			}
			$mdDialog.show({
				controller: nationalMoreController,
				templateUrl: natMorePage,
				parent: angular.element(document.body),
				targetEvent:event
			})
			.then(function(answer) {
				$scope.alert = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.alert = 'You cancelled the dialog.';
			});
			$scope.resetNationalScope();
		};
		
		function budgetConfirmationController($scope,$mdDialog) {
			$scope.hide = function() {
				$mdDialog.hide();
			};
			$scope.updatedCampaign	=   $rootScope.updatedCampaign;
		}
		function nationalMoreController($scope,$mdDialog) {
			$scope.hide = function() {
				$mdDialog.hide();
			};
			APIServices.getBudgetLog('national listing').success(function(response) {
					$scope.nationalLogData = response;
			});
		}
	});
	
});
