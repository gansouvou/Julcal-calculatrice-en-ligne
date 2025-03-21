
let calculator = document.querySelector(".caculator");

var menu1 = document.querySelector('.menu1');
var menu = document.querySelector('.menu');

//let dev = document.querySelector(".dev");
const main = document.getElementById("main");
let touches = document.querySelector(".touches");


// let plus = document.querySelector(".plus");

/*
//let jeu = document.querySelector(".jeu");

let btn = document.getElementById("btn");
let btntext = document.getElementById("btntext");
let btnimg = document.getElementById("btnimg");
*/

const ecran = document.getElementById("cal");

//menu
menu1.addEventListener('click', function(){
    menu.classList.toggle('showmenu')
});

// ecran

function cleanonebyone() {
    var content = ecran.value;
    ecran.value = content.substring(0, content.length - 1);
}

let lastResult = 0;

function egal() {
    try {
        lastResult = eval(ecran.value);
        ecran.value = lastResult;
    }catch (e) {
        alert("Expression invalide");
    }

}

function Ans() {
    ecran.value += lastResult;
}


// definition des fonctions 


// denombrement

function facto(n){
    if(n == 0){
        return 1;
    }else{
        return n * facto(n-1);
    }
}

function permuto(n,r){
    if ( n < r || n < 0 || r < 0) {
        return "Entrée invalide";
    }
    return facto(n) / facto(n-r);
}

function combo(n,r) {

    if ( n < r || n < 0 || r < 0) {
        return "Entrée invalide";
    }
    return permuto(n,r) / facto(r)
    // return math.combinations(n, r);
} 



// probabilité

function moyenne(suite) {
    var sum = 0;
    const l = suite.length;
    for (let i = 0; i < l; i += 1) {
        sum += suite[i];
    }
    return sum/l;
}

function variance(arr) {
    const m = moyenne(arr);
    const squaredDiffs = arr.map(val => Math.pow(val - m, 2));
    return moyenne(squaredDiffs);
}

function ecart(arr) {
    return Math.sqrt(variance(arr));
}


// nombre complexes

function modulo(complexNumber) {
    // return Math.sqrt(n*n + r*r);
     let z = math.complex(complexNumber);
     return math.abs(z);
}

function argo(complexNumber){
    let z = math.complex(complexNumber);
    return transformeRadianDegre(math.arg(z));
}

function conjugo(complexNumber){
    let z = math.complex(complexNumber);
    return math.conj(z);
}


// conversion

function transformeDegreRadian(a){
    return (a * Math.PI)/180;
}

function transformeRadianDegre(a){
    return (180*a)/Math.PI;
}



// polynome

function derive(f) {
    return math.derivative(f,'x').toString();
}

/*
function primitive(f) {
    return math.integral(f, 'x').toString();
}

function racine(f) {
    return math.roots(f);
}*/


function parsePolynomial(polynomial) {
    polynomial = polynomial.replace(/\s+/g, '');
    const terms = polynomial.match(/[+-]?[^-+]+/g);
    return terms.map(term => {
        const match = term.match(/([+-]?)(\d*)(x(?:\^(\d+))?)?/);
        const sign = match[1] === '-' ? -1 : 1;
        const coefficient = match[2] ? parseInt(match[2]) : 1;
        const power = match[4] ? parseInt(match[4]) : (match[3] ? 1 : 0);
        return { coefficient: sign * coefficient, power };
    });
}

function Primitive(A) {
    const polynomial = parsePolynomial(A);
    const primitive = polynomial.map(term => {
        // const newCoefficient = term.coefficient / (term.power + 1);
        const newPower = term.power + 1;
        if(newPower == 1){
            return `${term.coefficient}x`;
        }
        return `${term.coefficient}/${newPower}x^${newPower}`;
        //return `${newCoefficient}x^${newPower}`;
    }).join(' + ');

    return `${primitive} + C`
}


function calculateRoots(A) {
    const polynomial = parsePolynomial(A);

    const coefficients = new Array(Math.max(...polynomial.map(term => term.power)) + 1).fill(0);
    polynomial.forEach(term => {
        coefficients[coefficients.length - term.power - 1] = term.coefficient;
    });

    const roots = findRoots(coefficients);
    return `${roots.join(', ')}`;
}

function findRoots(coefficients) {

    //  polynômes de degré <= 1
    if (coefficients.length <= 2) {
        return coefficients.length === 2 ? [-coefficients[1] / coefficients[0]] : [];
    }
     
    //  polynômes de degré 2
    else if (coefficients.length === 3) {
        const [a, b, c] = coefficients;
        const discriminant = b * b - 4 * a * c;
        if (discriminant > 0) {
            return [ (-b + Math.sqrt(discriminant)) / (2 * a),    (-b - Math.sqrt(discriminant)) / (2 * a)];
        } else if (discriminant === 0) {
            return [-b / (2 * a)];
        } else if(discriminant < 0){
            return [ "pas de racine réelles" ];
        }
    }

    else{
       return [ "polynôme de degré supérieur à 2"]
    
    /*
    // Utilisation de la méthode de Newton pour des polynômes de degré supérieur
    // Méthode à revoir 
    const maxIterations = 1000;
    const tolerance = 1e-7;
    const derivative = coefficients.slice(0, -1).map((c, i) => c * (coefficients.length - 1 - i));

    function newtonMethod(start) {
        let x = start;
        for (let i = 0; i < maxIterations; i++) {
            const fx = evaluatePolynomial(coefficients, x);
            const fxPrime = evaluatePolynomial(derivative, x);
            const x1 = x - fx / fxPrime;
            if (Math.abs(x1 - x) < tolerance) {
                return x1;
            }
            x = x1;
        }
        return x;
    }

    function evaluatePolynomial(coefficients, x) {
        return coefficients.reduce((sum, c, i) => sum + c * Math.pow(x, coefficients.length - 1 - i), 0);
    }

    const roots = [];
    let root;
    for (let i = 0; i < coefficients.length - 1; i++) {
        root = newtonMethod(i);
        roots.push(root);
        coefficients = deflatePolynomial(coefficients, root);
    }
    return roots;
    
    */
   }
    
}

