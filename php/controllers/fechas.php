<?php 

require 'juridico/php/Carbon/Carbon.php';

use Carbon\Carbon;

class Fechas{
	
	public function fechaActual(){
		$actual=Carbon::now('America/Mexico_City');
		$actual=$actual->addDay();
		$cont=0;
		while($cont<1){
			if($actual->isWeekend()){
				$actual=$actual->addDay();
			}else{
				break;
			}
		}
		echo $actual;
		
	}

	public function addDay($fecha){
		return $fecha->addDAy();
	}

	public function finDeSemana($fecha){
		if(!$fecha->isWeekend()){
			return $fecha;
		}
	}
}


 ?>