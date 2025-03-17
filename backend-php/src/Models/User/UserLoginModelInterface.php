<?php

namespace App\Models\User;

interface UserLoginModelInterface {

  public function setUsername($username);
  public function getUsername();

  public function setPassword($password);
  public function getPassword();
     
}