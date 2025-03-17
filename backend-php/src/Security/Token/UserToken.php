<?php

namespace App\Security\Token;

use Symfony\Component\Security\Core\Authentication\Token\AbstractToken;

class UserToken extends AbstractToken {

    public $token;

    public $expiredAt;

    public $user_id;

    public function __construct(array $roles= array())
    {
            parent::__construct($roles);

            $this->setAuthenticated(count($roles) > 0);
    }

    public function getCredentials()
    {
            return '';
    }
}