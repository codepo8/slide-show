<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slide show</title>
  <link rel="stylesheet" href="base.css">
</head>
<body>
<?php
if(!isset($_GET['dir'])){
  echo '<ul>';
  $dir    = './';
  $files = array_filter(scandir($dir),"is_dir");
  foreach($files as $f) {
    if (!preg_match("/^\./",$f)) {
      $childfiles = scandir($f);
      $count = 0;
      foreach($childfiles as $c) {
        if (preg_match("/image|video/",mime_content_type($f.'/'.$c))){
          $count++;
        };
      }
      echo '<li><a href="index.php?dir='.$f.'">'.$f.' ['.$count.']</li>';
    }
  }
  echo '</ul>';
} else {
  if (preg_match('/^\.|\/+|~/',$_GET['dir'])){
    die('only direct child folders');
  }
  $all = array();
  $dir = './'.$_GET['dir'];
  if (!is_dir($dir)) {
    die('Cannot find the folder, soz…');
  }
  $files = scandir($dir);
  foreach($files as $f) {
    if (preg_match("/image|video/",mime_content_type($dir.'/'.$f))){
      array_push($all,$f);
    }
  }
?>
<div id="slideshow-container"></div>
<script>
  let slideshow = {
    container: '#slideshow-container',
    media: <?php echo json_encode($all);?>,
    folder: '<?php echo urlencode(str_replace('index.php?','',$_GET['dir']))?>/',
    autoplay: 'yes'
  }
</script>
<script src="slideshow.js"></script>
<?php } ?>
</body>
</html>