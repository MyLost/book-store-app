<?php

namespace App\Repository;

use App\Entity\UsersLogin;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method UsersLogin|null find($id, $lockMode = null, $lockVersion = null)
 * @method UsersLogin|null findOneBy(array $criteria, array $orderBy = null)
 * @method UsersLogin[]    findAll()
 * @method UsersLogin[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UsersLoginRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, UsersLogin::class);
    }

//    /**
//     * @return UsersLogin[] Returns an array of UsersLogin objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?UsersLogin
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
