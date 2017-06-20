<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<title>Sistema Integral de Auditoría</title>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<link rel="stylesheet" type="text/css" href="assets/css/estilo.css">
</head>
<body>

<header>
	 <?php require 'juridico/templates/header.php'; ?>
</header>

<main class="content">
		<?php require 'juridico/templates/aside.php'; ?>
		<?php require 'juridico/templates/content.php'; ?>
</main>

<script type="text/javascript">
	var nUsr='<?php echo $_SESSION["idUsuario"];?>';
	localStorage.setItem("nUsr", nUsr);
	var nCampana='<?php echo $_SESSION["idCuentaActual"];?>';
	localStorage.setItem("nCampana", nCampana);
	var ruta='<?php echo $nombre;?>';
	localStorage.setItem("ruta", ruta);
</script>
<script type="text/javascript" src="assets/js/app.js"></script>
</body>
</html>
