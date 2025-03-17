<?php

namespace App\Services;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Users;

use Symfony\Component\Security\Core\User\UserInterface;


class UserService {

        private $entityManager;

        public function __construct(EntityManagerInterface $entityManager)
        {
                $this->entityManager = $entityManager;
        }

        public function updateUser(UserInterface $user)
        {
                //$user->setActive(true);
                //$this->entityManager->persist($user);
                //$this->entityManager->flush();
        }

        
}