<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Lang extends CI_Controller {

    public function __construct() {
        parent::__construct();
    }

    public function index($siteLang) {
        if ($siteLang) {
            $data = $this->lang->load('message', $siteLang, TRUE);
        } else {
            $data = $this->lang->load('message', 'en', TRUE);
        }

        echo json_encode($data);
    }

    public function write_lang_js($siteLang) {

//        $data = $this->lang->load('message', $siteLang, TRUE);
//        $script = 'var L = { ' . $data . ' }';

        $fileName = "lang-" . $siteLang . ".js";
        $path = 'assets/build/js/lang/lang-' . $siteLang . '.js';

        $array = $this->lang->load('message', 'en', TRUE);
        $js = "var L = { ";
        foreach ($array as $key => $val) {
            $js .= "'". $key ."'" . ":" . "'". $val ."'" . ",";
        }
        $js_cut = substr($js, 0, -1);
        $jsok = $js_cut . " }";
//        $fp = fopen($path, "w");
//        $c = fwrite($fp, $content);
//        fclose($fp);
//        echo print_r($jsok);
        echo file_put_contents($path, $jsok);
    }

    public function calendarData() {


        $arr_select = array('s_invoice as title', 'd_ondate as start', 'id');
        $arr_order = array();
        $arr_order['d_ondate'] = 'asc';
        $arr_between = array();
        //$data = $this->Main_model->fetch_data_between('', '', TBL_BOOKING, $arr_where, $arr_select, $arr_order, $arr_between);



        $this->db->select('d_ondate');
        $this->db->where('i_status', 2);
        $this->db->group_by('d_ondate');
        $r0 = $this->db->get(TBL_BOOKING)->result();

        foreach ($r0 as $r1) {

            $this->db->select('i_product');
            $this->db->where('d_ondate', $r1->d_ondate);
            $this->db->where('i_status', 2);
            $this->db->group_by('i_product');
            $r20 = $this->db->get(TBL_BOOKING)->result();
            foreach ($r20 as $r2) {

                $this->db->select('i_pax, SUM(i_pax) as total_pax');
                $this->db->select('s_time');
                $this->db->where('d_ondate', $r1->d_ondate);
                $this->db->where('i_product', $r2->i_product);
                $this->db->where('i_status', 2);
                $this->db->group_by('s_time');
                $r30 = $this->db->get(TBL_BOOKING)->result();

                foreach ($r30 as $r3) {
                    $data_events[] = array(
                        "id" => $r3->id,
                        "title" => $r3->total_pax . ' Pax ',
                        "description" => $r3->total_pax . ' Pax',
                        "className" => 'm-fc-event--warning m-fc-event--solid-info',
                        "end" => $r1->d_ondate . " " . $r3->s_time,
                        "start" => $r1->d_ondate . " " . $r3->s_time
                    );
                }
            }
        }



        echo json_encode(array("events" => $data_events));
    }

    public function calendarData2() {


        $arr_select = array('s_invoice as title', 'd_ondate as start', 'id');
        $arr_order = array();
        $arr_order['d_ondate'] = 'asc';
        $arr_between = array();
        //$data = $this->Main_model->fetch_data_between('', '', TBL_BOOKING, $arr_where, $arr_select, $arr_order, $arr_between);

        $this->db->select('d_ondate');
        $this->db->select('id, COUNT(id) as total');
        $this->db->select('s_time');
        $this->db->where('i_status', 1);
        $this->db->group_by('d_ondate');
        $new = $this->db->get(TBL_BOOKING)->result();

        $this->db->select('d_ondate');
        $this->db->select('id, COUNT(id) as total');
        $this->db->select('s_time');
        $this->db->where('i_status', 2);
        $this->db->group_by('d_ondate');
        $confirm = $this->db->get(TBL_BOOKING)->result();

        $this->db->select('d_ondate');
        $this->db->select('id, COUNT(id) as total');
        $this->db->select('s_time');
        $this->db->where('i_status', 3);
        $this->db->group_by('d_ondate');
        $cancel = $this->db->get(TBL_BOOKING)->result();

        foreach ($cancel as $r) {
            $data_events[] = array(
                "id" => $r->id,
                "title" => $r->total . ' Cancel ',
                "description" => $r->total . ' Cancel Booking',
                "className" => 'm-fc-event--warning m-fc-event--solid-danger',
                "end" => $r->d_ondate . " " . $r->s_time,
                "start" => $r->d_ondate . " " . $r->s_time
            );
        }
        foreach ($confirm as $r) {
            $data_events[] = array(
                "id" => $r->id,
                "title" => $r->total . ' Confirm ',
                "description" => $r->total . ' Confirm Booking',
                "className" => 'm-fc-event--info m-fc-event--solid-success',
                "end" => $r->d_ondate . " " . $r->s_time,
                "start" => $r->d_ondate . " " . $r->s_time
            );
        }
        foreach ($new as $r) {
            $data_events[] = array(
                "id" => $r->id,
                "title" => $r->total . ' New ',
                "description" => $r->total . ' New Booking',
                "className" => 'm-fc-event--success m-fc-event--solid-info',
                "end" => $r->d_ondate . " " . $r->s_time,
                "start" => $r->d_ondate . " " . $r->s_time
            );
        }



        echo json_encode(array("events" => $data_events));
    }

}
