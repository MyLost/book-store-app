<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\Request;
use App\Models\User\UserLoginModel;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Users;
use App\Exceptions\UserException;
use Symfony\Component\Security\Core\User\UserInterface;

class UtilsService {

        private $entityManager;


        public function __construct(EntityManagerInterface $entityManager)
        {
                $this->entityManager = $entityManager;
        }       
        
        public function saveTokenInDB($apiTokenEntity)
        {
                
                $this->entityManager->persist($apiTokenEntity);
                //$this->entityManager->persist($user);
                $this->entityManager->flush();
        }

       

}