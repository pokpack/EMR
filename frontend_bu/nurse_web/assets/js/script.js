/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$('#form_admit').submit(function (event) {

    var fd = $(this).serialize();
    var url = base_url + "api/post_admit";
    $.ajax({
        url: url, // point to server-side PHP script 
        dataType: 'text', // what to expect back from the PHP script, if anything
        data: fd,
        type: 'post',
        success: function (res) {
            console.log(res);
        },
        error: function (e) {
            console.log(e)
        }
    });
    event.preventDefault();

});

function select_patient(ele) {

    var val = $(ele).find(":selected").val();
    console.log(val);
    
    var url = base_url + "component/cpn_patient";
    var param = {
        id : val
    };
    $.post(url, param, function (html) {
        $('#load_patient_data').html(html);
    });

}