/*
function deflatePolynomial(coefficients, root) {
    const newCoefficients = [];
    let remainder = coefficients[0];
    newCoefficients.push(remainder);
    for (let i = 1; i < coefficients.length - 1; i++) {
        remainder = coefficients[i] + remainder * root;
        newCoefficients.push(remainder);
    }
    return newCoefficients;
}
*/



// calculs  sur matrices

function transformeMatrix(input) {
    return input.split(';').map(row => row.split(',').map(Number));    
}

function transposeMatrix(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

function determinantMatrix(matrix) {
    if (matrix.length !== matrix[0].length) {
        return "La matrice n'est pas carrée";
    }
    const n = matrix.length;
    if (n === 1) return matrix[0][0];
    if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    let det = 0;
    for (let i = 0; i < n; i++) {
        det += ((i % 2 === 0 ? 1 : -1) * matrix[0][i] * determinantMatrix(minor(matrix, 0, i)));
    }
    return det;
}

function minor(matrix, row, col) {
    return matrix
        .filter((_, i) => i !== row)
        .map(r => r.filter((_, j) => j !== col));
}

function inverseMatrix(matrix) {
    const det = determinantMatrix(matrix);
    if (det === 0 || matrix.length !== matrix[0].length ){
        return "La matrice n'a pas d'inverse.";
    }
    const n = matrix.length;
    const adjugate = [];
    for (let i = 0; i < n; i++) {
        adjugate[i] = [];
        for (let j = 0; j < n; j++) {
            adjugate[i][j] = ((i + j) % 2 === 0 ? 1 : -1) * determinantMatrix(minor(matrix, i, j));
        }
    }
    const transposedAdjugate = transposeMatrix(adjugate);
    return transposedAdjugate.map(row => row.map(value => value / det));
}

function calculTransposeMatrix (A) {
    const matrix = transformeMatrix(A);
    return transposeMatrix(matrix);
}

function calculDeterminantMatrix (A) {
    const matrix = transformeMatrix(A); 
    return determinantMatrix(matrix);
}

function calculInverseMatrix (A) {
    const matrix = transformeMatrix(A); 
    return inverseMatrix(matrix);
}

function addMatrix(matrixA, matrixB) {
    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        return "dimensions incohérentes";
    }

    return matrixA.map((row, i) => row.map((value, j) => value + matrixB[i][j]));
}

function multiplyMatrix(matrixA, matrixB) {
    if (matrixA[0].length !== matrixB.length) {
        return "dimensions incohérentes";
    }

    return matrixA.map((row, i) => matrixB[0].map((_, j) => row.reduce((sum, _, k) => sum + matrixA[i][k] * matrixB[k][j], 0)));
}

function resolveEquation(matrixA, matrixB) {
    const detA = determinantMatrix(matrixA);
    if (detA === 0 || matrixA.length !== matrixA[0].length ){
        return "La matrice A n'est pas inversible.";
    }
    const invA = inverseMatrix(matrixA);
    return multiplyMatrix(invA, matrixB);
}

function calculAddMatrix(A, B) {
    const matrixA = transformeMatrix(A);
    const matrixB = transformeMatrix(B);
    return addMatrix(matrixA, matrixB);
}

function calculMultiplyMatrix(A, B) {
    const matrixA = transformeMatrix(A);
    const matrixB = transformeMatrix(B);
    return multiplyMatrix(matrixA, matrixB);
}

function calculResolveEquation(A, B) {
    const matrixA = transformeMatrix(A);
    const matrixB = transformeMatrix(B);
    return resolveEquation(matrixA, matrixB);
}


// calcul d'âge

        function calculateAge(userdate){

            if(userdate.value == ""){
                return `Entrez une date`;
            }

            userdate.max = new Date().toISOString().split("T")[0];

            let birthDate = new Date(userdate.value);

            let d1 = birthDate.getDate();
            let m1 = birthDate.getMonth() + 1;
            let y1 = birthDate.getFullYear();

            let today = new Date();

            let d2 = today.getDate();
            let m2 = today.getMonth() + 1;
            let y2 = today.getFullYear();

            let d3, m3, y3;
            y3 = y2 - y1;

            if(m2 >= m1){
                m3 = m2 - m1;
            }else{
                y3--;
                m3 = 12 + m2 - m1;
            }

            if(d2 >= d1){
                d3 = d2 -d1;
            }else{
                m3--;
                d3 = getDaysInMonth(y1, m1) + d2 -d1;
            }
            if(m3 < 0){
                m3 = 11;
                y3--;
            }

            return `${y3} ans ${m3} mois et ${d3} jours`;
        }

        function getDaysInMonth(year, month){
            return new Date(year, month, 0).getDate();
        }


// a faire 

/*

calcul de racines de polynome de degré > 2?

convertir les resultats en fraction : surtout les primitives et les matrices

; pour separer les lignes des matrices resultats

*/
