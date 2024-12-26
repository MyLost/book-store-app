<?php

namespace App\Controller\Base;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Utils\Headers;

Abstract class BaseController extends AbstractController
{
    private $headers;

    public function __construct(Headers $headers)
    {
        $this->headers = $headers;
    }

    public function LocalhostResponse(string $content, int $statusCode)
    {
        $response = new Response();
        $response = $this->headers->seLocalhostHeaders($response); 
        $response->setContent($content);
        $response->setStatusCode($statusCode);
        return $response;

    }

    public function LocalhostJsonResponse(array $content, int $statusCode)
    {
        $content = json_encode($content);
        //$headers = $this->getConfigurations();
        $response = new JsonResponse();
        $response =$this->headers->seLocalhostHeaders($response); 
        /*
        foreach($headers['config']['headers']['localhost'] as $key=>$value)
        {
            $response->headers->set($key,$value);


        }
        */
        $response->setContent($content);
        $response->setStatusCode($statusCode);

        return $response;
    }


    public function mJsonResponse(array $content, int $statusCode)
    {
        $content = json_encode($content);
        //$headers = $this->getConfigurations();
        $response = new JsonResponse();
        $response =$this->headers->seLocalhostHeaders($response); 
        /*
        foreach($headers['config']['headers']['localhost'] as $key=>$value)
        {
            $response->headers->set($key,$value);


        }
        */
        $response->setContent($content);
        $response->setStatusCode($statusCode);

        return $response; 
    }

   
}
