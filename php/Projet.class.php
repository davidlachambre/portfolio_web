<?php
/**
* @brief class Projet
* @author David Lachambre
* @version 1.0
*/
class Projet {
    
    private $id_projet;
    private $titre;
    private $description;
    private $technologies;
    private $url_site;
    private $thumbnail;
    private $date_ajout;
    private static $database;
    
	function __construct() {
		
        self::connectionDB();
	}
    
    public static function getProjets() {
        
        self::connectionDB();
        
		$projets = array();
        
        self::$database->query('SELECT titre, description, technologies, url_site, thumbnail, credits FROM projets WHERE affichage = true ORDER BY priorite DESC');
        
        if ($projetsDB = self::$database->resultset()) {
            foreach ($projetsDB as $projet) {
                $projets[] = $projet;
            }
        }
        return $projets;
	}
    
    private static function connectionDB() {
        
        if (!isset(self::$database)) {
            self::$database = DB::getInstance();
        }
    }
}