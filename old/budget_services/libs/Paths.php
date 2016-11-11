define("DOMAIN", "http://" . $_SERVER['HTTP_HOST'] . "/"); 
define("DOMAIN_MODULE", "http://" . $_SERVER['HTTP_HOST']); 
define("DOMAIN_MODULE_PUBLIC", "http://115.112.246.34:100/sso"); 
define("DOMAIN_MODULE_HARD","http://192.168.16.119");	//Floating IP for SSO master is 192.168.6.222, standby is 192.168.6.221 
define("HRMODULE","http://192.168.16.119/hrmodule"); 
define("DOC_ROOT", dirname(__FILE__) . '/../'); 
define("LOGS", DOC_ROOT . 'log/'); 
define("FILES", DOC_ROOT . 'public/files/'); 
define("FILE_PATH",DOMAIN.'public/files'); 
//define("USER_AGENT", $_SERVER['HTTP_USER_AGENT']); 
define("PUBLIC_PATH", DOMAIN.'public'); 
define("IMG_PATH", DOMAIN.'public/images'); 
define("JS_PATH", DOMAIN.'public/js'); 
define("CSS_PATH", DOMAIN.'public/css'); 
define('WEB_SERVICES','http://192.168.20.102:9001/web_services/'); 
define('MODULE',$parseConf['servicefinder']['module']); 

if($parseConf['servicefinder']['live'] == 0) { 
# DEVELOPMENT PATHS 
define("JDBOX_API","http://imteyazraja.jdsoftware.com/jdbox"); 

} else { 
# PRODUCTION PATHS 

define("JDBOX_API","http://192.168.17.217:1977"); 
}
