<?php 
class UpdateController extends Rutas{

	public function getRegister($modulo,$datos){
		$ruta=new Rutas();
		$get= new Get();
		$modulo=$ruta->catalogos($modulo);
		$result=$get->getDuplicado($modulo,$datos);
		return $result;

	}

	public function showRegister($modulo,$datos){
		$result=$this->getRegister($modulo,$datos);
		if(empty($result)){
			$salida['register']='No se encontro registro';
			echo json_encode($salida);
		}else{
			echo json_encode($result);
		}
	}



	public function getRegisterOrder($modulo,$datos,$order){
		$ruta=new Rutas();
		$get= new Get();
		$modulo=$ruta->catalogos($modulo);
		$result=$get->getDuplicadoOrder($modulo,$datos,$order);
		return $result;

	}



	public function showRegisterOrder($modulo,$datos,$order){
		$result=$this->getRegisterOrder($modulo,$datos,$order);
		if(empty($result)){
			$salida['register']='No se encontro registro';
			echo json_encode($salida);
		}else{
			echo json_encode($result);
		}
	}



	public function updateRegister($modulo,$datos){
		$ruta=new Rutas();
		$modulo=$ruta->catalogos($modulo);
		$modulo=$this->cambioModulo($modulo);
		
		$insert=new Insert();
		$err=new Errores();
		$result=$this->getRegister($modulo,$datos);
		if(empty($result)){
			$res=$insert->updateBd($modulo,$datos);
			$err->catchError($res);
		}else{
			$salida['update']='Registro Duplicado';
			echo json_encode($salida);
		}
	}

	public function cambioModulo($modulo){
		if($modulo=='Ifa'){$modulo='ObservacionesDoctosJuridico';}
		return $modulo;
	}


	public function getRegisterPhp($modulo,$datos){
		$result=$this->getRegister($modulo,$datos);
		if(empty($result)){
			
			return 0;
		}else{
			return 1;
		}
	}

	

}



 ?>