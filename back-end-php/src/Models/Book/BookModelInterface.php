<?php

namespace App\Models\Book;

interface BookModelInterface{

        public function setAuthor($author);
        public function setTitle($title);
        public function setPrice($price);
        public function setKind($kind);
        public function setCover($cover);
        public function setNumberOfBooks($numberOfBooks);

        
        public function getAuthor();
        public function getTitle();
        public function getPrice();
        public function getKind();
        public function getCover();
        public function getnumberOfBooks();
}