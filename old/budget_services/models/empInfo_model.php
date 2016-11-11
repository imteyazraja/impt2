<?
class EmpInfo_Model extends Model { 

public function __construct() { 
parent::__construct(); 
} 

public function getEmployeesInfo($empCode) { 

$retArr['errorCode']	=	0; 
$retArr['errorStatus']	=	'Data Successfully Returned'; 
$params = array(); 
$params['url'] = HRMODULE . '/employee/fetch_employee_info/' . $empCode; 
$params['formate'] = 'basic'; 
$content_emp = Utility::curlCall($params); 
$retArr['hrInfo']	=	json_decode($content_emp,true);	
return json_encode($retArr); 
} 

public function getEmpAccessInfo() { 

header('Content-Type: application/json'); 
$params	=	json_decode(file_get_contents('php://input'),true); 

$paramsSend	=	array(); 
$paramsSend['action']	=	'accessdetails'; 
$paramsSend['empcode']	=	$params['empcode']; 


$curlParams = array(); 
$curlParams['url'] = JDBOX_API.'/services/empaccess_info.php'; 
$curlParams['formate'] = 'basic'; 
$curlParams['method'] = 'post'; 
$curlParams['headerJson'] = 'json'; 
$curlParams['postData'] = json_encode($paramsSend); 
$singleCheck	=	Utility::curlCall($curlParams); 
return $singleCheck; 
} 
} 
?>
