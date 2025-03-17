<?php

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Controller\Base\BaseController;


class ProgrammerController extends BaseController
{

       
        public function newActions()
        {
                return new Response('Let\' do this!');
        }
        /*
        public function showActions($nickname)
        {

        }
        public function listAction(Request $request)
        {

        }
        public function updateAction($nickname, Request $request)
        {

        }
        public function deleteActions($nickname)
        {

        }*/
}         