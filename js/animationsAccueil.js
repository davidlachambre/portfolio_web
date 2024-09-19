var initAnimsAccueil = function () {

    //INITIALISATION DES VARIABLES DE TRAVAIL

    CSSPlugin.defaultTransformPerspective = 600;

    //GÉNÉRAL
    var doc = document;
    var html = doc.documentElement;
    var fenetre = window;
    var body = selection("body");
    var vue = selection("main");
    var vert = "#12ad3a";
    var bleu = "#152554";
    var timelineLogo;
    var tweenPage;
    var logo = selection("logo");
    var wrapperLogo = selection("wrapperLogo");
    var changerPage = false;
    var pageChargee = false;

    function activerPage() {
        tweenPage = TweenLite.set(logo, {
            rotationY: "0"
        });
        pageChargee = true;
    }

    tweenPage = TweenLite.set(body, {
        overflow: "hidden"
    });

    timelineLogo = new TimelineLite();
    timelineLogo
        .to(logo, 1, {
            rotationY: "+=1800",
            ease: Power4.easeOut,
            delay: 0.5,
            onComplete: activerPage
        });

    wrapperLogo.addEventListener("click", function () {

        if (pageChargee) {
            changerPage = true;
            if (timelineLogo) {
                timelineLogo.pause();
            }
            timelineLogo = new TimelineLite();
            timelineLogo
                .to(logo, 1, {
                    rotationY: "+=1440",
                    ease: Power2.easeIn
                });
        }
    });
    wrapperLogo.addEventListener("mouseenter", function () {

        if (pageChargee) {
            if (!changerPage) {
                if (timelineLogo) {
                    timelineLogo.pause();
                }
                timelineLogo = new TimelineLite();
                timelineLogo
                    .timeScale(0.9)
                    .to(logo, 0.1, {
                        rotationY: "90",
                        ease: Power0.easeNone
                    })
                    .set(logo, {
                        backgroundImage: "url(images/logo_david_portfolio_back.png)"
                    })
                    .to(logo, 1, {
                        rotationY: "180",
                        ease: Elastic.easeOut.config(1, 0.4)
                    });
            }
        }
    });

    wrapperLogo.addEventListener("mouseleave", function () {

        if (pageChargee) {
            if (!changerPage) {
                if (timelineLogo) {
                    timelineLogo.pause();
                }
                timelineLogo = new TimelineLite();
                timelineLogo
                    .timeScale(0.9)
                    .to(logo, 0.1, {
                        rotationY: "90",
                        ease: Power0.easeNone
                    })
                    .set(logo, {
                        backgroundImage: "url(images/logo_david_portfolio.png)"
                    })
                    .to(logo, 1, {
                        rotationY: "0",
                        ease: Elastic.easeOut.config(1, 0.4)
                    });
            }
        }
    });

    return initAnimsAccueil;
}