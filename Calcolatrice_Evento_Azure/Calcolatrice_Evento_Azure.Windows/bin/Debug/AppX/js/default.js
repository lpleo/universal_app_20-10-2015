// Per un'introduzione a modello vuoto, vedere la seguente documentazione:
// http://go.microsoft.com/fwlink/?LinkID=392286
(function () {
    //"use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var argomenti;
    var nuova;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: questa applicazione è stata appena avviata. Inizializzare
                // l'applicazione qui.
            } else {
                // TODO: questa applicazione è stata riattivata dalla sospensione.
                // Ripristinare lo stato dell'applicazione qui.
            }
            argomenti = args;
            args.setPromise(WinJS.UI.processAll().then(settaPagina()));
        }
    };

    function settaPagina() {
        var i = 0;
        nuova = false;
        var div = document.getElementById("areaNumeri");
        argomenti.setPromise(WinJS.UI.processAll().done(function () {
            div.appendChild(creaAreadiTesto());
            div.innerHTML += "<br /><br />";
            div.appendChild(creaBottone("("));
            div.appendChild(creaBottone(")"));
            div.appendChild(creaBottone("&#8678"))
            div.appendChild(creaBottone("CE"));
        }));
            for (i = 0; i < 14; i++) {
                switch (i) {
                    case 3:
                        argomenti.setPromise(WinJS.UI.processAll().done(function () {
                            div.appendChild(creaBottone("+"));
                            div.appendChild(creaBottone(i + 1));
                        }));
                        break;
                    case 6:
                        argomenti.setPromise(WinJS.UI.processAll().done(function () {
                            div.appendChild(creaBottone("-"));
                            div.appendChild(creaBottone(i + 1));
                        })); 
                        break;
                    case 9:
                        argomenti.setPromise(WinJS.UI.processAll().done(function () {
                            div.appendChild(creaBottone("*"));
                        }));
                        break;
                    case 10:
                        argomenti.setPromise(WinJS.UI.processAll().done(function () {
                            div.appendChild(creaBottone("."));
                        }));
                        break;
                    case 11:
                        argomenti.setPromise(WinJS.UI.processAll().done(function () {
                            div.appendChild(creaBottone(0));
                        }));
                        break;
                    case 12:
                        argomenti.setPromise(WinJS.UI.processAll().done(function () {
                            div.appendChild(creaBottone("="));
                        }));
                        break;
                    case 13:
                        argomenti.setPromise(WinJS.UI.processAll().done(function () {
                            div.appendChild(creaBottone("/"));
                        }));
                        break;
                    default:
                        argomenti.setPromise(WinJS.UI.processAll().done(function () {
                            div.appendChild(creaBottone(i+1));
                        }));
                }
            }
    }

    function creaAreadiTesto() {
        var areaTesto = document.createElement("input");
        areaTesto.setAttribute("type", "text");
        areaTesto.setAttribute("id", "numArea");
        areaTesto.setAttribute("readonly", "readonly");
        return areaTesto;
    }

    function creaBottone(numero) {
        var bottone = document.createElement("button");
        bottone.innerHTML = numero;
        bottone.setAttribute("type", "button");
        argomenti.setPromise(WinJS.UI.processAll().done(function () {
            bottone.onclick = function () { operazione(numero); };
        }));

        return bottone;
    }

    function operazione(num) {
        var testo = document.getElementById("numArea").value;
        if (num == "&#8678") {
            testo = cancellaTesto(testo);
        } else if (num == "=") {
            testo = eseguiOperazioni(testo);
        } else if (num == "CE") {
            testo = cancellaTutto(testo);
        } else {
            testo = aggiungiElementi(testo,num); 
        }

        document.getElementById("numArea").setAttribute("value", testo);
    }

    function cancellaTutto(testo) {
        testo = "";
        return testo;
    }

    function cancellaTesto(testo) {
        if (testo.length > 0) testo = testo.substring(0, testo.length - 1);
        else testo = "";
        return testo
    }

    function eseguiOperazioni(testo) {
        try {
            testo = math.eval(testo);
            nuova = true;
        } catch (Exception) {
            testo = "NaN";
            nuova = true;
        }
        return testo;
    }

    function aggiungiElementi(testo, num) {

        if (nuova) {
            if ((num != "+" && num != "-" && num != "/" && num != "*") || testo== "NaN") {
                testo = num;
                nuova = false;
            } else {
                testo += num;
                nuova=false;
            }
        } else {
            testo += num;
        }
        return testo;
    }

    app.oncheckpoint = function (args) {
        // TODO: questa applicazione sta per essere sospesa. Salvare qui eventuali stati
        // che devono persistere attraverso le sospensioni. È possibile utilizzare l'oggetto
        // WinJS.Application.sessionState, che viene automaticamente
        // salvato e ripristinato in seguito a sospensioni. Se è necessario eseguire
        // un'operazione asincrona prima che l'applicazione venga sospesa, chiamare
        // args.setPromise().
    };

    app.start();
})();