
"use strict";

// O'quvchi ismi
const welcomeForm = document.getElementById("welcomeForm");
const studentName = document.getElementById("studentName");
const welcomeMessage = document.getElementById("welcomeMessage");

welcomeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = studentName.value.trim();

    if (!name) {
        welcomeMessage.textContent = "Iltimos, ismingni kirit!";
        return;
    }

    welcomeMessage.textContent =
        `Xush kelibsan, ${name}! Bilim olishni boshlaymiz!`;

    document.getElementById("courses").scrollIntoView({
        behavior: "smooth"
    });
});


// Fanlar va dars ma'lumotlari
const courses = {
    "Matematika": {
        title: "Matematika darsi",
        topic: "Matematikaning asoslari",
        description: "Sonlar va amallarni o'rganamiz.",
        text: "Qo'shish, ayirish, ko'paytirish va bo'lish amallarini mashq qil. Masalan: 12 + 8 = 20."
    },

    "Informatika": {
        title: "Informatika darsi",
        topic: "HTML nima?",
        description: "Veb-sayt yaratishning ilk qadami.",
        text: "HTML veb-sahifaning tuzilishini yaratadi. CSS uning ko'rinishini bezaydi, JavaScript esa interaktivlik qo'shadi."
    },

    "Ingliz tili": {
        title: "Ingliz tili darsi",
        topic: "Ingliz tilidagi salomlashish",
        description: "Oddiy inglizcha so'zlarni o'rganamiz.",
        text: "Hello — Salom. How are you? — Qalaysan? Thank you — Rahmat. Bu iboralarni ovoz chiqarib takrorlab mashq qil."
    },

    "Tabiiy fanlar": {
        title: "Tabiiy fanlar darsi",
        topic: "Quyosh tizimi",
        description: "Koinot va sayyoralar bilan tanishamiz.",
        text: "Quyosh tizimida 8 ta sayyora bor. Yer — Quyoshdan uchinchi sayyora. Quyosh esa yulduz hisoblanadi."
    }
};

const courseButtons = document.querySelectorAll(".course-button");

courseButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const courseName = button.dataset.course;
        const course = courses[courseName];

        if (!course) return;

        document.getElementById("lessonTitle").textContent =
            course.title;

        document.getElementById("lessonDescription").textContent =
            course.description;

        document.getElementById("lessonTopic").textContent =
            course.topic;

        document.getElementById("lessonText").textContent =
            course.text;

        // Hozircha haqiqiy video ulanmagan.
        // Fan tanlanganda oldingi video maydoni yopiladi.
        const videoContainer = document.getElementById("lessonVideo");
        videoContainer.replaceChildren();
        videoContainer.hidden = true;

        document.getElementById("lesson").scrollIntoView({
            behavior: "smooth"
        });
    });
});


// Mini-test savollari
const questions = [
    {
        question: "HTML nimani yaratish uchun ishlatiladi?",
        options: [
            "Veb-sahifa tuzilishini",
            "Faqat musiqa yozishni",
            "Faqat rasm chizishni",
            "Kompyuterni ta'mirlashni"
        ],
        correct: 0
    },
    {
        question: "5 × 6 nechaga teng?",
        options: [
            "11",
            "25",
            "30",
            "56"
        ],
        correct: 2
    },
    {
        question: "'Apple' so'zining o'zbekcha tarjimasi nima?",
        options: [
            "Kitob",
            "Olma",
            "Maktab",
            "Qalam"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("questionNumber");
const quizScore = document.getElementById("quizScore");
const questionText = document.getElementById("questionText");
const answerOptions = document.getElementById("answerOptions");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestion = document.getElementById("nextQuestion");
const restartQuiz = document.getElementById("restartQuiz");

function showQuestion() {
    const question = questions[currentQuestion];

    answered = false;

    questionNumber.textContent =
        `${currentQuestion + 1}-savol / ${questions.length}`;

    quizScore.textContent = `Ball: ${score}`;
    questionText.textContent = question.question;
    quizFeedback.textContent = "";
    quizFeedback.className = "";

    nextQuestion.hidden = true;
    restartQuiz.hidden = true;
    answerOptions.replaceChildren();

    question.options.forEach(function (option, index) {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "answer-option";
        button.textContent = option;

        button.addEventListener("click", function () {
            checkAnswer(index);
        });

        answerOptions.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const question = questions[currentQuestion];
    const buttons = answerOptions.querySelectorAll("button");

    buttons.forEach(function (button, index) {
        button.disabled = true;

        if (index === question.correct) {
            button.classList.add("correct");
        }
    });

    if (selectedIndex === question.correct) {
        score++;

        quizFeedback.textContent =
            "Barakalla! To'g'ri javob! 🎉";

        quizFeedback.className = "success";
    } else {
        buttons[selectedIndex].classList.add("incorrect");

        quizFeedback.textContent =
            `Bu safar xato. To'g'ri javob: ${
                question.options[question.correct]
            }`;

        quizFeedback.className = "error";
    }

    quizScore.textContent = `Ball: ${score}`;

    if (currentQuestion < questions.length - 1) {
        nextQuestion.hidden = false;
    } else {
        restartQuiz.hidden = false;

        questionNumber.textContent = "Test yakunlandi";

        quizFeedback.textContent +=
            ` Yakuniy natija: ${score}/${questions.length} ball.`;

        if (score === questions.length) {
            quizFeedback.textContent +=
                " Ajoyib natija!";
        }
    }
}

nextQuestion.addEventListener("click", function () {
    if (!answered) return;

    currentQuestion++;
    showQuestion();
});

restartQuiz.addEventListener("click", function () {
    currentQuestion = 0;
    score = 0;
    showQuestion();
});

// Testni ishga tushirish
showQuestion();
