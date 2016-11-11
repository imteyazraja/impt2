<?
class Pkgbudget_Model extends Model { 
function __construct() { 
parent::__construct(); 
} 

public function getTier1PackageBudget() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'tier1pkgbdgt'; 
$paramsSend['data_city']	=	$params['data_city']; 


$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/package_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function getTier2TeamBdgtPkg() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'tier2teampkg'; 
$paramsSend['data_city']	=	$params['data_city'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/package_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function getTier2CatBdgtPkg() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'tier2catpkg'; 
$paramsSend['data_city']	=	$params['data_city'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/package_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function getTier2ExpBdgtPkg() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'tier2exppkg'; 
$paramsSend['data_city']	=	$params['data_city'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/package_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function getTier3TeamBdgtPkg() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'tier3teampkg'; 
$paramsSend['data_city']	=	$params['data_city'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/package_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function getTier3CatBdgtPkg() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'tier3catpkg'; 
$paramsSend['data_city']	=	$params['data_city'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/package_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function getTier3ExpBdgtPkg() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'tier3exppkg'; 
$paramsSend['data_city']	=	$params['data_city'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/package_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function getZoneTeamBdgtPkg() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'zoneteampkg'; 
$paramsSend['data_city']	=	$params['data_city']; 
$paramsSend['zone_name']	=	$params['zone_name']; 


$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/package_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function getZoneCatBdgtPkg() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'zonecatpkg'; 
$paramsSend['data_city']	=	$params['data_city']; 
$paramsSend['zone_name']	=	$params['zone_name']; 


$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/package_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function getZoneExpBdgtPkg() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'zoneexppkg'; 
$paramsSend['data_city']	=	$params['data_city']; 
$paramsSend['zone_name']	=	$params['zone_name']; 


$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/package_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function getRemoteBudgetPkg() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'remotepkg'; 
$paramsSend['data_city']	=	$params['data_city']; 

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/package_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function showTier2PkgBudget() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'showt2pkgbdgt'; 
$paramsSend['data_city']	=	'remote'; 

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/package_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function showTier3PkgBudget() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'showt3pkgbdgt'; 
$paramsSend['data_city']	=	'remote'; 
$paramsSend['pgno']	=	$params['pgno']; 

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/package_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function updateTier1Package() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'updttier1pkg'; 
$paramsSend['tier1bdgt']	=	$params['tier1bdgt']; 
$paramsSend['data_city']	=	$params['data_city']; 
$paramsSend['ucode']	=	$params['ucode']; 
$paramsSend['uname']	=	$params['uname']; 
$paramsSend['ipaddr']	=	$params['ipaddr'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/package_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function updateTier2Package() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'updttier2pkg'; 
$paramsSend['type']	=	$params['type']; 
$paramsSend['tier2bdgt']	=	$params['tier2bdgt']; 
$paramsSend['data_city']	=	$params['data_city']; 
$paramsSend['ucode']	=	$params['ucode']; 
$paramsSend['uname']	=	$params['uname']; 
$paramsSend['ipaddr']	=	$params['ipaddr'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/package_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function updateTier3Package() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'updttier3pkg'; 
$paramsSend['type']	=	$params['type']; 
$paramsSend['tier3bdgt']	=	$params['tier3bdgt']; 
$paramsSend['data_city']	=	$params['data_city']; 
$paramsSend['ucode']	=	$params['ucode']; 
$paramsSend['uname']	=	$params['uname']; 
$paramsSend['ipaddr']	=	$params['ipaddr'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/package_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function updateZonePackage() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'updtzonepkg'; 
$paramsSend['type']	=	$params['type']; 
$paramsSend['zonebdgt']	=	$params['zonebdgt']; 
$paramsSend['data_city']	=	$params['data_city']; 
$paramsSend['zone_name']	=	$params['zone_name']; 
$paramsSend['ucode']	=	$params['ucode']; 
$paramsSend['uname']	=	$params['uname']; 
$paramsSend['ipaddr']	=	$params['ipaddr'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/package_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function updateRemoteBudgetPkg() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'updtremotepkg'; 
$paramsSend['remotebdgt']	=	$params['remotebdgt']; 
$paramsSend['data_city']	=	$params['data_city']; 
$paramsSend['ucode']	=	$params['ucode']; 
$paramsSend['uname']	=	$params['uname']; 
$paramsSend['ipaddr']	=	$params['ipaddr'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/package_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 

} 
?>
