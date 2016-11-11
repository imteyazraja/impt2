<?
class empInfo extends Controller { 

	function __construct() { 
		parent::__construct(); 
	} 

	function getEmployeesInfo($empcode) { 
		echo $this->view->empInfo	=	$this->model->getEmployeesInfo($empcode); 
	} 
	function getEmpAccessInfo(){ 
		echo $this->view->empInfo	=	$this->model->getEmpAccessInfo(); 
	}
} 
?>
