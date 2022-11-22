import { WORDS } from "./words.js";
import myJson from './char.json' assert {type: 'json'};

const NUMBER_OF_GUESSES = 3;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(rightGuessString)


//TODO:Reformat status question to be a radio button select

//TODO: Different question types should have different graphics for success/fail

let answersFinal = {}


setAnswer()

function initPatient() {
    let patient = myJson[Math.floor(Math.random() * myJson.length)];
    const status = patient['formatted-data']['Status'];
    //const patientName = patient.name;
    const diagnosis = patient['formatted-data']['Diagnosis'];
    const treatment = patient['formatted-data']['Treatment'];
    //const season = patient['formatted-data']['Seasons'];
    let imageLink = patient['image'];
    let answers = {
        'status': status,
        'treatment': treatment,
        'diagnosis': diagnosis,
        //  'season': season,
        'imageLink': imageLink
    }
    
    answersFinal = answers
    console.log(answers);
    console.log(typeof answers)
    return answers
}

function setAnswer() {
    document.getElementById('answerKey').hidden = true

    let propic = document.getElementById('propic')
    const correctanswers = initPatient()
    console.log(correctanswers)
    for (const key in correctanswers) {
        console.log(key,correctanswers[key])
        if (!correctanswers[key]){
            setAnswer()
        }
        else{

        }
    }
    // let req = new XMLHttpRequest();
    //console.log(imageLink)
    let endingIndex = correctanswers['imageLink'].lastIndexOf('.png') + 4;
    if (endingIndex == 3){
        endingIndex = correctanswers['imageLink'].lastIndexOf('.jpg') + 4;
    }
    console.log('Ending Index', endingIndex)
    const parsedUrl = correctanswers['imageLink'].slice(0,endingIndex);
    
    propic.src = parsedUrl
    return correctanswers
}

function checkAnswer() {
    let validated = validateGuesses();
    if (!validated) {
        
        return false
    }
    let guessValues = getGuesses()

    const keyCheck ={
        status: false,
        diagnosis: false
    }

    for (const answerKey in answersFinal) {
        console.log(guessValues[answerKey])
        console.log(answersFinal[answerKey])
        if (guessValues[answerKey] == answersFinal[answerKey]) {
            console.log(`${answerKey} Correct`)
            keyCheck[answerKey] = true
        }
        else {
            console.log(`${answerKey} Incorrect`)
        }
    }

    
    document.getElementById('status-answer').innerHTML = answersFinal['status']
    document.getElementById('diagnosis-answer').innerHTML = answersFinal['diagnosis']
    document.getElementById('treatment-answer').innerHTML = answersFinal['treatment']

    document.getElementById('answerKey').removeAttribute('hidden');

    console.log(answersFinal);

    document.getElementById('playAgain').style.display = 'block';   

}





document.getElementById("checkAnswer").addEventListener("click", checkAnswer)
document.getElementById('playAgain').addEventListener('click',playAgain)

let guessFields = document.getElementsByClassName('guess-field')

function playAgain(){
    let choices = document.getElementsByName('status-choice')
    for (let i =0; i< choices.length; i++){
        choices[i].checked = false
    }
    

    document.getElementById('diagnosis').value = '';
    document.getElementById('treatment').value = '';
    document.getElementById('playAgain').style.display = 'none';

    setAnswer()

    document.getElementById('status-answer').hidden = true
    document.getElementById('diagnosis-answer').hidden = true
    document.getElementById('treatment-answer').hidden = true

    
    
}



document.getElementById('game-form').addEventListener('keypress',function(e){
    if (e.code == 'Enter'){
        e.preventDefault()
        document.getElementById("checkAnswer").click();
    }
})
// guesses.forEach(item => {
//     item.addEventListener("keypress", function (e) {
//         console.log(e)
//         if (e.code === 'Enter') {

//             document.getElementById("checkAnswer").click();
//         }
//     });
// });

////



//document.getElementById("validateGuesses").addEventListener("click",validateGuesses)

function validateGuesses() {
    const submission = getGuesses()
    if (!submission.status){
        alert('Missing Status Guess')}
    if (!submission.diagnosis) {
        alert('Missing Diagnosis')
    }
    if (!submission.treatment){
        alert('Missing Treatment')
    }
    
    if (submission.status && submission.diagnosis && submission.treatment){
        return true
    }
    else {
        return false
    }

}


function getGuesses() {
    let radios = document.getElementsByName('status-choice');
    let guessStatus;
    for (const node in Object.entries(radios)){
        
        if (radios[node].checked == true){
            
            guessStatus = radios[node].value
        }
        else{

        }
    }
    if (!guessStatus){
        guessStatus = undefined;
        
    }

    let guessValues = {
        'status': guessStatus,
        'treatment': guessFields['treatment'].value,
        'diagnosis': guessFields['diagnosis'].value,
        //'season': guessFields['season']
    }


    console.log(guessValues)
    return guessValues
}




const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        // const node = document.querySelector(element);
        const node = element
        node.style.setProperty('--animate-duration', '0.3s');

        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });