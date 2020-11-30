<?php

defined('BASEPATH') OR exit('No direct script access allowed');
//$config['uri_segment'] = 3;
//$config['num_links'] = 2;
//$config['use_page_numbers'] = TRUE;
//$config['reuse_query_string'] = FALSE;
//$config['prefix'] = '';
//$config['suffix'] = '';
//$config['use_global_url_suffix'] = FALSE;
//$config['full_tag_open'] = '<ul class="pagination">';
$config['full_tag_open'] = '<ul class="m-datatable__pager-nav">';
$config['full_tag_close'] = '</ul>';
//$config['first_link'] = 'First';
//$config['first_tag_open'] = '<div>';
//$config['first_tag_close'] ='</div>';
//$config['first_url'] = '';
//$config['last_tag_open'] = '<div>';
//$config['last_tag_close'] = '</div>';

$config['first_link'] = '<i class="la la-angle-double-left"></i>';
$config['first_tag_open'] = '<li class="paginate_button next">';
$config['first_tag_close'] =  '</li>';

$config['last_link'] = '<i class="la la-angle-double-right"></i>';
$config['last_tag_open'] = '<li class="paginate_button next">';
$config['last_tag_close'] =  '</li>';

$config['next_link'] = '<i class="la la-angle-right"></i>';
$config['next_tag_open'] = '<li class="paginate_button next">';
$config['next_tag_close'] =  '</li>';
$config['prev_link'] = '<i class="la la-angle-left"></i>';
$config['prev_tag_open'] = '<li class="paginate_button next">';
$config['prev_tag_close'] =  '</li>';
$config['cur_tag_open'] = '<li class="paginate_button current"><a href="#" aria-controls="xxxx" data-dt-idx="1" tabindex="0">';
$config['cur_tag_close'] = '</a></li>';
$config['num_tag_open'] = '<li class="paginate_button">';
$config['num_tag_close'] =  '</li>';
//$config['display_pages'] = FALSE;
//$config['attributes']['rel'] = FALSE;
