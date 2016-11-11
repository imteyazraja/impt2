<?
class Pdgbudget_Model extends Model { 
function __construct() { 
parent::__construct(); 
} 

public function getTier1PDGBudget() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'tier1pdgbdgt'; 
$paramsSend['data_city']	=	$params['data_city']; 


$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/pdg_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function getTier2TeamBdgtPdg() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'tier2teampdg'; 
$paramsSend['data_city']	=	$params['data_city'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/pdg_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function getTier2CatBdgtPdg() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'tier2catpdg'; 
$paramsSend['data_city']	=	$params['data_city'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/pdg_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function getTier3TeamBdgtPdg() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'tier3teampdg'; 
$paramsSend['data_city']	=	$params['data_city'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/pdg_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function getTier3CatBdgtPdg() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'tier3catpdg'; 
$paramsSend['data_city']	=	$params['data_city'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/pdg_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function getZoneTeamBdgtPdg() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'zoneteampdg'; 
$paramsSend['data_city']	=	$params['data_city']; 
$paramsSend['zone_name']	=	$params['zone_name']; 


$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/pdg_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function getZoneCatBdgtPdg() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'zonecatpdg'; 
$paramsSend['data_city']	=	$params['data_city']; 
$paramsSend['zone_name']	=	$params['zone_name']; 


$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/pdg_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function getRemoteBudgetPdg() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'remotepdg'; 
$paramsSend['data_city']	=	$params['data_city']; 

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/pdg_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function updateTier1PDG() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'updttier1pdg'; 
$paramsSend['tier1bdgt']	=	$params['tier1bdgt']; 
$paramsSend['data_city']	=	$params['data_city']; 
$paramsSend['ucode']	=	$params['ucode']; 
$paramsSend['uname']	=	$params['uname']; 
$paramsSend['ipaddr']	=	$params['ipaddr'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/pdg_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function updateTier2PDG() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'updttier2pdg'; 
$paramsSend['type']	=	$params['type']; 
$paramsSend['tier2bdgt']	=	$params['tier2bdgt']; 
$paramsSend['data_city']	=	$params['data_city']; 
$paramsSend['ucode']	=	$params['ucode']; 
$paramsSend['uname']	=	$params['uname']; 
$paramsSend['ipaddr']	=	$params['ipaddr'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/pdg_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function updateTier3PDG() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'updttier3pdg'; 
$paramsSend['type']	=	$params['type']; 
$paramsSend['tier3bdgt']	=	$params['tier3bdgt']; 
$paramsSend['data_city']	=	$params['data_city']; 
$paramsSend['ucode']	=	$params['ucode']; 
$paramsSend['uname']	=	$params['uname']; 
$paramsSend['ipaddr']	=	$params['ipaddr'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/pdg_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function updateZonePDG() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'updtzonepdg'; 
$paramsSend['type']	=	$params['type']; 
$paramsSend['zonebdgt']	=	$params['zonebdgt']; 
$paramsSend['data_city']	=	$params['data_city']; 
$paramsSend['zone_name']	=	$params['zone_name']; 
$paramsSend['ucode']	=	$params['ucode']; 
$paramsSend['uname']	=	$params['uname']; 
$paramsSend['ipaddr']	=	$params['ipaddr'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/pdg_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function updateRemoteBudgetPdg() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'updtremotepdg'; 
$paramsSend['remotebdgt']	=	$params['remotebdgt']; 
$paramsSend['data_city']	=	$params['data_city']; 
$paramsSend['ucode']	=	$params['ucode']; 
$paramsSend['uname']	=	$params['uname']; 
$paramsSend['ipaddr']	=	$params['ipaddr'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/pdg_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
} 
?>
