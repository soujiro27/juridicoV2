<?php

require 'juridico/php/controllers/rutas.php';
require 'juridico/php/controllers/tables.php';
require 'juridico/php/controllers/update.php';
require 'juridico/php/controllers/combos.php';
require 'juridico/php/controllers/insert.php';
require 'juridico/php/models/get.php';
require 'juridico/php/models/insert.php';




/*----------carga el inicio -------------*/
$app->get('/juridico/:modulo',function($modulo) use ($app){
	$rutas=new Rutas();
	$url=$rutas->validaUrl($modulo);
	if($url){
		$rutas->render($modulo,$app);
	}else{
		$app->redirect('/dashboard');
	}

});

/*-----------------carga la tabla principal -----------------*/
$app->get('/table/:modulo',function($modulo) use ($app){
	$controllersTabla=new Tables();
	$controllersTabla->incio($modulo);
});


$app->get('/table/:modulo/:order/:type',function($modulo,$order,$type) use ($app){
	$controllersTabla=new Tables();
	$controllersTabla->inicioOrder($modulo,$order,$type);
});


/*-----------------obtiene registro para update---------------*/

$app->get('/getRegister/:modulo',function($modulo) use ($app){
	$update=new UpdateController();
	$update->showRegister($modulo,$app->request->get());

});

$app->get('/getRegisterOrder/:modulo/:order',function($modulo,$order) use ($app){
	$update=new UpdateController();
	$update->showRegisterOrder($modulo,$app->request->get(),$order);

});


/*-----------------hace el update ------------------*/
$app->post('/update/:modulo',function($modulo) use ($app){
	$update=new UpdateController();
	$update->updateRegister($modulo,$app->request->post());
});



/*-------------------manda a insertar nuevo registro --------------*/

$app->post('/insert/:modulo',function($modulo) use ($app){
	$insert=new InsertController();
	$insert->checkDataInsert($modulo,$app->request->post());
});





/*-------------- Obtiene un combo ------------------- pendiente de checar */

$app->get('/getCombo',function() use ($app){
	$camposTabla=new Combos();
	$camposTabla->obtenerCombo($app->request->get());

});

$app->get('/combo/:modulo/:campo',function($modulo,$campo) use ($app){
	$camposTabla=new Combos();
	$camposTabla->obtenerComboCampo($modulo,$campo);

});

/*-----------------obitene el ultimo folio de una tabla ------------- pendiente de checar*/

$app->get('/folio/:modulo/:campo',function($modulo,$campo) use ($app){
	$obtiene=new Get();
	$obtiene->getLastFolio($modulo,$campo);

});



/*------------------obitiene las auditorias -----------------*/
$app->get('/getCombo/auditorias',function() use ($app){
	$obtiene=new Combos();
	$obtiene->getComboAuditorias();

});

/*--------------obtiene auditoria por id------------*/

$app->get('/auditorias/:id',function($id) use ($app){
	$obtiene=new Get();
	$obtiene->getAuditoriaById($id);

});






/*-------------notificaciones-----------------*/
$app->get('/juridico/notificaciones/:idVolante',function($idVolante) use ($app){
	$obtiene= new Get();

	$obtiene->getDatosNotificacion($idVolante);
});


/*--------------- upload de documento ------------------*/


$app->post('/juridico/uploadFile',function() use ($app){
	$numDoc=$app->request->post();
	$numDoc=$numDoc['numDocumento'];
	$datos=array('numDocumento'=>$numDoc);
	$update=new UpdateController();
	$registro=$update->getRegisterPhp('Volantes',$datos);
	if($registro==1){
		$file=$_FILES['anexoDoc']['name'];
		$nombre=str_replace('/','-',$numDoc);
		$file=explode('.',$file);
		if ($file && move_uploaded_file($_FILES['anexoDoc']['tmp_name'],"./juridico/files/".$nombre.'.'.$file[1]))
    	{
			$insert=new Insert();
			$res=$insert->updateVolante('Volantes',$nombre,$numDoc,$file[1]);
			$get = new Get();
			$sql="select u.idUsuario from sia_Volantes v 
inner join sia_areas a on v.idTurnado=a.idArea
inner join sia_usuarios u on a.idEmpleadoTitular=u.idEmpleado
where numDocumento='".$numDoc."'";
			$data=$get->consultaRetorno($sql);
			$idUsuario=$data[0]['idUsuario'];
			if($_SESSION['idUsuario']=='2301'){
				$salida['update']=$idUsuario;	
			}else{
				$salida['update']='2301';	
			}
       		//$salida['update']='true';
			echo json_encode($salida);
    	}else{
    		$salida['update']='false';
			echo json_encode($salida);   
		}
	}else{
		$salida['update']='false';
		echo json_encode($salida);
	}
	
});





?>
