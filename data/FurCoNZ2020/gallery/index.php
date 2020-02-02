<html>
<head>
<style type="text/css">
<!--
li{
    list-style-type:none;
    margin-right:10px;
    margin-bottom:10px;
    float:left;
}

-->
</style></head>

<body>

<ul>
    <?php
        $dirname = "images/";
        $images = scandir($dirname);
        shuffle($images);
        $ignore = Array(".", "..");
        foreach($images as $curimg){
            if(!in_array($curimg, $ignore)) {
                echo "<li><a href='".$dirname.$curimg."'><img src='img.php?src=".$dirname.$curimg."&w=300&zc=1' alt='' /></a></li>n ";
            }
        }                 
    ?>
</ul>

</body>
</html>
