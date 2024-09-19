window.addEventListener("load", function load() {
    window.removeEventListener("load", load, false);

    var container = document.getElementById('container');
    
    //Fonctions de séléection d'éléments dud DOM.
    var selection = function (elemRecherche) {
        return document.querySelector(elemRecherche);
    }
    var selections = function (elemRecherche) {
        return document.querySelectorAll(elemRecherche);
    }

    CSSPlugin.defaultTransformPerspective = 200;

    //--------------------------------------------------------------------------
    //anim TweenMax

    var btnResetTweenmax = selection(".resetTweenmax");
    var btnResetAllTweenmax = selection(".resetAllTweenmax");
    var btnStartTweenmax = selection(".startTweenmax");
    var selectEaseDirTweenmax = selection(".easeDirectionTweenmax");
    var selectTypeEaseTweenmax = selection(".typeTransitionTweenmax");
    var selectEaseTweenmax = selection(".easeTweenmax");
    var inputsEaseGreensock = selection(".easeGreensock");
    var inputsEaseBezier = selection(".easeBezier");
    var groupeInputsReg = selection(".groupeInputsReg");
    var optionsEaseRough = selection(".rough");
    var optionsEaseSlowMo = selection(".slowMo");
    var optionsEaseStepped = selection(".stepped");
    var optionsEaseBack = selection(".back");
    var optionsEaseElastic = selection(".elastic");
    var affichageFrames = selection(".affichageFrames");
    var objAnim1Tweenmax = selection(".objAnim1Tweenmax");
    var objAnim2Tweenmax = selection(".objAnim2Tweenmax");
    var objAnim3Tweenmax = selection(".objAnim3Tweenmax");
    var inputDuree = selection(".dureeTweenmax");
    var ease = "";
    var inputEaseInX = selection(".easeInXTweenmax");
    var inputEaseInY = selection(".easeInYTweenmax");
    var inputEaseOutX = selection(".easeOutXTweenmax");
    var inputEaseOutY = selection(".easeOutYTweenmax");
    var erreurs = false;
    var compteur;
    var tween1Tweenmax;
    var tween2Tweenmax;
    var tween3Tweenmax;
    var tweenInputsReg;
    var tweenOptionsEase;

    //START
    selection(".startTweenmax").addEventListener("click", function (e) {

        if (!tween1Tweenmax || !tween1Tweenmax.isActive()) {

            //Prend les valeurs des inputs ou donne une valeur par défaut si vide / illégal.
            var duree = parseFloat(inputDuree.value) || 0.1;
            var easeSelect = selectEaseTweenmax.value || "Power0";
            var easeDirection = selectEaseDirTweenmax.value || "easeInOut";
            var amplitudeElastic = parseFloat(selection(".ampElastic").value) || 1;
            var nbVaguesElastic = parseFloat(selection(".waveElastic").value) || 0.3;
            var overshootBack = parseFloat(selection(".overshootBack").value) || 1.7;
            var modeleRough = selection(".modeleRough").value || "Power0";
            var forceRough = parseFloat(selection(".forceRough").value) || 1;
            var pointsRough = parseFloat(selection(".pointsRough").value) || 20;
            var attenuationRough = selection(".attenuationRough").value || "none";
            var alleatoireRough = selection(".randomRough").value; //true / false
            var limiteRough = selection(".clampRough").value; //true / false
            var lineariteSlowMo = parseFloat(selection(".lineariteSlowMo").value) || 0.7;
            var puissanceSlowMo = parseFloat(selection(".puissanceSlowMo").value) || 0.7;
            var yoyoSlowMo = selection(".yoyoSlowMo").value; //true / false
            var nombreStepped = parseFloat(selection(".nombreStepped").value) || 10;
            var delai = parseFloat(selection(".delai").value) || 0;
            var repetitions = parseFloat(selection(".repetitions").value) || 0;
            var delaiRep = parseFloat(selection(".delaiRep").value) || 0;
            var yoyo = selection(".yoyo").value; //true / false
            var easeInX = parseFloat(inputEaseInX.value);
            var easeInY = parseFloat(inputEaseInY.value);
            var easeOutX = parseFloat(inputEaseOutX.value);
            var easeOutY = parseFloat(inputEaseOutY.value);

            var prop1 = selection(".prop1Tweenmax").value;
            var prop2 = selection(".prop2Tweenmax").value;
            var prop3 = selection(".prop3Tweenmax").value;
            var prop4 = selection(".prop4Tweenmax").value;
            var prop5 = selection(".prop5Tweenmax").value;
            var prop6 = selection(".prop6Tweenmax").value;
            var val1 = selection(".val1Tweenmax").value;
            var val2 = selection(".val2Tweenmax").value;
            var val3 = selection(".val3Tweenmax").value;
            var val4 = selection(".val4Tweenmax").value;
            var val5 = selection(".val5Tweenmax").value;
            var val6 = selection(".val6Tweenmax").value;

            if (selectTypeEaseTweenmax.value == "greensock") {

                if (alleatoireRough == "true") {
                    alleatoireRough = true;
                } else {
                    alleatoireRough = false;
                }

                if (limiteRough == "true") {
                    limiteRough = true;
                } else {
                    limiteRough = false;
                }

                if (yoyoSlowMo == "true") {
                    yoyoSlowMo = true;
                } else {
                    yoyoSlowMo = false;
                }

                switch (easeSelect) {
                    case "Power0":
                        ease = Power0[easeDirection];
                        break;
                    case "Power1":
                        ease = Power1[easeDirection];
                        break;
                    case "Power2":
                        ease = Power2[easeDirection];
                        break;
                    case "Power3":
                        ease = Power3[easeDirection];
                        break;
                    case "Power4":
                        ease = Power4[easeDirection];
                        break;
                    case "Back":
                        ease = Back[easeDirection].config(overshootBack);
                        break;
                    case "Elastic":
                        ease = Elastic[easeDirection].config(amplitudeElastic, nbVaguesElastic);
                        break;
                    case "Bounce":
                        ease = Bounce[easeDirection];
                        break;
                    case "Rough":
                        switch (modeleRough) {
                            case "Power0":
                                modeleRough = Power0.easeNone;
                                break;
                            case "Power1":
                                modeleRough = Power1.easeNone;
                                break;
                            case "Power2":
                                modeleRough = Power2.easeNone;
                                break;
                            case "Power3":
                                modeleRough = Power3.easeNone;
                                break;
                            case "Power4":
                                modeleRough = Power4.easeNone;
                            case "Back":
                                modeleRough = Back.easeNone;
                                break;
                            case "Elastic":
                                modeleRough = Elastic.easeNone;
                                break;
                            case "Bounce":
                                modeleRough = Bounce.easeNone;
                                break;
                            case "Circ":
                                modeleRough = Circ.easeNone;
                                break;
                            case "Expo":
                                modeleRough = Expo.easeNone;
                                break;
                            case "Sine":
                                modeleRough = Sine.easeNone;
                                break;
                            default:
                                modeleRough = Power0.easeNone;
                        }
                        ease = RoughEase.ease.config({
                            template: modeleRough,
                            strength: forceRough,
                            points: pointsRough,
                            taper: attenuationRough,
                            randomize: alleatoireRough,
                            clamp: limiteRough
                        });
                        break;
                    case "SlowMo":
                        ease = SlowMo.ease.config(lineariteSlowMo, puissanceSlowMo, yoyoSlowMo);
                        break;
                    case "Stepped":
                        ease = SteppedEase.config(nombreStepped);
                        break;
                    case "Circ":
                        ease = Circ[easeDirection];
                        break;
                    case "Expo":
                        ease = Expo[easeDirection];
                        break;
                    case "Sine":
                        ease = Sine[easeDirection];
                        break;
                }
            } else if (selectTypeEaseTweenmax.value == "bezier") {

                if (isNaN(easeInX) || isNaN(easeInY) || isNaN(easeOutX) || isNaN(easeOutY)) { //Si tous les champs ne sont pas remplis correctement...
                    //Valeurs pour ease linéaire.
                    easeInX = 0;
                    easeInY = 0;
                    easeOutX = 1;
                    easeOutY = 1;
                } else {
                    if (easeInX < 0) {
                        easeInX = 0;
                    }
                    if (easeInX > 1) {
                        easeInX = 1;
                    }
                    if (easeInY < 0) {
                        easeInY = 0;
                    }
                    if (easeInY > 1) {
                        easeInY = 1;
                    }
                    if (easeOutX < 0) {
                        easeOutX = 0;
                    }
                    if (easeOutX > 1) {
                        easeOutX = 1;
                    }
                    if (easeOutY < 0) {
                        easeOutY = 0;
                    }
                    if (easeOutY > 1) {
                        easeOutY = 1;
                    }
                }
                ease = CubicBezier.config(easeInX, easeInY, easeOutX, easeOutY);
            } else {
                erreurs = true;
            }

            if (yoyo == "true") {
                yoyo = true;
            } else {
                yoyo = false;
            }

            if (!erreurs) {
                btnResetTweenmax.disabled = true;
                btnResetAllTweenmax.disabled = true;
                compteur = 0;

                var propsTween = {};
                
                if (prop1 && val1) {
                    propsTween[prop1] = val1;
                }
                if (prop2 && val2) {
                    propsTween[prop2] = val2;
                }
                if (prop3 && val3) {
                    propsTween[prop3] = val3;
                }
                if (prop4 && val4) {
                    propsTween[prop4] = val4;
                }
                if (prop5 && val5) {
                    propsTween[prop5] = val5;
                }
                if (prop6 && val6) {
                    propsTween[prop6] = val6;
                }
                propsTween.ease = ease;
                propsTween.onUpdate = afficherFrames;
                propsTween.repeat = repetitions;
                propsTween.repeatDelay = delaiRep;
                propsTween.yoyo = yoyo;

                var delaiTween2 = delai + duree;
                var delaiTween3 = (delai * 2) + (duree * 2);
                var propsDernierTween = Object.create(propsTween);
                propsDernierTween.onComplete = resetTweenTweenmaxActif;

                tween1Tweenmax = TweenMax.to(objAnim1Tweenmax, duree, propsTween);
                tween2Tweenmax = TweenMax.to(objAnim2Tweenmax, duree, propsTween);
                tween2Tweenmax.delay(delaiTween2);
                tween3Tweenmax = TweenMax.to(objAnim3Tweenmax, duree, propsDernierTween);
                tween3Tweenmax.delay(delaiTween3);
            }
        }
    });

    function afficherFrames() {
        affichageFrames.innerHTML = compteur;
        compteur++;
    }

    function resetTweenTweenmaxActif() {

        btnResetTweenmax.disabled = false;
        btnResetAllTweenmax.disabled = false;
    }
    //RESET
    btnResetTweenmax.addEventListener("click", function (e) {

        if (tween1Tweenmax && !tween1Tweenmax.isActive()) {

            tween1Tweenmax.pause(0);
            tween2Tweenmax.pause(0);
            tween3Tweenmax.pause(0);
            btnResetTweenmax.disabled = true;
            compteur = 0;
            affichageFrames.innerHTML = compteur;
        }
    });

    //RESET ALL
    btnResetAllTweenmax.addEventListener("click", function (e) {

        if (tween1Tweenmax && !tween1Tweenmax.isActive()) {

            TweenMax.set(objAnim1Tweenmax, {
                clearProps: "all"
            });
            TweenMax.set(objAnim2Tweenmax, {
                clearProps: "all"
            });
            TweenMax.set(objAnim3Tweenmax, {
                clearProps: "all"
            });
            btnResetTweenmax.disabled = true;
            btnResetAllTweenmax.disabled = true;
            compteur = 0;
            affichageFrames.innerHTML = compteur;
        }
    });

    selectEaseTweenmax.addEventListener("change", function (e) {

        var valeur = selectEaseTweenmax.value;

        switch (valeur) {
            case "Rough":
                selectEaseDirTweenmax.disabled = true;
                optionsEaseRough.style.display = "flex";
                optionsEaseSlowMo.style.display = "none";
                optionsEaseStepped.style.display = "none";
                optionsEaseBack.style.display = "none";
                optionsEaseElastic.style.display = "none";
                tweenOptionsEase = TweenMax.from(optionsEaseRough, 2, {
                    backgroundColor: "#00b700",
                    ease: Power4.easeOut
                });
                break;
            case "SlowMo":
                selectEaseDirTweenmax.disabled = true;
                optionsEaseRough.style.display = "none";
                optionsEaseSlowMo.style.display = "flex";
                optionsEaseStepped.style.display = "none";
                optionsEaseBack.style.display = "none";
                optionsEaseElastic.style.display = "none";
                tweenOptionsEase = TweenMax.from(optionsEaseSlowMo, 2, {
                    backgroundColor: "#00b700",
                    ease: Power4.easeOut
                });
                break;
            case "Stepped":
                selectEaseDirTweenmax.disabled = true;
                optionsEaseRough.style.display = "none";
                optionsEaseSlowMo.style.display = "none";
                optionsEaseStepped.style.display = "flex";
                optionsEaseBack.style.display = "none";
                optionsEaseElastic.style.display = "none";
                tweenOptionsEase = TweenMax.from(optionsEaseStepped, 2, {
                    backgroundColor: "#00b700",
                    ease: Power4.easeOut
                });
                break;
            case "Back":
                selectEaseDirTweenmax.disabled = false;
                optionsEaseRough.style.display = "none";
                optionsEaseSlowMo.style.display = "none";
                optionsEaseStepped.style.display = "none";
                optionsEaseBack.style.display = "flex";
                optionsEaseElastic.style.display = "none";
                tweenOptionsEase = TweenMax.from(optionsEaseBack, 2, {
                    backgroundColor: "#00b700",
                    ease: Power4.easeOut
                });
                break;
            case "Elastic":
                selectEaseDirTweenmax.disabled = false;
                optionsEaseRough.style.display = "none";
                optionsEaseSlowMo.style.display = "none";
                optionsEaseStepped.style.display = "none";
                optionsEaseBack.style.display = "none";
                optionsEaseElastic.style.display = "flex";
                tweenOptionsEase = TweenMax.from(optionsEaseElastic, 2, {
                    backgroundColor: "#00b700",
                    ease: Power4.easeOut
                });
                break;
            default:
                selectEaseDirTweenmax.disabled = false;
                optionsEaseRough.style.display = "none";
                optionsEaseSlowMo.style.display = "none";
                optionsEaseStepped.style.display = "none";
                optionsEaseBack.style.display = "none";
                optionsEaseElastic.style.display = "none";
                break;
        }
    });

    selectTypeEaseTweenmax.addEventListener("change", function (e) {

        var valeur = selectTypeEaseTweenmax.value;

        switch (valeur) {
            case "bezier":
                inputsEaseGreensock.style.display = "none";
                inputsEaseBezier.style.display = "flex";
                tweenInputsReg = TweenMax.to(groupeInputsReg, 1, {
                    height: "200px",
                    ease: Power4.easeOut
                });
                btnStartTweenmax.disabled = false;

                break;
            case "greensock":
                inputsEaseGreensock.style.display = "flex";
                inputsEaseBezier.style.display = "none";
                tweenInputsReg = TweenMax.to(groupeInputsReg, 1, {
                    height: "200px",
                    ease: Power4.easeOut
                });
                btnStartTweenmax.disabled = false;
                break;
            default:
                inputsEaseGreensock.style.display = "none";
                inputsEaseBezier.style.display = "none";
                tweenInputsReg = TweenMax.to(groupeInputsReg, 1, {
                    height: "0",
                    ease: Power4.easeOut
                });
                btnStartTweenmax.disabled = true;
                break;
        }
    });
    //--------------------------------------------------------------------------
});