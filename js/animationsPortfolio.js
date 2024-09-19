var initAnimsPortfolio = function () {

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
    var tweenLiens;
    var controleurSM = new ScrollMagic.Controller({
        container: body,
        refreshInterval: 1000
    });

    //INTRO
    var timelineIntro;
    var nomDouble = selection("nomDouble");
    var nom = selection("nom");
    var descProfil = selection("descProfil");

    //MENU
    var timelineMenu;
    var tweenScroll;
    var menu = selection("menu");
    var menuOuvert = false;
    var btnMenu = selection("iconeMenu");
    var btnAccueil = selection("btnAccueil");
    var btnProfil = selection("btnProfil");
    var btnProjets = selection("btnProjets");
    var btnContact = selection("btnContact");
    var animMenu = true;

    //HEADER
    var entete = selection("entete");
    var texteEntete = selection("texteEntete");
    var timelineEntete;
    var tweenEntete;
    var largeurTexte = texteEntete.offsetWidth;

    //PROFIL
    var timelineProfil;
    var profil = selection("profil");
    var videoPres = selection("videoPres");
    var iconeVideo = selection("iconeVideo");
    var iconeGithub = selection("iconeGithub");
    var iconeLinkedin = selection("iconeLinkedin");
    var iconeCV = selection("iconeCV");
    var iconesProfil = [iconeVideo, iconeGithub, iconeLinkedin, iconeCV];
    var btnFermerVideo = selection("fermerVideo");
    var zoneAffichageVideo = selection("zoneAffichageVideo");

    //PROJETS
    var tweenHover1;
    var tweenHover2;
    var tweentransitionProjets;
    var timelineProjet;
    var projets = selection("projets");
    var zonesImageProjet = document.querySelectorAll(".wrapperImgProjet");
    var panneauOuvert = false;
    var infosVisibles = false;
    var tweenInfo;
    var btnFermerProjet = selection("fermerProjet");
    var btnPrecedent = selection("btnPrecedent");
    var btnSuivant = selection("btnSuivant");
    var navProjet = selection("navProjet");
    var btnInfo = selection("btnInfoProjet");
    var titreProjet = selection("titreProjet");
    var infoProjet = selection("infoProjet");
    var zoneAffichageProjets = selection("zoneAffichageProjets");
    var iframeProjets = selection("iframeProjets");
    var elemsNavProjet = [btnPrecedent, btnSuivant, btnInfo, btnFermerProjet];
    var elemsNavInverse = elemsNavProjet.slice(0).reverse();

    //CONTACT
    var contact = selection("contact");
    var formContact = selection("formContact");
    var txtAreaMessage = selection("txtAreaMessage");
    var titreContact = selection("titreContact");
    var inputNomContact = selection("inputNomContact");
    var inputCourrielContact = selection("inputCourrielContact");
    var btnSoumettreContact = selection("btnSoumettreContact");
    var inputsContact = [btnSoumettreContact, inputCourrielContact, inputNomContact];

    function resetPanneau() {

        panneauOuvert = false;
    }

    function gererScroll(etat) {

        TweenLite.set(body, {
            overflow: etat
        })
    }

    function gererVisibiliteInfos(etat) {

        infosVisibles = etat;
    }


    //ANIMATIONS

    //-----------------------------------------------------------
    //ANIMATIONS CHARGEMENT PAGE
    timelineIntro = new TimelineLite();
    timelineIntro
        .timeScale(0.75)
        .to(body, 0.01, {
            scrollTop: 0,
            onComplete: animerTitre
        })
        .set(body, {
            overflow: "hidden",
        })
        .fromTo(entete, 1, {
            y: "-150px"
        }, {
            y: "-50",
            ease: Back.easeOut.config(4)
        }, 1)
        .fromTo(nom, 1, {
            y: "-50px"
        }, {
            y: "145px",
            ease: Back.easeOut.config(4)
        }, 1)
        .fromTo(nomDouble, 1, {
            y: "-150px"
        }, {
            y: "95px",
            ease: Back.easeOut.config(4)
        }, 1)
        .fromTo(descProfil, 1, {
            autoAlpha: 0,
            y: "300px"
        }, {
            autoAlpha: 1,
            y: "0px",
            ease: Back.easeOut.config(3)
        }, "-=.5")
        .to(nomDouble, 1, {
            y: "0",
            ease: Back.easeOut.config(3)
        }, "-=1")
        .set(nomDouble, {
            autoAlpha: "0"
        })
        .to(nom, 1, {
            y: "50",
            ease: Back.easeOut.config(3)
        }, "-=1")
        .staggerFromTo(iconesProfil, 0.3, {
            scale: "0.1",
            autoAlpha: "0"
        }, {
            scale: "1",
            autoAlpha: "1",
            ease: Back.easeOut.config(6)
        }, "0.1", "-=.25")
        .set(iconesProfil, {
            clearProps: "all"
        })
        .set(btnMenu, {
            display: "block"
        })
        .to(btnMenu, 0.5, {
            autoAlpha: "1",
            scale: "1",
            ease: Back.easeOut.config(6)
        })
        .set(body, {
            overflowY: "auto",
            onComplete: creerAnimsProjets
        });

    //-----------------------------------------------------------
    //ANIMATIONS MENU
    btnProfil.addEventListener("click", function () {

        scroll(0, "profil");
    });
    btnProjets.addEventListener("click", function () {

        scroll(projets.offsetTop, "projets");
    });
    btnContact.addEventListener("click", function () {

        //CODE SOURCE (hauteur document) : http://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript
        var hauteurPage = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight); //Calcul de la hauteur du document.
        var hauteurFenetre = Math.max(doc.documentElement.clientHeight, fenetre.innerHeight || 0); //Calcul de la hauteur de navigateur.
        var posScroll = hauteurPage - hauteurFenetre; //Position calculée pour le scroll.
        scroll(posScroll, "contact");
    });

    btnMenu.addEventListener("click", function () {

        var elemsMenu = [btnAccueil, btnProfil, btnProjets, btnContact];
        var elemsMenuInverse = elemsMenu.slice(0);
        var elemsMenuInverse = elemsMenuInverse.reverse();

        if (animMenu) {
            if (!menuOuvert) {
                animMenu = false;
                timelineMenu = new TimelineLite;
                timelineMenu
                    .staggerFromTo(elemsMenu, 0.3, {
                        scale: "0",
                        autoAlpha: "0"
                    }, {
                        scale: "1",
                        autoAlpha: "1",
                        ease: Back.easeOut.config(4)
                    }, "0.15")
                    .to(menu, 0.5, {
                        height: "54px",
                        ease: Power4.easeOut
                    }, "0")
                    .to(entete, 0.5, {
                        "margin-top": "54px",
                        ease: Power4.easeOut,
                        onComplete: peutAnimerMenu
                    }, "0");
                menuOuvert = true;
            } else {
                animMenu = false;
                timelineMenu = new TimelineLite;
                timelineMenu
                    .staggerTo(elemsMenuInverse, 0.3, {
                        autoAlpha: 0,
                        scale: 0,
                        ease: Back.easeIn.config(4)
                    }, "0.15")
                    .to(menu, 0.5, {
                        height: "0",
                        ease: Power4.easeOut,
                        delay: 0.6
                    }, "0")
                    .to(entete, 0.5, {
                        "margin-top": "0",
                        ease: Power4.easeOut,
                        delay: 0.6,
                        onComplete: peutAnimerMenu
                    }, "0");
                menuOuvert = false;
            }
        }

        function peutAnimerMenu() {

            animMenu = true;
        }
    });

    function scroll(posAncre, ancre) {

        var position = posAncre;
        var duree = (Math.abs((position - fenetre.pageYOffset) / 1000));
        if (duree > 1) {
            duree = 1;
        }
        tweenScroll = TweenLite.to(fenetre, duree, {
            scrollTo: position,
            ease: CubicBezier.config(0.3, 0, 0.1, 1)
        });
        if (duree < 0.01) {
            switch (ancre) {
                case "profil":
                    tweenScroll = TweenLite.set(profil, {
                        clearProps: "all"
                    });
                    tweenScroll = TweenLite.from(profil, 3, {
                        color: vert,
                        ease: Power4.easeOut
                    });
                    break;
                case "projets":
                    tweenScroll = TweenLite.set(projets, {
                        clearProps: "all"
                    });
                    tweenScroll = TweenLite.from(projets, 3, {
                        color: vert,
                        ease: Power4.easeOut
                    });
                    break;
                case "contact":
                    tweenScroll = TweenLite.set(txtAreaMessage, {
                        clearProps: "all"
                    });
                    tweenScroll = TweenLite.from(txtAreaMessage, 3, {
                        backgroundColor: vert,
                        ease: Power4.easeOut
                    });
                    break;
            }
        }
    }

    //-----------------------------------------------------------
    //ANIMATIONS PROFIL

    function animerTitre() {

        if (timelineEntete) {
            timelineEntete.pause();
        }
        timelineEntete = new TimelineLite;
        var largeurFenetre = fenetre.innerWidth;
        var positionFinaleTexte = {
            position: largeurFenetre - largeurTexte
        };
        var duree = (largeurFenetre - largeurTexte) / 20;
        var dureeFade;
        if (duree > 8) {
            dureeFade = 4;
        } else {
            dureeFade = duree / 4;
        }

        timelineEntete
            .fromTo(texteEntete, dureeFade, {
                autoAlpha: "0"
            }, {
                autoAlpha: "1",
                ease: Power4.easeOut
            })
            .fromTo(texteEntete, duree, {
                x: "50px"
            }, {
                x: positionFinaleTexte.position,
                ease: Power0.easeNone,
                onComplete: animerTitre,
                onUpdate: verifRedimensionnement
            }, 0)
            .to(texteEntete, dureeFade, {
                autoAlpha: "0",
                ease: Power4.easeIn
            }, "-=" + dureeFade);

        function verifRedimensionnement() {

            if (fenetre.innerWidth != largeurFenetre) {
                animerTitre();
            }
        }
    }

    function transitionTexte(texte, direction) {

        if (direction == "in") {
            tweenEntete = TweenLite.set(texteEntete, {
                autoAlpha: "0",
                onComplete: deuxiemeTween
            });
            tweenEntete = TweenLite.fromTo(texteEntete, 3, {
                color: "#7593ef"
            },{
                color: "#D2DCFB",
                ease: Power4.easeOut
            });
        } else if (direction == "out") {
            tweenEntete = TweenLite.to(texteEntete, 0.5, {
                autoAlpha: "0",
                ease: Power4.easeOut,
                onComplete: deuxiemeTween
            });
        }

        function deuxiemeTween() {
            texteEntete.innerHTML = texte;
            if (texte == "PORTFOLIO") {
                tweenEntete = TweenLite.to(texteEntete, 2, {
                    autoAlpha: "1",
                    ease: Power4.easeInOut
                });
            } else {
                tweenEntete = TweenLite.set(texteEntete, {
                    autoAlpha: "1"
                });
            }
        }
    }

    profil.addEventListener("mouseover", function (event) {

        if (event.target.className == "iconeProfil") {

            if (event.target.id == "iconeVideo") {
                transitionTexte("VIDEO", "in");
            } else if (event.target.id == "iconeGithub") {
                transitionTexte("GITHUB", "in");
            } else if (event.target.id == "iconeLinkedin") {
                transitionTexte("LINKEDIN", "in");
            } else if (event.target.id == "iconeCV") {
                transitionTexte("CV", "in");
            }
        }
    });
    profil.addEventListener("mouseout", function (event) {

        if (event.target.className == "iconeProfil") {
            transitionTexte("PORTFOLIO", "out");
        }
    });

    iconeVideo.addEventListener("click", function () {

        if (!panneauOuvert) {

            panneauOuvert = true;

            timelineProfil = new TimelineLite;
            timelineProfil
                .to(zoneAffichageVideo, 1, {
                    width: "100%",
                    ease: CubicBezier.config(0.75, 0, 0.1, 1),
                    onComplete: gererScroll,
                    onCompleteParams: ["hidden"]
                })
                .fromTo(videoPres, 0.5, {
                    autoAlpha: "0",
                    height: "0%"
                }, {
                    autoAlpha: "1",
                    height: "100%",
                    ease: Power4.easeOut,
                    onComplete: play
                }, "-=.5")
                .fromTo(btnFermerVideo, 1, {
                    scale: "0"
                }, {
                    scale: "1",
                    ease: Elastic.easeOut
                });
        }

        function play() {

            videoPres.play();
        }
    });
    btnFermerVideo.addEventListener("click", function () {

        if (panneauOuvert) {

            panneauOuvert = false;

            timelineProfil = new TimelineLite;
            timelineProfil
                .to(btnFermerVideo, .5, {
                    scale: "0",
                    ease: Back.easeIn.config(4),
                    onComplete: gererScroll,
                    onCompleteParams: ["auto"]
                })
                .to(videoPres, .5, {
                    height: "0%",
                }, "-=.25")
                .to(videoPres, .25, {
                    autoAlpha: "0",
                }, "-=.25")
                .to(zoneAffichageVideo, 0.5, {
                    width: "0%",
                    ease: CubicBezier.config(0.75, 0, 0.1, 1),
                    onComplete: resetPanneau
                }, "-=.3");
        }
        videoPres.pause();
    });

    //-----------------------------------------------------------
    //ANIMATIONS PROJETS

    //Création des tween qui font apparaître / disparaître les projets on scroll.
    function creerAnimsProjets() {

        function estImpair(nombre) {
            return nombre % 2 == 0;
        }
        var tabProjets = selectionMultiple(".contenu");

        for (var i = 0; i < tabProjets.length; i++) {

            var enfants = tabProjets[i].childNodes;
            var elemsTexte = [enfants[1].childNodes[1], enfants[1].childNodes[3], enfants[1].childNodes[5]]; //[titre, technologies, description]
            var elemsImage = [enfants[3], enfants[3].childNodes[1], enfants[3].childNodes[3]]; //[wrapperImage, fillHover, image]

            //Création de la séquence d'animation pour chaque item.
            var timelineScrollProjet = new TimelineLite();
            
            if (estImpair(i)) {
                timelineScrollProjet
                    .timeScale(0.7)
                    .fromTo(elemsImage[0], .5, {
                        rotation: "45",
                        autoAlpha: "0"
                    },{
                        rotation: "0",
                        autoAlpha: "1",
                        ease: Back.easeInOut.config(3)
                    })
                    .staggerFromTo(elemsTexte, .4, {
                        autoAlpha: 0,
                        x: "-100"
                    }, {
                        autoAlpha: 1,
                        x: "0",
                        ease: Power4.easeInOut
                    }, 0.15, "-=.5")
                    .from(elemsImage[2], .5, {
                        autoAlpha: "0",
                        scale: "0",
                        ease: Back.easeInOut.config(2)
                    }, "-=.3");
            } else {
                timelineScrollProjet
                    .timeScale(0.7)
                    .fromTo(elemsImage[0], .5, {
                        rotation: "-45",
                        autoAlpha: "0"
                    },{
                        rotation: "0",
                        autoAlpha: "1",
                        ease: Back.easeInOut.config(3)
                    })
                    .staggerFromTo(elemsTexte, .4, {
                        autoAlpha: 0,
                        x: "100"
                    }, {
                        autoAlpha: 1,
                        x: "0",
                        ease: Power4.easeInOut
                    }, 0.15, "-=.5")
                    .from(elemsImage[2], .5, {
                        autoAlpha: "0",
                        scale: "0",
                        ease: Back.easeInOut.config(2)
                    }, "-=.3");
            }

            //Création de la scène de scroll à ajouter au controleur Scroll Magic
            var hauteurTriggerProjet = tabProjets[i].offsetHeight;
            var options = {
                offset: hauteurTriggerProjet,
                duration: 0,
                triggerElement: tabProjets[i],
                triggerHook: 1,
                reverse: true
            }
            var sceneProjet = new ScrollMagic.Scene(options)
                .setTween(timelineScrollProjet)
                .addTo(controleurSM);
        }
    }

    projets.addEventListener("mouseover", function (event) {

        if (event.target.className == "wrapperImgProjet") {
            tweenHover1 = TweenLite.to(event.target.children[1], .25, {
                scale: "1.1",
                ease: Back.easeOut.config(6)
            });
            tweenHover2 = TweenLite.to(event.target.children[0], 1, {
                height: "10%",
                width: "10%",
                ease: Elastic.easeOut.config(2.25, 0.3)
            });
            event.target.children[1].classList.add("saturation");
        }
    });

    projets.addEventListener("mouseout", function (event) {

        if (event.target.className == "wrapperImgProjet") {
            tweenHover1 = TweenLite.to(event.target.children[1], .25, {
                scale: "1",
                ease: Back.easeOut.config(4)
            });
            tweenHover2 = TweenLite.to(event.target.children[0], 0.25, {
                height: "5%",
                width: "5%",
                ease: Power4.easeOut
            });
            event.target.children[1].classList.remove("saturation");
        }
    });

    projets.addEventListener("click", function (event) {

        if (event.target.className == "wrapperImgProjet" || event.target.className == "fillHover" || event.target.className == "imageProjet") {
            if (!panneauOuvert) {

                panneauOuvert = true;

                timelineProjet = new TimelineLite;
                timelineProjet
                    .set(infoProjet, {
                        height: "0%"
                    })
                    .set(iframeProjets, {
                        autoAlpha: "0"
                    })
                    .to(zoneAffichageProjets, 1, {
                        width: "100%",
                        ease: CubicBezier.config(0.75, 0, 0.1, 1),
                        onComplete: gererScroll,
                        onCompleteParams: ["hidden"]
                    })
                    .fromTo(iframeProjets, 0.75, {
                        height: "0"
                    }, {
                        height: "95%",
                        ease: Power4.easeOut
                    }, "-=.25")
                    .fromTo(titreProjet, 0.5, {
                        autoAlpha: "0",
                    }, {
                        autoAlpha: "1",
                        ease: Power4.easeOut
                    }, "-=.5")
                    .staggerFromTo(elemsNavProjet, 0.3, {
                        scale: "0",
                        autoAlpha: "0"
                    }, {
                        scale: "1",
                        autoAlpha: "1",
                        ease: Back.easeOut.config(4)
                    }, 0.15);
            }
        }
    }, true);

    iframeProjets.addEventListener("load", function (event) {

        tweentransitionProjets = TweenLite.fromTo(iframeProjets, 1, {
            autoAlpha: "0"
        }, {
            autoAlpha: "1",
            ease: Power4.easeOut
        });
    });

    navProjet.addEventListener("click", function (event) {

        if (event.target.id == "btnPrecedent" || event.target.id == "btnSuivant") {
            tweentransitionProjets = TweenLite.fromTo(iframeProjets, 0.5, {
                autoAlpha: "1"
            }, {
                autoAlpha: "0",
                ease: Power4.easeOut
            });
        }

        switch (event.target.id) {
            case "btnPrecedent":
                //fct...
                break;
            case "btnSuivant":
                //fct...
                break;
            case "btnInfoProjet":
                if (!tweenInfo || !tweenInfo.isActive()) {
                    if (!infosVisibles) {
                        tweenInfo = TweenLite.to(infoProjet, 0.75, {
                            height: "15%",
                            "margin-top": "15px",
                            ease: Power4.easeInOut,
                            onComplete: gererVisibiliteInfos(true)
                        })
                    } else {
                        tweenInfo = TweenLite.to(infoProjet, 0.75, {
                            height: "0%",
                            "margin-top": "0px",
                            ease: Power4.easeInOut,
                            onComplete: gererVisibiliteInfos(false)
                        })
                    }
                }
                break;
            case "fermerProjet":
                if (panneauOuvert) {

                    timelineProjet = new TimelineLite;
                    timelineProjet
                        .staggerTo(elemsNavInverse, .25, {
                            autoAlpha: "0",
                            ease: Power4.easeOut
                        }, 0)
                        .to(titreProjet, .25, {
                            autoAlpha: "0",
                        }, 0)
                        .to(iframeProjets, .5, {
                            height: "0%",
                        }, "-=.25")
                        .to(iframeProjets, .25, {
                            autoAlpha: "0",
                            onComplete: gererScroll,
                            onCompleteParams: ["auto"]
                        }, "-=.25")
                        .to(zoneAffichageProjets, 0.5, {
                            width: "0%",
                            ease: CubicBezier.config(0.75, 0, 0.1, 1),
                            onComplete: resetPanneau
                        }, "-=.1")
                        .to(infoProjet, 0.25, {
                            height: "0%",
                            "margin-top": "0px",
                            ease: Power4.easeInOut,
                            onComplete: gererVisibiliteInfos(false)
                        }, 0);
                }
                break;
        }
    });

    //-----------------------------------------------------------
    //ANIMATIONS CONTACT

    var timelineScrollContact = new TimelineLite();

    timelineScrollContact
        .from(titreContact, 1, {
            autoAlpha: 0,
            scale: "0.5",
            ease: Back.easeInOut.config(6)
        })
        .from(txtAreaMessage, 1, {
            autoAlpha: 0,
            x: "200px",
            ease: Back.easeInOut.config(4)
        }, "-=.5")
        .staggerFrom(inputsContact, .5, {
            y: "100px",
            autoAlpha: "0",
            ease: Back.easeInOut.config(2)
        }, .15, "-=.5");

    var hauteurTriggerContact = formContact.offsetHeight;
    var options = {
        duration: 0,
        offset: hauteurTriggerContact,
        triggerElement: txtAreaMessage,
        triggerHook: 1,
        reverse: true
    }
    var sceneContact = new ScrollMagic.Scene(options)
        .setTween(timelineScrollContact)
        .addTo(controleurSM);

    //-----------------------------------------------------------
    return initAnimsPortfolio;
}