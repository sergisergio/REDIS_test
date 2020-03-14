<?php

include 'vendor/autoload.php';

$oClient = new Predis\Client(array(
    "scheme" => "tcp",
    "host" => "redis-14286.c10.us-east-1-2.ec2.cloud.redislabs.com:14286",
    "password" => "xmMd508jxecC9ZrWUUzYSQQKuYNii8DY")
);

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
	$data = [];
	$messages = $oClient->keys('chat_*');

	foreach($messages as $message) {
		if(isset($_GET['action']) && $_GET['action'] == 'nettoyage') {
			$oClient->del($message);
		} else {
			$data[$message] = json_decode($oClient->get($message), true);
		}
	}
	ksort($data);
	echo json_encode($data);
}
elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
	if (!empty($_POST['message'])) {
		$number = count($oClient->keys('chat_*'));
		$oClient->set(
			'chat_'.$number,
			json_encode([
				'date' 	=> date('Y-m-d H:i:s'),
				'msg' 	=> $_POST['message'],
				'ip' 	=> $_SERVER['REMOTE_ADDR']
			])
		);
	}
}
