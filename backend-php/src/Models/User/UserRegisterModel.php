<?php

namespace App\Models\User;


class UserRegisterModel implements UserRegisterModelInterface {

    private $firstName;
    private $lastName;
    private $username;
    private $password;
    private $confirmPassword;
    private $bornOn;


    public function setFirstName($firstName) {
        $this->firstName = strip_tags($firstName);
    }
    public function setLastName($lastName) {
        $this->lastName = strip_tags($lastName);
    }
    public function setUsername($username) {
        $this->username = strip_tags($username);
    }
    public function setPassword($password) {
        $this->password = strip_tags($password);
    }
    public function setConfirmPassword($confirmPassword) {
        $this->confirmPassword = strip_tags($confirmPassword);
    }
    public function setBornOn(\DateTime $bornOn){
        $this->bornOn = $bornOn;
    }



    public function getFirstName() {
        return $this->firstName;
    }
    public function getLastName() {
        return $this->lastName;
    }
    public function getUsername() {
        return $this->username;
    }
    public function getPassword() {
        return $this->password;
    }
    public function getConfirmPassword() {
        return $this->confirmPassword;
    }
    public function getBornOn() {
        return $this->bornOn;
    }
}