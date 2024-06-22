<?php

require_once('../db/DataBaseConnection.php');
require_once('../db/UploadedDocument.php');

switch ($_SERVER['REQUEST_METHOD']) {

     case 'POST': {
          session_start();
          $username = $_POST['username'];
          $file_name = $_POST['file_name'];
          $status = $_POST['status'];
  
          $result = (new DataBaseConnection())->changeDocumentStatus($status, $file_name, $username);

          echo json_encode(['success' => $result]);
          break;
      }
}