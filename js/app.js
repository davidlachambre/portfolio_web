var portfolio = (function () {

    var portfolio = angular.module('Portfolio', ['ngToast', 'ngRoute', 'ngAnimate', 'ngScrollbar']);

    window.iframeLoaded = function () {
        //Cette fonction est redéfinie dans le controleur portfolio mais doit être définie ici une première fois pour éviter une erreur due à l'odre de chargement.
    }

    //Création du service "toast" qui sera accessible de partout dans l'application.
    portfolio.factory('toast', function (ngToast) {
        return {
            afficher: function (classe, contenu, duree) {
                ngToast.create({
                    className: classe, //Succes ou erreur
                    content: contenu,
                    timeout: duree
                });
            }
        };
    });

    portfolio.config(['$routeProvider', 'ngToastProvider', '$locationProvider', function ($routeProvider, ngToastProvider, $locationProvider) {

        //Configuration du ngToast.
        ngToastProvider.configure({
            animation: 'slide',
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            maxNumber: 1 //Ne peut afficher plus d'un toast à la fois.
        });

        //Les routes disponibles.
        $routeProvider.when('/', {
            templateUrl: 'vues/accueil.html',
            controller: 'controleurAccueil'
        }).when('/portfolio', {
            templateUrl: 'vues/portfolio.html',
            controller: 'controleurPortfolio'
        }).otherwise({
            redirectTo: '/'
        });
    }]);

    return portfolio;
})();

var selection = function (id) {
    return document.getElementById(id);
}
var selectionMultiple = function (selecteur) {
    return document.querySelectorAll(selecteur);
}