<?php

namespace App\Security;

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

//use Symfony\Component\Security\Http\Util\TargetPathTrait;

class MainAuthenticator extends AbstractFormLoginAuthenticator
{

    private $userRepository;

    private $router;

    private $csrfTokenManager;

    private $passwordEncoder;

    private $entityManager;


    public function __construct(UserRepository $userRepository, RouterInterface $router, CsrfTokenManagerInterface $csrfTokenManager, UserPasswordEncoderInterface $passwordEncoder, EntityManagerInterface $entityManager)
    {
        $this->userRepository = $userRepository;
        $this->router = $router;
        //$this->csrfTokenManager = $csrfTokenManager;
        $this->passwordEncoder = $passwordEncoder;
        $this->entityManager = $entityManager;
    }

    public function supports(Request $request)
    {

        return true;
        return $request->attributes->get('_route') === 'login'
                && $request->isMethod('POST');
        
      
    }

    public function getCredentials(Request $request)
    {
       // dd('vlizam li v gredentials');
        $credentials = [
            'username' => $request->request->get('_username'),
            'password' => $request->request->get('_password'),
          //  'csrf_token' => $request->request->get('_csrf_token'),
        ];

        return array('working' => 'work');
        return $credentials;
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
       
      //  $token = new CsrfToken('authenticate', $credentials['csrf_token']);
        /*
        if (!$this->csrfTokenManager->isTokenValid($token)) {
            throw new InvalidCsrfTokenException();
        }
        */
    //    $conn = $this->entityManager->getConnection();
    //    $stmt = $conn->prepare('
    //    SELECT * FROM users
    //    INNER JOIN api_token WHERE users.id = api_token.user_id');
    //    $stmt->execute();
        //return $userProvider->loadUserByUsername($credentials['username']);

       // return $credentials;
    }

    public function checkCredentials($credentials, UserInterface $user)
    {
        //dd('vlizam li v checkCredentials');

        // cannot get apiToken from user?
        if($this->passwordEncoder->isPasswordValid($user, $credentials['password']))
        {
            return true;
        }
        return false; 

    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {     

        
      //  dd('vlizam li v onAuthenticationSuccess');

        $user = $token->getUser();
       // $session = new Session();
       // $session->set('username', $user->getUsername());
      //  $session->set('password', $user->getPassword());
        $user->setActive(true);
        //dd($request);
        $this->entityManager->persist($user);
        $this->entityManager->flush();
       
        //   if ($targetPath = $this->getTargetPath($request->getSession(), $providerKey)) {
        //      return new RedirectResponse($targetPath);
        //   }

      //  return new RedirectResponse($this->router->generate('userLogged'));

           $Authtoken = bin2hex(random_bytes(80));
           $date = new \DateTime();
           $date->add(new \DateInterval('PT4H'));

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
      

        $apiToken = new ApiToken();
        $apiToken->setExpired($date);
        $apiToken->setToken( $Authtoken);
        $apiToken->setUser($user);

        $this->entityManager->persist($apiToken);
        $this->entityManager->persist($user);
        $this->entityManager->flush();

    
      //  $headers = array(
          //  'Content-Type' => '*',
         //   'Access-Control-Allow-Headers' => '*',
         //   'Access-Control-Allow-Methods' => '*',
         //   'Access-Control-Allow-Origin' => '*',
         //   'Access-Control-Request-Method' => '*',
         //   'Access-Control-Expose-Headers' => 'Authorization', 
        //    'Access-Control-Expose-Headers' => 'Myheader',
         //   'Access-Control-Request-Headers' => '*',
          //  'Access-Control-Max-Age' => '*',
         //   'Authorization' => $Authtoken,
         //   'Authorization' => $Authtoken,
         //   'Authorization' => $Authtoken,
         //   'Authorization' => $Authtoken,
         //   'Authorization' => $Authtoken,
         //   'Authorization' => $Authtoken

     //   );
    
      
       // $response = new JsonResponse($data, JsonResponse::HTTP_OK);
       // $response->headers->set('Token', $Authtoken);
       // $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:4200');
      //  $response->headers->set('Access-Control-Expose-Headers', 'Token');

       // $response->headers->set('Myheader', 'MyHeader');
     //   $response->headers->set('Access-Control-Expose-Headers','Authorization');
      //  $response->headers->setCookie(new Cookie('Mycookie', 'Mycookie',  $date));
       // $response->send();
        
        return null; 
    }

    protected function getLoginUrl()
    {
            dd('sdfasdfsadf');
        //return header('Location:', 'localhost:4200/login');
            /*
        $data = [
            'success' => false,
            'contollerName' => 'UserContoller',
            'authenticator' => 'MainAuthenticator'
        ];

        return new JsonResponse($data,JsonResponse::HTTP_OK);
*/
        return $this->router->generate('UserLoginFail');

        //return new RedirectResponse($this->router->generate('security'));
    }
}
