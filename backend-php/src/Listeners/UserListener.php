<?php


namespace App\Listeners;

use Symfony\Component\Security\Core\Event\AuthenticationFailureEvent;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;

class UserListener {

       
        
        public function onSecurityAuthenticationFailure(AuthenticationFailureEvent  $event)
        {
                

        }
}