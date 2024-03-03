<?php

namespace App\Models\Book;

class BookModel implements BookModelInterface {
     
        private $author;
        private $title;
        private $price;
        private $kind;
        private $cover;
        private $numberOfBooks;

        
        public function setAuthor($author)
        {
                $this->author = strip_tags($author);
        }
        public function setTitle($title)
        {
                $this->title = strip_tags($title);
        }
        public function setPrice($price)
        {
                $this->price = strip_tags($price);
        }
        public function setKind($kind)
        {
                $this->kind = strip_tags($kind);
        }
        public function setCover($cover) 
        {
                $this->cover = strip_tags($cover);
        }
        public function setNumberOfBooks($numberOfBooks)
        {
                $this->numberOfBooks = strip_tags($numberOfBooks);
        }

        
        public function getAuthor()
        {
                return $this->author;
        }
        public function getTitle()
        {
                return $this->title;
        }
        public function getPrice()
        {
                return $this->price;
        }
        public function getKind()
        {
                return $this->kind;
        }
        public function getCover()
        {
                return $this->cover;
        }
        public function getnumberOfBooks()
        {
                return $this->numberOfBooks;
        }
}