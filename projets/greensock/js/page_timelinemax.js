window.addEventListener("load", function load() {
    window.removeEventListener("load", load, false);

    //    var contenant = document.getElementById('contenant');
    //    Ps.initialize(contenant, {
    //        wheelSpeed: 1,
    //        wheelPropagation: true,
    //        minScrollbarLength: 20
    //    });
    //    Ps.update(contenant);

    //Fonctions de séléection d'éléments dud DOM.
    var selection = function (elemRecherche) {
        return document.querySelector(elemRecherche);
    }
    var selections = function (elemRecherche) {
        return document.querySelectorAll(elemRecherche);
    }

    CSSPlugin.defaultTransformPerspective = 200;

    //--------------------------------------------------------------------------
    //anim TimelineMax

    var btnJouer = selection(".playTimelinemax");
    var btnPause = selection(".pauseTimelinemax");
    var sliderProg = selection(".progTimelinemax");
    var btnRejouer = selection(".rejouerTimelinemax");
    var btnInverser = selection(".reverseTimelinemax");
    var sliderVitesse = selection(".vitesseTimelinemax");
    var btnResetVitesse = selection(".resetVitesseTimelinemax");

    var btnResetTimelinemax = selection(".resetTimelinemax");
    var btnStartTimelinemax = selection(".startTimelinemax");

    var affichageProgression = selection(".affichageProgression");

    var objAnim1Timelinemax = selection(".objAnim1Timelinemax");
    var objAnim2Timelinemax = selection(".objAnim2Timelinemax");
    var objAnim3Timelinemax = selection(".objAnim3Timelinemax");

    var inputDureeT1 = selection(".dureeT1Timelinemax");
    var inputDureeT2 = selection(".dureeT2Timelinemax");
    var inputDureeT3 = selection(".dureeT3Timelinemax");

    var inputOffsetT1 = selection(".offsetT1Timelinemax");
    var inputOffsetT2 = selection(".offsetT2Timelinemax");
    var inputOffsetT3 = selection(".offsetT3Timelinemax");

    var selectEaseT1 = selection(".easeT1Timelinemax");
    var selectEaseT2 = selection(".easeT2Timelinemax");
    var selectEaseT3 = selection(".easeT3Timelinemax");

    var tween1Timelinemax;
    var tween2Timelinemax;
    var tween3Timelinemax;

    var timeline;

    //START
    selection(".startTimelinemax").addEventListener("click", function (e) {

        if (!timeline || !timeline.isActive()) {

            //Prend les valeurs des inputs ou donne une valeur par défaut si vide / illégal.
            var dureeT1 = parseFloat(inputDureeT1.value) || 0.1;
            var easeT1 = selectEaseT1.value || "Power0";
            var offsetT1 = inputOffsetT1.value;

            var dureeT2 = parseFloat(inputDureeT2.value) || 0.1;
            var easeT2 = selectEaseT2.value || "Power0";
            var offsetT2 = inputOffsetT2.value;

            var dureeT3 = parseFloat(inputDureeT3.value) || 0.1;
            var easeT3 = selectEaseT3.value || "Power0";
            var offsetT3 = inputOffsetT3.value;

            //Propriétés à tweener
            var prop1T1 = selection(".t1p1Timelinemax").value;
            var prop2T1 = selection(".t1p2Timelinemax").value;
            var prop3T1 = selection(".t1p3Timelinemax").value;

            var val1T1 = selection(".t1v1Timelinemax").value;
            var val2T1 = selection(".t1v2Timelinemax").value;
            var val3T1 = selection(".t1v3Timelinemax").value;

            var prop1T2 = selection(".t2p1Timelinemax").value;
            var prop2T2 = selection(".t2p2Timelinemax").value;
            var prop3T2 = selection(".t2p3Timelinemax").value;

            var val1T2 = selection(".t2v1Timelinemax").value;
            var val2T2 = selection(".t2v2Timelinemax").value;
            var val3T2 = selection(".t2v3Timelinemax").value;

            var prop1T3 = selection(".t3p1Timelinemax").value;
            var prop2T3 = selection(".t3p2Timelinemax").value;
            var prop3T3 = selection(".t3p3Timelinemax").value;

            var val1T3 = selection(".t3v1Timelinemax").value;
            var val2T3 = selection(".t3v2Timelinemax").value;
            var val3T3 = selection(".t3v3Timelinemax").value;

            switch (easeT1) {
                case "Power0":
                    easeT1 = Power0.easeInOut;
                    break;
                case "Power1":
                    easeT1 = Power1.easeInOut;
                    break;
                case "Power2":
                    easeT1 = Power2.easeInOut;
                    break;
                case "Power3":
                    easeT1 = Power3.easeInOut;
                    break;
                case "Power4":
                    easeT1 = Power4.easeInOut;
                    break;
                case "Back":
                    easeT1 = Back.easeInOut;
                    break;
                case "Elastic":
                    easeT1 = Elastic.easeOut;
                    break;
                case "Bounce":
                    easeT1 = Bounce.easeOut;
                    break;
                case "Rough":
                    easeT1 = RoughEase.ease;
                    break;
                case "SlowMo":
                    easeT1 = SlowMo.ease.config(0.7, 0.7, false);
                    break;
                case "Stepped3":
                    easeT1 = SteppedEase.config(3);
                    break;
                case "Stepped6":
                    easeT1 = SteppedEase.config(6);
                    break;
                case "Stepped12":
                    easeT1 = SteppedEase.config(12);
                    break;
                case "Circ":
                    easeT1 = Circ.easeInOut;
                    break;
                case "Expo":
                    easeT1 = Expo.easeInOut;
                    break;
                case "Sine":
                    easeT1 = Sine.easeInOut;
                    break;
            }
            switch (easeT2) {
                case "Power0":
                    easeT2 = Power0.easeInOut;
                    break;
                case "Power1":
                    easeT2 = Power1.easeInOut;
                    break;
                case "Power2":
                    easeT2 = Power2.easeInOut;
                    break;
                case "Power3":
                    easeT2 = Power3.easeInOut;
                    break;
                case "Power4":
                    easeT2 = Power4.easeInOut;
                    break;
                case "Back":
                    easeT2 = Back.easeInOut;
                    break;
                case "Elastic":
                    easeT2 = Elastic.easeOut;
                    break;
                case "Bounce":
                    easeT2 = Bounce.easeOut;
                    break;
                case "Rough":
                    easeT2 = RoughEase.ease;
                    break;
                case "SlowMo":
                    easeT2 = SlowMo.ease.config(0.7, 0.7, false);
                    break;
                case "Stepped3":
                    easeT2 = SteppedEase.config(3);
                    break;
                case "Stepped6":
                    easeT2 = SteppedEase.config(6);
                    break;
                case "Stepped12":
                    easeT2 = SteppedEase.config(12);
                    break;
                case "Circ":
                    easeT2 = Circ.easeInOut;
                    break;
                case "Expo":
                    easeT2 = Expo.easeInOut;
                    break;
                case "Sine":
                    easeT2 = Sine.easeInOut;
                    break;
            }
            switch (easeT3) {
                case "Power0":
                    easeT3 = Power0.easeInOut;
                    break;
                case "Power1":
                    easeT3 = Power1.easeInOut;
                    break;
                case "Power2":
                    easeT3 = Power2.easeInOut;
                    break;
                case "Power3":
                    easeT3 = Power3.easeInOut;
                    break;
                case "Power4":
                    easeT3 = Power4.easeInOut;
                    break;
                case "Back":
                    easeT3 = Back.easeInOut;
                    break;
                case "Elastic":
                    easeT3 = Elastic.easeOut;
                    break;
                case "Bounce":
                    easeT3 = Bounce.easeOut;
                    break;
                case "Rough":
                    easeT3 = RoughEase.ease;
                    break;
                case "SlowMo":
                    easeT3 = SlowMo.ease.config(0.7, 0.7, false);
                    break;
                case "Stepped3":
                    easeT3 = SteppedEase.config(3);
                    break;
                case "Stepped6":
                    easeT3 = SteppedEase.config(6);
                    break;
                case "Stepped12":
                    easeT3 = SteppedEase.config(12);
                    break;
                case "Circ":
                    easeT3 = Circ.easeInOut;
                    break;
                case "Expo":
                    easeT3 = Expo.easeInOut;
                    break;
                case "Sine":
                    easeT3 = Sine.easeInOut;
                    break;
            }

            btnResetTimelinemax.disabled = true;

            var propsTween1 = {};
            var propsTween2 = {};
            var propsTween3 = {};

            if (prop1T1 && val1T1) {
                propsTween1[prop1T1] = val1T1;
            }
            if (prop2T1 && val2T1) {
                propsTween1[prop2T1] = val2T1;
            }
            if (prop3T1 && val3T1) {
                propsTween1[prop3T1] = val3T1;
            }
            propsTween1.ease = easeT1;

            if (prop1T2 && val1T2) {
                propsTween2[prop1T2] = val1T2;
            }
            if (prop2T2 && val2T2) {
                propsTween2[prop2T2] = val2T2;
            }
            if (prop3T2 && val3T2) {
                propsTween2[prop3T2] = val3T2;
            }
            propsTween2.ease = easeT2;

            if (prop1T3 && val1T3) {
                propsTween3[prop1T3] = val1T3;
            }
            if (prop2T3 && val2T3) {
                propsTween3[prop2T3] = val2T3;
            }
            if (prop3T3 && val3T3) {
                propsTween3[prop3T3] = val3T3;
            }
            propsTween3.ease = easeT3;

            if (offsetT1.trim() == "") {
                offsetT1 = null;
            }
            if (offsetT2.trim() == "") {
                offsetT2 = null;
            }
            if (offsetT3.trim() == "") {
                offsetT3 = null;
            }
            
            timeline = new TimelineMax({
                onUpdate: afficherProgression,
                onComplete: resetTweenTimelinemaxActif
            });
            
            timeline
                .to(objAnim1Timelinemax, dureeT1, propsTween1, offsetT1)
                .to(objAnim2Timelinemax, dureeT2, propsTween2, offsetT2)
                .to(objAnim3Timelinemax, dureeT3, propsTween3, offsetT3);
            
            sliderVitesse.value = (timeline.timeScale() * 50);
        }
    });

    function afficherProgression() {

        if (timeline && timeline.isActive()) {
            affichageProgression.innerHTML = (timeline.totalProgress() * 100).toFixed(0) + " %";
            sliderProg.value = (timeline.totalProgress() * 100);
        }
    }

    function resetTweenTimelinemaxActif() {

        if (timeline && !timeline.isActive()) {
            btnResetTimelinemax.disabled = false;
        }
    }

    //SCRUB TIMELINE
    sliderProg.addEventListener("input", function (e) {

        if (timeline) {
            if (timeline.isActive()) {
                timeline.pause();
            }
            timeline.totalProgress(sliderProg.value / 100);
            affichageProgression.innerHTML = (timeline.totalProgress() * 100).toFixed(0) + " %";
            btnPause.value = "reprendre";
        }
    });
    //JOUER TIMELINE
    btnJouer.addEventListener("click", function (e) {

        if (timeline) {
            timeline.play();
            btnPause.value = "pause";
        }
    });
    //PAUSE TIMELINE
    btnPause.addEventListener("click", function (e) {

        if (timeline) {
            if (timeline.isActive()) {
                timeline.pause();
                btnPause.value = "reprendre";
            }
            else {
                timeline.resume();
                btnPause.value = "pause";
            }
        }
    });
    //REJOUER TIMELINE
    btnRejouer.addEventListener("click", function (e) {

        if (timeline) {
            timeline.restart();
            btnPause.value = "pause";
        }
    });
    //INVERSER TIMELINE
    btnInverser.addEventListener("click", function (e) {

        if (timeline) {
            timeline.reverse();
            btnPause.value = "pause";
        }
    });
    
    //CHANGER VITESSE TIMELINE
    sliderVitesse.addEventListener("input", function (e) {

        if (timeline) {
            timeline.timeScale(sliderVitesse.value / 50);
        }
    });
    
    //RESET VITESSE TIMELINE
    btnResetVitesse.addEventListener("click", function (e) {

        if (timeline) {
            timeline.timeScale(1);
            sliderVitesse.value = 50;
        }
    });

    //RESET
    btnResetTimelinemax.addEventListener("click", function (e) {

        if (timeline && !timeline.isActive()) {

            TweenMax.set(objAnim1Timelinemax, {
                clearProps: "all"
            });
            TweenMax.set(objAnim2Timelinemax, {
                clearProps: "all"
            });
            TweenMax.set(objAnim3Timelinemax, {
                clearProps: "all"
            });
            btnResetTimelinemax.disabled = true;
            affichageProgression.innerHTML = "0 %";
            sliderProg.value = "0";
            timeline.kill();
            timeline = null;
        }
    });

    //--------------------------------------------------------------------------
});