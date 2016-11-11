<?
$db = array(); 

##	PRODUCTION DATABASE SETTINGS	## 
$db['db_local'] = array(DB_HOST_LOC, DB_USER_LOCAL, DB_PASS_LOCAL, DB_NAME_LOC); 
$db['db_tme'] = array(DB_HOST_LOC, DB_USER_LOCAL, DB_PASS_LOCAL, DB_NAME_TME); 
$db['db_iro'] = array(DB_HOST_LOC, DB_USER_LOCAL, DB_PASS_LOCAL, DB_NAME_IRO); 
$db['db_alloc'] = array(DB_HOST_LOC, DB_USER_LOCAL, DB_PASS_LOCAL, DB_NAME_ALLOC); 
$db['db_local_slave'] = array(DB_HOST_LOC_SLAVE, DB_USER_LOCAL, DB_PASS_LOCAL, DB_NAME_LOC); 
$db['db_tme_slave'] = array(DB_HOST_LOC_SLAVE, DB_USER_LOCAL, DB_PASS_LOCAL, DB_NAME_TME); 
$db['db_iro_slave'] = array(DB_HOST_LOC_SLAVE, DB_USER_LOCAL, DB_PASS_LOCAL, DB_NAME_IRO); 
$db['db_alloc_slave'] = array(DB_HOST_LOC_SLAVE, DB_USER_LOCAL, DB_PASS_LOCAL, DB_NAME_ALLOC); 
$db['db_finance'] = array(DB_HOST_FIN, DB_USER_LOCAL, DB_PASS_LOCAL, DB_NAME_FIN); 
$db['db_finance_slave'] = array(DB_HOST_FIN_SLAVE, DB_USER_LOCAL, DB_PASS_LOCAL, DB_NAME_FIN); 
$db['db_finance_budget'] = array(DB_HOST_FIN_BUDGET, DB_USER_LOCAL, DB_PASS_LOCAL, DB_NAME_FIN_BUDGET); 
$db['db_sms'] = array(DB_HOST_SMS, DB_USER_SMS, DB_PASS_SMS, DB_NAME_SMS); 
$db['db_idc'] = array(DB_HOST_IDC, DB_USER_IDC, DB_PASS_IDC, DB_NAME_IDC_LOCAL); 
$db['db_idc_online'] = array(DB_HOST_IDC, DB_USER_IDC, DB_PASS_IDC, DB_NAME_IDC_ONLINE); 
$db['db_idc_dialer'] = array(DB_HOST_IDC, DB_USER_IDC, DB_PASS_IDC, DB_NAME_IDC_DIALER); 
$db['db_idc_login'] = array(DB_HOST_IDC, DB_USER_IDC, DB_PASS_IDC, DB_NAME_IDC_LOGIN); 
$db['db_national'] = array(DB_HOST_IDC, DB_USER_IDC, DB_PASS_IDC, DB_NAME_NATIONAL); 
?>
