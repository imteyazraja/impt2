<?
class DB { 

	var $defaultDebug = false; 
	var $mtStart; ## INTERNAL: The start time, in miliseconds. 
	var $nbQueries; ## INTERNAL: The number of executed queries. 
	var $lastResult; ## INTERNAL: The last result ressource of a query(). 
	var $links; 
	var $db; 

	function DB($con) { 
		$this->db = $con; 
		$this->mtStart = $this->getMicroTime(); 
		$this->nbQueries = 0; 
		$this->lastResult = NULL; 

		$this->links = mysqli_connect($con[0], $con[1], $con[2],$con[3]); 
	} 

	function __destruct() { 
		if($this->links) { 
		mysqli_close($this->links); 
		} 
	} 

	## Query the database. 
	## @param $query The query. 
	## @param $debug If true, it output the query and the resulting table. 
	## @return The result of the query, to use with fetchData(). 

	function query($query, $debug = -1) { 
	//echo $query; print_r($this->db); 
	//echo "
	"; 
	mysqli_select_db($this->links,$this->db[3]); 
	$this->nbQueries++; 
	$this->lastResult = mysqli_query($this->links,$query) or $this->debugAndDie($query); 
	$this->debugandexit($debug, $query, $this->lastResult); 
	//$this->queryLog($query); 
	return $this->lastResult; 
	} 

	## Do the same as query() but do not return nor store result.\n 
	## Should be used for INSERT, UPDATE, DELETE... 
	## @param $query The query. 
	## @param $debug If true, it output the query and the resulting table. 

	function execute($query, $debug = -1) { 
	$this->nbQueries++; 
	mysql_query($query) or $this->debugAndDie($query); 

	$this->debugandexit($debug, $query); 
	} 

	## Convenient method for mysql_fetch_object(). 
	## @param $result The ressource returned by query(). 
	## If NULL, then last result returned by query() will be used. 
	## @return An object representing a data row. 

	function fetchData($result = NULL) { 
	if ($result == NULL) 
	$result = $this->lastResult; 

	if ($result == NULL || mysqli_num_rows($result) < 1) 
	return NULL; 
	else 
	return mysqli_fetch_assoc($result); 
	} 

	/* 
	* @ Function Name	: mysqlFetchArr 
	* @ Purpose	: To fetch associative array of selected mysql query 
	* @ Input	: Resource Id 
	* @ Return Value	: Array - Associative array of selected mysql query 
	*/ 

	public function mysqlFetchArr($resourceId) { 
	if ($result == NULL) 
	$result = $this->lastResult; 

	if ($result == NULL || mysqli_num_rows($result) < 1) 
	return NULL; 
	else 
	return mysqli_fetch_array($result); 
	} 

	## Get the number of rows of a query. 
	## @param $result The ressource returned by query(). 
	## If NULL, the last result returned by query() will be used. 
	## @return The number of rows of the query (0 or more). 

	function numRows($result = NULL) { 
	if ($result == NULL) 
	return @mysqli_num_rows($this->lastResult); 
	else 
	return @mysqli_num_rows($result); 
	} 

	## Get the result of the query as an object. The query should return a unique row.\n 
	## Note: no need to add "LIMIT 1" at the end of your query because 
	## the method will add that (for optimisation purpose). 
	## @param $query The query. 
	## @param $debug If true, it output the query and the resulting row. 
	## @return An object representing a data row (or NULL if result is empty). 

	function queryUniqueObject($query, $debug = -1) { 
	$query = "$query LIMIT 1"; 
	$this->nbQueries++; 
	$result = mysqli_query($query) or $this->debugAndDie($query); 

	$this->debugandexit($debug, $query, $result); 

	return mysqli_fetch_object($result); 
	} 

	## Get the result of the query as value. The query should return a unique cell.\n 
	## Note: no need to add "LIMIT 1" at the end of your query because 
	## the method will add that (for optimisation purpose). 
	## @param $query The query. 
	## @param $debug If true, it output the query and the resulting value. 
	## @return A value representing a data cell (or NULL if result is empty). 

	function queryUniqueValue($query, $debug = -1) { 
	$query = "$query LIMIT 1"; 
	$this->nbQueries++; 
	$result = mysqli_query($query) or $this->debugAndDie($query); 
	$line = mysqli_fetch_row($result); 

	$this->debugandexit($debug, $query, $result); 

	return $line[0]; 
	} 

	## Get the maximum value of a column in a table, with a condition. 
	## @param $column The column where to compute the maximum. 
	## @param $table The table where to compute the maximum. 
	## @param $where The condition before to compute the maximum. 
	## @return The maximum value (or NULL if result is empty). 

	function maxOf($column, $table, $where) { 
	return $this->queryUniqueValue("SELECT MAX(`$column`) FROM `$table` WHERE $where"); 
	} 

	## Get the maximum value of a column in a table. 
	## @param $column The column where to compute the maximum. 
	## @param $table The table where to compute the maximum. 
	## @return The maximum value (or NULL if result is empty). 

	function maxOfAll($column, $table) { 
	return $this->queryUniqueValue("SELECT MAX(`$column`) FROM `$table`"); 
	} 

	## Get the count of rows in a table, with a condition. 
	## @param $table The table where to compute the number of rows. 
	## @param $where The condition before to compute the number or rows. 
	## @return The number of rows (0 or more). 

	function countOf($table, $where) { 
	return $this->queryUniqueValue("SELECT COUNT(*) FROM `$table` WHERE $where"); 
	} 

	## Get the count of rows in a table. 
	## @param $table The table where to compute the number of rows. 
	## @return The number of rows (0 or more). 

	function countOfAll($table) { 
	return $this->queryUniqueValue("SELECT COUNT(*) FROM `$table`"); 
	} 

