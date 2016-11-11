<?
class pdgbudget extends Controller { 
	function __construct() { 
		parent::__construct(); 
	} 
	function getTier1PDGBudget() { 
		echo $this->view->budgetInfo	=	$this->model->getTier1PDGBudget(); 
	} 
	function getTier2TeamBdgtPdg() { 
		echo $this->view->budgetInfo	=	$this->model->getTier2TeamBdgtPdg(); 
	} 
	function getTier2CatBdgtPdg() { 
		echo $this->view->budgetInfo	=	$this->model->getTier2CatBdgtPdg(); 
	} 
	function getTier3TeamBdgtPdg() { 
		echo $this->view->budgetInfo	=	$this->model->getTier3TeamBdgtPdg(); 
	} 
	function getTier3CatBdgtPdg() { 
		echo $this->view->budgetInfo	=	$this->model->getTier3CatBdgtPdg(); 
	} 
	function getZoneTeamBdgtPdg() { 
		echo $this->view->budgetInfo	=	$this->model->getZoneTeamBdgtPdg(); 
	} 
	function getZoneCatBdgtPdg() { 
		echo $this->view->budgetInfo	=	$this->model->getZoneCatBdgtPdg(); 
	} 
	function getRemoteBudgetPdg() { 
		echo $this->view->budgetInfo	=	$this->model->getRemoteBudgetPdg(); 
	} 
	function updateTier1PDG() { 
		echo $this->view->budgetInfo	=	$this->model->updateTier1PDG(); 
	} 
	function updateTier2PDG() { 
		echo $this->view->budgetInfo	=	$this->model->updateTier2PDG(); 
	} 
	function updateTier3PDG() { 
		echo $this->view->budgetInfo	=	$this->model->updateTier3PDG(); 
	} 
	function updateZonePDG() { 
		echo $this->view->budgetInfo	=	$this->model->updateZonePDG(); 
	} 
	function updateRemoteBudgetPdg() { 
		echo $this->view->budgetInfo	=	$this->model->updateRemoteBudgetPdg(); 
	} 
} 
?> 
