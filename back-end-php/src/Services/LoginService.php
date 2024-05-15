<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\Request;
use App\Models\User\UserLoginModel;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Users;
use App\Exceptions\UserException;


//define('USER_UGENT_REGEX', '/Mozilla|Chrome|Safari/');

class LoginService {

    private $entityManager;

    public function __construct (EntityManagerInterface $entityManager) {
       $this->entityManager = $entityManager;
    }
    
    function loginProcess(Request $request) {

        $postData = json_decode($request->getContent()); 

        $userUrgent = $request->headers->get('user-agent');
        $userUrgent = preg_match(USER_UGENT_REGEX, $userUrgent, $matches);

        foreach ($matches as $elem) {
            if (!($elem === "Mozilla" | $elem === "Chrome" | $elem === "Safari" | $elem === "Mozilla")) {           throw new Exception ('not supported browser'); 
            }
        }
        
        if(isset($postData)) {
            $user = new UserLoginModel();
            $user->setUsername($postData->username);
            $user->setPassword($postData->password);
            return $this->loginUser($user);
        }
    }

    function loginUser(UserLoginModel  $user) {

        try{
            $userFromDb = $this->entityManager->getRepository(Users::class)->findOneBy(
                ['username' => $user->getUsername()
                ]
            );
        } catch (\Exception $e) {

            return $e->getMessage();
        }
           
        //var_dump($userFromDb);exit;

        if (!$userFromDb) {   
           // $connect=$this->entityManager->getConnection()->isConnected();
                
            return array( 
                'success' => false,   
                'message' => 'This user don\'t exsist',
             //   'connect to database' =>  $connect
            );

        } 
        
        if(password_verify($user->getPassword(),$userFromDb->getPassword())){
            return [
                'success' => true,
                'message'=> 'you logged in our system success',
                'Authtoken' => '123456789',
                'cookie' => 'hfglkyfukluhsdafluhsdflk12351345blkhvgcuvljlkihugbk1lj4b35hb345lktjvhbugnvahgi',
                'username' => $userFromDb->getUsername(),
                'password' => $userFromDb->getPassword(),
            ];
        } else {
            return [
                'success' => false,
                'message'=> 'Wrong password',
            ];
        }
    }

}