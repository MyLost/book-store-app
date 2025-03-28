<?php

namespace App\Listeners;

use Symfony\Component\Security\Http\Firewall\ListenerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\AuthenticationManagerInterface;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;

class AuthenticationListener implements ListenerInterface 
{
        /** 
        * @var TokenStorageInterface
        */
        private $tokenStorage;
         /**
        * @var AuthenticationManagerInterface
        */
        private $authenticationManager;
         /**
        * @var string Uniquely identifies the secured area
        */
        private $providerkey;
        
        public function handle(GetResponseEvent $event)
        {
                /*
                $request = $event->getRequest();

                $username = '';
                $password = '';
        
                $unauthenticatedToken = new UsernamePasswordToken(
                    $username,
                    $password,
                    $this->providerKey
                );
        
                $authenticatedToken = $this
                    ->authenticationManager
                    ->authenticate($unauthenticatedToken);
        
                $this->tokenStorage->setToken($authenticatedToken);
            }  */
        }
        
}