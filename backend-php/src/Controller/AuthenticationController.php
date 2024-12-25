<?php

namespace App\Controller;

use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\Security\Core\Security;
use Psr\Log\LoggerInterface;
use App\Controller\Base\BaseController;

     

class AuthenticationController extends BaseController
{
  
    public function auth(Request $request, AuthenticationUtils $utils , Security $security, LoggerInterface $logger)
    {    

        //   $error = $utils->getLastAuthenticationError();
        //   $lastUsername = $utils->getLastUsername();
        //   var_dump($utils->getLastAuthenticationError());
        //   var_dump($lastUsername);exit;


        //   var_dump(bin2hex(random_bytes(60)));
        //   $dateTimeObj= new \DateTime();
        //   $dateTimeObj->add(new \DateInterval("PT2H"));
        //   var_dump( $dateTimeObj->format('Y-m-d H:i:s')); exit; 

    
      return $this->json([
        'success' => false,
        'data' => 'this is authentication controller'
      ]);

    }

    public function security() 
    {

        return new Response('security');
       // return new RedirectResponse('http://localhost:4200');
/*
        $data = [
            'success' => true,
            'message' => 'Welcome Admin to your private space here you are the master and every you wish is low for me',
            'data' => 'Must return samo data about admin staff',
            'user'=> $this->getUser()
        ];

        $response = new \Symfony\Component\HttpFoundation\JsonResponse();
        $response->setContent(json_encode($data));
        $response->setStatusCode(\Symfony\Component\HttpFoundation\JsonResponse::HTTP_OK);
        return $response;*/
    }

    public function profile() 
    {

        return  $this->json([
            'message' => 'Welcome master to our system what do you wont to do for you',
            'success' => true,
            'data' => 'Some data about user'
        ]);
    }

    public function homepage() 
    {
       return new Response('homepage'); 
    }
    
    public function apiAccount()
    {
        $user = $this->getUser();
        return $this->json($user);
    }


    public function loginFail()
    {
        //dd("login fail");
        //$response = new Response('login fail', Response::HTTP_OK);
        //$response->headers->set('Access-Control-Allow-Origin', '*');
        //$response->headers->set('Content-Type', ['application/json', 'text/plain', 'application/xml', 'text/xml']);
        //return $response;

        return $this->LocalhostResponse('Bad credentials', Response::HTTP_UNAUTHORIZED);

    }
    
}
