<?php

namespace App\Controller;

use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Controller\Base\BaseController;




class GoogleController extends BaseController
{
    /**
     * Link to this controller to start the "connect" process
     *
     * 
     * 
     */
    public function connectAction(ClientRegistry $clientRegistry, Request $request)
    {
      //  dd($clientRegistry
       // ->getClient('google'));
       // $response =  new Response('auth Response',Response::HTTP_OK);
         //   $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:4200');
         //   return $response;

        if($request->server->get("REQUEST_METHOD") === "OPTIONS") {
            $response = new Response('auth Response',Response::HTTP_OK);
            $response->headers->set('Access-Control-Allow-Origin', '*');
            return $response; 


        //  return $clientRegistry
        //  ->getClient('google')
        //  ->redirect();
        }
        //dd('connectAction - method');
       // dd($clientRegistry->getClient('google'));
           //dd('connectAction - methodFrom - GoogleController');
        return $clientRegistry
            ->getClient('google')
            ->redirect();
    }

    /**
     * Facebook redirects to back here afterwards
     *
     * @param Request $request
     * @return JsonResponse|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function connectCheckAction(Request $request, ClientRegistry $clientRegistry)
    {
        $response =  new Response('connectCheckAction',Response::HTTP_OK);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;

        if($request->server->get("REQUEST_METHOD") === "OPTIONS") {
            $response =  new Response('auth Response',Response::HTTP_OK);
            $response->headers->set('Access-Control-Allow-Origin', '*');
            return $response;
        }
            return new Response ('success');
        //return $this->redirectToRoute('login');

       // dd($clientRegistry->getClient('google')->fetchUser()); // This do not work!
         //    dd('connectCheckAction - method');

        if (!$this->getUser()) {
            return new JsonResponse(array('status' => false, 'message' => "User not found!"),JsonResponse::HTTP_UNAUTHORIZED);
        } else {
           // $response =  new JsonResponse(array('status' => true, 'message' => "User found!"),JsonResponse::HTTP_FOUND);
         //   $response->headers->set('Location', 'localhost:4200/home');
       //  $response =  new Response('auth Response',Response::HTTP_FOUND);
       //  $response->headers->set('Location', 'http://localhost:4200/home');
      //  return $response;
        }

    }

}