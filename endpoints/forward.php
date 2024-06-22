<?php

require_once('../db/DataBaseConnection.php');
require_once('../db/UploadedDocument.php');

switch ($_SERVER['REQUEST_METHOD']) {

     case 'POST': {
          session_start();
          $username = $_POST['username'];
          $file_name = $_POST['file_name'];
          $new_category = $_POST['new_category'];
  
          $result = (new DataBaseConnection())->changeCategory($file_name, $username, $new_category);
          echo json_encode(['success' => $result]);
          break;
    }
          
}
