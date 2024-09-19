(function () {

    var auth = btoa("biero:biero");

    //CONTROLEUR LISTE
    portfolio.controller('controleurAccueil', ['$scope', '$http', '$location', function ($scope, $http, $location) {

        $scope.page = "accueil"; //Nom de classe lié dynamiquement pour déterminer si la page doit être animée comme page secondaire ou principale.

        //------------------------------------------------------------
        // INITIALISATION (équivalent du onload mais pour ce composent spécifiquement).
        angular.element(document).ready(function () {

            $scope.animsAccueil = initAnimsAccueil();
        });
    }]);

    //CONTROLEUR DETAILS
    portfolio.controller('controleurPortfolio', ['$scope', '$http', '$routeParams', '$location', '$sce', '$timeout', 'toast', '$route', function ($scope, $http, $routeParams, $location, $sce, $timeout, toast, $route) {

        //------------------------------------------------------------
        //Initialisation des variables du scope.
        
        $scope.page = "portfolio"; //Nom de classe lié dynamiquement à la page.
        $scope.utilisateur = {};

        //En cas de problème avec la requête Ajax, va charger ces données :
        $scope.projets = [
            {
                titre: "Titre du projet 1",
                description: "description du projet 1",
                technologies: "technologies utilisées",
                url_site: "projets/dummy.html",
                thumbnail: "images/Placeholder.jpg",
                idProjet: 0
            },
            {
                titre: "Titre du projet 2",
                description: "description du projet 2",
                technologies: "technologies utilisées",
                url_site: "projets/dummy.html",
                thumbnail: "images/Placeholder.jpg",
                idProjet: 1
            }
        ];
        $scope.idProjet = 0;
        $scope.url_projet_choisi = "";
        $scope.prochainProjet = {};
        $scope.lienProjet = "http://" + $location.host() + "/projets/dummy.html";
        $scope.creditsProjet = "credits";
        $scope.premierChargementProjet;

        //------------------------------------------------------------
        //Métodes du controleur.

        //Permet de réinitialisé le iframe avec un document vide à la fermeture pour ne pas qu'un vidéo continue à jouer en background une fois le panneau fermé. Alternative à l'utilisation the Youtube Ifram API qui ne fonctionne pas bien.
        $scope.resetLien = function () {

            $timeout(function () {

                $scope.lienProjet = "http://" + $location.host() + "/projets/dummy.html";
            }, 500);
        }

        //Permet de passer au projet suivant dans le iframe.
        $scope.changerProjet = function (direction) {

            var nbProjets = $scope.projets.length - 1;
            var projetActuel = $scope.idProjet;

            $scope.titreProjet = "en chargement..."

            $timeout(function () {

                if (direction == "arriere") {
                    if (projetActuel > 0) {
                        for (var indiceProjet in $scope.projets) {
                            if ($scope.projets.hasOwnProperty(indiceProjet)) {
                                if ($scope.projets[indiceProjet].hasOwnProperty("idProjet") && $scope.projets[indiceProjet].idProjet == projetActuel - 1) {
                                    $scope.prochainProjet = $scope.projets[indiceProjet];
                                }
                            }
                        }
                        $scope.idProjet -= 1;
                    } else {
                        $scope.prochainProjet = $scope.projets[nbProjets];
                        $scope.idProjet = nbProjets - 1;

                    }
                } else if (direction == "avant") {
                    if (projetActuel < nbProjets) {
                        for (var indiceProjet in $scope.projets) {
                            if ($scope.projets.hasOwnProperty(indiceProjet)) {
                                if ($scope.projets[indiceProjet].hasOwnProperty("idProjet") && $scope.projets[indiceProjet].idProjet == projetActuel + 1) {
                                    $scope.prochainProjet = $scope.projets[indiceProjet];
                                }
                            }
                        }
                        $scope.idProjet += 1;
                    } else {
                        $scope.prochainProjet = $scope.projets[0];
                        $scope.idProjet = 0;
                    }
                }
                $scope.lienProjet = $sce.trustAsResourceUrl($scope.prochainProjet.url_site);
            }, 500);
        }

        //Détermine quel projet sera chargé dans le iframe.
        $scope.choisirProjet = function (titre, urlProjet, idProjet, descProjet, creditsProjet) {

            $scope.premierChargementProjet = true;
            $scope.url_projet_choisi = urlProjet;
            $scope.titreProjet = titre;
            $scope.lienProjet = $sce.trustAsResourceUrl($scope.url_projet_choisi);
            $scope.descAffichageProjet = descProjet;
            $scope.creditsProjet = creditsProjet;
            $scope.idProjet = idProjet;
        }

        $scope.changerInfosProjet = function () {

            $scope.titreProjet = $scope.prochainProjet.titre;
            $scope.descAffichageProjet = $scope.prochainProjet.description;
            $scope.creditsProjet = $scope.prochainProjet.credits;
            $scope.$apply();
        }

        //------------------------------------------------------------
        //Requêtes Ajax.

        //Récupération des projets
        var requete = {
            method: 'GET',
            url: 'php/ajax.php?rAjax=projets',
        };
        $http(requete).then(function (reponse) {

            var projets = reponse.data;
            var compteur = 0;

            projets.forEach(function (projet) {

                projet.idProjet = compteur;
                compteur++;
                if (!projet.thumbnail) {
                    projet.thumbnail = "images/Placeholder.jpg";
                }
            });
            $scope.projets = projets;
        });

        //Envoi d'un message utilisateur.
        $scope.soumettreMessage = function () {

            if (($scope.utilisateur.message && $scope.utilisateur.message.trim()) && ($scope.utilisateur.nom && $scope.utilisateur.nom.trim()) && ($scope.utilisateur.courriel && $scope.utilisateur.courriel.trim())) {

                var regEx = new RegExp(/^\w+@\w+\.\w{2,3}$/, "i"); //Pages pouvant être 

                if (regEx.exec($scope.utilisateur.courriel)) {

                    toast.afficher("traitement", "Un instant...", "5000");

                    $timeout(function () {

                        var requete = { //Requête pour envoyer le Email par PHP.
                            method: 'POST',
                            url: 'php/ajax.php?rAjax=envoyerMsg',
                            data: {
                                "message": $scope.utilisateur.message,
                                "nom": $scope.utilisateur.nom,
                                "courriel": $scope.utilisateur.courriel
                            }
                        };

                        $http(requete).then(function (reponse) {

                            if (reponse.status == "200" && reponse.data == "") { //Si la requête est bonne et aucune erreur n'est retournée...

                                toast.afficher("succes", "Message envoyé !", "5000"); //Message de confirmation.

                                //Reset des champs du formulaire.
                                $scope.utilisateur.message = "";
                                $scope.utilisateur.nom = "";
                                $scope.utilisateur.courriel = "";

                                var requete = { //Nouvelle requête pour enregistrer les infos dans la DB.
                                    method: 'POST',
                                    url: 'php/ajax.php?rAjax=enregistrerMsg',
                                    data: {
                                        "message": $scope.utilisateur.message,
                                        "nom": $scope.utilisateur.nom,
                                        "courriel": $scope.utilisateur.courriel
                                    }
                                };
                                $http(requete); //Enregistrement des infos de l'utilisateur si le email a bien été envoyé. Auncune réponse de serveur requise, l'utilisateur n'a pas à savoir si on a réussi à sauvegarder ses infos.
                            } else {
                                toast.afficher("erreur", "Oh non ! il y a eu un problème avec le serveur et votre message n'a pas été envoyé", "5000");
                            }
                        });
                    }, 1000);

                } else {
                    toast.afficher("erreur", "Vous devez entrer une adresse courriel valide svp !", "5000");
                }
            } else {
                toast.afficher("erreur", "Merci de remplir tous les champs !", "5000");
            }
        }

        //------------------------------------------------------------
        // INITIALISATION (équivalent du onload mais pour ce composent spécifiquement).
        angular.element(document).ready(function () {

            $scope.animsPortfolio = initAnimsPortfolio();

            //Fonction qui permet de changer le titre du projet affiché chaque fois que le iframe a fini de loader.
            window.iframeLoaded = function () {

                //Condition qui permet de déterminer si le titre doit être changé sur le load du iframe ou pas (au premier chargement d'un projet changerTitre() ne doit pas être appelée).
                if ($scope.premierChargementProjet) {
                    $scope.premierChargementProjet = false;
                } else {
                    $scope.changerInfosProjet();
                }
            }
        });
    }]);
})();