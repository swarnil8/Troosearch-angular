<?php 
include 'dealAPI.php';  
$parent_category = $_GET['parent_category'];
$sub_category = $_GET['sub_category'];
$make = $_GET['make'];
$model = $_GET['model'];
$varient = $_GET['varient'];
$sub_varient = $_GET['sub_varient'];
?>
<!DOCTYPE html>
<html>
<head>
  <title>Deals Home</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Bootstrap -->
  <link href="/theDeals/css/bootstrap.min.css" rel="stylesheet">
  <!-- Font Awesome -->
  <link rel="stylesheet" type="text/css" href="/theDeals/css/font-awesome.min.css">

  <!-- Custom stylesheets -->
  <link rel="stylesheet" type="text/css" href="/theDeals/css/application.css">
  <link rel="stylesheet" type="text/css" href="/theDeals/css/index.css">
  <link rel="stylesheet" type="text/css" href="/theDeals/styles/styles_frame.css">
  <link rel="stylesheet" type="text/css" href="/theDeals/css/footer.css">
  <link rel="stylesheet" type="text/css" href="/theDeals/css/pagination.css">

  <!-- Fonts -->
  <link href='http://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" type="text/css" href="/theDeals/css/bootstrap-fileupload.min.css" />
  <link rel="stylesheet" href="//code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="/theDeals/js/bootstrap.min.js"></script>
</head>
<body>
  <?php include_once 'headerBar.php';
  include 'subscribe.php'; 
  ?>
  <section class="main-sec">
    <div class="container main-container">
      <div class="row breadcrum-row">
        <div class="col-md-12 breadcrum-col">
          <div class="breadcrum-text">
            <?php for($i=0;$i<count($bread);$i++){
              $strLink = explode(' ', $bread[$i]->cat_name);
              $strLink = implode('-', $strLink);
              $strLink = explode('&', $strLink);
              $strLink = implode('', $strLink);
              if($i != 0){ echo " >> ";}
              echo '<a href="/deals/'.$strLink.'-hatke'.$bread[$i]->cat_id.'">'.$bread[$i]->cat_name.'</a>';
              } ?>

          </div>
        </div>
      </div>
      <div class="row main-row">
        <div class="col-md-3 main-left-col">
          <div class="row category-row">
            <div class="col-md-12 category-col">Categories</div>
          </div>
          <div class="main-category">
            <?php 
            $prev_level = 0;
            $max_level = 0;
            for($m=0;$m<count($content);$m++){
              if($max_level < $content[$m]->level){
                $max_level = $content[$m]->level;
              }
            }
            for($i=0;$i<count($content);$i++){ 
              $strLink = explode(' ', $content[$i]->cat_name);
              $strLink = implode('-', $strLink);
              $strLink = explode('&', $strLink);
              $strLink = implode('', $strLink);
              $level = $content[$i]->level;
              if(count($content)> $i+1){
              $next_level = $content[$i+1]->level;
               }
               else {
                $next_level = 0;
               }
              
              if($content[$i]->selected==1){
                $level_val = "level";
              }
              else {
                $level_val = "sub-level";
              }
              if($level == $next_level){ 

             //   echo "<br>Case 1 ".$level." ".$next_level."<br>";
                echo '<div class="category '.$level_val.'"><i class="fa fa-sort-desc cat-arrow"></i><a href="/deals/'.$strLink.'-hatke'.$content[$i]->cat_id.'">'.$content[$i]->cat_name.'</a></div>';
              }
              else if($level < $next_level){
               // echo "<br>Case 2 ".$level." ".$next_level."<br>";
               echo '<div class="category '.$level_val.'"><i class="fa fa-sort-desc cat-arrow"></i><a href="/deals/'.$strLink.'-hatke'.$content[$i]->cat_id.'">'.$content[$i]->cat_name.'</a>';
             }
             else if($level > $next_level){
              //echo "<br>Case 3 ".$level." ".$next_level."<br>";
              
              echo '<div class="category '.$level_val.'"><i class="fa fa-sort-desc cat-arrow"></i><a href="/deals/'.$strLink.'-hatke'.$content[$i]->cat_id.'">'.$content[$i]->cat_name.'</a></div>';
              $diff =  $level - $next_level;
              for($j=0;$j<$diff;$j++){
                echo '</div>';
              }
            }

            ?>
            <?php $prev_level = $level;} ?>
          </div>
        </div>
        <div class="col-md-9 main-right-col">

          <?php
           for($i=0;$i<count($info);$i++){
            $strName = explode(' ', $info[$i]->prod);
            $strName = implode('-', $strName);
            $strName = explode('&', $strName);
            $strName = implode('', $strName);
            $link = "/deals-landing/".$strName."-hatke".$info[$i]->PID;
            if($i%3 == 0){
              echo '<div class="row right-prod-row1">';
            }
            ?>
            <div class="col-md-4 each-prod-col">
             <a href="<?php echo $link; ?>" class="prod-link">
              <img src="<?php echo $info[$i]->image; ?>" alt="" class="prod-img"/>
              <div class="price-hover"><strike>Rs. <?php echo $info[$i]->mrp; ?> </strike><div class="hover-amt">Rs. <?php echo $info[$i]->price; ?></div></div>
              <br/>
              <div class="prod-name"><?php echo $info[$i]->prod; ?></div>
              <div class="cost-detail pull-left">
                <strike class="mrp">Rs. <?php echo $info[$i]->mrp; ?></strike>
                <div class="discount-price">Rs. <?php echo $info[$i]->price; ?></div>
              </div>
              <div class="to-prod text-center">
                <button type="button" class="btn btn-warning grab-btn">Grab the Offer</button>
              </div>
              <div class="discount-drop"> <i class="fa fa-arrow-down drop-icon"></i><span class="discount-percent"><?php echo $info[$i]->perDrop; ?>%</span></div>
            </a>
          </div>
          <?php 
          if(($i-2)%3 == 0 && $i>0){
            echo '</div>';
          }

        }
        if(($i-2)%3 != 0){
          echo '</div>';
        }
        
        ?>
      </div>
      <div class="row pagination">
        <div class="col-md-12 pagination-col">
          <a href="#"><span class="pages"> << </span></a>
          <a href="#"><span class="pages" style="margin-left: 5px;">1</span></a>
          <a href="#"><span class="pages">2</span></a>
          <a href="#"><span class="pages">3</span></a>
          <a href="#"><span class="pages">4</span></a>
          <a href="#"><span class="pages">5</span></a>
          <a href="#"><span class="pages"> >> </span></a>
        </div>
      </div>
    </div>
  </div>
</section>
<?php include_once 'footer.php'; ?>

<script type="text/javascript">
  $( document ).ready(function() {
    $('.each-prod-col').find('.price-hover').hide();
    $('.each-prod-col').find('.to-prod').hide();
    $('.each-prod-col').find('.cost-detail').show();
    $('.each-prod-col').find('.discount-drop').css('margin-top','0px');
    $('.each-prod-col').hover(function(){
      $(this).find('.price-hover').show();
      $(this).find('.to-prod').show();
      $(this).find('.cost-detail').hide();
      $(this).find('.discount-drop').css('margin-top','-25px');

    },
    function () {
     $(this).find('.price-hover').hide();
     $(this).find('.to-prod').hide();
     $(this).find('.cost-detail').show();
     $(this).find('.discount-drop').css('margin-top','0px');

   }
   );
    $('.remove-me').click(function(){
      $(this).parent().parent().parent().remove();
    });
  });
</script>
</body>
</html>