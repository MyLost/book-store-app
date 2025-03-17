<?php

namespace App\Models\User;

class UserLoginModel implements UserLoginModelInterface {

   private $username;
   private $password;

   public function setUsername($username) {
       $this->username = strip_tags($username); 
   }
   public function getUsername() {
       return $this->username;
   }
 
   public function setPassword($password) {
       $this->password = strip_tags($password);
   }
   public function getPassword() {
       return $this->password;
   }

}