	## Internal function to debug when MySQL encountered an error, 
	## even if debug is set to Off. 
	## @param $query The SQL query to echo before diying. 

	function debugAndDie($query) { 
	//$this->debugQuery($query, "Error"); 
	die("
	".mysqli_error($this->links)."

	"); 

	return false; 
	} 

	## Internal function to debug a MySQL query.\n 
	## Show the query and output the resulting table if not NULL. 
	## @param $debug The parameter passed to query() functions. Can be boolean or -1 (default). 
	## @param $query The SQL query to debug. 
	## @param $result The resulting table of the query, if available. 

	function debugandexit($debug, $query, $result = NULL) { 
	if ($debug === -1 && $this->defaultDebug === false) 
	return; 
	if ($debug === false) 
	return; 

	$reason = ($debug === -1 ? 'Default Debug' : 'Debug'); 
	$this->debugQuery($query, $reason); 
	if ($result == NULL) 
	echo '
	Number of affected rows: ' . mysqli_affected_rows() . '
	'; 
	else 
	$this->debugResult($result); 

	exit; 
	} 

	function trace($query) { 
	$reason = ('Debug'); 
	$this->debugQuery($query, $reason); 
	if ($this->lastResult == NULL) 
	echo '
	Number of affected rows: ' . mysqli_affected_rows() . '
	'; 
	else 
	$this->debugResult($this->lastResult); 

	echo '-------------------------------------------------------------------------'; 
	} 

	## Internal function to output a query for debug purpose.\n 
	## Should be followed by a call to debugResult() or an echo of "". 
	## @param $query The SQL query to debug. 
	## @param $reason The reason why this function is called: "Default Debug", "Debug" or "Error". 

	function debugQuery($query, $reason = "Debug") { 
	$color = ($reason == "Error" ? "red" : "green"); 
	echo '
	' . 
	'
	' . 
	' ' . $reason . ':' . 
	' ' . htmlentities($query) . '
	' . 
	' Server:' . 
	' ' . $this->db[0] . ", " . $this->db[1] . ", " . $this->db[2] . ", " . $this->db[3] . '
	' . 
	'
	' . 
	'Error:' . 
	' ' . htmlentities(mysql_error()) . '
	'; 
	} 

	## Internal function to output a table representing the result of a query, for debug purpose.\n 
	## Should be preceded by a call to debugQuery(). 
	## @param $result The resulting table of the query. 

	function debugResult($result) { 
	echo ''; 

	$numFields = mysqli_num_fields($result); 

	// BEGIN HEADER 
	$tables = array(); 
	$nbTables = -1; 
	$lastTable = ""; 
	$fields = array(); 
	$nbFields = -1; 

	while ($column = mysqli_fetch_field($result)) { 
	if ($column->table != $lastTable) { 
	$nbTables++; 
	$tables[$nbTables] = array("name" => $column->table, "count" => 1); 
	} 
	else 
	$tables[$nbTables]["count"]++; 

	$lastTable = $column->table; 
	$nbFields++; 
	$fields[$nbFields] = $column->name; 
	} 

	for ($i = 0; $i <= $nbTables; $i++) 
	echo ''; 
	echo ''; 
	echo ''; 

	for ($i = 0; $i <= $nbFields; $i++) 
	echo ''; 
	echo ''; 

	// END HEADER 
	while ($row = mysqli_fetch_array($result)) { 
	echo ''; 
	for ($i = 0; $i < $numFields; $i++) 
	echo ''; 
	echo ''; 
	} 
	echo '
	Table » ' . $tables[$i]['name'] . '
	' . $fields[$i] . '
	' . htmlentities($row[$i]) . '
	'; 
	$this->resetFetch($result); 
	} 

	## Get how many time the script took from the begin of this object. 
	## @return The script execution time in seconds since the 
	## creation of this object. 

	function getExecTime() { 
		return round(($this->getMicroTime() - $this->mtStart) * 1000) / 1000; 
	} 

	## Get the number of queries executed from the begin of this object. 
	## @return The number of queries executed on the database server since the 
	## creation of this object. 

	function getQueriesCount() { 
		return $this->nbQueries; 
	} 

	## Go back to the first element of the result line. 
	## @param $result The resssource returned by a query() function. 

	function resetFetch($result) { 
		if (mysqli_num_rows($result) > 0) 
		mysqli_data_seek($result, 0); 
	} 

	## Get the id of the very last inserted row. 
	## @return The id of the very last inserted row (in any table). 

	function lastInsertedId() { 
		return mysqli_insert_id(); 
	} 

	## Close the connexion with the database server.\n 
	## It's usually unneeded since PHP do it automatically at script end. 

	function close() { 
		/* return; 
		if($this->links) 
		mysql_close($this->links); */ 
		unset($this->db); 
		if ($this->links) { 
			mysqli_close($this->links); 
		} 
		return; 
	} 

	## Internal method to get the current time. 
	## @return The current time in seconds with microseconds (in float format). 

	function getMicroTime() { 
		list($msec, $sec) = explode(' ', microtime()); 
		return floor($sec / 1000) + $msec; 
	} 

	function queryLog($query) { 
		if (substr(strtolower($query), 0, 3) === 'ins' || substr(strtolower($query), 0, 3) === 'upd') { 
			$DisplayMessage = 'public/logs/queryLog_' . date('Y_m_d') . '.html'; 
			$displaymesglog = dirname($DisplayMessage); 
			if (!file_exists($displaymesglog)) { 
				mkdir($displaymesglog, 0777, true); 
			} 
			$fp = fopen('public/logs/queryLog_' . date('Y_m_d') . '.html', 'a'); 
			$string = $query.'
			'; 
			fwrite($fp, $string); 
			fclose($fp); 
		} 
	}
} 

## END OF CLASS DB 
?> 
