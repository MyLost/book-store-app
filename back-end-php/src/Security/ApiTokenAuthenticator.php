<?php

namespace App\Security;

use \Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;
use App\Repository\ApiTokenRepository;
use App\Repository\UserRepository;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Routing\RouterInterface;
use App\Security\Token\UserToken;
use Symfony\Component\Security\Core\Authentication\AuthenticationManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Security\Core\Authentication\AuthenticationProviderManager;
use Symfony\Component\Security\Core\Exception\AuthenticationCredentialsNotFoundException;

class ApiTokenAuthenticator extends AbstractGuardAuthenticator
{
    private $apiTokenRepo;

    private $userRepository;

    private $router;

    protected $tokenStorage;

    protected $authenticationManager;

    private $container;

    public function __construct (
        ApiTokenRepository $apiTokenRepo, UserRepository $userRepository, RouterInterface $router, TokenStorageInterface $tokenStorage, AuthenticationManagerInterface $authenticationManager, ContainerInterface $container
        )
    {
        $this->userRepository = $userRepository;
        $this->apiTokenRepo = $apiTokenRepo;
        $this->router = $router;
        $this->tokenStorage = $tokenStorage;
        $this->authenticationManager = $authenticationManager;
        $this->container = $container;
    }
    public function supports(Request $request)
    {
        //var_dump(bin2hex(random_bytes(60)));
        //use Doctrine\Common\Persistence\ObjectManager;
        //$dateTimeObj= new \DateTime();
        //$dateTimeObj->add(new \DateInterval("PT2H"));
        //var_dump( $dateTimeObj->format('Y-m-d H:i:s')); exit;

        if($request->headers->has('X-AUTH-TOKEN'))
        {
            $token = explode(" ", $request->headers->get('X-AUTH-TOKEN'));
            if($token[0] === "Bearer")
            {
                return true;
            }
            return false;
        }
    }

    public function getCredentials(Request $request)
    {
        $authorizationHeader = $request->headers->get('X-AUTH-TOKEN');
        return substr($authorizationHeader, 7);
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        if (null === $credentials) {
            return null;
        }

        $token = $this->apiTokenRepo->findOneBy(['token' => $credentials]);

        if($token === null)
        {
            throw new CustomUserMessageAuthenticationException('You have not valid token');
        }

        $user = $this->userRepository->findOneBy(['id' => $token->getUser()->getId()]);

        $token->setUser($user);
        $user->addApiToken($token);

        //dd($userProvider->loadUserByUsername(['token' => $credentials]));
        //$token = $this->apiTokenRepo->findOneBy();
        //dd($token->getUser()->getId());
        //dd($userProvider->loadUserByUsername());
        //dd($userProvider->loadUserByUsername($token->getUser()->getId()));
        //dd($user);
        //dd($userProvider); // I need to fetch user with userprovider and set it in token!!! This is task for tommorow
      
       return $user;
    
    }

    public function checkCredentials($credentials, UserInterface $user)
    {
        $tokenDb = $this->apiTokenRepo->findOneBy(['token' => $credentials]);

        if($tokenDb === null)
        {
            return false;
        }
        if($credentials === null)
        {
            return false;

        }else if ($this->isExpired($tokenDb->getExpired()))
        {
            throw new CustomUserMessageAuthenticationException('Your token expired at: ');
        }
        
        $unauthenticatedToken = new UserToken();
        $unauthenticatedToken->token = $tokenDb->getToken();
        $unauthenticatedToken->expiredAt = $tokenDb->getExpired();
        $unauthenticatedToken->user_id = $tokenDb->getUser()->getId();
        $unauthenticatedToken->setUser($tokenDb->getUser());

        $providers = array($this->container->get('token.provider'));

        try {
            $authenticationManager = new AuthenticationProviderManager($providers);
            $authenticatedToken = $authenticationManager->authenticate($unauthenticatedToken);
            //$provider = $this->container->get('token.provider');
            //$authToken = $provider->authenticate($token);
            $this->tokenStorage->setToken($authenticatedToken);

        } catch (AuthenticationException $failed) {

            dd($failed); //activete when userprovider trow exception for example
            // ... you might log something here

            // To deny the authentication clear the token. This will redirect to the login page.
            // Make sure to only clear your token, not those of other authentication listeners.
            // $token = $this->tokenStorage->getToken();
            // if ($token instanceof WsseUserToken && $this->providerKey === $token->getProviderKey()) {
            //     $this->tokenStorage->setToken(null);
            // }
            // return;
        }
       
        //dd($this->getExpiresAt());
        //dd($user);
        //dd($user);
        //$user =  $this->userRepository->findOneBy(['id' => $user->getId()]);
        //dd($user->getApiTokens());
        //dd('checking credentials');

       return true;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        if($exception instanceof CustomUserMessageAuthenticationException)
        {
            return new RedirectResponse($this->router->generate('userTokenError'));
        }
        if($exception instanceof UsernameNotFoundException)
        {
            return new RedirectResponse($this->router->generate('userNotFound'));
        }
       
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        return null;

    }

    public function start(Request $request, AuthenticationException $authException = null)
    {       
        if($authException instanceof AuthenticationCredentialsNotFoundException)
        {
            return new RedirectResponse($this->router->generate('userTokenNotFound'));
        }
        
        

    }

    public function supportsRememberMe()
    {
        // todo
    }

    public function isExpired($expiredAt)
    {

      if($expiredAt < new \Datetime())
      {
          return true;
      }

      return false;
    }
}
