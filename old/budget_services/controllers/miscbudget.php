<?
class miscbudget extends Controller { 
	function __construct() { 
		parent::__construct(); 
	} 
	function getBannerBudgetInfo() { 
		echo $this->view->budgetInfo	=	$this->model->getBannerBudgetInfo(); 
	} 
	function updateBannerBudget() { 
		echo $this->view->budgetInfo	=	$this->model->updateBannerBudget(); 
	} 
	function getJdrrBudgetInfo() { 
		echo $this->view->budgetInfo	=	$this->model->getJdrrBudgetInfo(); 
	} 
	function updateJdrrBudget() { 
		echo $this->view->budgetInfo	=	$this->model->updateJdrrBudget(); 
	} 
	function getNationalListingBudget(){ 
		echo $this->view->budgetInfo	=	$this->model->getNationalListingBudget(); 
	} 
	function updateNationalBudget(){ 
		echo $this->view->budgetInfo	=	$this->model->updateNationalBudget(); 
	} 
} 
?> 
