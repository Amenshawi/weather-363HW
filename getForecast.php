<?php
$apiKey = "ab48911599a8527ed8ea834071d14edf";
$city = $_GET['city'];
$degree = $_GET['degree'];
$unit = "Metric";
if ($degree == 'F'){
    $unit = "Imperial";
}
$apiUrl = "api.openweathermap.org/data/2.5/weather?q=" . $city . "&units=" .$unit ."&appid=" . $apiKey;

$ch = curl_init();

curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_VERBOSE, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = curl_exec($ch);

curl_close($ch);
$data = json_decode($response);
$currentTime = time();

$response = array('time' => date("l g:i a", $currentTime),
                'date' => date("jS F, Y",$currentTime),
                'desc' => ucwords($data->weather[0]->description),
                'icon' => $data->weather[0]->icon,
                'max-temp' => $data->main->temp_max,
                'min-temp' => $data->main->temp_min,
                'humidity'=>$data->main->humidity . '%',
                'wind' => $data->wind->speed . 'km/h');
echo json_encode($response);
?>