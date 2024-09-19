window.addEventListener("load", function load() {
    window.removeEventListener("load", load, false);

    //Fonctions de séléection d'éléments dud DOM.
    var selection = function (elemRecherche) {
        return document.querySelector(elemRecherche);
    }
    var selections = function (elemRecherche) {
        return document.querySelectorAll(elemRecherche);
    }

    //Perspective par défaut pour tous les éléments de la page.
    CSSPlugin.defaultTransformPerspective = 300;

    //--------------------------------------------------------------------------
    //anim AttrPlugin

    var tweenAttr;
    var tweenAttrRad;
    var btnStartAttrPlugin = selection(".startAttrPlugin");
    var btnResetAttrPlugin = selection(".resetAttrPlugin");
    var selectAnimBezierPlugin = selection(".animationBezierPlugin");

    //START

    btnStartAttrPlugin.addEventListener("click", function (e) {
        var easeRadiant;

        if (!tweenAttr) {
            var duree = parseFloat(selection(".dureeAttrPlugin").value) || 0.01;
            var ease = selection(".easeAttrPlugin").value;
            var animation = parseFloat(selection(".animationBezierPlugin").value);

            switch (ease) {
                case "Power0":
                    ease = Power0.easeInOut;
                    break;
                case "Power1":
                    ease = Power1.easeInOut;
                    break;
                case "Power2":
                    ease = Power2.easeInOut;
                    break;
                case "Power3":
                    ease = Power3.easeInOut;
                    break;
                case "Power4":
                    ease = Power4.easeInOut;
                    break;
                case "Back":
                    ease = Back.easeInOut;
                    break;
                case "Elastic":
                    ease = Elastic.easeOut;
                    break;
                case "Bounce":
                    ease = Bounce.easeOut;
                    break;
                case "Rough":
                    ease = RoughEase.ease;
                    break;
                case "SlowMo":
                    ease = SlowMo.ease.config(0.7, 0.7, false);
                    break;
                case "Stepped3":
                    ease = SteppedEase.config(3);
                    break;
                case "Stepped6":
                    ease = SteppedEase.config(6);
                    break;
                case "Stepped12":
                    ease = SteppedEase.config(12);
                    break;
                case "Circ":
                    ease = Circ.easeInOut;
                    break;
                case "Expo":
                    ease = Expo.easeInOut;
                    break;
                case "Sine":
                    ease = Sine.easeInOut;
                    break;
            }
            if (ease == Back.easeInOut) {
                easeRadiant = Power3.easeInOut;
            } else {
                easeRadiant = ease;
            }

            btnResetAttrPlugin.disabled = true;

            if (animation == 1) {
                tweenAttr = TweenLite.to(".st0", duree, {
                    attr: {
                        points: "103.4,213 64.4,194.1 54.7,152.5 43.8,103.6 70.4,69.6 101.6,31.2 148,31.2 194.4,31.2 224.6,68.8 252.2,103.6 241.6,149.9 231.6,194.2 188.4,215.4 148,234.4"
                    },
                    ease: ease
                });
            } else if (animation == 2) {
                tweenAttr = TweenLite.to(".st0", duree, {
                    attr: {
                        points: "129,196 106.2,158.1 82.7,118.9 58.5,77.7 30.9,31.2 98,31.2 147.9,31.3 198,31.2 264,31.2 236.8,77.4 210.5,122.2 185.4,164.5 166.5,197 148,228"
                    },
                    ease: ease
                });
            }

            tweenAttrRad = TweenLite.to("#SVGID_1_", duree, {
                attr: {
                    r: "500"
                },
                ease: easeRadiant,
                onComplete: resetTweenAttrActif
            });
        }
    });

    function resetTweenAttrActif() {

        btnResetAttrPlugin.disabled = false;
        btnStartAttrPlugin.disabled = true;
    }
    //RESET
    btnResetAttrPlugin.addEventListener("click", function (e) {

        if (tweenAttr && !tweenAttr.isActive()) {
            tweenAttr.pause(0);
            tweenAttrRad.pause(0);
            TweenLite.set(selection(".st0"), {
                clearProps: "all"
            });
            TweenLite.set(selection("#SVGID_1_"), {
                clearProps: "all"
            });
            tweenAttr = "";
            tweenAttrRad = "";
            btnResetAttrPlugin.disabled = true;
            btnStartAttrPlugin.disabled = false;
        }
    });
    //CHOIX ANIM
    selectAnimBezierPlugin.addEventListener("change", function (e) {

        if (selectAnimBezierPlugin.value) {
            btnStartAttrPlugin.disabled = false;
        }
        else {
            btnStartAttrPlugin.disabled = true;
        }
    });
    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    //anim BezierPlugin

    //10 = rayon d'un point visible à l'écran
    //75 = compensation décalage avion pour qu'il débute hors de l'écran
    var pointBezier1X = selection(".pointBezier1").offsetLeft + 10 + 75;
    var pointBezier1Y = selection(".pointBezier1").offsetTop + 10 + 75;
    var pointBezier2X = selection(".pointBezier2").offsetLeft + 10 + 75;
    var pointBezier2Y = selection(".pointBezier2").offsetTop + 10 + 75;
    var pointBezier3X = selection(".pointBezier3").offsetLeft + 10 + 75;
    var pointBezier3Y = selection(".pointBezier3").offsetTop + 10 + 75;
    var pointBezier4X = selection(".pointBezier4").offsetLeft + 10 + 75;
    var pointBezier4Y = selection(".pointBezier4").offsetTop + 10 + 75;
    var pointBezier5X = selection(".pointBezier5").offsetLeft + 10 + 75;
    var pointBezier5Y = selection(".pointBezier5").offsetTop + 10 + 75;
    var pointBezier6X = selection(".pointBezier6").offsetLeft + 10 + 75;
    var pointBezier6Y = selection(".pointBezier6").offsetTop + 10 + 75;

    var tweenBezier;

    var btnStartBezierPlugin = selection(".startBezierPlugin");
    var btnResetBezierPlugin = selection(".resetBezierPlugin");

    //START
    btnStartBezierPlugin.addEventListener("click", function (e) {

        if (!tweenBezier || !tweenBezier.isActive()) {
            var duree = parseFloat(selection(".dureeBezierPlugin").value);
            var autoRot = selection(".autoRotateBezierPlugin").value;
            var courbe = parseFloat(selection(".courbeBezierPlugin").value);
            var resolution = parseFloat(selection(".resBezierPlugin").value);

            if (!courbe) {
                courbe = 0;
            }
            if (autoRot == "true") {
                autoRot = true;
            } else {
                autoRot = false;
            }

            btnResetBezierPlugin.disabled = true;

            tweenBezier = TweenLite.to(selection(".divAnimeeBezier"), duree, {
                bezier: {
                    curviness: courbe,
                    values: [{
                        x: pointBezier1X,
                        y: pointBezier1Y
                }, {
                        x: pointBezier2X,
                        y: pointBezier2Y
                }, {
                        x: pointBezier3X,
                        y: pointBezier3Y
                }, {
                        x: pointBezier4X,
                        y: pointBezier4Y
                }, {
                        x: pointBezier5X,
                        y: pointBezier5Y
                }, {
                        x: pointBezier6X,
                        y: pointBezier6Y
                }],
                    timeResolution: resolution,
                    autoRotate: autoRot
                },
                ease: Linear.easeNone,
                onComplete: resetTweenBezierActif
            });
        } else {
            btnResetBezierPlugin.classList.add('inactif');
        }
    });

    function resetTweenBezierActif() {

        btnResetBezierPlugin.disabled = false;
    }
    //RESET
    btnResetBezierPlugin.addEventListener("click", function (e) {

        if (tweenBezier && !tweenBezier.isActive()) {
            TweenLite.set(selection(".divAnimeeBezier"), {
                clearProps: "all"
            });
            tweenBezier = "";
            btnResetBezierPlugin.disabled = true;
        }
    });
    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    //anim ColorPropsPlugin

    var couleurDebutCpPlugin;
    var couleurFinCpPlugin;
    var tweenColorProps;

    var btnResetCpPlugin = selection(".resetCpPlugin");
    var elemRondCpPlugin1 = selection(".rondCpPlugin1");
    var elemRondCpPlugin2 = selection(".rondCpPlugin2");
    var inputcouleurDebutCp = selection(".couleurDebutCpPlugin");
    var inputcouleurFinCp = selection(".couleurFinCpPlugin");

    //START
    selection(".startCpPlugin").addEventListener("click", function (e) {

        if (!tweenColorProps || !tweenColorProps.isActive()) {
            var duree = parseFloat(selection(".dureeCpPlugin").value);

            btnResetCpPlugin.disabled = true;

            tweenColorProps = TweenLite.to(elemRondCpPlugin1.style, duree, {
                colorProps: {
                    backgroundColor: couleurFinCpPlugin
                },
                ease: Linear.easeNone
            });
            TweenLite.to(elemRondCpPlugin2.style, duree, {
                colorProps: {
                    backgroundColor: couleurDebutCpPlugin
                },
                ease: Linear.easeNone,
                onComplete: resetTweenColorPropsActif
            });
        }
    });

    function resetTweenColorPropsActif() {
        btnResetCpPlugin.disabled = false;
    }

    //RESET
    btnResetCpPlugin.addEventListener("click", function (e) {

        if (tweenColorProps && !tweenColorProps.isActive()) {
            couleurDebutCpPlugin = "";
            couleurFinCpPlugin = "";
            elemRondCpPlugin1.style.backgroundColor = couleurDebutCpPlugin;
            elemRondCpPlugin2.style.backgroundColor = couleurFinCpPlugin;
            inputcouleurDebutCp.value = "";
            inputcouleurFinCp.value = "";
            btnResetCpPlugin.disabled = true;
            tweenColorProps = "";
        }
    });

    //ECRITURE DYNAMIQUE
    inputcouleurDebutCp.addEventListener("keyup", function (e) {

        couleurDebutCpPlugin = inputcouleurDebutCp.value;
        elemRondCpPlugin1.style.backgroundColor = couleurDebutCpPlugin;
    });
    inputcouleurFinCp.addEventListener("keyup", function (e) {

        couleurFinCpPlugin = inputcouleurFinCp.value;
        elemRondCpPlugin2.style.backgroundColor = couleurFinCpPlugin;
    });
    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    //anim CSSPlugin

    var tweenCss;

    var btnResetCssPlugin = selection(".resetCssPlugin");
    var elemCarreCssPlugin = selection(".carreCssPlugin");

    //START
    selection(".startCssPlugin").addEventListener("click", function (e) {

        if (!tweenCss || !tweenCss.isActive()) {
            var duree = parseFloat(selection(".dureeCssPlugin").value);
            var ease = selection(".easeCssPlugin").value;

            var grosseur = parseFloat(selection(".grosseurCssPlugin").value);
            var rotation = parseFloat(selection(".rotationCssPlugin").value);
            var opacite = selection(".opaciteCssPlugin").value;
            var transform = selection(".transformCssPlugin").value.trim();

            var prop1 = selection(".prop1CssPlugin").value;
            var prop2 = selection(".prop2CssPlugin").value;
            var prop3 = selection(".prop3CssPlugin").value;
            var prop4 = selection(".prop4CssPlugin").value;
            var prop5 = selection(".prop5CssPlugin").value;
            var prop6 = selection(".prop6CssPlugin").value;
            var val1 = selection(".val1CssPlugin").value;
            var val2 = selection(".val2CssPlugin").value;
            var val3 = selection(".val3CssPlugin").value;
            var val4 = selection(".val4CssPlugin").value;
            var val5 = selection(".val5CssPlugin").value;
            var val6 = selection(".val6CssPlugin").value;

            var valeursTween = {};

            switch (ease) {
                case "Power0":
                    ease = Power0.easeInOut;
                    break;
                case "Power1":
                    ease = Power1.easeInOut;
                    break;
                case "Power2":
                    ease = Power2.easeInOut;
                    break;
                case "Power3":
                    ease = Power3.easeInOut;
                    break;
                case "Power4":
                    ease = Power4.easeInOut;
                    break;
                case "Back":
                    ease = Back.easeInOut;
                    break;
                case "Elastic":
                    ease = Elastic.easeOut;
                    break;
                case "Bounce":
                    ease = Bounce.easeOut;
                    break;
                case "Rough":
                    ease = RoughEase.ease;
                    break;
                case "SlowMo":
                    ease = SlowMo.ease.config(0.7, 0.7, false);
                    break;
                case "Stepped3":
                    ease = SteppedEase.config(3);
                    break;
                case "Stepped6":
                    ease = SteppedEase.config(6);
                    break;
                case "Stepped12":
                    ease = SteppedEase.config(12);
                    break;
                case "Circ":
                    ease = Circ.easeInOut;
                    break;
                case "Expo":
                    ease = Expo.easeInOut;
                    break;
                case "Sine":
                    ease = Sine.easeInOut;
                    break;
            }

            if (grosseur) {
                valeursTween.scale = grosseur;
            }
            if (rotation) {
                valeursTween.rotation = rotation;
            }
            if (transform) {
                valeursTween.transform = transform;
            }
            if (opacite) {
                valeursTween.autoAlpha = opacite;
            }
            if (prop1 && val1) {
                valeursTween[prop1] = val1;
            }
            if (prop2 && val2) {
                valeursTween[prop2] = val2;
            }
            if (prop3 && val3) {
                valeursTween[prop3] = val3;
            }
            if (prop4 && val4) {
                valeursTween[prop4] = val4;
            }
            if (prop5 && val5) {
                valeursTween[prop5] = val5;
            }
            if (prop6 && val6) {
                valeursTween[prop6] = val6;
            }
            console.log(valeursTween);

            btnResetCssPlugin.disabled = true;

            tweenCss = TweenLite.to(elemCarreCssPlugin, duree, {
                css: valeursTween,
                ease: ease,
                onComplete: resetTweenCssActif
            });
        }
    });

    function resetTweenCssActif() {

        btnResetCssPlugin.disabled = false;
    }

    //RESET
    btnResetCssPlugin.addEventListener("click", function (e) {

        if (tweenCss && !tweenCss.isActive()) {
            btnResetCssPlugin.disabled = true;
            tweenCss.pause(0);
            TweenLite.set(selection(".carreCssPlugin"), {
                clearProps: "all"
            });
            tweenCss = "";
        }
    });
    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    //anim CSSRulePlugin

    var tweenCssRule;

    var btnResetCssRulePlugin = selection(".resetCssRulePlugin");
    var elemCarreCssPlugin = selection(".carreCssPlugin");

    //START
    selection(".startCssRulePlugin").addEventListener("click", function (e) {

        if (!tweenCssRule || !tweenCssRule.isActive()) {
            var duree = parseFloat(selection(".dureeCssRulePlugin").value);
            if (duree == "" || isNaN(duree)) {
                duree = 0.1;
            }
            var ease = selection(".easeCssRulePlugin").value;
            var selecteur = selection(".selecteurCssRulePlugin").value;
            var prop = selection(".propCssRulePlugin").value;
            var val = selection(".valCssRulePlugin").value;
            var type = selection(".typeCssRulePlugin").value;
            var valeursTween = {};
            var valeursInitialesTween = {};

            switch (ease) {
                case "Power0":
                    ease = Power0.easeInOut;
                    break;
                case "Power1":
                    ease = Power1.easeInOut;
                    break;
                case "Power2":
                    ease = Power2.easeInOut;
                    break;
                case "Power3":
                    ease = Power3.easeInOut;
                    break;
                case "Power4":
                    ease = Power4.easeInOut;
                    break;
                case "Back":
                    ease = Back.easeInOut;
                    break;
                case "Elastic":
                    ease = Elastic.easeOut;
                    break;
                case "Bounce":
                    ease = Bounce.easeOut;
                    break;
                case "Rough":
                    ease = RoughEase.ease;
                    break;
                case "SlowMo":
                    ease = SlowMo.ease.config(0.7, 0.7, false);
                    break;
                case "Stepped3":
                    ease = SteppedEase.config(3);
                    break;
                case "Stepped6":
                    ease = SteppedEase.config(6);
                    break;
                case "Stepped12":
                    ease = SteppedEase.config(12);
                    break;
                case "Circ":
                    ease = Circ.easeInOut;
                    break;
                case "Expo":
                    ease = Expo.easeInOut;
                    break;
                case "Sine":
                    ease = Sine.easeInOut;
                    break;
            }

            if (selecteur && prop && val) {

                if (type == "element") {
                    var elem = document.getElementsByTagName(selecteur);
                } else if (type == "classe") {
                    var elem = selections(selecteur);
                }
                var propActuelle = window.getComputedStyle(elem[0], null);

                var motsProp = prop.split("-");
                var propCamelCase = motsProp[0];
                var i;
                for (i = 1; i < motsProp.length; i++) {
                    propCamelCase += capitalisation(motsProp[i]);
                }
                valeursTween[propCamelCase] = val;

                valeursInitialesTween[propCamelCase] = propActuelle.getPropertyValue(prop);

                btnResetCssRulePlugin.disabled = true;

                tweenCssRule = TweenLite.fromTo(CSSRulePlugin.getRule(selecteur), duree, {
                    cssRule: valeursInitialesTween
                }, {
                    cssRule: valeursTween,
                    ease: ease,
                    onComplete: resetTweenCssRuleActif
                });
                console.log("propriété JS : " + propCamelCase);
            }
        }
    });

    function capitalisation(mot) {
        return mot.charAt(0).toUpperCase() + mot.slice(1); //Capitalisation de la première lettre du mot.
    }

    function resetTweenCssRuleActif() {
        btnResetCssRulePlugin.disabled = false;
    }

    //RESET
    btnResetCssRulePlugin.addEventListener("click", function (e) {

        if (tweenCssRule && !tweenCssRule.isActive()) {
            btnResetCssRulePlugin.disabled = true;
            tweenCssRule.pause(0);
            tweenCssRule = "";
        }
    });
    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    //anim DirectionalRotationPlugin

    var tweenDrGrandeAiguille;
    var tweenDrPetiteAiguille;
    var btnResetDrPlugin = selection(".resetDrPlugin");

    //START
    selection(".startDrPlugin").addEventListener("click", function (e) {

        if (!tweenDrGrandeAiguille || !tweenDrGrandeAiguille.isActive()) {
            var duree = parseFloat(selection(".dureeDrPlugin").value);
            if (duree == "" || isNaN(duree)) {
                duree = 0.1;
            }
            var ease = selection(".easeDrPlugin").value;
            var valeur = selection(".valeurDrPlugin").value;
            var type = selection(".typeDrPlugin").value;
            var direction = selection(".directionDrPlugin").value;
            var valeursTweenG = {};
            var valeursTweenP = {};

            switch (ease) {
                case "Power0":
                    ease = Power0.easeInOut;
                    break;
                case "Power1":
                    ease = Power1.easeInOut;
                    break;
                case "Power2":
                    ease = Power2.easeInOut;
                    break;
                case "Power3":
                    ease = Power3.easeInOut;
                    break;
                case "Power4":
                    ease = Power4.easeInOut;
                    break;
                case "Back":
                    ease = Back.easeInOut;
                    break;
                case "Elastic":
                    ease = Elastic.easeOut;
                    break;
                case "Bounce":
                    ease = Bounce.easeOut;
                    break;
                case "Rough":
                    ease = RoughEase.ease;
                    break;
                case "SlowMo":
                    ease = SlowMo.ease.config(0.7, 0.7, false);
                    break;
                case "Stepped3":
                    ease = SteppedEase.config(3);
                    break;
                case "Stepped6":
                    ease = SteppedEase.config(6);
                    break;
                case "Stepped12":
                    ease = SteppedEase.config(12);
                    break;
                case "Circ":
                    ease = Circ.easeInOut;
                    break;
                case "Expo":
                    ease = Expo.easeInOut;
                    break;
                case "Sine":
                    ease = Sine.easeInOut;
                    break;
            }

            if (type == "rel") {
                if (direction == "_cw" || direction == "_short") {
                    type = "+="
                } else if (direction == "_ccw") {
                    type = "-="
                }
            } else {
                type = "";
            }

            if (valeur && !isNaN(valeur)) {

                valeursTweenG["rotation"] = type + valeur + direction;
                valeursTweenP["rotation"] = type + valeur / 12 + direction;

                btnResetDrPlugin.disabled = true;

                tweenDrGrandeAiguille = TweenLite.to(selection(".grandeAiguille"), duree, {
                    directionalRotation: valeursTweenG,
                    ease: ease,
                    onComplete: resetTweenDrActif
                });
                tweenDrPetiteAiguille = TweenLite.to(selection(".petiteAiguille"), duree, {
                    directionalRotation: valeursTweenP,
                    ease: ease
                });
            }
        }
    });

    function resetTweenDrActif() {

        btnResetDrPlugin.disabled = false;
    }

    //RESET
    btnResetDrPlugin.addEventListener("click", function (e) {

        if (tweenDrGrandeAiguille && !tweenDrGrandeAiguille.isActive()) {
            btnResetDrPlugin.disabled = true;
            tweenDrGrandeAiguille.pause(0);
            tweenDrPetiteAiguille.pause(0);
            TweenLite.set(selection(".grandeAiguille"), {
                clearProps: "all"
            });
            TweenLite.set(selection(".petiteAiguille"), {
                clearProps: "all"
            });
            tweenDrGrandeAiguille = "";
            tweenDrPetiteAiguille = "";
        }
    });
    //--------------------------------------------------------------------------

    //--------------------------------------------------------------------------
    //anim ScrollToPlugin

    var tweenScrollTo;

    //START
    selection(".startScrollToPlugin").addEventListener("click", function (e) {

        if (!tweenScrollTo || !tweenScrollTo.isActive()) {
            var y = parseFloat(selection(".yScrollToPlugin").value);
            var fenetre = selection(".scrollToPlugin");
            var duree = parseFloat(selection(".dureeScrollToPlugin").value);
            var easeInX = parseFloat(selection(".easeInXScrollToPlugin").value);
            var easeInY = parseFloat(selection(".easeInYScrollToPlugin").value);
            var easeOutX = parseFloat(selection(".easeOutXScrollToPlugin").value);
            var easeOutY = parseFloat(selection(".easeOutYScrollToPlugin").value);

            tweenScrollTo = TweenLite.to(fenetre, duree, {
                scrollTo: {
                    y: y
                },
                ease: CubicBezier.config(easeInX, easeInY, easeOutX, easeOutY)
            });
        }
    });
    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    //anim TextPlugin

    var tweenText;
    var btnResetTxtPlugin = selection(".resetTxtPlugin");

    selection(".paragrapheTextPlugin").innerHTML = selection(".departTxtPlugin").value;

    //START
    selection(".startTxtPlugin").addEventListener("click", function (e) {

        if (!tweenText || !tweenText.isActive()) {
            var duree = parseFloat(selection(".dureeTxtPlugin").value);
            var delimiter = selection(".typeTxtPlugin").value;
            var texte = selection(".arriveeTxtPlugin").value;


            btnResetTxtPlugin.disabled = true;

            tweenText = TweenLite.to(".paragrapheTextPlugin", duree, {
                text: {
                    value: texte,
                    newClass: "bleu",
                    oldClass: "noir",
                    delimiter: delimiter,
                    padSpace: true
                },
                ease: Linear.easeNone,
                onComplete: resetTxtActif
            });

        }
    });

    function resetTxtActif() {

        btnResetTxtPlugin.disabled = false;
    }

    //RESET
    btnResetTxtPlugin.addEventListener("click", function (e) {

        if (tweenText && !tweenText.isActive()) {
            selection(".paragrapheTextPlugin").innerHTML = selection(".departTxtPlugin").value;

            tweenText.pause(0);
            btnResetTxtPlugin.disabled = true;
        }
    });
    //ECRITURE DYNAMIQUE
    selection(".departTxtPlugin").addEventListener("keyup", function (e) {

        selection(".paragrapheTextPlugin").innerHTML = selection(".departTxtPlugin").value;
        tweenText = "";
    });
    //--------------------------------------------------------------------------
});