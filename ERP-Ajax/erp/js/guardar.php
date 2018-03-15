<!DOCTYPE html>
<?php
session_start();
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Guardar</title>
</head>
<body>
    <?php
        function guardar($archivo, $cont){
            fwrite($archivo, $cont);
            fclose($archivo);
        }

        if (isset($_POST['sh'])) {
            $_SESSION['sh']=$_POST['sh'];
        }
        if (isset($_POST['cate'])) {
            $_SESSION['cate']=$_POST['cate'];
        }
        if (isset($_POST['prod'])) {
            $_SESSION['prod']=$_POST['prod'];
        }
        if (isset($_POST['user'])) {
            $_SESSION['user']=$_POST['user'];
        }

        if (isset($_SESSION['sh'])) {
            $archivo=fopen("../archivos/".$_SESSION['user']."_shops.json", "w");
            guardar($archivo, $_SESSION['sh']);
        }
        if (isset($_SESSION['cate'])) {
            $archivo=fopen("../archivos/".$_SESSION['user']."_categories.json", "w");
            guardar($archivo, $_SESSION['cate']);
        }
        if (isset($_SESSION['prod'])) {
            $archivo=fopen("../archivos/".$_SESSION['user']."_products.json", "w");
            guardar($archivo, $_SESSION['prod']);
        }
    ?>
</body>
</html>