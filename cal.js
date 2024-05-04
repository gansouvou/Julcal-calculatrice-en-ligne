
function touche1(x) {
    var ko = x.value;
    var ecran = document.getElementById("cal");
    ecran.value += ko;
}

function resultat() {
    ecran = document.getElementById("cal");
    ecran.value = eval(ecran.value);
}

function effacer() {
    ecran = document.getElementById("cal");
    ecran.value = "";
}


function fermer() {
    window.close();
}

function racine() {
    ecran = document.getElementById("cal");
    var resultat = Math.sqrt(ecran.value);
    ecran.value = resultat;
}

function decimal(x) {
    ecran = document.getElementById("cal");
    ecran.value += x;
}

function effacer1() {
    ecran = document.getElementById("cal");
    ecran.value = 0;

}

function cleanonebyone() {
    var ecran = document.getElementById("cal").value;
    document.getElementById("cal").value = ecran.substring(0, ecran.length - 1);

}

function carrée() {
    ecran = document.getElementById("cal");
    ecran.value = ecran.value * ecran.value;
}

function pourcentage() {
    var ecran = document.getElementById("cal");
    ecran.value = (ecran.value) / 100 ;
}

function log() {
    ecran = document.getElementById("cal");
    var resultat = Math.log(ecran.value);
    ecran.value = resultat;
}

function expo() {
    ecran = document.getElementById("cal");
    var resultat = Math.exp(ecran.value);
    ecran.value = resultat;
}

function py() {
    ecran = document.getElementById("cal");
    var resultat = Math.PI += " ";
    ecran.value += resultat;
}

function inverse() {
    var ecran = document.getElementById("cal");
    ecran.value = 1 / (ecran.value);
}