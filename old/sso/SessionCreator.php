<?
session_start(); 
if($_GET['empcode'] != '') { 
$_SESSION['empcode']	=	$_GET['empcode']; 
$_SESSION['empname']	=	$_GET['empname']; 
$_SESSION['modules']	=	unserialize($_GET['modules']); 
$_SESSION['tokens']	=	unserialize($_GET['tokens']); 
$_SESSION['statId']	=	$_GET['st_id']; 
$_SESSION['primaryUrl']	=	$_GET['primUrl']; 
$json	=	json_encode("1"); 
$callback = $_GET['jsoncallback']; 
echo $callback.'('. $json . ')'; 
} 
?> 
