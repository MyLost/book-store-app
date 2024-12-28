<?php

namespace App\Services;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Models\Book\BookModel;
use App\Entity\Book;


class BookService {

        private $entityManager;

        public function __construct (EntityManagerInterface $entityManager) {
            $this->entityManager = $entityManager;
        }

        public function addBook(Request $request) {
                $book = [];
                $data = json_decode($request->getContent());
                $dataArray = json_decode(json_encode($data), True);
                
                if(empty($dataArray["author"]) || empty($dataArray["title"]) || empty($dataArray["price"]) ||
                empty($dataArray["kind"]) || empty($dataArray["cover"]) || empty($dataArray["numberOfBooks"])) {
                        throw new \Exception('Invalid data');
                }

                foreach($data as $key=>$elem){
                       $book[$key] = $elem; 
                }
                $bookModel = new Book();
                $bookModel->setAuthor($book['author']);  
                $bookModel->setTitle($book['title']);  
                $bookModel->setPrice((float) $book['price']);  
                $bookModel->setKind($book['kind']);  
                $bookModel->setCover($book['cover']);  
                $bookModel->setNumberOfBooks($book['numberOfBooks']);  
                
                $this->entityManager->persist($bookModel);
                $this->entityManager->flush();

                return $bookModel;
        }

}