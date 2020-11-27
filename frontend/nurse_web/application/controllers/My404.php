<?php

class my404 extends CI_Controller {
  public function __construct() {
    parent::__construct();
  }
  public function index() {
    $this->output->set_status_header('404');
    $data['content'] = 'error_404'; // View name 
    $this->load->view('template/backheader');
    $this->load->view('page/404',$data);//loading in my template 
    $this->load->view('template/backfooter');
  }
  public function load() {
    $this->load->view('page/load');//loading in my template 
  }
}
