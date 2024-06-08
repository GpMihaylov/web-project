<?php

require_once('../db/DataBaseConnection.php');
require_once('../db/UploadedDocument.php');

switch ($_SERVER['REQUEST_METHOD']) {
     case 'POST': {
          if(isset($_FILES['file']['name'])){
               session_start();
               
               $username = $_SESSION['username'];
               $filename = $_FILES['file']['name'];

               $file_extension = pathinfo($filename, PATHINFO_EXTENSION);
               $file_extension = strtolower($file_extension);

               $file_id = uniqid();

               $location = '../upload/'.$file_id.'.'.$file_extension;
               $real_location = './upload/'.$file_id.'.'.$file_extension;

               $uploadedDocument = new UploadedDocument($filename, $username, $real_location, $_POST['category'],
               0, 0, $_POST['access_key'], "low");
               echo json_encode((new DataBaseConnection())->insertUploadedDocument($uploadedDocument)->toArray());

               if(!move_uploaded_file($_FILES['file']['tmp_name'], $location)){
                    throw new Exception("cannot save file on server");
               }
          }
     }
}