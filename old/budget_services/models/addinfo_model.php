<?
class AddInfo_Model extends Model { 

public function __construct() { 
parent::__construct(); 
} 

public function getCities() { 

header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'fetchcity'; 
$paramsSend['srchcity']	=	$params['srchcity']; 
$paramsSend['campaign']	=	$params['campaign']; 


$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/budget_additional_info.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
public function getBudgetLog() { 
header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'bdgtlog'; 
$paramsSend['campaign']	=	$params['campaign']; 


$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/budget_additional_info.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
} 
?>
