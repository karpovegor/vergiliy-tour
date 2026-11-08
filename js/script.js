document.addEventListener("DOMContentLoaded", function() {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');

    if(quizContainer) {
        const myQuestions = [
            { question: "1. Кто написал картину «Поцелуй», хранящуюся в Бельведере?", answers: { a: "Эгон Шиле", b: "Густав Климт", c: "Альфонс Муха" }, correctAnswer: "b" },
            { question: "2. В каком городе находится музей Хундертвассера?", answers: { a: "Прага", b: "Вена", c: "Брно" }, correctAnswer: "b" },
            { question: "3. Какой дом-музей Франца Кафки есть в Праге?", answers: { a: "У корабля", b: "У золотого колодца", c: "У двух солнц" }, correctAnswer: "a" },
            { question: "4. Кто из этих художников — представитель чешского модерна?", answers: { a: "Густав Климт", b: "Эгон Шиле", c: "Альфонс Муха" }, correctAnswer: "c" },
            { question: "5. Дом-музей какого писателя есть в Вене?", answers: { a: "Роберт Музиль", b: "Франц Кафка", c: "Ярослав Гашек" }, correctAnswer: "a" }
        ];

        function buildQuiz() {
            const output = [];
            myQuestions.forEach((currentQuestion, questionNumber) => {
                const answers = [];
                for (let letter in currentQuestion.answers) {
                    answers.push(`<label><input type="radio" name="question${questionNumber}" value="${letter}"> <b>${letter.toUpperCase()}:</b> ${currentQuestion.answers[letter]}</label>`);
                }
                output.push(`<div class="question">${currentQuestion.question}</div><div class="answers">${answers.join('')}</div>`);
            });
            quizContainer.innerHTML = output.join('');
        }

        function showResults() {
            const answerContainers = quizContainer.querySelectorAll('.answers');
            let numCorrect = 0;
            myQuestions.forEach((currentQuestion, questionNumber) => {
                const answerContainer = answerContainers[questionNumber];
                const selector = `input[name=question${questionNumber}]:checked`;
                const userAnswer = (answerContainer.querySelector(selector) || {}).value;
                if (userAnswer === currentQuestion.correctAnswer) {
                    numCorrect++;
                }
            });
            
            if(numCorrect === myQuestions.length) {
                resultsContainer.innerHTML = `🎉 Идеально! Вы ответили правильно на все ${myQuestions.length} вопросов. <br><br> <strong>Ваш промокод на скидку 5%: KULTURA5</strong>`;
            } else if (numCorrect >= 3) {
                resultsContainer.innerHTML = `Вы ответили правильно на ${numCorrect} из ${myQuestions.length} вопросов. <br><br> <strong>Ваш промокод на скидку 3%: KULTURA3</strong>`;
            } else {
                resultsContainer.innerHTML = `Вы ответили правильно на ${numCorrect} из ${myQuestions.length} вопросов. Попробуйте еще раз, чтобы получить скидку!`;
            }
        }

        buildQuiz();
        submitButton.addEventListener('click', showResults);
    }
});
// Логика для интерактивной доски отзывов
document.addEventListener("DOMContentLoaded", function() {
    const reviewForm = document.getElementById('review-form');
    const reviewsContainer = document.getElementById('reviews-container');

    if (reviewForm) {
        reviewForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Останавливаем перезагрузку страницы

            // Получаем значения из полей
            const name = document.getElementById('rev-name').value;
            const destination = document.getElementById('rev-destination').value;
            const comment = document.getElementById('rev-comment').value;

            // Создаем новый HTML-блок для отзыва
            const newReview = document.createElement('div');
            newReview.className = 'review-card';
            // Добавляем небольшую анимацию появления
            newReview.style.opacity = '0';
            newReview.style.transition = 'opacity 0.5s ease';
            
            newReview.innerHTML = `
                <div class="review-header">
                    <b>${name}</b> <span class="review-dest">${destination}</span>
                </div>
                <p class="review-text">${comment}</p>
            `;

            // Добавляем отзыв в контейнер (в самый верх)
            reviewsContainer.prepend(newReview);

            // Плавно показываем
            setTimeout(() => {
                newReview.style.opacity = '1';
            }, 10);

            // Очищаем форму после отправки
            reviewForm.reset();
        });
    }
});