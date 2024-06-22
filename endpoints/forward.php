<?php

require_once('../db/DataBaseConnection.php');
require_once('../db/UploadedDocument.php');

switch ($_SERVER['REQUEST_METHOD']) {

     case 'POST': {
          session_start();
          $username = $_POST['username'];
          $file_name = $_POST['file_name'];
          $new_category = $_POST['new_category'];
  
          $databaseConnection = new DataBaseConnection();

          $updateStatusResult = $databaseConnection->changeDocumentStatus('В процес', $file_name, $username);
          $result = $databaseConnection->changeCategory($file_name, $username, $new_category);

          if ($updateStatusResult && $result) {
               echo json_encode(['success' => true]);
          } else {
               echo json_encode(['success' => false]);
          }
          // echo json_encode(['success' => $result]);
          break;
    }
          
}
