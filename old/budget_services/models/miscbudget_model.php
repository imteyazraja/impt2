<?
class Miscbudget_Model extends Model { 
function __construct() { 
parent::__construct(); 
} 

public function getBannerBudgetInfo() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'bannerbdgt'; 
$paramsSend['data_city']	=	$params['data_city']; 


$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/misc_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function updateBannerBudget() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 


$paramsSend	=	array(); 
$paramsSend['action']	=	'updtbnrbdgt'; 

$paramsSend['bannerbdgt']	=	$params['bannerbdgt']; 
$paramsSend['data_city']	=	$params['data_city']; 
$paramsSend['ucode']	=	$params['ucode']; 
$paramsSend['uname']	=	$params['uname']; 
$paramsSend['ipaddr']	=	$params['ipaddr'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/misc_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function getJdrrBudgetInfo() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'jdrrbdgt'; 
$paramsSend['data_city']	=	$params['data_city']; 


$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/misc_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function updateJdrrBudget() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 


$paramsSend	=	array(); 
$paramsSend['action']	=	'updtjdrrbdgt'; 

$paramsSend['jdrrbdgt']	=	$params['jdrrbdgt']; 
$paramsSend['data_city']	=	$params['data_city']; 
$paramsSend['ucode']	=	$params['ucode']; 
$paramsSend['uname']	=	$params['uname']; 
$paramsSend['ipaddr']	=	$params['ipaddr'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/misc_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function getNationalListingBudget() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'nationalbdgt'; 
$paramsSend['data_city']	=	$params['data_city']; 


$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/misc_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function updateNationalBudget() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 


$paramsSend	=	array(); 
$paramsSend['action']	=	'updtnatbdgt'; 

$paramsSend['natbdgt']	=	$params['natbdgt']; 
$paramsSend['data_city']	=	$params['data_city']; 
$paramsSend['ucode']	=	$params['ucode']; 
$paramsSend['uname']	=	$params['uname']; 
$paramsSend['ipaddr']	=	$params['ipaddr'];	

$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/misc_budget_update.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
} 
?>
