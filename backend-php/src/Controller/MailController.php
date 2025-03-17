<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use App\Controller\Base\BaseController;



class MailController extends BaseController
{
    /**
     * @Route("/mail", name="mail")
     */
    public function index(\Swift_Mailer $mailer)
    {
        /*
        $transport = (new \Swift_SmtpTransport('smtp.gmail.com', 465, 'ssl'))
        ->setUsername('ddimitrov10@gmail.com')
        ->setPassword('madness12');
*/
        $mailer = new \Swift_Mailer($transport);

        $message = (new \Swift_Message('Wonderful Subject'))
        ->setFrom(['john@doe.com' => 'John Doe'])
        ->setTo(['lost1223@abv.bg' => 'Anni Lozeva'])
        ->setBody('Here is the message itself')  ;

        $result = $mailer->send($message);

        /*
        $transport = \Swift_SmtpTransport::newInstance('localhost', 25);
        $mailer = \Swift_Mailer::newInstance($transport);

        $message = \Swift_Message::newInstance('SUBJECT GOES HERE')
		->setFrom(array('ddimitrov10@gmail.com' => 'My name'))
		->setTo(array('lost1223@abv.bg' => 'message for lost'))
        ->setBody($toSend);
        
        $emailSent = $mailer->send($message);  */ 
        /*
        $message = (new \Swift_Message('Hello world'))
        ->setFrom('no-repley@bookstore.com')
        ->setTo('ddimitrov10@gmail.com')
        ->setBody(
            'hello a am from bookstore and I want to say hello, this is my first email :)'
        );

        $mailer->send($message);
        */
        return new Response('message delivered success');
    }
}
