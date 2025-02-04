<?php

namespace App\Utils;

use Symfony\Component\HttpFoundation\Response;
use App\Utils\YamlParser;


class Headers {
 
        public function seLocalhostHeaders(Response $response)
        {
                $headers = $this->getConfigurations();

                foreach($headers['config']['headers']['localhost'] as $key=>$value)
                {
                    $response->headers->set($key,$value);
        
                }
        return $response;
        }


        public function getConfigurations()
        {
            return YamlParser::configs('../config/headers_config.Yaml');
        }
}