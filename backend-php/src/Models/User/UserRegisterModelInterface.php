<?php

namespace App\Models\User;


interface UserRegisterModelInterface {

    public function setFirstName($firstName);
    public function setLastName($lastName);
    public function setUsername($username);
    public function setPassword($password);
    public function setConfirmPassword($confirmPassword);
    public function setBornOn(\DateTime $bornOn);



    public function getFirstName();
    public function getLastName();
    public function getUsername();
    public function getPassword();
    public function getConfirmPassword();
    public function getBornOn();

}