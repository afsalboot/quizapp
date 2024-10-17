const questions = [
    {
        question: "What does 'var' declare in JavaScript?",
        options: ["Function", "Value","Variable", "Object"],
        answer: 2
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: ["React", "Laravel", "Django", "Flask"],
        answer: 0
    },
    {
        question: "What does the '=== operator' do?",
        options: ["Checks equality", "Checks type and value equality", "Checks value only", "Checks if undefined"],
        answer: 1
    },
    {
        question: "What is the correct way to create a function in JavaScript?",
        options: ["function myFunction()", "function:myFunction()", "myFunction() = function", "create myFunction()"],
        answer: 0
    },
    {
        question: "Which keyword is used to define a constant in JavaScript?",
        options: ["var", "let", "const", "constant"],
        answer: 2
    },
    {
        question: "Which method can convert a JSON string into a JavaScript object?",
        options: ["JSON.convert()", "JSON.stringify()", "JSON.toObject()", "JSON.parse()"],
        answer: 3
    },
    {
        question: "What does Boolean(2 + 2 === 4) return?",
        options: ["true", "false", "undefined", "NaN"],
        answer: 0
    },
    {
        question: "How do you create a new array in JavaScript?",
        options: ["var arr = []", "var arr = {}", "var arr = new Array()", "Both A and C"],
        answer: 3
    },
    {
        question: "Which method adds an element to the end of an array?",
        options: ["shift()", "pop()", "push()", "unshift()"],
        answer: 2
    },
    {
        question: "What is the output of typeof NaN?",
        options: ["undefined", "number", "NaN", "object"],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('finish-btn').addEventListener('click', resetQuiz);

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    showQuiz();
}

function showQuiz() {
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('finish-btn').style.display = 'none';
    loadQuestion();
}

function loadQuestion() {
    const { question, options, answer } = questions[currentQuestionIndex];

    document.getElementById('quiz-container').innerHTML = `
        <div class="question">Q${currentQuestionIndex + 1}: ${question}</div>
        <ul class="options">
            ${generateOptionsHTML(options)}
        </ul>
    `;

    const buttons = document.getElementsByClassName('option-button');
    for (let button of buttons) {
        button.addEventListener('click', (e) => handleAnswer(e, answer));
    }
}

function generateOptionsHTML(options) {
    const labels = ['A', 'B', 'C', 'D']; // Array of labels
    return options.map((option, index) => `
        <li>
            <button class="option-button" data-index="${index}">${labels[index]}. ${option}</button>
        </li>
    `).join('');
}

function handleAnswer(event, correctAnswer) {
    const selectedIndex = parseInt(event.target.dataset.index);
    event.target.style.backgroundColor = selectedIndex === correctAnswer ? 'green' : 'red';

    if (selectedIndex === correctAnswer) score++;

    const buttons = document.getElementsByClassName('option-button');
    for (let button of buttons) {
        button.disabled = true;
        if (parseInt(button.dataset.index) === correctAnswer) {
            button.style.backgroundColor = 'green'; // Highlight correct answer
        }
    }

    currentQuestionIndex++;
    setTimeout(() => currentQuestionIndex < questions.length ? loadQuestion() : showResults(), 1000);
}

function showResults() {
    document.getElementById('result-container').innerHTML = `
        <div class="congratulations">Congratulations!</div>
        <div>Your score: <strong>${score} out of ${questions.length}</strong></div>
    `;
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('finish-btn').style.display = 'block';
}

function resetQuiz() {
    document.getElementById('result-container').innerHTML = '';
    document.getElementById('finish-btn').style.display = 'none';
    startQuiz();
}
