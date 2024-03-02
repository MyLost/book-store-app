<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;
use App\Services\BookService;
use App\Controller\Base\BaseController;




class BookController extends BaseController
{
    /**
     * @Route("/book", name="book")
     */
    public function index(Request $request)
    {
        

        if($request->headers->get('Authorization') == '1234567891242151cgdgjmbnhsgkkjftrsnubkjkjkubybyvtyvYygifgppspfjIJKLIHJLFWSE')
        {
            return $this->json([
                array(
                'message' => 'Welcome to your new controller!',
                'path' => 'src/Controller/BookController.php',
                ),
                array(
                    'Authorization' => $request->headers->get('Authorization')
                )
                
            ]);
        }

        return $this->json([
            'errorMessage' => 'Wrong credentials',
             
        ]);

        /*
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/BookController.php',
            //'User-Agent' => $request->headers->get('User-Agent'),
            //'Authorization' => $request->headers->get('Authorization'),
            //'Origin' => $request->headers->get('Origin'),
            //'headers' => $request->headers->all(),
            //'allHeaders' => json_encode(getallheaders()),
            //'AuthHeaders' => $request->server->get('HTTP_AUTHORIZATION')

        ]);
*/
    }     

      /**
     * @Route("get/employees", name="employees")
     */

    public function getEmployees(Request $request){

      //  if($request->headers->get('Authorization') ==                                          '1234567891242151cgdgjmbnhsgkkjftrsnubkjkjkubybyvtyvYygifgppspfjIJKLIHJLFWSE')
    //    {
            return $this->json([
                array(
                'userId' => 'rirani',
                "jobTitleName"  => "Developer",
                "firstName" =>"Romin",
                "lastName" =>"Irani",
                "preferredFullName" =>"Romin Irani",
                "employeeCode" =>"E1",
                "region" =>"CA",
                "phoneNumber" =>"408-1234567",
                "emailAddress" =>"romin.k.irani@gmail.com"
                ),
                array(
                "userId" =>"nirani",
                "jobTitleName" =>"Developer",
                "firstName" =>"Neil",
                "lastName" =>"Irani",
                "preferredFullName" =>"Neil Irani",
                "employeeCode" =>"E2",
                "region" =>"CA",
                "phoneNumber" =>"408-1111111",
                "emailAddress" =>"neilrirani@gmail.com"
                ),
                array(
                "userId" =>"thanks",
                "jobTitleName" =>"Program Directory",
                "firstName" =>"Tom",
                "lastName" =>"Hanks",
                "preferredFullName" =>"Tom Hanks",
                "employeeCode" =>"E3",
                "region" =>"CA",
                "phoneNumber" =>"408-2222222",
                "emailAddress" =>"tomhanks@gmail.com"
                )
                ]);
     //   }

        return $this->json([
            'errorMessage' => 'Wrong credentials',
             
        ]);
    }

    /**
     * @Route("/getBook", name="get_book")
     */
    public function getBook() {
        
        $fileSystem = new Filesystem();
       // var_dump($fileSystem->exists('../resources/books.txt'));
       // var_dump($fileSystem->readlink('../resources/books.txt'));

        // $find = $finder->files()->in('../resources');
       $finder = new Finder();
       $finder->files()->in('../resources/')->name('books.json');
       $contents;
       foreach ($finder as $file) {
           $contents = $file->getContents();
       
           // ...
       }
       
       //return new Response ('Here are all books');
       //return new Response ($contents);

       
       return $this->json([
            'content' => json_decode($contents),
            'user' => $this->getUser()
       ]);
       
       //return json_decode($contents);
        /*
        return $this->json([
            array(
            'author' => 'Robert Jordan',
            'title' => 'The eye of the world',
            'price' => '100$',
            'kind' => 'fantasy',
            'cover' => 'soft',
            'numberOfBooks' => '10'
            ),
            array(
                'author' => 'Robert Jordan',
            'title' => 'The eye of the world',
            'price' => '100$',
            'kind' => 'fantasy',
            'cover' => 'soft',
            'numberOfBooks' => '10'
            ),
            array(
                'author' => 'Robert Jordan',
            'title' => 'The eye of the world',
            'price' => '100$',
            'kind' => 'fantasy',
            'cover' => 'soft',
            'numberOfBooks' => '10'
            ),
            array(
                'author' => 'Robert Jordan',
            'title' => 'The eye of the world',
            'price' => '100$',
            'kind' => 'fantasy',
            'cover' => 'soft',
            'numberOfBooks' => '10'
            ),
            array(
                'author' => 'Robert Jordan',
            'title' => 'The eye of the world',
            'price' => '100$',
            'kind' => 'fantasy',
            'cover' => 'soft',
            'numberOfBooks' => '10'
            ),
        ]);*/
    }

    /**
     * @Route("/addBook", name="add_book")
     */
    public function addBook(Request $request, BookService $bookService) {
       
        if($request->server->get("REQUEST_METHOD") == "OPTIONS") {
            return new Response(); 
        }

        try{
            $bookService->addBook($request);
        } catch (\Exception $excep) {
            return $this->json([
                'success' => false,
                'message' => $excep->getMessage()
            ]);
        }
 
        return $this->json([
            'success' => true
        ]);
    }

    /**
     * @Route("/deleteBook", name="delete_book")
     */
    public function deleteBook() {

        return $this->json([
            'success' => true
        ]);
    }

    /**
     * @Route("/findBook", name="find_book")
     */
    public function findBook() {
        
        return $this->json([
            'success' => true
        ]);
    }
}