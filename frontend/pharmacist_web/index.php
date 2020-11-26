----pharmacist_web----
<?php

$curl = curl_init();
$emr_api_url = getenv('EMR_API_URL');
curl_setopt_array($curl, array(
  CURLOPT_URL => $emr_api_url . '/EMRs',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer x]vf4yp0yf'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
echo $emr_api_url;
?>
------ 222211111