<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * 
 * @ORM\Entity(repositoryClass="App\Repository\BookRepository")
 */
class Book
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $author;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="float")
     */
    private $price;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $kind;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $cover;

    /**
     * @ORM\Column(type="smallint")
     */
    private $numberOfBoks;

    public function getId(): int
    {
        return $this->id;
    }

    public function getAuthor(): string
    {
        return $this->author;
    }

    public function setAuthor(string $author): self
    {
        $this->author = strip_tags($author);

        return $this;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = strip_tags($title);

        return $this;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = strip_tags($price);

        return $this;
    }

    public function getKind(): string
    {
        return $this->kind;
    }

    public function setKind(string $kind): self
    {
        $this->kind = strip_tags($kind);

        return $this;
    }

    public function getCover(): string
    {
        return $this->cover;
    }

    public function setCover(string $cover): self
    {
        $this->cover = strip_tags($cover);

        return $this;
    }

    public function getNumberOfBooks(): int
    {
        return $this->numberOfBoks;
    }

    public function setNumberOfBooks(int $numberOfBoks): self
    {
        $this->numberOfBoks = strip_tags($numberOfBoks);

        return $this;
    }
}
