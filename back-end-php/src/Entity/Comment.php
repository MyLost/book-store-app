<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
//use Gedmo\Timestampable\Traits\TimestampableEntity;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CommentRepository")
 */
class Comment
{
   // use TimestampableEntity;
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $authorName;

    /**
     * @ORM\Column(type="text")
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Article", inversedBy="comments")
     * @ORM\JoinColumn(nullable=false)
     */
    private $article;

    public function getId()
    {
        return $this->id;
    }

    public function getAuthorName()
    {
        return $this->authorName;
    }

    public function setAuthorName(string $authorName)
    {
        $this->authorName = $authorName;

        return $this;
    }

    public function getContent()
    {
        return $this->content;
    }

    public function setContent(string $content)
    {
        $this->content = $content;

        return $this;
    }

    public function setArticle(Article $article)
    {
        $this->article = $article;
    }

    public function getArticle()
    {
        $this->article;
    }
}
