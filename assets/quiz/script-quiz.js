

const quizData = [
    {
        question: 'How old is Jonathan?',
        a: '22',
        b: '27',
        c: '31',
        d: '36',
        correct: 'c'
    },
    {
        question: 'What is the most used programming language in 2022?',
        a: 'Java',
        b: 'Python',
        c: 'C#',
        d: 'JavaScript',
        correct: 'b'
    },
    {
        question: 'What state is Yellowstone in?',
        a: 'Wyoming',
        b: 'California',
        c: 'Oregon',
        d: 'Florida',
        correct: 'a'
    },
    {
        question: 'What movie won Best Picture in 2022?',
        a: 'West Side Story',
        b: 'King Richard',
        c: 'Nightmare Alley',
        d: 'CODA',
        correct: 'd'
    },
    {
        question: 'How many weeks are in a year?',
        a: '50',
        b: '52',
        c: '365',
        d: '180',
        correct: 'b'
    },
    {
        question: 'What year was JavaScript launched?',
        a: '1996',
        b: '1995',
        c: '1994',
        d: 'none of the above',
        correct: 'c'
    }
]

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById("submit");
const answeredCorrectly = 0;

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();

    // Grabs a question from the array
    const currentQuizData = quizData[currentQuiz];
    // sets the text to the question
    questionEl.innerText = currentQuizData.question;

    // sets the options a-d
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function getSelected() {
    let answer = undefined;

    answerEls.forEach(answerEl => {
        if(answerEl.checked){
            answer = answerEl.id;
        }
    });
    return answer;
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
    
}

submitBtn.addEventListener('click', () => { 
    // Grab selected answer
    const answer = getSelected();

    if(answer){

        // if correct increase score
        if(answer === quizData[currentQuiz].correct){
            score++;
        }

        currentQuiz++;
        //checks if there are questions left in the array
        if(currentQuiz <quizData.length){
            loadQuiz();
        }
        else {
            // replaces all text inside of #quiz with the following msg
            quiz.innerHTML = `<h2>Your score on the quiz is ${score}/${quizData.length} questions.</h2><button onclick = "location.reload()">Reload</button>`;
        }
    }
})

