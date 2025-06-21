
        const questions = [
            {
                question: "What is the capital of England?",
                answers: [
                    { text: "Newcastle", correct: false },
                    { text: "Manchester", correct: false },
                    { text: "London", correct: true },
                    { text: "Wales", correct: false }
                ]
            },
            {
                question: "What is the name of the current Pope?",
                answers: [
                    { text: "Pope Leo XIV", correct: true },
                    { text: "Pope John Paul", correct: false },
                    { text: "Pope Francis", correct: false },
                    { text: "Pope Benedict XVI", correct: false }
                ]
            },
            {
                question: "What is the tallest building?",
                answers: [
                    { text: "Merdeka", correct: false },
                    { text: "Shanghai", correct: false },
                    { text: "Ping An Finance Center", correct: false },
                    { text: "Burj Khalifa", correct: true }
                ]
            },
            {
                question: "What is the hottest country?",
                answers: [
                    { text: "France", correct: false },
                    { text: "Canada", correct: false },
                    { text: "Kuwait", correct: true },
                    { text: "Wales", correct: false }
                ]
            },
             {
                question: "Who is the Prime Minister?",
                answers: [
                    { text: "Keir Starmer", correct: true },
                    { text: "Barak Obama", correct: false },
                    { text: "IM HIM", correct: false },
                    { text: "LET HIM COOK", correct: false }
                ]
            },
             {
                question: "Who is the Fastest Runner?",
                answers: [
                    { text: "Usian Bolt", correct: true },
                    { text: "ME", correct: true },
                    { text: "DJ KHALID", correct: false },
                    { text: "ASHTON HALL", correct: false }
                ]
            },
              {
                question: "Who is the Creator of the world?",
                answers: [
                    { text: "Allah", correct: true },
                    { text: "SATAN?", correct: false },
                    { text: "God", correct: true },
                    { text: "You", correct: false }
                ]
            },
        ];

        const questionElement = document.getElementById("question");
        const answerButton = document.getElementById("answer-buttons");
        const nextButton = document.getElementById("next-btn");
        console.log(answerButton);

        let currentIndexQuestion = 0;
        let score = 0;

        function startQuiz() {
            currentIndexQuestion = 0;
            score = 0;
            nextButton.innerHTML = "Next";
            nextButton.style.display = "none";
            showQuestion();
        }

        function showQuestion() {
            resetState();
            if (currentIndexQuestion >= questions.length) {
                questionElement.innerHTML = `Quiz Completed! Your score: ${score}/${questions.length}`;
                answerButton.innerHTML = "";
                nextButton.innerHTML = "Restart";
                nextButton.style.display = "block";
                return;
            }

            let currentQuestion = questions[currentIndexQuestion];
            let questionNum = currentIndexQuestion + 1;
            questionElement.innerHTML = `${questionNum}. ${currentQuestion.question}`;

            currentQuestion.answers.forEach(answer => {
                const button = document.createElement("button");
                button.innerHTML = answer.text;
                button.classList.add("btn");
                answerButton.appendChild(button);
                if (answer.correct) {
                    button.dataset.correct = answer.correct;
                }
                button.addEventListener("click", selectAnswer);
            });
        }

        function resetState() {
            nextButton.style.display = "none";
            while (answerButton.firstChild) {
                answerButton.removeChild(answerButton.firstChild);
            }
        }

        function selectAnswer(e) {
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === "true";
            if (isCorrect) {
                selectedBtn.classList.add("correct");
                score++;
            } else {
                selectedBtn.classList.add("incorrect");
                // Highlight the correct answer
                Array.from(answerButton.children).forEach(button => {
                    if (button.dataset.correct === "true") {
                        button.classList.add("correct");
                    }
                });
            }
            // Disable all buttons to prevent further clicks
            Array.from(answerButton.children).forEach(button => {
                button.disabled = true;
            });
            nextButton.style.display = "block";
        }

        function handleNextButton() {
            currentIndexQuestion++;
            if (currentIndexQuestion < questions.length) {
                showQuestion();
            } else {
                showQuestion(); // Will display final score
            }
        }

        nextButton.addEventListener("click", () => {
            if (currentIndexQuestion >= questions.length) {
                startQuiz(); // Restart quiz
            } else {
                handleNextButton();
            }
        });

        startQuiz();