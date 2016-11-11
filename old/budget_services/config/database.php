<?
define('DB_TYPE', 'mysqli'); 
GLOBAL $parseConf; 

# PART ADDED BECAUSE THE SAME FILE IS USED FOR CONSTANT CONFIG OF OTHER MODULES 
$serverAddr	=	$_SERVER['SERVER_ADDR']; 
$serverPointer	=	explode('.',$serverAddr); 
if($serverPointer[2]	==	'64') { 
$parseConf	=	parse_ini_file(dirname(__FILE__) . '../../tme_services/public/files/developmentip.conf',1); 
} else { 
$parseConf	=	parse_ini_file(dirname(__FILE__) . '../../tme_services/public/files/productionip.conf',1); 
} 
if($parseConf['servicefinder']['live'] == 0) { 
# DEVELOPMENT ENVIORONMENT SETTINGS 
# LOCAL SERVER SETTINGS 
if($parseConf['servicefinder']['remotecity'] == 0) { 
define('DB_HOST_LOC', '172.29.67.213'); 
define('DB_HOST_LOC_SLAVE', '172.29.67.213'); 
} else { 
define('DB_HOST_LOC', '192.168.6.96'); 
define('DB_HOST_LOC_SLAVE', '192.168.6.96'); 
} 
define('DB_NAME_LOC', 'd_jds'); 
define('DB_NAME_TME', 'tme_jds'); 
define('DB_NAME_IRO', 'db_iro'); 
define('DB_NAME_ALLOC', 'allocation'); 
define('DB_USER_LOCAL', 'application'); 
define('DB_PASS_LOCAL', 's@myD#@mnl@sy'); 

# FINANCE SERVER SETTINGS 
define('DB_HOST_FIN', '172.29.67.215'); 
define('DB_HOST_FIN_SLAVE', '172.29.67.215'); 
define('DB_HOST_FIN_BUDGET', '172.29.67.215'); 
define('DB_NAME_FIN', 'db_finance'); 
define('DB_NAME_FIN_BUDGET', 'db_budgeting'); 
define('DB_USER_FIN', 'application'); 
define('DB_PASS_FIN', 's@myD#@mnl@sy'); 

# IDC 233/6.52 SERVER SETTINGS 
define('DB_HOST_IDC', '192.168.6.52'); 
define('DB_NAME_IDC_LOCAL', 'online_regis_mumbai'); 
define('DB_NAME_IDC_DIALER', 'db_dialer'); 
define('DB_NAME_IDC_LOGIN', 'login_details'); 
define('DB_NAME_IDC_ONLINE', 'online_regis'); 
define('DB_NAME_NATIONAL','db_national_listing'); 
define('DB_USER_IDC', 'jddb1'); 
define('DB_PASS_IDC', 'w1sem@n0ut'); 
} else { 
# PRODUCTION ENVIORONMENT SETTINGS 
# LOCAL SERVER SETTINGS 

if(!defined('SERVER_PARAM')) { 
define('SERVER_PARAM',$parseConf['servicefinder']['serviceparam']); 
} 

if(!defined('SERVER_CITY')) { 
define('SERVER_CITY',$parseConf['servicefinder']['servicecity']); 
} 
if($parseConf['servicefinder']['remotecity'] == 0) { 
define('DB_HOST_LOC', '172.29.'.SERVER_PARAM.'.171'); 
define('DB_HOST_LOC_SLAVE', '172.29.'.SERVER_PARAM.'.213'); 
define('DB_HOST_FIN', '172.29.'.SERVER_PARAM.'.161'); 
define('DB_HOST_FIN_SLAVE', '172.29.'.SERVER_PARAM.'.215'); 
define('DB_HOST_FIN_BUDGET', '172.29.'.SERVER_PARAM.'.124'); 
} else { 
define('DB_HOST_LOC', '192.168.17.171'); 
define('DB_HOST_LOC_SLAVE', '192.168.17.213'); 
define('DB_HOST_FIN', '192.168.17.161'); 
define('DB_HOST_FIN_SLAVE', '192.168.17.215'); 
define('DB_HOST_FIN_BUDGET', '192.168.17.124'); 
} 
define('DB_NAME_LOC', 'd_jds'); 
define('DB_NAME_TME', 'tme_jds'); 
define('DB_NAME_IRO', 'db_iro'); 
define('DB_NAME_ALLOC', 'allocation'); 
define('DB_USER_LOCAL', 'application'); 
define('DB_PASS_LOCAL', 's@myD#@mnl@sy'); 

# FINANCE SERVER SETTINGS 
define('DB_NAME_FIN', 'db_finance'); 
define('DB_USER_FIN', 'application'); 
define('DB_NAME_FIN_BUDGET', 'db_budgeting'); 
define('DB_PASS_FIN', 's@myD#@mnl@sy'); 

# IDC 233/6.52 SERVER SETTINGS 
define('DB_HOST_IDC', '192.168.17.233'); 
define('DB_NAME_IDC_LOCAL', 'online_regis_'.SERVER_CITY); 
define('DB_NAME_IDC_DIALER', 'db_dialer'); 
define('DB_NAME_IDC_LOGIN', 'login_details'); 
define('DB_NAME_IDC_ONLINE', 'online_regis'); 
define('DB_NAME_NATIONAL','db_national_listing'); 
define('DB_USER_IDC', 'jddb1'); 
define('DB_PASS_IDC', 'w1sem@n0ut'); 
} 

// SMS Server 
define('DB_HOST_SMS', '192.168.6.131'); 
define('DB_NAME_SMS', 'sms_email_sending'); 
define('DB_USER_SMS', 'application'); 
define('DB_PASS_SMS', 's@myD#@mnl@sy'); 
define('TBL_SMSEMAILSETTINGS', 'SmsEmailSettings'); 
?>
