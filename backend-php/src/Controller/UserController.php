<?php

namespace App\Controller;

use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Security\Core\Security;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use App\Services\LoginService;
use App\Services\RegisterService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Logout\LogoutHandlerInterface;
use Symfony\Component\HttpFoundation\Cookie;  
use App\Controller\Base\BaseController;
use App\Services\LogoutService;
use App\Entity\ApiToken;
use Symfony\Component\Security\Core\Event\AuthenticationFailureEvent;

class UserController extends BaseController
{
    public function login (AuthenticationUtils $utils, Request $request)
    {
        $tokens = [];
        foreach($this->getUser()->getApiTokens()->getSnapshot() as $element)
        {
            $tokens[]=$element->getToken();
        }
     
        return $this->LocalhostJsonResponse([
            'success' => 'user is success authenticated',
            'authToken' => $tokens
            ], 
            Response::HTTP_OK);

        /*
        if($request->server->get("REQUEST_METHOD") === "OPTIONS") {
            $response =  new Response('auth Response',Response::HTTP_OK);
            $response->headers->set('Access-Control-Allow-Origin', '*');
            return $response;
        }
        */

        /*
        $data = array(
            'message' => $utils->getLastUsername(),
            'user' => $this->getUser()
        );
        */

        // return new JsonResponse($data);

        /*
        $data = array(
            'success' => true,
            'message' => 'You are authenticated for our system',
            'username' => $user->getUsername(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
            'email' => $user->getEmail(),
            'phoneNumber' => $user->getPhoneNumber(),
            'Authtoken' =>  123456789,
            'cookies' => dd($request->headers)
            );
        */

            //$response = new JsonResponse($data, JsonResponse::HTTP_OK);
            //$response->headers->set('Access-Control-Allow-Origin', 'http://localhost:4200');
            //$response->headers->setCookie(new Cookie('Mycookie', 'Mycookie',0,'/',null,false,false));
            //return $response;

            //return new Response(); 
        
    }

    /**
     * @Route("/register", name="register_user")
     */
    public function register(Request $request, RegisterService $registerService) {

        /*
        if($request->server->get("REQUEST_METHOD") == "OPTIONS") {
            return new Response(); 
        }
        try{
            $result = $registerService->registerProcess($request);
            return $this->json($result);

        }catch(\Exception $excep) {
            return $this->json([
                'success' => false,
                'message' => $excep->getMessage()
            ]);
        }   
        */
    }

    public function userLogged ()
    {
        //$data = array(
        //'success' => true,
        //'message' => 'some message for success authentication for user'
        //);

        //return new JsonResponse($data, Response::HTTP_FORBIDDEN);

        //dd($username = $this->getUser()->getUsername());
        /*
            return $this->json([
                'success' => false,
                'contollerName' => 'UserContoller',
                'method' => 'userLogged',
                'Authtoken' => bin2hex(random_bytes(80)),
                'username' => $username    
            ]);
        */
    }


    public function home()
    {
        dd("home method user controller");

        //$session = $this->container->get('session');
        /*
            return new  JsonResponse([
                'redirect' => 'login'
            ], 200);
        */
        /*
            $data = [
                'logout' => 'success'
            ];
        */
        //$response = new JsonResponse($data, JsonResponse::HTTP_OK);
        //$response->headers->set('Access-Control-Allow-Origin', '*');
        //$response->headers->set('Content-Type', ['application/json', 'text/plain', 'application/xml', 'text/xml']);
        //return $response; 
    }

    public function loginFail (Request $request, LoggerInterface $logger,AuthenticationUtils $authenticationUtils)
    {
        return $this->LocalhostJsonResponse(
            ['success' => false, 'message' => 'bad credentials'], 
            Response::HTTP_UNAUTHORIZED);

        //$response = new JsonResponse(['success' => false, 'message' => 'bad credentials'], Response::HTTP_UNAUTHORIZED);
        //$response->headers->set('Access-Control-Allow-Origin', '*'); 
        //return  $response;

        //$response = new JsonResponse(['success' => false, 'message' => 'username not found'], Response::HTTP_UNAUTHORIZED);
        //$response->headers->set('Access-Control-Allow-Origin', '*'); 
        //return  $response;
    }

    public function logout(LogoutService $logout) 
    {

        
        $logout->logout($this->getUser());
        $this->getDoctrine()->getManager()->remove(new ApiToken);

        //$this->logoutProcess();
        //return new Response('logout controller');
        //return new \Symfony\Component\HttpFoundation\RedirectResponse('http://localhost:4200');
        //$token = $this->container->get('security.token_storage')->getToken();
        //$session =$this->container->get('session');
        // $session->remove('PHPSESSID');
        

        $data = [
            'logout' => 'success'
         
        ];
    
        //$response = new JsonResponse($data, JsonResponse::HTTP_OK);
        //$response->headers->set('Access-Control-Allow-Origin', '*');
        //$response->headers->set('Content-Type', ['application/json', 'text/plain', 'application/xml', 'text/xml']);

        return $this->LocalhostJsonResponse($data, Response::HTTP_OK);

    }
   
}
