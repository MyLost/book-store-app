<?php

namespace App\Utils;

use Symfony\Component\Yaml\Yaml;

class YamlParser {

        public static function configs($path)
        {
                return Yaml::parseFile($path);
        }
}