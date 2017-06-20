<?php
$usrActual = $_SESSION ["idUsuario"];
$main='
<div class="row">
	<div class="col-md-9 col-md-offset-2">
		<div class="widget">
			<div class="widget-head">
				<div class="pull-left">Lista de '.$nombre.' registrados</div>
				<div class="widget-icons pull-right">
              		<a href="/juridico/'.$nombre.'/Add" class="btn btn-primary btn-sm" data-formload="'.$nombre.'" id=agregar>Agregar '.$nombre.'</a>
          		</div>
          		<div class="clearfix"></div>
			</div>
			<div class="widget-content" id="main-content">
		</div>
	</div>
</div>';
echo $main;
// <button type="button" class="btn btn-primary btn-sm" data-formload="'.$nombre.'" id=agregar>Agregar '.$nombre.'</button>
?>
