define(['./module'], function (adminModuleApp) {
'use strict';
	//Directive to Show Loading Bar before the partial loading occurs
	adminModuleApp.directive('butterbar', ['$rootScope',function($rootScope) {
		return {
			link: function(scope, element, attrs) {
				element.addClass('hide');
				$rootScope.$on('$stateChangeStart', function() {
					element.removeClass('hide');
				});
				$rootScope.$on('$stateChangeSuccess', function() {
					element.addClass('hide');
				});
				scope.$on("$destroy",function() {
					element.remove();
				}); 
			}
		};
	}]);
	
	adminModuleApp.directive('piechart', ['$rootScope',function($rootScope) {
		return {
			restrict: 'EC',
			template: '<div></div>',
			scope: {
				title: '@',
				data: '='
			},
			link: function (scope, element) {
				scope.$watch('data',function() {
					Highcharts.setOptions({
						colors: ['#00A65A', '#F56954', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
					});	
					Highcharts.chart(element[0], {
						chart: {
							plotBackgroundColor: null,
							plotBorderWidth: null,
							plotShadow: false,
							type: 'pie'
						},
						title: {
							text: scope.title
						},
						plotOptions: {
							pie: {
								size:'80%',
								allowPointSelect: true,
								cursor: 'pointer',
								dataLabels: {
									enabled: false,
									//~ format: '<b>{point.name}</b>: {point.percentage:.1f} %'
								},
								showInLegend: true
							}
						},
						series: [{
							data: scope.data
						}]
					});
				});
			}
		};
	}]);
	
	adminModuleApp.directive('bargraph', ['$rootScope',function($rootScope) {
		return {
			restrict: 'EC',
			template: '<div></div>',
			scope: {
				title: '@',
				data: '='
			},
			link: function (scope, element) {
				scope.$watch('data',function() {
					Highcharts.setOptions({
						colors: ['#00A65A', '#F56954', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
					});	
					Highcharts.chart(element[0], {
						chart: {
							plotBackgroundColor: null,
							plotBorderWidth: null,
							plotShadow: false,
							type: 'column'
						},
						title: {
							text: ''
						},
						subtitle: {
							text: ''
						},
						xAxis: {
							type: 'category',
							labels :{
								enabled:false
							}
						},
						yAxis: {
							title: {
								text: ''
							}

						},
						legend: {
							enabled: false
						},
						plotOptions: {
							series: {
								borderWidth: 0,
								dataLabels: {
									enabled: false,
									format: '{point.y:.1f}%'
								}
							}
						},

						tooltip: {
							headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
							pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
						},
						series: [{
							name: 'Jobs',
							colorByPoint: true,
							data: scope.data
						}],
					});
				});
			}
		};
	}]);
	
	adminModuleApp.directive('completionchart', ['$rootScope',function($rootScope) {
		return {
			restrict: 'EC',
			template: '<div></div>',
			scope: {
				title: '@',
				data: '='
			},
			link: function (scope, element) {
				scope.$watch('data',function() {
					Highcharts.setOptions({
						colors: [scope.title]
					});	
					Highcharts.chart(element[0], {
						chart: {
							type: 'solidgauge'
						},
						title: null,
						tooltip: {
							enabled: false
						},
						pane: {
							center: ['50%', '40%'],
							size: '70%',
							startAngle: 0,
							endAngle: 360,
							background: {
								backgroundColor: '#C9C9C9',
								innerRadius: '90%',
								outerRadius: '100%',
								borderWidth: 0
							}
						},
						yAxis: {
							min: 0,
							max: 100,
							labels: {
								enabled: false
							},
					
							lineWidth: 0,
							minorTickInterval: null,
							tickPixelInterval: 400,
							tickWidth: 0
						},
						plotOptions: {
							solidgauge: {
								innerRadius: '90%'
							}
						},
						series: [{
							name: 'Speed',
							data: [scope.data],
							dataLabels: {
								enabled: false
							}
						}]
					});
				});
			}
		};
	}]);
	
	adminModuleApp.directive('linechart', ['$rootScope',function($rootScope) {
		return {
			restrict: 'EC',
			template: '<div></div>',
			scope: {
				title: '@',
				data: '='
			},
			link: function (scope, element) {
				scope.$watch('data',function() {
					Highcharts.chart(element[0], {
						chart: {
							backgroundColor: '#00A65A',
							type: 'line',
							gridLineColor: '#00A65A'
						},
						title: {
							text: 'Last 14 days success vs. total jobs',
							align:'left',
							style: {
								color: '#FFFFFF'
							}
						},
						subtitle: {
							text: '',
							x: -20
						},
						xAxis: {
							categories: scope.data.cats,
							gridLineWidth: 0,
							minorGridLineWidth: 0,
							labels:{
								enabled:false
							},
							lineColor: 'transparent',
							minorTickLength: 0,
							tickLength: 0
						},
						yAxis: {
							title: {
								text: ''
							},
							plotLines: [{
								value: 0,
								width: 0,
								color: '#F56954'
							}],
							gridLineWidth: 0,
							minorGridLineWidth: 0,
							labels:{
								enabled:false
							}
						},
						colors: ['#FFFFFF'],
						tooltip: {
							valueSuffix: ''
						},
						legend: {
							layout: 'vertical',
							align: 'bottom',
							verticalAlign: 'middle',
							borderWidth: 0,
							enabled:false
						},
						series: [{
							name: 'Successfull Jobs',
							data: scope.data.values
						}]
					});
				});
			}
		};
	}]);
	
	adminModuleApp.directive('menuhandler', ['$window','$timeout',function($window,$timeout) {
		return {
			restrict: 'AEC',
			link: function (scope, element,attrs) {
				var resizeBox = function() {
					var navDivNum	=	$('.navLinks').length;
					var navDivWidth	=	document.querySelectorAll(".navDiv")[0].clientWidth;
					if((navDivWidth+400) >= $window.outerWidth) {
						var thisVarWidth	=	450;
						var i = 1;
						$('.navLinks').each(function() {
							thisVarWidth	+=	$(this).outerWidth();
							if(thisVarWidth >= $('.navDiv').outerWidth()) {
								scope.checkArrHead.push(i);
								scope.$apply();
							}
							i++;
						});
					} else {
					}
					scope.$digest();
				};
				$timeout(function() {
					resizeBox();
				},1000);
				angular.element($window).bind('resize', function(){
					$timeout(function() {
						resizeBox();
					},200);
				});
				scope.$on("$destroy",function() {
					element.remove();
				}); 
			}
		}
	}]);
	
	
	adminModuleApp.directive('numbersonlywithdecimal', function(){
		return {
		require: 'ngModel',
		link: function(scope, element, attrs, modelCtrl) {
			modelCtrl.$parsers.push(function (inputValue) {
				if (inputValue == undefined) return '' 
				var transformedInput = inputValue.replace(/[^0-9\.]/g, ''); 
				if (transformedInput!=inputValue) {
					modelCtrl.$setViewValue(transformedInput);
					modelCtrl.$render();
				}
					return transformedInput;         
				});
			}
		};
	});
	
	adminModuleApp.directive('numbersonly', function(){
		return {
		require: 'ngModel',
		link: function(scope, element, attrs, modelCtrl) {
			modelCtrl.$parsers.push(function (inputValue) {
				if (inputValue == undefined) return '' 
				var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
				if (transformedInput!=inputValue) {
					modelCtrl.$setViewValue(transformedInput);
					modelCtrl.$render();
				}
					return transformedInput;         
				});
			}
		};
	});
	
	//Directive used to create autocomplete
	adminModuleApp.directive('showautosuggest',function(APIServices){
		return {
			link :  function (scope, element, attrs) {
				$(element).autocomplete({
					minLength:1,
					source:function (request, response) {
						scope.showLoader	=	1;
						scope.delBoy.supId	=	0;
						APIServices.getDelBoyAutoSuggest(request.term).success(function (data) {
							scope.showLoader	=	0;
							var suggestions = [];
							if(data.error == 0) {
								$.each(data.data,function(i,val) {
									suggestions.push({'label': val.name,'value':val.id});
								});
							} else {
								suggestions.push({'label': 'No Records Found','value':""});
							}
							response(suggestions);
						});
					},
					focus:function (event, ui) {
						if(ui.item.value != '') {
							//element.val(ui.item.label);
						}
						return false;
					},
					select : function(event,ui) {
						if(ui.item.value != '') {
							element.val(ui.item.label);
							scope.delBoy.supId	=	ui.item.value;
							scope.$apply();
						}
						return false;
					},
					change:function (event, ui) {
						if (ui.item === null) {
							scope.isDisabled	=	false;
						}
					}
				}).keyup(function (e) {
					if(e.which === 13) {
						$(".ui-autocomplete").hide();
					}            
				}).data("ui-autocomplete")._renderItem = function (ul, item) {
					 return $("<li></li>")
						 .data("item.autocomplete", item)
						 .append("<a>" + item.label + "</a>")
						 .appendTo(ul);
				};
				
				scope.$on("$destroy",function() {
					element.remove();
				}); 
			}
		}
	});
	
	//Directive used to create autocomplete
	adminModuleApp.directive('showautosuggestcity',function(APIServices){
		return {
			link :  function (scope, element, attrs) {
				$(element).autocomplete({
					minLength:1,
					source:function (request, response) {
						scope.showLoader	=	2;
						scope.autoValCity	=	0;
						APIServices.getCityAutoSuggest(request.term).success(function (data) {
							scope.showLoader	=	0;
							var suggestions = [];
							if(data.error == 0) {
								$.each(data.data,function(i,val) {
									suggestions.push({'label': val.city,'value':val.id});
								});
							} else {
								suggestions.push({'label': 'No Records Found','value':""});
							}
							response(suggestions);
						});
					},
					focus:function (event, ui) {
						if(ui.item.value != '') {
							//element.val(ui.item.label);
						}
						return false;
					},
					select : function(event,ui) {
						if(ui.item.value != '') {
							element.val(ui.item.label);
							scope.autoValCity	=	1;
							scope.chipReadonly	=	false;
							scope.$apply();
						}
						return false;
					},
					change:function (event, ui) {
						if (ui.item === null) {
							scope.isDisabled	=	false;
						}
					}
				}).keyup(function (e) {
					if(e.which === 13) {
						$(".ui-autocomplete").hide();
					}            
				}).data("ui-autocomplete")._renderItem = function (ul, item) {
					 return $("<li></li>")
						 .data("item.autocomplete", item)
						 .append("<a>" + item.label + "</a>")
						 .appendTo(ul);
				};
				
				scope.$on("$destroy",function() {
					element.remove();
				}); 
			}
		}
	});
	
	//Directive used to create autocomplete
	adminModuleApp.directive('showautosuggestpin',function(APIServices){
		return {
			link :  function (scope, element, attrs) {
				$(element).autocomplete({
					minLength:1,
					source:function (request, response) {
						scope.showLoader	=	2;
						scope.autoValCity	=	0;
						APIServices.pincodeAutoSuggest(request.term,scope.delBoy.city).success(function (data) {
							scope.showLoader	=	0;
							var suggestions = [];
							if(data.error == 0) {
								$.each(data.data,function(i,val) {
									suggestions.push({'label': val});
								});
							} else {
								suggestions.push({'label': 'No Records Found','value':""});
							}
							response(suggestions);
						});
					},
					focus:function (event, ui) {
						if(ui.item.value != '') {
							//element.val(ui.item.label);
						}
						return false;
					},
					select : function(event,ui) {
						if(ui.item.value != '') {
							element.val("");
							scope.autoValCity	=	1;
							scope.delBoy.pincode.push(ui.item.label);
							scope.$apply();
						}
						return false;
					},
					change:function (event, ui) {
						if (ui.item === null) {
							scope.isDisabled	=	false;
						}
					}
				}).keyup(function (e) {
					if(e.which === 13) {
						$(".ui-autocomplete").hide();
					}            
				}).data("ui-autocomplete")._renderItem = function (ul, item) {
					 return $("<li></li>")
						 .data("item.autocomplete", item)
						 .append("<a>" + item.label + "</a>")
						 .appendTo(ul);
				};
				
				scope.$on("$destroy",function() {
					element.remove();
				}); 
			}
		}
	});
	
	//Directive to create lazyload
	adminModuleApp.directive("lazyloaddelboys", function ($window,$rootScope,APIServices) {
		return {
			restrict:'AEC',
			link: function(scope, element, attrs) {
				var allSet	=	0;
				var dataHandler	=	0;
				scope.showLazyLoader	=	0;
				angular.element($window).bind("scroll", function() {
					if ($(window).scrollTop() >= ($(document).height() - $(window).height())) {
						if(dataHandler == 0) {
							scope.pgno 	=	scope.pgno+1;
							scope.showLazyLoader	=	1;
							APIServices.getAllDelBoys(scope.pgno).success(function(response) {
								scope.showLazyLoader	=	0;
								if(response.error	==	0) {
									angular.forEach(response.data,function(value,key) {
										$rootScope.delBoysAll.data.push(value);
									});
								} else {
									dataHandler	=	1;
								}
							});
						}
					}
					scope.$apply();
					$rootScope.$apply();
				});
				
				scope.$on("$destroy",function() {
					element.remove();
					angular.element(window).unbind('scroll');
				}); 
			}
		}
	});
	
	//Directive to create lazyload
	adminModuleApp.directive("lazyload", function ($window,$rootScope,APIServices) {
		return {
			restrict:'AEC',
			link: function(scope, element, attrs) {
				var allSet	=	0;
				var dataHandler	=	0;
				scope.showLazyLoader	=	0;
				element.bind("scroll", function() {
					if(($(this).scrollTop() + $(this).innerHeight()) >= $(this)[0].scrollHeight) {
						if(dataHandler == 0) {
							scope.pgno 	=	scope.pgno+1;
							scope.showLazyLoader	=	1;
							APIServices.showTier3PkgBudget(scope.pgno).success(function(response) {
								scope.showLazyLoader	=	0;
								if(response.errorcode	==	0) {
									angular.forEach(response.data,function(value,key) {
										scope.budgetData.data.push(value);
									});
								} else {
									dataHandler	=	1;
								}
							});
						}
					}
					scope.$apply();
				});
				
				scope.$on("$destroy",function() {
					element.remove();
					angular.element(window).unbind('scroll');
				}); 
			}
		}
	});
	
	
	
	adminModuleApp.directive('contractcityauto',['APIServices','$rootScope', function(APIServices,$rootScope) {
		return {
				link :  function (scope, element, attr) {
					$(element).autocomplete({
						minLength:1,
						source:function (request, response) {
							APIServices.getCities(request.term,attr.id).success(function(data){
									var suggestions = [];
									if(data.errorcode == 0) {
										$.each(data.data,function(i,val) {
											suggestions.push({'label': val});
										});
									}else if(data.errorcode        ==      1) {
										suggestions.push({'label':'No Matches'});
									}	 
								response(suggestions);
								$('.ui-autocomplete').css('left','6');
								$('.ui-autocomplete').css('top','6');
								});
						},
						focus:function (event, ui) {
							if(ui.item.label != 'No Matches') {
								element.val(ui.item.label);
							}
							return false;
						},
						select : function(event,ui) {
							if(ui.item.label	!=	'No Matches') {
									$rootScope.cityselcampaign[attr.id]	=	ui.item.label;
									scope.$apply(function() {
										scope.isDisabled	=	false;
									});
							}
							return false;
						},
						change:function (event, ui) {
							if (ui.item === null) {
								scope.isDisabled	=	false;
							}
						}
					}).data( "uiAutocomplete" )._renderItem = function( ul, item ) {
						ul.css('z-index','50');
						//~ ul.css('width','50');
						if(item.value != undefined)
							return $( "<li style='overflow:visible;'></li>" ).data( "item.autocomplete", item ).append( "<a><span style='text-transform: capitalize;'>" + item.value + "</span></a>" ).appendTo( ul );
						else
							return $( "<li style='overflow:visible;'></li>" ).data( "item.autocomplete", item ).append( "<a><span> No Matches Found.</span></a>" ).appendTo( ul );
					};
					scope.$on("$destroy",function() {
						element.remove();
					}); 
				}
		}
	}]);
	
	
	//Directive can be used to create a button to go back to login Page
	adminModuleApp.directive('gobackhome',function() {
		return {
			scope: {},
			restrict: 'AEC',
			replace: false,
			transclude: false,
			link: function(scope,element,attrs) {
				element.bind('click',function() {
					window.location.href='../tmAlloc/indexTm.php';
				});
				scope.$on("$destroy",function() {
					element.remove();
				}); 
			}
		}
	});
	
});
