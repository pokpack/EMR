<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library('pagination');
        $this->load->model('Main_model');
    }

    public function index() {
        
    }
    
    public function get_country() {
        
        $_where = array();
        $_select = array('id,name');
        $res = $this->Main_model->fetch_data('', '', TBL_COUNTRY, $_where, $_select);
        
        echo json_encode($res);
    }

}
