<?php
header('Content-Type: text/html; charset=utf-8');

require_once("../config/paramDB.php");
require_once("./DB.class.php");
require_once("./Projet.class.php");
require_once("./Message.class.php");

if (isset($_GET['rAjax'])) {
    
    switch($_GET['rAjax']) {
        case "projets":
            recupProjets();
            break;
        case "enregistrerMsg":
            nouveauMessage();
            break;
        case "envoyerMsg":
            envoyerMessage();
            break;
        default:
            echo "mauvaise requete";
    }
}
else {
    echo "mauvaise requete";
}

function recupProjets() {
    
    $resultat = Projet::getProjets();
    echo json_encode($resultat);//Encode le tableau de projets retourné par la requête en Json.
}

function nouveauMessage() {
    
    $params = json_decode(file_get_contents('php://input'),true);
    $message = $params["message"];
    $nom = $params["nom"];
    $courriel = $params["courriel"];
    $msgErreur = Message::ajoutMessage($message, $nom, $courriel);
    echo json_encode($msgErreur);//Encode le tableau de messages d'erreurs retourné par la requête en Json (succès si vide).
}

function envoyerMessage() {
    
    $msgErreur = array();
    $params = json_decode(file_get_contents('php://input'),true);
    
    $nom = $params["nom"];
    $message = "Message de $nom.\n\n";
    $message .= $params["message"];
    $sujet = "message provenant de davidlachambre.com";
    $courriel = $params["courriel"];
    $courrielAdmin = "davidlach@hotmail.com";
    
    if (mail($courrielAdmin, $sujet, $message, "From:" . $courriel)) {
        http_response_code(200);
    } 
    else {
        http_response_code(500);
        $msgErreur["errRequete"] = "erreur interne du serveur";
    }
    echo json_encode($msgErreur);
}