<?php

        
namespace App\Listeners;

        use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;    
        use Symfony\Component\HttpFoundation\Response;
        use Symfony\Component\HttpFoundation\RedirectResponse;
        use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
        use Symfony\Component\Security\Core\Event\AuthenticationFailureEvent;
        use Symfony\Component\Routing\RouterInterface;


class ExceptionListener {

     private $router;

     public function __construct(RouterInterface $router)
    {
        $this->router = $router;
    }
    public function onSecurityAuthenticationFailure(AuthenticationFailureEvent  $event)
    {
        //dd($event);
        //dd($event->getAuthenticationException());
        // You get the exception object from the received event
        //$exception = $event->getException();
        /*
        $message = sprintf(
            'My Error says: %s with code: %s'
            //$exception->getMessage(),
            //$exception->getCode()
        );
        */
        // Customize your response object to display the exception details
        $response = new Response();
        $response->setContent('error');

        // HttpExceptionInterface is a special type of exception that
        // holds status code and header details
      /*
        if ($exception instanceof HttpExceptionInterface) {
            $response->setStatusCode($exception->getStatusCode());
            $response->headers->replace($exception->getHeaders());
        } else {
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    */
        // sends the modified response object to the event

        //return new RedirectResponse($this->router->generate('userBadCredentials'));
        
        //$event->setResponse(RedirectResponse ($this->router->generate('badCredentials')));
    }
}
