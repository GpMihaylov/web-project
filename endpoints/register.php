<?php

require_once('../db/DataBaseConnection.php');
require_once('../db/User.php');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST': {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        $salt = bin2hex(random_bytes(32));
        $user = new User($data['email'], $salt, $data['password'], $data['isAdmin']);

        echo json_encode((new DataBaseConnection())->insertUser($user)->toArray());
    }
}