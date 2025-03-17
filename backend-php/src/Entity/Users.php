<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class Users implements UserInterface , \Serializable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @ORM\OneToMany(targetEntity="App\Entity\ApiToken", mappedBy="user")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    
    /**
     * @ORM\Column(type="datetime")
     */
    private $bornOn;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(name="is_active", type="boolean")
     */
    private $isActive;

    
    /**
     * @ORM\Column(type="string", length=255)
     */
    private $role;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $phoneNumber;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ApiToken", mappedBy="user")
     */
    private $apiTokens;

    
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $google_email;

    
    public function __construct()
    {
        $this->apiTokens = new ArrayCollection();
    }
   
/*
    public function __construct()
    {
        //$this->isActive = true;
        // may not be needed, see section on salt below
        // $this->salt = md5(uniqid('', true));
    }
*/

    public function setActive($active)
    {
        $this->isActive = $active;
    }

    public function getActive()
    {
        return $this->isActive;
    }
    public function getId()
    {
        return $this->id;
    }

    public function getFirstName()
    {
        return $this->firstName;
    }

    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName()
    {
        return $this->lastName;
    }

    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    
    public function getBornOn()
    {
        return $this->bornOn;
    }

    public function setBornOn(\DateTimeInterface $bornOn)
    {
        
        return $this->bornOn = $bornOn;
    }

    public function getSalt()
    {
        // you *may* need a real salt depending on your encoder
        // see section on salt below
        return null;
    }

    public function getRoles()
    {
        return array($this->role);
    }

    public function setRoles($role)
    {
        $this->role = $role;
    }

    public function eraseCredentials()
    {
    }

    /** @see \Serializable::serialize() */

    
    public function serialize()
    {
        return serialize(array(
            $this->id,
            $this->username,
            $this->password,
            $this->firstName,
            $this->lastName,
            $this->bornOn,
            $this->email,
            $this->isActive,
            $this->role,
            $this->phoneNumber,
            $this->apiTokens,
            $this->google_email
            // see section on salt below
            // $this->salt,
        ));
    }

    /** @see \Serializable::unserialize() */

    public function unserialize($serialized)
    {
        list (
            $this->id,
            $this->username,
            $this->password,
            $this->firstName,
            $this->lastName,
            $this->bornOn,
            $this->email,
            $this->isActive,
            $this->role,
            $this->phoneNumber,
            $this->apiTokens,
            $this->google_email
            // see section on salt below
            // $this->salt
        ) = unserialize($serialized, array('allowed_classes' => false));
    }

    public function setGoogleEmail($googleEmail)
    {
        $this->google_email = $googleEmail;
    }

    public function getGoogleEmail()
    {
        return $this->google_email;
    }
    public function getPhoneNumber()
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @return Collection|ApiToken[]
     */
    public function getApiTokens(): Collection
    {
        return $this->apiTokens;
    }

    public function addApiToken(ApiToken $apiToken)
    {
        if (!$this->apiTokens->contains($apiToken)) {
            $this->apiTokens[] = $apiToken;
            $apiToken->setUser($this);
        }

        return $this;
    }

    public function removeApiToken(ApiToken $apiToken)
    {
        if ($this->apiTokens->contains($apiToken)) {
            $this->apiTokens->removeElement($apiToken);
            // set the owning side to null (unless already changed)
            if ($apiToken->getUser() === $this) {
                $apiToken->setUser(null);
            }
        }

        return $this;
    }
}


/*
$conn = $this->entityManager->getConnection();

if($token->getUser() === 'anon.')
{
        dd('No user');
}



$userId = $token->getUser()->getId();
$query = $this->entityManager->createQuery('DELETE FROM api_token WHERE user_id = :userId')->setParameter('userId',  $userId);

    // returns an array of Product objects
   $query->execute();

//  $stmt = $conn->prepare('');
//  $stmt->execute();
//  dd($stmt->fetchAll());    */