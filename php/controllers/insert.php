<?php  

require 'juridico/php/models/errors.php';
class InsertController{


	public function conecta(){
			try{
				require 'src/conexion.php';
				$db = new PDO("sqlsrv:Server={$hostname}; Database={$database}", $username, $password );
				return $db;
			}catch (PDOException $e) {
				print "ERROR: " . $e->getMessage();
				die();
			}
		}


	public function checkDataInsert($modulo,$datos){
		$db=$this->conecta();
		$getData=new Get();
		$insert=new Insert();
		$err=new Errores();
		$ruta= new Rutas;
		$funcionUpdateController= new UpdateController();
		if($modulo!='Volantes'){
			$modulo=$ruta->catalogos($modulo);
			$duplicado=$getData->getDuplicado($modulo,$datos);
			if(empty($duplicado)){
				$res=$insert->insertaBd($modulo,$datos);
				$err->catchError($res);
			}
			else{
				$salida['insert']='Registro Duplicado';
				echo json_encode($salida);
			}
		}elseif ($modulo=='Volantes'){
			$funcionUpdateController->getRegister();
			$insert->insertaVolantes($modulo,$datos);
		}
	}


}


?>