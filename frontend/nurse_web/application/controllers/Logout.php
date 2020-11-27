<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Logout extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
//		$this->load->model('Login_model');
	}
/*
* @ Login main
*/
	public function index()	{
		$this->session->unset_userdata(array('user_id','username'));
		redirect('login', 'refresh');
	}
/**
* @ 
*/ 	
}	
