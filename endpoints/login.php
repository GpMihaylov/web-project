<?php

require_once('../db/DataBaseConnection.php');
require_once('../db/User.php');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST': {

        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        (new DataBaseConnection())->verifyUser($data['email'], $data['password']);
        echo json_encode(['logged' => isset($_SESSION['username']), 'isAdmin' => isset($_SESSION['isAdmin'])]);
        break;
    }
    case 'GET': {
        session_start();
        echo json_encode(['logged' => isset($_SESSION['username']), 'isAdmin' => isset($_SESSION['isAdmin'])]);
        break;
    }
    case 'DELETE': {
        session_start();
        session_destroy();
        echo json_encode(['logged' => false]);
        break;
    }
}