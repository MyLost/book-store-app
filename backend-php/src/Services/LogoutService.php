<?php
        namespace App\Services;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ApiTokenRepository;
use Doctrine\ORM\EntityRepository;
use App\Entity\ApiToken;
use App\Entity\Users;
use Symfony\Component\Routing\RouterInterface;

class LogoutService {

        private $entityManager;

        private $container;


        public function __construct(EntityManagerInterface $entityManager, ContainerInterface $container)
        {
                $this->entityManager = $entityManager;
                $this->container = $container;

        }

        public function eraseToken(Users $user)
        {
                
                $results = $this->entityManager->getRepository(ApiToken::class)->findOneByUserId($user->getId());
                foreach($results as $result)
                {
                        $this->entityManager->remove($result);
                        $this->entityManager->flush();
                }  
 
        }

        public function eraseCookie($user)
        {

        }

        public function changeUserActive(Users $user)
        {
                $userId = $user->getId();
                $user->setActive(false);
                $this->entityManager->persist($user);
                $this->entityManager->flush();
        }

        public function deleteSession(ContainerInterface $container)
        {
                $session = $container->get('session');
                $session->clear();
        }

        public function logout(Users $user)
        {
                $this->eraseToken($user);
                $this->changeUserActive($user);
                $this->deleteSession($this->container);


        }
}