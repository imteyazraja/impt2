<?
class Model { 
	protected $db; 
	function __construct($config=""){ 
	
		require "config/database.php";
		require "config/config.php";
		$this->db = $db;

		if(is_array($config)){
		   $this->db = new Database();
		}
	}
}
?>
