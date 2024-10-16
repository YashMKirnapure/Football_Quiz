const questions = 
[
    {
        question : "Kevin De Bruyne plays for which PL club? ",
        answers : [
            {text:"FC Barcelona",correct:false},
            {text:"Manchester City",correct:true},
            {text:"Manchester United",correct:false},
            {text:"Borussia Dortmund",correct:false},
        ]
    },
    {
        question : "Which club has never won the UCL? ",
        answers : [
            {text:"Real Madrid",correct:false},
            {text:"Bayern Munich",correct:false},
            {text:"PSG",correct:true},
            {text:"Liverpool",correct:false},
        ]        
    },
    {
        question : "Which of the following is not a CenterBack? ",
        answers : [
            {text:"Marcelo ",correct:false},
            {text:"Toni Kroos",correct:true},
            {text:"Maldini ",correct:false},
            {text:"Puyol ",correct:false},
        ]        
    },
    {
        question : "Cristiano Ronaldo hasn't played for which club? ",
        answers : [
            {text:"Real Madrid",correct:false},
            {text:"Juventus",correct:false},
            {text:"Manchester United",correct:false},
            {text:"Chelsea",correct:true},
        ]        
    },
    {
        question : "When did Sir Alex Ferguson retire? ",
        answers : [
            {text:"2013",correct:true},
            {text:"2010",correct:false},
            {text:"2015",correct:false},
            {text:"2012",correct:false},
        ]        
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz()
{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

const showQuestion =()=>
{
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer=>
    {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        // className is btn for button 
        answerButton.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
};

function resetState()
{
    nextButton.style.display = "none";
    while(answerButton.firstChild)
    {
        answerButton.removeChild(answerButton.firstChild);
        // It will remove all the prev. ans
    }
}

function selectAnswer(e)
{
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct === "true")
        {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore()
{
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
};

function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();   
    }
    else
    {
        showScore();
    }
};

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else
    {
        startQuiz();
    }
});

startQuiz();