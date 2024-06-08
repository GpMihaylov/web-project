<?php

require_once('../db/DataBaseConnection.php');
require_once('../db/UploadedDocument.php');


switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST': {
        session_start();
        $username = $_SESSION['username'];
        $category = $_POST['category'];
        $allDocuments = [];
        $allDocuments = (new DataBaseConnection())->getUploadedDocumentsByCategory($category);

        $formattedDocuments = [];
        foreach ($allDocuments as $document) {
            $formattedDocuments[] = $document->toArray();
        }
        echo json_encode(['documents' => $formattedDocuments, 'username' => $username]);
    }
}