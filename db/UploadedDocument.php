<?php

class UploadedDocument {

    private $file_name;
    private $user;
    private $location;
    private $category;
    private $archived;
    private $times_downloaded;
    private $access_key;
    private $document_priority;
    private $status;
    private $upload_date;
    private $change_date;

    public function __construct($file_name, $user, $location, $category, $archived,
                                $times_downloaded, $access_key, $document_priority, $status, $upload_date, $change_date) {

        $this->file_name = $file_name;
        $this->user = $user;
        $this->location = $location;
        $this->category = $category;
        $this->archived = $archived;
        $this->times_downloaded = $times_downloaded;
        $this->access_key = $access_key;
        $this->document_priority = $document_priority;
        $this->status = $status;
        $this->upload_date = $upload_date;
        $this->change_date = $change_date;
    }

    public function getFile_name() {
        return $this->file_name;
    }

    public function getUser() {
            return $this->user;
    }

    public function getLocation() {
        return $this->location;
    }

    public function getCategory() {
        return $this->category;
    }

    public function getArchived() {
        return $this->archived;
    }

    public function getTimes_downloaded() {
            return $this->times_downloaded;
    }

    public function getAccess_key() {
        return $this->access_key;
    }

    public function getDocument_priority() {
        return $this->document_priority;
    }

    public function getStatus() {
        return $this->status;
    }
  
    public function getUpload_date() {
        return $this->upload_date;
    }

    public function getChange_date() {
        return $this->change_date;
    }

    public static function createUploadedDocumentFromDbRow($row) {
        return new UploadedDocument($row['file_name'], $row['user'], $row['location'], $row['category'],
        $row['archived'], $row['times_downloaded'], $row['access_key'], $row['document_priority'], $row['status'], $row['upload_date'], $row['change_date']);
    }

    public function toArray(): array {
        return [
                    'file_name' => $this->getFile_name(),
                    'user' => $this->getUser(),
                    'location' => $this->getLocation(),
                    'category' => $this->getCategory(),
                    'archived' => $this->getArchived(),
                    'times_downloaded' => $this->getTimes_downloaded(),
                    'access_key' => $this->getAccess_key(),
                    'document_priority' => $this->getDocument_priority(),
                    'status' => $this->getStatus(),
                    'upload_date' => $this->getUpload_date(),
                    'change_date' => $this->getChange_date()
                ];
    }
}