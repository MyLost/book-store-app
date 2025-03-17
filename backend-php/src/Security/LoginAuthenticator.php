<?php

namespace App\Security;

use \Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use \Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\Authenticator\AbstractFormLoginAuthenticator;
use App\Repository\UserRepository;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Core\Exception\InvalidCsrfTokenException;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Cookie;  
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\Session\Attribute\AttributeBag;
use Symfony\Component\HttpFoundation\Session\Storage\NativeSessionStorage;
use App\Entity\ApiToken;
use App\Entity\Users;
use App\Utils\YamlParser;
use App\Services\UserService;
use App\Services\TokenService;
use App\Services\DateService;
use App\Services\UtilsService;

//use Symfony\Component\Security\Http\Util\TargetPathTrait;

class LoginAuthenticator extends AbstractFormLoginAuthenticator
{

    private $userRepository;

    private $router;

    private $csrfTokenManager;

    private $passwordEncoder;

    private $entityManager;

    private $userService;

    private $tokenService;

    private $dateService;

    private $utilsService;

    public function __construct(UserRepository $userRepository, RouterInterface $router, CsrfTokenManagerInterface $csrfTokenManager, UserPasswordEncoderInterface $passwordEncoder, EntityManagerInterface $entityManager, UserService $userService, TokenService $tokenService, DateService $dateService, UtilsService $utilsService)
    {
        $this->userRepository = $userRepository;
        $this->router = $router;
        //$this->csrfTokenManager = $csrfTokenManager;
        $this->passwordEncoder = $passwordEncoder;
        $this->entityManager = $entityManager;
        $this->userService = $userService;
        $this->tokenService = $tokenService;
        $this->dateService = $dateService;
        $this->utilsService = $utilsService;
    }

    public function supports(Request $request)
    {
        $config = YamlParser::configs('../config/headers_config.Yaml');

        foreach($config["config"]["origins"] as $key=>$value)
        {
           if($value === $request->headers->get("origin"))
           {
                if ($request->attributes->get('_route') === 'UserLogin' && $request->isMethod('POST'))
                {
                    return true;
                } 
                if ($request->attributes->get('_route') === 'UserLogout' && $request->isMethod('POST'))
                {
                    return true;
                }
                if($request->attributes->get('_route') === 'UserLoginFail')
                {
                    return true; 
                }
            }
        }  
    }

    public function getCredentials(Request $request)
    {
        if($request->attributes->get('_route') === 'UserLoginFail')
        {
            return $credentials = [
            'username' => 'fakeuser',
            'password' => 'fakeuser'];
        }

        $credentials = [
            'username' => $request->request->get('_username'),
            'password' => $request->request->get('_password'),
          //  'csrf_token' => $request->request->get('_csrf_token'),
        ];


        return $credentials;
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        if($credentials['username'] === 'fakeuser')
        {
            return $userProvider->loadUserByUsername($credentials['username']);
        }
        return $userProvider->loadUserByUsername($credentials['username']);
    }

    public function checkCredentials($credentials, UserInterface $user)
    {

        if($this->passwordEncoder->isPasswordValid($user, $credentials['password']))
        {
            return true;
        }
        return false; 

    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {     
     
        if($request->attributes->get('_route') === 'UserLoginFail')
        {
            return null;
        }

        $apiToken = new ApiToken();
        $apiToken->setToken($this->tokenService->generateToken());
        $apiToken->setExpired($this->dateService->getExprirationDate());
        $apiToken->setUser($token->getUser());
        $user = $token->getUser();
        $user->addApiToken($apiToken);
        $user->setActive(true);
        // $this->userService->updateUser($user);
        $this->utilsService->saveTokenInDB($apiToken);
        // $session = new Session();
        // $session->set('username', $user->getUsername());
        //  $session->set('password', $user->getPassword());
        //   if ($targetPath = $this->getTargetPath($request->getSession(), $providerKey)) {
        //      return new RedirectResponse($targetPath);
        //   }
        //  return new RedirectResponse($this->router->generate('userLogged'));
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
            'cookies' => $request
            );
        */
        $headers = array();
    
        // $response = new JsonResponse($data, JsonResponse::HTTP_OK);
        // $response->headers->set('Token', $Authtoken);
        // $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:4200');
        //  $response->headers->set('Access-Control-Expose-Headers', 'Token');

        // $response->headers->set('Myheader', 'MyHeader');
        // $response->headers->set('Access-Control-Expose-Headers','Authorization');
        // $response->headers->setCookie(new Cookie('Mycookie', 'Mycookie',  $date));
        // $response->send();
        
        return null; 
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        if($exception instanceof BadCredentialsException)
        {
            return new RedirectResponse($this->router->generate('userBadCredentials'));
                
        }else if($exception instanceof UsernameNotFoundException)
        {
           
            return new RedirectResponse($this->router->generate('userNotFound'));
        } 
        
    }

    protected function getLoginUrl()
    {
        dd('getLoginUrl()');
        //return $this->router->generate('UserLoginFail');
        /*
        $data = [
            'success' => false,
            'contollerName' => 'UserContoller',
            'method' => 'loginFail'
        ];

        return new JsonResponse($data);
        */

        //return new RedirectResponse($this->router->generate('Here route for redirection'));
    }
}
