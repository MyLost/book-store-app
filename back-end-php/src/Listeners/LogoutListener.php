<?php

namespace App\Listeners;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Logout\LogoutHandlerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use FOS\UserBundle\Model\UserManagerInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use App\Services\LogoutService;
use Symfony\Component\HttpFoundation\JsonResponse;



        class LogoutListener implements LogoutHandlerInterface {

                //private $entityManager;

                private $container;

                //private $logoutService;


                public function __construct( //EntityManagerInterface $entityManager, LogoutService $logoutService
                                        ContainerInterface $container)
                {
                        //$this->entityManager = $entityManager;
                        $this->container = $container;
                        // $this->logoutService = $logoutService;

                }

                public function logout(Request $request, Response $response, TokenInterface $token) 
                {
                     dd('sdfsafdsadfasdf');
                     
                        $user = $token->getUser();
                        $logoutService = $this->container->get('logout.service');
                        $logoutService->logout($user, $this->container);
                }
              
        }

