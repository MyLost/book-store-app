<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\Request;
use App\Models\User\UserLoginModel;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Users;
use App\Exceptions\UserException;
use Symfony\Component\Security\Core\User\UserInterface;

class DateService {

        private $date;

        public function __construct()
        {
                $this->date = new \DateTime();; 
        }

        public function getExprirationDate()
        {
                return $this->date->add(new \DateInterval('PT2H'));
        }

        public function getCurrentDate()
        {
                return $this->date;
        }
}


  
          