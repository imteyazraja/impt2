define(['./module'], function (tmeModuleApp) {
	'use strict';
	tmeModuleApp.filter('capitalize', function() {
		return function(input, scope) {
			if (input!=null) {
				input = input.toLowerCase();
			}
			return input.substring(0,1).toUpperCase()+input.substring(1);
		}
	});
	
	tmeModuleApp.filter('convertToUpper', function() {
		return function (input){
        if(input) { //when input is defined the apply filter
           input = input.toLowerCase().replace(/\b[a-z]/g, function(letter) {
              return letter.toUpperCase();
           });
        }
        return input; 
    }   
	});
	
	tmeModuleApp.filter('dayConverter', function() {
		return function(input, scope) {
			if (input!=null) {
				switch(input){
					case 'mon': input='Monday'; 	break;
					case 'tue': input='Tuesday'; 	break;
					case 'wed': input='Wednesday'; 	break;
					case 'thu': input='Thursday'; 	break;
					case 'fri': input='Friday'; 	break;
					case 'sat': input='Saturday'; 	break;
					case 'sun': input='Sunday'; 	break;
				}
			}
			return input;
		}
	});	
	
	tmeModuleApp.filter('unique', function() {
		   return function(collection, keyname) {
			  var output = [], 
				  keys = [];

			  angular.forEach(collection, function(item) {
				  var key = item[keyname];
				  if(keys.indexOf(key) === -1) {
					  keys.push(key);
					  output.push(item);
				  }
			  });

			  return output;
		   };
	});
	
	tmeModuleApp.filter('Cntletter',function() {
		return function(input, scope) {
			if (input!=null) {
				input = input.length;
			}
			return input;
		};
	});
	
	
	tmeModuleApp.filter('urlEncode',function() {
		return function(input, scope) {
			return encodeURIComponent(input);
		}
	});

	tmeModuleApp.filter('setDate',function() {
		return function(input, scope) {
			var t = input.split(/[- :]/);
			var date = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
			return date.toDateString();
		}
	});
	tmeModuleApp.filter('setDateTime',function() {
		return function(input, scope) {
			var t = input.split(/[- :]/);
			var date = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
			var dStr =  date.toDateString();
			dStr = dStr+' '+ t[3]+':'+ t[4]+':'+ t[5]
			return dStr;
		}
	});
	tmeModuleApp.filter('roundVals',function() {
		return function(input, params) {
			var retVal = input.toString().split(".");
			if(retVal[1] !== undefined) {
				var subStr	=	retVal[1].slice(0,params);
				return retVal[0]+'.'+subStr;
			} else {
				return retVal[0];
			}
		}
	});
	
	tmeModuleApp.filter('stripNames',function() {
		return function(input) {
			var retVal = input.toString().split(" ");
			if(retVal[1] !== undefined) {
				var subStr	=	retVal[1].slice(0,1);
				var subStr2	=	retVal[0].slice(0,1);
				return subStr2+''+subStr;
			} else {
				return retVal[0].slice(0,1);
			}
		}
	});
	
	tmeModuleApp.filter('range', function() {
		return function(input, total) {
			total = parseInt(total);
			for (var i=0; i<total; i++)
			input.push(i);
			return input;
		};
	});
	
	tmeModuleApp.filter('split', function() {
			return function(input, splitChar, splitIndex) {
				if(input != null) {
					return input.split(splitChar)[splitIndex];
				}
			}
    });
    
	tmeModuleApp.filter('splitAll', function() {
		return function(input, splitChar) {
			if(input != null) {
				return input.split(splitChar);
			}
		}
    });
    
    tmeModuleApp.filter('replace', function() {
		return function(input, firstChar,sencondChar) {
			if(input != null) {
				return input.replace(/\|~\|/g, sencondChar);
			}
		}
    });
    
    tmeModuleApp.filter('indexReplace', function() {
		return function(input) {
			if(input != null) {
				var premium_identifier 	= 	input.substring(input.lastIndexOf("___"));
				var premium_flag 		= 	premium_identifier.replace('___', '');
				if(premium_flag	==	1) {
					var exact_catname 		= 	input.replace(premium_identifier, '')+' [Premium Category]';
				} else {
					var exact_catname 		= 	input.replace(premium_identifier, '');
				}
				
				return exact_catname;
			}
		}
    });
    
    tmeModuleApp.filter('firstLetterArea', function() {
		return function (input, letter) {
			input = input || [];
			var out = [];
			if(letter	==	'all') {
				input.forEach(function (item) {
					out.push(item);
				});
			} else {
				input.forEach(function (item) {
					if (item.area.charAt(0).toLowerCase() == letter) {
						out.push(item);
					}
				});
			}
			return out;
		}
    });
    
    tmeModuleApp.filter('setUniqueArray', function() {
		return function (input) {
			var sendArr	=	[];
			var strSendPincode	=	"";
			
			angular.forEach(input,function(value,key) {
				if(sendArr.indexOf(value) == -1) {
					sendArr.push(value);
				}
			});
			return sendArr.length;
		}
    });
    
    tmeModuleApp.filter('offset', function() {
        return function(input, start) {
            start = parseInt(start, 10);
            return input.slice(start);
        };
    });
    
    tmeModuleApp.filter('setDecimal', function ($filter) {
		return function (input, places) {
			if (isNaN(input)) return input;
			var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
			return Math.round(input * factor) / factor;
		};
	});
});
