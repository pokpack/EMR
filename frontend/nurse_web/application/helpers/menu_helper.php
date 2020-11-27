<?php
defined('BASEPATH') OR exit('No direct script access allowed');
if(!function_exists('active_link')) {
  function activate_menu($controller) {
    // Getting CI class instance.
    $CI = get_instance();
    // Getting router class to active.
    $class = $CI->router->fetch_class();
    return ($class == $controller) ? 'active' : '';
  }
  
  function open_menu($controller) {
    // Getting CI class instance.
    $CI = get_instance();
    // Getting router class to active.
    $class = $CI->router->fetch_class();
    return ($class == $controller) ? 'open' : '';
  }
  
  function activate_menu_sub($classx , $methodx) {
    // Getting CI class instance.
    $CI = get_instance();
    // Getting router class to active.
    $class = $CI->router->fetch_class();
    $method = $CI->router->fetch_method();
    if($class == $classx and $method == $methodx){
      $return = "active";
    }else{
      $return = "";
    }
    return $return;
  }
  function activate_menu_main($controller) {
    // Getting CI class instance.
    $CI = get_instance();
    // Getting router class to active.
    $class = $CI->router->fetch_method();
    if(!$controller){
    	$controller = 'admin';
    	$class = 'admin';
    }
    return ($class == $controller) ? 'open' : '';
  }
  function helper_check_lang($controller) {
    // Getting CI class instance.
    $CI = get_instance();
    // Getting router class to active.
    $class = $CI->session->userdata('site_lang');
    return ($class == $controller) ? 'cus_hidden' : '';
  }
  
  
}