<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\Request;
use App\Models\User\UserRegisterModel;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Users;
use App\Exceptions\UserException;

define('USER_UGENT_REGEX', '/Mozilla|Chrome|Safari/');

class RegisterService {

        private $entityManager;

    public function __construct (EntityManagerInterface $entityManager){
        $this->entityManager = $entityManager;
     }

    public function registerProcess(Request $request) {

        $postData = json_decode($request->getContent()); 
        $postData = json_decode($request->getContent(), true);
        $userUrgent = $request->headers->get('user-agent');
        $userUrgent = preg_match(USER_UGENT_REGEX, $userUrgent, $matches);

        foreach ($matches as $elem) {
            if (!($elem === "Mozilla" | $elem === "Chrome" | $elem === "Safari" | $elem === "Mozilla")) {           throw new \Exception ('not supported browser'); 
            }
        }

        if(strcmp($postData["password"],$postData["confirmPassword"])) {
            throw new \Exception ('password and confirmPassword do not match!!!'); 
           
        }

        if(empty($userDbUsers)){
            // TO DO
        }

         //   $userDb = new UserRegisterModel();
         //    $userDb->setFirstName($postData["firstName"]);
         //    $userDb->setLastName($postData["lastName"]);
         //    $userDb->setUsername($postData["username"]);
         //    $userDb->setPassword($postData["password"]);
         //    $date = date_format(new \DateTime($postData["bornOn"]),'Y-m-d H:i:s');
         //    $userDb->setBornOn(new \DateTime($date)); 
         //    $userDb->setBornOn(new \DateTime($postData["bornOn"])); 
       
     

        $userDbUsers = new Users();
        $userDbUsers->setFirstName($postData["firstName"]);
        $userDbUsers->setLastName($postData["lastName"]);
        $userDbUsers->setUsername($postData["username"]);
        $userDbUsers->setPassword(password_hash($postData["password"], PASSWORD_BCRYPT));
       // $date = date_format(new \DateTime($postData["bornOn"]),'Y-m-d H:i:s');
       // $userDb->setBornOn(new \DateTime($date)); 
        
       $userDbUsers->setBornOn(new \DateTime($postData["bornOn"])); 

       return $this->registeUser($userDbUsers);
       
    }

    public function registeUser(Users $user) {     
        
       // var_dump($this->entityManager->getConnection()->isConnected());exit;

     //   if(!$this->entityManager->getConnection()->isConnected()) {    
    //        throw new \Exception("There is not connetction with DB!!!");
    //    }

        try {
            $this->entityManager->persist($user);
            $this->entityManager->flush();
        }catch (\Exception $excep) {
            throw new \Exception("This username is used!!!");
        }
        
        return [
            'data' => 'success',
            'success' => true,
       
        ];
    }

}