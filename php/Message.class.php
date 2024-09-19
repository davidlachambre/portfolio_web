<?php
/**
* @brief class Projet
* @author David Lachambre
* @version 1.0
*/
class Message {
    
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
    
    public static function ajoutMessage($message, $nom, $courriel) {
        
        self::connectionDB();
        
		$erreurs = array();
        
        try {
            self::$database->query('INSERT INTO messages (nom, courriel, message) VALUES (:nom, :courriel, :message)');
            self::$database->bind(':message', $message);
            self::$database->bind(':nom', $nom);
            self::$database->bind(':courriel', $courriel);
            $erreur = self::$database->execute();

            if ($erreur) {
                $erreurs["errAjout"] = $erreur;
            }
        }
        catch(Exception $e) {
            $erreurs["errBD"] = $e->getMessage();
        }

        return $erreurs;
	}
    
    private static function connectionDB() {
        
        if (!isset(self::$database)) {
            self::$database = DB::getInstance();
        }
    }
}