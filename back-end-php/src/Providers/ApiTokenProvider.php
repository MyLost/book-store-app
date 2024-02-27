<?php

namespace App\Providers;


use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Users;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class ApiTokenProvider implements UserProviderInterface
{
    private $entityManager;

    /**
     * UserProvider constructor.
     * @param EntityManagerInterface $entityManager
     * @internal param Client $httpClient
     * @internal param UserOptionService $userOptionService
     * @internal param ProjectService $projectService
     * @internal param SessionService $sessionService
     * @internal param Session $session
     * @internal param UserOptionService $userOptionsService
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * Loads the user for the given username.
     *
     * This method must throw UsernameNotFoundException if the user is not
     * found.
     *
     * @param string $username The username
     *
     * @return UserInterface
     *
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function loadUserByUsername($username)
    {

                // $conn = $this->entityManager->getConnection();

                // $sql = 'SELECT * FROM api_token';
                //$stmt = $conn->prepare($sql);
                //$result = $stmt->execute();
                //dd($stmt->fetchAll());


                // $sql = 'SELECT * FROM users WHERE id=1' ;
                // $stmt = $conn->prepare($sql);
                // $result = $stmt->execute();
                // dd($stmt->fetchAll());
                //INNER JOIN api_token WHERE users.id = api_token.user_id';

                //return $sql;
                //$db = $this->entityManager->createQueryBuilder('t')->where('t.username = :username')->setParameter('username', $username)->getQuery();
                //dd($db->execute());
      
        
                //dd($this->entityManager->createQueryBuilder('u'));

                return $this->entityManager->createQueryBuilder('u')
                        ->where('u.username = :username')
                        ->setParameter('username', $username)
                        ->getQuery()
                        ->getOneOrNullResult();
        }

    /**
     * Refreshes the user.
     *
     * It is up to the implementation to decide if the user data should be
     * totally reloaded (e.g. from the database), or if the UserInterface
     * object can just be merged into some internal array of users / identity
     * map.
     *
     * @param UserInterface $user
     * @return UserInterface
     *
     */
    public function refreshUser(UserInterface $user)
    {
        if (!$user instanceof Users) {
            throw new UnsupportedUserException(
                sprintf('Instances of "%s" are not supported.', get_class($user))
            );
        }
        return $user;
    }

    /**
     * Whether this provider supports the given user class.
     *
     * @param string $class
     *
     * @return bool
     */
    public function supportsClass($class)
    {
        return $class === 'App\Entity\Users';
    }
}