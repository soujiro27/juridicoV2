<?php
class Rutas{

protected $catalogos=['Caracteres','Acciones','SubTiposDocumentos','DoctosTextos'];
protected $modulos=['Volantes','Confronta'];


public function validaUrl($modulo){
	$valor=True;
	$modulosTotal=array_merge($this->catalogos,$this->modulos);
	foreach ($modulosTotal as $key => $value) {
		 if($modulo==$value){
			 return $valor;
		 }else{!$valor;}
	}
}

public function render($modulo,$app){
	foreach ($this->catalogos as $key => $value) {
			if($modulo==$value){
					$tipo='Catálogo de ';
	}}
	foreach ($this->modulos as $key => $value) {
			if($modulo==$value){
					$tipo='Modulo de ';
			}
	}
	$app->render('./juridico/templates/main.php',array('nombre' => $modulo, 'tipo' => $tipo ));
}


public function catalogos($modulo){
	foreach ($this->catalogos as $key => $value) {
			if($modulo==$value){
					return 'cat'.$modulo;}
			
	}
	return $modulo;
}

function __destruct() {}

}

?>
