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
		
		if($modulo!='Volantes' && $modulo!='Ifa' ){
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
			$this->checaFolio($modulo,$datos);
		}elseif($modulo=='Ifa'){
			$modulo='ObservacionesDoctosJuridico';
			$volantesDocumentos=array('idVolante'=>$datos['idVolante']);
			$duplicado=$getData->getDuplicado('VolantesDocumentos',$volantesDocumentos);
			$datos['idSubTipoDocumento']=$duplicado[0]['idSubTipoDocumento'];
			$datos['cveAuditoria']=$duplicado[0]['cveAuditoria'];
			$res=$insert->insertaBd($modulo,$datos);
			$err->catchError($res);
			
		}
	}


	public function checaFolio($modulo,$datos){
		$folio = array('folio' => $datos['folio'] , 'subFolio' => $datos['subFolio']);
		$funcionUpdateController= new UpdateController();
		$res=$funcionUpdateController->getRegister($modulo,$folio);
		if(empty($res)){
			$insert=new Insert();
			$insert->insertaVolantes($modulo,$datos);
		}else{
			$salida['insert']='El Numero de Folio ya se encuentra asignado al Volante: '. $res[0]['idVolante'];
			echo json_encode($salida);
		}


	}


}


?>