<?php

namespace App\Services;

class TokenService {

        private $authToken;

        
        public function __construct()
        {
                
        }

        public function generateToken()
        {
                $authToken = bin2hex(random_bytes(80));
                return $authToken;
                
        }

        public function getToken()
        {
                return $this->authToken;
        }



}


  