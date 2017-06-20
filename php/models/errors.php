<?php 

class Errores{

	public function catchError($errorSql){
		if(empty($errorSql[2])){
			$salida['insert']='true';
		}else{
			$salida['insert']=trim($errorSql[2]);
		}
		echo json_encode($salida);
	}


	
}




 ?>