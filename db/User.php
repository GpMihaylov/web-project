<?php

class User {
    private $email;
    private $salt;
    private $password;
    private $isAdmin;

    public function __construct($email, $salt, $password, $isAdmin) {
            $this->email = $email;
            $this->salt = $salt;
            $this->password = $password;
            $this->isAdmin = $isAdmin;
        }
    public function getEmail() {
        return $this->email;
    }

    public function getSalt() {
        return $this->salt;
    }
    
    public function getPassword() {
        return $this->password;
    }

    public function isAdmin() {
        return $this->isAdmin;
    }

    public function getHashedPassword() {
        return crypt($this->password, $this->salt);
    }

    public function toArray(): array {
        return [
            'email' => $this->getEmail(),
            'password' => $this->getPassword(),
            'isAdmin' => $this->isAdmin()
        ];

    }
        
    public static function createUserFromDbRow($row) {
        return new User($row['email'], $row['salt'], $row['password'], $row['is_admin']);
    }
}