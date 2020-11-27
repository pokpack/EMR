<!doctype html>
<html lang="en">

    
<!-- Mirrored from themesbrand.com/minible/layouts/vertical/auth-login.html by HTTrack Website Copier/3.x [XR&CO'2014], Fri, 20 Nov 2020 08:19:12 GMT -->
<head>
        
        <meta charset="utf-8" />
        <title>Log In | Minible - Responsive Bootstrap 4 Admin Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
        <meta content="Themesbrand" name="author" />
        <!-- App favicon -->
        <link rel="shortcut icon" href="<?=base_url();?>assets/images/favicon.ico">

        <!-- Bootstrap Css -->
        <link href="<?=base_url();?>assets/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
        <!-- Icons Css -->
        <link href="<?=base_url();?>assets/css/icons.min.css" rel="stylesheet" type="text/css" />
        <!-- App Css-->
        <link href="<?=base_url();?>assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />

    </head>

    <body class="authentication-bg">

<!--        <div class="home-btn d-none d-sm-block">
            <a href="index-2.html" class="text-dark"><i class="mdi mdi-home-variant h2"></i></a>
        </div>-->
        <div class="account-pages my-5 pt-sm-5">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="text-center">
                            <a href="index-2.html" class="mb-5 d-block auth-logo">
                                <img src="<?=base_url();?>assets/images/logo-dark.png" alt="" height="22" class="logo logo-dark">
                                <img src="<?=base_url();?>assets/images/logo-light.png" alt="" height="22" class="logo logo-light">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="row align-items-center justify-content-center">
                    <div class="col-md-8 col-lg-6 col-xl-5">
                        <div class="card">
                           
                            <div class="card-body p-4"> 
<!--                                <div class="text-center mt-2">
                                    <h5 class="text-primary">Welcome Back !</h5>
                                    <p class="text-muted">Sign in to continue to Minible.</p>
                                </div>-->
                                <div class="p-2 mt-4">
                                    <form id="formData"  method="post">
        
                                        <div class="form-group">
                                            <label for="username">Username</label>
                                            <input type="text" class="form-control" id="username" placeholder="Enter username" name="s_username">
                                        </div>
                
                                        <div class="form-group">
<!--                                            <div class="float-right">
                                                <a href="auth-recoverpw.html" class="text-muted">Forgot password?</a>
                                            </div>-->
                                            <label for="userpassword">Password</label>
                                            <input type="password" class="form-control" id="userpassword" placeholder="Enter password"  name="s_password">
                                        </div>
                
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="auth-remember-check">
                                            <label class="custom-control-label" for="auth-remember-check">Remember me</label>
                                        </div>
                                        
                                        <div class="mt-3 text-right">
                                            <button class="btn btn-primary w-sm waves-effect waves-light" type="submit">Log In</button>
                                        </div>
            
                                        
                                    </form>
                                </div>
            
                            </div>
                        </div>

<!--                        <div class="mt-5 text-center">
                            <p>© 2020 Minible. Crafted with <i class="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                        </div>-->

                    </div>
                </div>
                <!-- end row -->
            </div>
            <!-- end container -->
        </div>

        <!-- JAVASCRIPT -->
        <script src="<?=base_url();?>assets/libs/jquery/jquery.min.js"></script>
        <script src="<?=base_url();?>assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="<?=base_url();?>assets/libs/metismenu/metisMenu.min.js"></script>
        <script src="<?=base_url();?>assets/libs/simplebar/simplebar.min.js"></script>
        <script src="<?=base_url();?>assets/libs/node-waves/waves.min.js"></script>
        <script src="<?=base_url();?>assets/libs/waypoints/lib/jquery.waypoints.min.js"></script>
        <script src="<?=base_url();?>assets/libs/jquery.counterup/jquery.counterup.min.js"></script>

        <script src="<?=base_url();?>assets/js/app.js"></script>

    </body>

<!-- Mirrored from themesbrand.com/minible/layouts/vertical/auth-login.html by HTTrack Website Copier/3.x [XR&CO'2014], Fri, 20 Nov 2020 08:19:12 GMT -->
</html>
<script>
    var base_url = "<?=base_url();?>";

$("#formData").submit(function (event) {

    var fd = $(this).serialize();
    var url = base_url + "login/check_login";
    $.ajax({
        url: url, // point to server-side PHP script 
        dataType: 'json', // what to expect back from the PHP script, if anything
        cache: false,
        data: fd,
        type: 'post',
        success: function (res) {
            console.log(res);
            if(res.row == 1){
                window.location.href = base_url;
            }
        },
        error: function (e) {
            console.log(e)
        }
    });
    event.preventDefault();
});
</script>