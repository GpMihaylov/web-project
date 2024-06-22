<?php

class DataBaseConnection {

    private $connection;

    public function __construct() {

        $databaseConfig = parse_ini_file('../config/config.ini', true)['database'];

        $this->connection = new PDO("mysql:host={$databaseConfig['host']};dbname={$databaseConfig['name']}",
                                    $databaseConfig['username'], $databaseConfig['password'],
            [
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
    }

    public function getConnection() {
        return $this->connection;
    }

    public function verifyUser($email, $password) {

        $selectStatement = $this->connection->prepare("SELECT * FROM user WHERE email = :email");

        $selectStatement->execute(['email' => $email]);

        $userData = $selectStatement->fetch();

        if (!$userData) {
            throw new Exception("No such user");
        }

        $user = User::createUserFromDbRow($userData);
        
        if (strcmp(crypt($password, ($user)->getSalt()), $user->getPassword()) !== 0) {
            throw new Exception("\n" . crypt($password, ($user)->getSalt()) . "\n" . $user->getPassword());
        }

        session_start();
        $_SESSION['username'] = $email;
        if($user->isAdmin()){
            $_SESSION['isAdmin'] = true;
        }
        return $user;
    }

    public function insertUser($user) {

        $insertStatement = $this->connection->prepare("
            INSERT INTO " . "user" . " (email, salt, password, is_admin)
            VALUES (:email, :salt, :password, :is_admin)
        ");

        $insertSuccessful = $insertStatement->execute([
            'email' => $user->getEmail(),
            'salt' => $user->getSalt(),
            'password' => $user->getHashedPassword(),
            'is_admin' => $user->isAdmin(),
        ]);

        if ($insertSuccessful) {
            return $user;
        } else {
            throw new Exception("db error");
        }
    }

    public function insertUploadedDocument($document) {

        $insertStatement = $this->connection->prepare("
            INSERT INTO " . "uploadeddocument" . " (file_name, user, location, category, archived,
            times_downloaded, access_key, document_priority, status, upload_date)
            VALUES (:file_name, :user, :location, :category, :archived,
            :times_downloaded, :access_key, :document_priority, :status, :upload_date)
        ");

        $insertSuccessful = $insertStatement->execute([
            'file_name' => $document->getFile_name(),
            'user' => $document->getUser(),
            'location' => $document->getLocation(),
            'category' => $document->getCategory(),
            'archived' => $document->getArchived(),
            'times_downloaded' => $document->getTimes_downloaded(),
            'access_key' => $document->getAccess_key(),
            'document_priority' => $document->getDocument_priority(),
            'status' => $document->getStatus(),
            'upload_date' => $document->getUpload_date()
        ]);

        if ($insertSuccessful) {
            return $document;
        } else {
            throw new Exception("db error");
        }
    }

    public function getUploadedDocumentsByUsername($username) {
        $selectStatement = $this->connection->prepare("
            SELECT * FROM " . "uploadeddocument" . " WHERE user = :username AND archived = false ORDER BY document_priority, category, status;");

        $selectStatement->execute(['username' => $username]);

        if ($selectStatement) {

            $allDocuments = [];
            while ($row = $selectStatement->fetch()) {
                $allDocuments[] = UploadedDocument::createUploadedDocumentFromDbRow($row);
            }

            return $allDocuments;
        } else {
            throw new Exception("db error");
        }
    }

    public function deleteUploadedDocument($file_name, $username) {

        $selectStatement = $this->connection->prepare("
        SELECT * FROM " . "uploadeddocument" . " WHERE user = :username AND file_name = :file_name");

        $selectStatement->execute(['username' => $username, 'file_name' => $file_name]);


        $deleteStatement = $this->connection->prepare("
        DELETE FROM " . "uploadeddocument" . " WHERE user = :username AND file_name = :file_name");

        $deleteStatement->execute(['username' => $username, 'file_name' => $file_name]);
        if ($deleteStatement) {
            return $selectStatement->fetch();
        } else {
            throw new Exception("db error");
        }
    }


    public function increasePriorityForDocument($file_name, $username) {

        $updateStatement = $this->connection->prepare("
        UPDATE `uploadeddocument` SET `document_priority` = 'high' WHERE `uploadeddocument`.`file_name` = :file_name 
        AND `uploadeddocument`.`user` = :username;");

        $updateStatement->execute(['username' => $username, 'file_name' => $file_name]);

        if ($updateStatement) {
            return true;
        } else {
            return false;
        }
    }

        public function decreasePriorityForDocument($file_name, $username) {

        $updateStatement = $this->connection->prepare("
        UPDATE `uploadeddocument` SET `document_priority` = 'low' WHERE `uploadeddocument`.`file_name` = :file_name 
        AND `uploadeddocument`.`user` = :username;");

        $updateStatement->execute(['username' => $username, 'file_name' => $file_name]);

        if ($updateStatement) {
            return true;
        } else {
            return false;
        }
    }

    

    public function getAllUploadedDocuments() {
        $selectStatement = $this->connection->prepare("SELECT * FROM uploadeddocument ORDER BY archived,document_priority;");

        $selectStatement->execute();

        if ($selectStatement) {

            $allDocuments = [];
            while ($row = $selectStatement->fetch()) {
                $allDocuments[] = UploadedDocument::createUploadedDocumentFromDbRow($row);
            }

            return $allDocuments;
        } else {
            throw new Exception("db error");
        }
    }


    public function getDocument($file_name, $username) {
        $selectStatement = $this->connection->prepare("
        SELECT * FROM " . "uploadeddocument" . " WHERE user = :username AND file_name = :file_name");

        $selectStatement->execute(['username' => $username, 'file_name' => $file_name]);

        return $selectStatement->fetch();
    }

    public function increaseDownloadDocumentField($file_name, $username) {
        $updateStatement = $this->connection->prepare("
        UPDATE `uploadeddocument` SET `times_downloaded` = `times_downloaded` + 1 WHERE `uploadeddocument`.`file_name` = :file_name 
        AND `uploadeddocument`.`user` = :username;");

        $updateStatement->execute(['username' => $username, 'file_name' => $file_name]);

        if($updateStatement){
            return true;
        }else{
            return false;
        }
    }

    public function changeDocumentStatus($status, $file_name, $username) {
        $updateStatement = $this->connection->prepare("
        UPDATE `uploadeddocument` SET `status` = :status WHERE `uploadeddocument`.`file_name` = :file_name 
        AND `uploadeddocument`.`user` = :username;");

        $updateStatement->execute(['status' => $status, 'username' => $username, 'file_name' => $file_name]);

        if($updateStatement){
            return true;
        }else{
            return false;
        }
    }

    public function archiveDocument($file_name, $username) {
        $updateStatement = $this->connection->prepare("
        UPDATE `uploadeddocument` SET `archived` = '1' WHERE `uploadeddocument`.`file_name` = :file_name 
        AND `uploadeddocument`.`user` = :username;");

        $updateStatement->execute(['username' => $username, 'file_name' => $file_name]);

        if($updateStatement){
            return true;
        }else{
            return false;
        }
    }
    

    public function unArchiveDocument($file_name, $username) {
        $updateStatement = $this->connection->prepare("
        UPDATE `uploadeddocument` SET `archived` = '0' WHERE `uploadeddocument`.`file_name` = :file_name 
        AND `uploadeddocument`.`user` = :username;");

        $updateStatement->execute(['username' => $username, 'file_name' => $file_name]);

        if($updateStatement){
            return true;
        }else{
            return false;
        }
    }

    public function getUploadedDocumentsByCategory($category) {
            $selectStatement = $this->connection->prepare("
                SELECT * FROM " . "uploadeddocument" . " WHERE category = :category ORDER BY archived,document_priority, status;");

            $selectStatement->execute(['category' => $category]);

            if ($selectStatement) {

                $allDocuments = [];
                while ($row = $selectStatement->fetch()) {
                    $allDocuments[] = UploadedDocument::createUploadedDocumentFromDbRow($row);
                }

                return $allDocuments;
            } else {
                throw new Exception("db error");
            }
    }

    public function changeCategory($file_name, $username, $new_category) {
        $updateStatement = $this->connection->prepare("
        UPDATE `uploadeddocument` SET `category` = :new_category 
        WHERE `uploadeddocument`.`file_name` = :file_name 
        AND `uploadeddocument`.`user` = :username;");

        $result = $updateStatement->execute([
            'new_category' => $new_category,
            'file_name' => $file_name,
            'username' => $username
        ]);

        if($result){
            return true;
        }else{
            return false;
        }
    }

    


}
