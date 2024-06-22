<?php

require_once('../db/DataBaseConnection.php');
require_once('../db/UploadedDocument.php');

switch ($_SERVER['REQUEST_METHOD']) {

     case 'POST': {
          session_start();
          $username = $_POST['username'];
          $file_name = $_POST['file_name'];

          $databaseConnection = new DataBaseConnection();
  
          $updateStatusResult = $databaseConnection->changeDocumentStatus('В процес', $file_name, $username);

          $increaseDownloadResult = $databaseConnection->increaseDownloadDocumentField($file_name, $username);
          if ($updateStatusResult && $increaseDownloadResult) {
               echo json_encode(['success' => true]);
          } else {
               echo json_encode(['success' => false]);
          }
          break;
    }
          
}
