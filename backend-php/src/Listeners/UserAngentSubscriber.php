<?php
        namespace App\Listeners;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetresponseEvent;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class UserAngentSubscriber implements EventSubscriberInterface
{

        public function __construct()
        {
                
        }

        public function onKernelRequest()
        {
              //  echo 'onKernelRequest()';
                //     $request = $event->getRequest();
              
                //   $request->attributes->set('_controller', function() {
                //           return new Response('Hello Dinosaur!');
                //});
        }

        public function onKernelResponse()
        {
             // echo 'output response';
          
        }

        public static function getSubscribedEvents()
        {
                return array(
                        'kernel.request' => 'onKernelRequest'
                       
                );
        }
}