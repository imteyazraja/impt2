<?
class pkgbudget extends Controller { 
	function __construct() { 
		parent::__construct(); 
	} 
	function getTier1PackageBudget() { 
		echo $this->view->budgetInfo	=	$this->model->getTier1PackageBudget(); 
	} 
	function getTier2TeamBdgtPkg() { 
		echo $this->view->budgetInfo	=	$this->model->getTier2TeamBdgtPkg(); 
	} 
	function getTier2CatBdgtPkg() { 
		echo $this->view->budgetInfo	=	$this->model->getTier2CatBdgtPkg(); 
	} 
	function getTier2ExpBdgtPkg() { 
		echo $this->view->budgetInfo	=	$this->model->getTier2ExpBdgtPkg(); 
	} 
	function getTier3TeamBdgtPkg() { 
		echo $this->view->budgetInfo	=	$this->model->getTier3TeamBdgtPkg(); 
	} 
	function getTier3CatBdgtPkg() { 
		echo $this->view->budgetInfo	=	$this->model->getTier3CatBdgtPkg(); 
	} 
	function getTier3ExpBdgtPkg() { 
		echo $this->view->budgetInfo	=	$this->model->getTier3ExpBdgtPkg(); 
	} 
	function getZoneTeamBdgtPkg() { 
		echo $this->view->budgetInfo	=	$this->model->getZoneTeamBdgtPkg(); 
	} 
	function getZoneCatBdgtPkg() { 
		echo $this->view->budgetInfo	=	$this->model->getZoneCatBdgtPkg(); 
	} 
	function getZoneExpBdgtPkg() { 
		echo $this->view->budgetInfo	=	$this->model->getZoneExpBdgtPkg(); 
	} 
	function getRemoteBudgetPkg() { 
		echo $this->view->budgetInfo	=	$this->model->getRemoteBudgetPkg(); 
	} 
	function showTier2PkgBudget() { 
		echo $this->view->budgetInfo	=	$this->model->showTier2PkgBudget(); 
	} 
	function showTier3PkgBudget() { 
		echo $this->view->budgetInfo	=	$this->model->showTier3PkgBudget(); 
	} 
	function updateTier1Package() { 
		echo $this->view->budgetInfo	=	$this->model->updateTier1Package(); 
	} 
	function updateTier2Package() { 
		echo $this->view->budgetInfo	=	$this->model->updateTier2Package(); 
	} 
	function updateTier3Package() { 
		echo $this->view->budgetInfo	=	$this->model->updateTier3Package(); 
	} 
	function updateZonePackage() { 
		echo $this->view->budgetInfo	=	$this->model->updateZonePackage(); 
	} 
	function updateRemoteBudgetPkg() { 
		echo $this->view->budgetInfo	=	$this->model->updateRemoteBudgetPkg(); 
	}
} 
?> 
