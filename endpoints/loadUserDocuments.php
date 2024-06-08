<?php

require_once('../db/DataBaseConnection.php');
require_once('../db/UploadedDocument.php');


switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET': {
        session_start();
        $username = $_SESSION['username'];
        $isAdmin = isset($_SESSION['isAdmin']);
        $allDocuments = [];
        if ($isAdmin) {
            $allDocuments = (new DataBaseConnection())->getAllUploadedDocuments();
        } else {
            $allDocuments = (new DataBaseConnection())->getUploadedDocumentsByUsername($username);
        }
        $formattedDocuments = [];
        foreach ($allDocuments as $document) {
            $formattedDocuments[] = $document->toArray();
        }
        echo json_encode(['documents' => $formattedDocuments, 'username' => $username]);
    }
}   