<?
class Controller { 

	function __construct() { 
		//echo 'Main controller'; 
		$this->view = new View(); 
	} 

	public function loadModel($name) {	
		$path = 'models/'.$name.'_model.php'; 
		if (file_exists($path)) { 
			require 'models/'.$name.'_model.php'; 
			$modelName = ucwords($name) . '_Model'; 
			//echo $modelName; die; 
			$this->model = new $modelName(); 
		}
	} 
} 
?>
