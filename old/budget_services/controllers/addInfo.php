<?
class addInfo extends Controller { 

	function __construct() { 
	parent::__construct(); 
	} 

	function getCities() { 
	echo $this->view->addInfo	=	$this->model->getCities(); 
	} 
	function getBudgetLog() { 
	echo $this->view->budgetInfo	=	$this->model->getBudgetLog(); 
	} 
}
?>
