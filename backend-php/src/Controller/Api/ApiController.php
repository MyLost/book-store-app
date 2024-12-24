<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Psr\Log\LoggerInterface;
use App\Services\MySicretService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Controller\Base\BaseController;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;


class ApiController extends BaseController  {
        
        public function getApi(Request $request)
        {
                
                if($request->server->get('HTTP_HOST') === 'localhost:8000' || $request->server->get('HTTP_HOST') === 'localhost:4200')
                {
                      dd('work');  
                }
                return new Response('you can\'t access', Response::HTTP_LOCKED); 
                dd($request->server->get('HTTP_HOST'));
                dd('Api controller success master what do you wont to do for you');
                $session = $session = $this->container->get('session');
                //dd($session);
                if($this->getUser()->getUsername() === $session->get('username'))
                {
                        return new Response ('you get api successfully');

                }
                
                return new Response ('Access denied');
        }

        public function getData(LoggerInterface $logger)
        {
                
                return new Response('I am getData method from ApiController'); 
        }

        public function callSecretService()
        {
              //  $secretService = $this->get('secret.service');
             //   dd($secretService);

             return new Response();
        }

        public function apiError()
        {
                dd('api error');
        }

}