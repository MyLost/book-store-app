<?php

namespace App\Controller;

use App\Controller\Base\BaseController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;


class ErrorController extends BaseController {


        public function userBadCredentials(AuthenticationUtils $utils)
        {
                $data = array(
                        // you might translate this message
                        'message' => 'Wrong password'
                    );
                return $this->LocalhostJsonResponse($data, JsonResponse::HTTP_UNAUTHORIZED);
        }

        public function userNotFound()
        {
                $data = array(
                        // you might translate this message
                        'message' => 'There is not such user - user not found'
                    );
                return $this->LocalhostJsonResponse($data, JsonResponse::HTTP_UNAUTHORIZED);
        }

        public function userTokenNotFound()
        {       
                $data = array(
                        // you might translate this message
                        'message' => 'Token not found, you need first to login'
                    );
                return $this->LocalhostJsonResponse($data, JsonResponse::HTTP_UNAUTHORIZED); 
        }

        public function userTokenError()
        {
                $data = array(
                        // you might translate this message
                        'message' => 'Not valid token or expired token'
                    );
                return $this->LocalhostJsonResponse($data, JsonResponse::HTTP_UNAUTHORIZED); 
        }
}