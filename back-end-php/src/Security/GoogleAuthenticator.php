<?php

namespace App\Security;

use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use KnpU\OAuth2ClientBundle\Security\Authenticator\SocialAuthenticator;
use League\OAuth2\Client\Provider\GoogleUser;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;


class GoogleAuthenticator extends SocialAuthenticator
{
    private $clientRegistry;
    private $em;
    private $router;

    public function __construct(ClientRegistry $clientRegistry, EntityManagerInterface $em, RouterInterface $router)
    {
        $this->clientRegistry = $clientRegistry;
        $this->em = $em;
        $this->router = $router;
    }

    public function supports(Request $request)
    {
       dd('This authenticator is for gogleauthentications');
   // return true;     
 //  var_dump('supprost method of googleGuard');
     //dd('Google authenticator');
      // dd($request->getPathInfo());
       //dd($request->getPathInfo() == '/connect/google/check' && $request->isMethod('GET'));
        return $request->getPathInfo() == '/connect/google/check' && $request->isMethod('GET');
    }

    public function getCredentials(Request $request)
    {
      //  dd('getCredentials');
     //   dd($this->getGoogleClient());
     //  dd($this->fetchAccessToken($this->getGoogleClient()));
        return $this->fetchAccessToken($this->getGoogleClient());
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
       //dd($credentials->getToken());
       //dd($this->getGoogleClient()->fetchUserFromToken($credentials));
        /** @var GoogleUser $googleUser */
        $googleUser = $this->getGoogleClient()
            ->fetchUserFromToken($credentials);

      //  dd($googleUser);    
        $email = $googleUser->getEmail();

        $user = $this->em->getRepository(Users::class)
            ->findOneBy(['google_email' => $email]);
            //dd($user);
        if (!$user) {
           // $user = new User();
           // $user->setEmail($googleUser->getEmail());
           // $user->setFullname($googleUser->getName());
           // $user->setCreatedAt(new \DateTime(date('Y-m-d H:i:s')));
           // $this->em->persist($user);
           // $this->em->flush();
           
        }

        return $user;
    }

    /**
     * @return \KnpU\OAuth2ClientBundle\Client\OAuth2Client
     */
    private function getGoogleClient()
    {
      //  dd('getgoogleclient');
        return $this->clientRegistry
            ->getClient('google');
    }

    /**
     * Returns a response that directs the user to authenticate.
     *
     * This is called when an anonymous request accesses a resource that
     * requires authentication. The job of this method is to return some
     * response that "helps" the user start into the authentication process.
     *
     * Examples:
     *  A) For a form login, you might redirect to the login page
     *      return new RedirectResponse('/login');
     *  B) For an API token authentication system, you return a 401 response
     *      return new Response('Auth header required', 401);
     *
     * @param Request $request The request that resulted in an AuthenticationException
     * @param \Symfony\Component\Security\Core\Exception\AuthenticationException $authException The exception that started the authentication process
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function start(Request $request, \Symfony\Component\Security\Core\Exception\AuthenticationException $authException = null)
    {
        return new RedirectResponse('/login');
    }

    /**
     * Called when authentication executed, but failed (e.g. wrong username password).
     *
     * This should return the Response sent back to the user, like a
     * RedirectResponse to the login page or a 403 response.
     *
     * If you return null, the request will continue, but the user will
     * not be authenticated. This is probably not what you want to do.
     *
     * @param Request $request
     * @param \Symfony\Component\Security\Core\Exception\AuthenticationException $exception
     *
     * @return \Symfony\Component\HttpFoundation\Response|null
     */
    public function onAuthenticationFailure(Request $request, \Symfony\Component\Security\Core\Exception\AuthenticationException $exception)
    {
       //dd('request failure');
    }

    /**
     * Called when authentication executed and was successful!
     *
     * This should return the Response sent back to the user, like a
     * RedirectResponse to the last page they visited.
     *
     * If you return null, the current request will continue, and the user
     * will be authenticated. This makes sense, for example, with an API.
     *
     * @param Request $request
     * @param \Symfony\Component\Security\Core\Authentication\Token\TokenInterface $token
     * @param string $providerKey The provider (i.e. firewall) key
     *
     * @return void
     */
    public function onAuthenticationSuccess(Request $request, \Symfony\Component\Security\Core\Authentication\Token\TokenInterface $token, $providerKey)
    {
    //   dd('do tuk');
      //  $response =  new Response('auth Response',Response::HTTP_FOUND);
      // $response->headers->set('Location', 'http://localhost:4200/home');
      //  return $response;
    }
}