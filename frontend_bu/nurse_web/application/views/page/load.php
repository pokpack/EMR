<!DOCTYPE html>
<html lang="en">
  <head>
    <?php
    $query = $this->db->get('tbl_webconfig');
    $data = $query->row();
    $newdata = array(
        'wc_webconfig' => 'webconfig',
        'wc_title' => '' . $data->title . '',
        'wc_keyword' => '' . $data->keyword . '',
        'wc_description' => '' . $data->description . '',
        'wc_title_member' => '' . $data->title_member . '',
        'wc_title_search' => '' . $data->title_search . '',
        'wc_title_search_des' => '' . $data->title_search_des . '',
        'wc_amount_per_day' => '' . $data->amount_per_day . '',
        'wc_title_bar' => '' . $data->title_bar . '',
        'wc_title_add' => '' . $data->title_add . '',
        'wc_title_post' => '' . $data->title_post . '',
        'wc_title_type' => '' . $data->title_type . '',
        'wc_title_descript' => '' . $data->title_descript . '',
        'wc_title_vip' => '' . $data->title_vip . '',
        'wc_title_top' => '' . $data->title_top . '',
        'wc_logo' => '' . $data->logo . '',
        'wc_webstats' => '' . $data->webstats . '',
        'wc_fav' => '' . $data->fav . '',
        'wc_vip_rule' => '' . $data->vip_rule . '',
    );
    $this->session->set_userdata($newdata);
    $check_webconfig = 0;
    if ($this->uri->segment(2) == 'view') {
      $results = $this->db->where('id', $this->uri->segment(3))->get('tbl_postline')->row();
      if ($results->id) {
        $type = $this->db->where('id', $results->type)->get('tbl_type')->row();
        $province = $this->db->where('id', $results->province)->get('tbl_province')->row();
        $title_view = $results->lineid . " : ";
        $des_view = $province->topic_th . " " . $type->title . " : ";
        if ($results->img) {
          $link_img_top = base_url('') . "uploads/" . $results->img;
        } else {
          $link_img_top = base_url('') . "uploads/admin/no_img.jpg";
        }
      }
    }
    $bg_qry = $this->db->get('tbl_bg');
    $bg_row = $bg_qry->num_rows();
    $bg_res = $bg_qry->result();
    $i_bg = 0;
    foreach ($bg_res as $date_bg) {
      $url_bg[$i_bg] = $date_bg->url;
      $i_bg++;
    }
    $rnad_bg = rand(0, $i_bg - 1);
    $v_cache = 2;
    ?>
    <?php
    $member_id = $this->session->userdata('login_id');
    $user_level = $this->session->userdata('login_id');
    $member = $this->db->select('*')->where('id', $member_id)->get('tbl_member')->row();
    $chk_img = file_exists("uploads/member/" . $member->s_image);
    if ($chk_img) {
      $img = base_url() . "uploads/member/" . $member->s_image.'?='.time();
    } else {
      $img = base_url() . "uploads/noimage.jpg";
    }
    $members[s_image] = $img;
    $members[s_fullname] = $member->s_fullname;
    $members[s_nickname] = $member->s_nickname;
    $members[s_email] = $member->s_email;

    ?>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo $des_view . " " . $data->description; ?>">
    <meta name="author" content="<?php echo $data->dev_by; ?>">
    <link href="<? echo base_url(); ?>uploads/admin/<?php echo $this->session->userdata('wc_fav'); ?>" rel="shortcut icon" type="image/x-icon" />
    <title><?php echo $title_view . " " . $this->session->userdata('wc_title'); ?> </title>
    <meta itemprop="name" content="<?php echo $title_view . " " . $this->session->userdata('wc_title'); ?>">
    <meta itemprop="description" content="<?php echo $des_view . " " . $data->description; ?>">
    <meta itemprop="image" content="<?= $link_img_top; ?>">
    <meta property="og:title" content="<?php echo $title_view . " " . $this->session->userdata('wc_title'); ?>">
    <meta property="og:description" content="<?php echo $des_view . " " . $data->description; ?>">
    <meta property="og:image" content="<?= $link_img_top; ?>">
    <!-- -->

    <!-- -->
    <script>
      var base_url = "<?= base_url(); ?>";
      var call_toastr = 0;
      var call_datatable = 0;
    </script>
    <!--begin::Web font -->
    <!--		<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>-->
    <script src="<?= base_url('assets/js/webfont.js'); ?>"></script>
    <script>
      WebFont.load({
        google: {"families": ["Poppins:300,400,500,600,700", "Roboto:300,400,500,600,700"]},
        active: function () {
          sessionStorage.fonts = true;
        }
      });
    </script>
    <!--end::Web font -->
    <!--begin::Base Styles -->  
    <!--begin::Page Vendors -->
    <?php echo link_tag('assets/vendors/custom/fullcalendar/fullcalendar.bundle.css?v=' . $v_cache); ?>
    <!--end::Page Vendors -->
    <?php echo link_tag('assets/vendors/base/vendors.bundle.css?v=' . $v_cache); ?>
    <?php echo link_tag('assets/demo/default/base/style.bundle.css?v=' . $v_cache); ?>
    <!--end::Base Styles -->
    <!-- -->
    <link rel="apple-touch-icon" href="<?=base_url('assets/app/media/img/logos/logo-2.png');?>">
    <link rel="shortcut icon" href="<?=base_url('assets/app/media/img/logos/logo-2.png');?>" type="image/x-icon">
  </head>

 <!-- end::Head -->
    <!-- end::Body -->
	<body  class="m--skin- m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default"  >
		<!-- begin:: Page -->
		<div class="m-grid m-grid--hor m-grid--root m-page">
			<div class="m-section__content">
				<div class="progress">
					<div class="progress-bar progress-bar-striped progress-bar-animated " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 99%"></div>
				</div>
              <div align="center">
    <h2>PLEASE WAIT DATA SAVING DON"T PRESSING F5</h2>
</div>
			</div>
		</div>
        
		<!-- end:: Page -->
    	<!--begin::Base Scripts -->
		<script src="<?= base_url(); ?>assets/vendors/base/vendors.bundle.js" type="text/javascript"></script>
		<script src="<?= base_url(); ?>assets/demo/default/base/scripts.bundle.js" type="text/javascript"></script>
		<!--end::Base Scripts -->
        <script>
        function disableF5(e) { if ((e.which || e.keyCode) == 116) e.preventDefault(); };
$(document).on("keydown", disableF5);

$(document).ready(function(){
 $(document).bind("contextmenu",function(e){
   return false;
 });
});

 

        </script>
	</body>
	<!-- end::Body -->
</html>