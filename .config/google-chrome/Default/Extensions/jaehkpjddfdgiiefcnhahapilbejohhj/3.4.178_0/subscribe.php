<html>
<style type="text/css">
	.subscription-row{
		background-color: #D95536;
		text-align: center;
		color: #fff;
		bottom: 0;
		width: 103%;
		position: fixed;
		font-size: 14px;
		z-index: 1001;
		font-weight: bold;
	}
	.subs-text{
		padding-right: 20px;
	}
	.subs-email{
		width: 20%;
		padding-left: 10px;
	}
	.remove-me{
		float: right;
		margin-right: 25px;
		margin-top: 12px;
		font-size: 12px;
		padding-right: 5px;
		padding-left: 4px;
	}
	.remove-me:hover{
		border: 1px solid #A84E38;
		border-radius: 50%;
		background-color: #A84E38;
	}
	.subs-btn{
		padding: 5px 15px !important;
		background-color: #403F3B !important;
		font-size: 12px;
	}
	.crown-img{
		height: 45px;
		padding-right: 5px;
		margin-bottom: -2px;
		margin-top: -5px;
	}
</style>
<body>
	<div class="row subscription-row">
		<div class="col-md-12">
			<div class="subscribe-main">
				<span class="subs-text"><img src="http://sumome.com/client/images/apps/408190b5-e369-48af-8e31-afb7380ecd66/transparent-crown-dark.png" class="crown-img"/> Subscribe For <span class="category-name"><?php echo $subscribeData[0]->cat_name; ?> </span> Now!</span>
				<input type="text" class="subs-email" placeholder="Enter Your Email-id" />
				<button class="btn btn-primary subs-btn">Subscribe</button>
				<span class="remove-me">X</span>
			</div>
		</div>
	</div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script type="text/javascript">
		$(".subs-btn").click(function(){
			var email = $(".subs-email").val();
			var cat_id = <?php echo $subscribeData[0]->cat_id; ?>;
			var atpos = email.indexOf("@");
			var dotpos = email.lastIndexOf(".");
			if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=email.length) {
				alert("Not a valid e-mail address");
				return false;
			}
			else
			{$.post("emailAPI.php", {email: email, cat_id: cat_id});}
		});

	</script>
	<!-- </script> -->
</body>
</html>