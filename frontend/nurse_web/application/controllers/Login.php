<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library('pagination');
        $this->load->model('Main_model');
    }

    public function index() {
        $this->load->view('login');
    }

    public function check_login() {

       $type_user = 2;
//        echo json_encode($table);
//        exit();
//       $password = $this->Main_model->decrypts($_POST[s_password]);
        $_where = array('s_username' => $_POST[s_username], 's_password' => $_POST[s_password], 'i_type' => $type_user);
        
//        $arr_where = $_where;
        $num_row = $this->Main_model->num_row(TBL_USER, $_where);
        if ($num_row > 0) {
            $_select = array('*');
            $data = $this->Main_model->rowdata(TBL_USER, $_where, $_select);
            $this->session->set_userdata(array('user_id' => $data->id, 'username' => $data->s_username, 'firstname' => $data->s_first_name , 'lastname' => $data->s_last_name, 'type_user' => $data->i_type));
        }


        $return[user] = $data;
        $return[param] = $_where;
        $return[row] = $num_row;
        echo json_encode($return);
    }

    public function logout() {
        $array_items = array('user_id', 'username', 'name');

        $ss = $this->session->unset_userdata($array_items);
        echo json_encode($ss);
    }

}
