<?php

require_once('../db/DataBaseConnection.php');
require_once('../db/UploadedDocument.php');

switch ($_SERVER['REQUEST_METHOD']) {

     case 'POST': {
          session_start();
          $username = $_SESSION['username'];
          $file_name = $_POST['file_name'];
          $access_key = $_POST['access_key'];
  
          $document = (new DataBaseConnection())->getDocument($file_name, $username);
          if($document){
              if($document['access_key'] == $access_key){
                    $file_name = $document['file_name'];
                    $url = $document['location'];
                    if((new DataBaseConnection())->increaseDownloadDocumentField($file_name, $username)){
                        echo json_encode(['url' => $url, 'file_name' => $file_name]);
                    }
            }else{
                echo json_encode(['error' => "Това не е правилният ключ за достъп за този файл!"]);
            }
          }
          break;
      }
}