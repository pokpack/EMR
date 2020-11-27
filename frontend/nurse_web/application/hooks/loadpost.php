<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Loadpost {

    public function __construct() {
        $this->CI = & get_instance();
    }

    public function check_login() {

//   if ($_SERVER['REMOTE_ADDR'] != '127.0.0.1') {
//     $axxx_https = $_SERVER['HTTPS'];
//     if ($axxx_https == '') {
//       //redirect('','refresh');
//     }
//   }
        if ($_COOKIE[SESS_ID] == NULL) {
            if ($this->CI->session->userdata('user_id') == NULL) {
                $class = $this->CI->router->fetch_class();
                if ($class != 'login') {
                    if ($class != 'lang' && $class != 'api') {
                        redirect('login', 'refresh');
//                        exit();
                    }
                }
            } else {
                
            }
        }
    }

}
