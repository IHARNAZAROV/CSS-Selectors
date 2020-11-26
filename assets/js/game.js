const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const hintText = document.querySelector('#modal-text');
// const modalHintText = document.querySelector('#')
const image = document.querySelector('#image');
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const questions = [
  {
    question: '"div div button" is what kind of selector?',
    choice1: 'Selects all buttons inside of divs',
    choice2: 'Selects all divs which contain buttons which are inside of divs',
    choice3: 'Selects all buttons inside of divs which are inside of divs',
    choice4: 'Selects all divs which contain divs which contain buttons',
    answer: 3,
    hint: 'This is answer  2 + 2? ',
    image: '/assets/images/help images/question 1.png',
  },
  {
    question: '".box img" is what kind of selector?',
    choice1: 'Selects all img tags with a class of "box"',
    choice2: 'Selects all img tags with an ID of "box"',
    choice3: 'Selects all elements with a class of "box" which contain an img',
    choice4: 'Selects all img tags that are inside an element with a class of "box"',
    answer: 4,
    hint: 'This is quiz tery The tallest building',
    image: '/assets/images/help images/question 2.png',
  },
  {
    question: '".box .container div #title" is what kind of selector?',
    choice1: 'Selects all elements with an ID of "title" which are inside divs which are inside elements with a class of "container" which are inside elements with a class of "box"',
    choice2: 'Selects all elements with a class of "box" which contain elements with a class of "container" which contain divs which contain elements with an ID of "title"',
    choice3: 'Selects all elements with an ID of "title" which are inside divs which have a class of "box" and "container"',
    choice4: 'Selects all elements with an ID of "title" which are inside divs which have a class of "box" or "container"',
    answer: 1,
    hint: 'This is quiz What percent of American adults',
    image: '/assets/images/help images/question 3.png',
  },
  {
    question: '"div h1" is what kind of selector?',
    choice1: 'Selects all divs which contain h1',
    choice2: 'Selects the first h1 inside all divs',
    choice3: 'Selects all divs which contain h1',
    choice4: 'Selects all h1 which are inside divs',
    answer: 4,
    hint: 'This is quiz Approximately what percent ',
    image: '/assets/images/help images/question 4.png',
  },
  {
    question: '"img" is what kind of selector?',
    choice1: 'An image selector, selecting all images on your site',
    choice2: 'An image selector, selecting all img tags on your site',
    choice3: 'An element selector, selecting all images on your site',
    choice4: 'An element selector, selecting all img tags on your site',
    answer: 4,
    hint: 'This is quiz Approximately what percent ',
    image: '/assets/images/help images/question 5.png',
  },
  {
    question: '"ul li:nth-child(2)" is what kind of selector?',
    choice1: 'Selects all "li" inside of "ul" which only contain 2 "li"',
    choice2: 'Selects all "li" which are inside your second "ul"',
    choice3: 'Selects all "li" which are the second child of a "ul"',
    choice4: 'Selects all "ul" which only contain 2 "li"',
    answer: 3,
    hint: 'This is quiz What percent of American adults',
    image: '/assets/images/help images/question 6.png',
  },
  {
    question: '"div > button" is what kind of selector?',
    choice1: 'Selects all buttons inside of divs',
    choice2: 'Selects all buttons which are the direct children of divs',
    choice3: 'Selects all buttons which are not the direct children of divs',
    choice4: 'Selects all divs which do not have buttons',
    answer: 2,
    hint: 'This is quiz Approximately what percent ',
    image: '/assets/images/help images/question 7.png',
  },
  {
    question: '".box > .container > img#profile" is what kind of selector?',
    choice1: 'Selects an img with a class of "profile" which is the direct child of an element with a class of "container" which is a direct child of an element with a class of "box"',
    choice2: 'Selects all elements with a class of .box which contain a direct child which has a class of "container" which contains an img with an ID of "profile"',
    choice3: 'Selects all elements with a class of "box" which do not contain an element with a class of "container" which does not contain an img with an ID of "profile"',
    choice4: 'Selects an img with an ID of "profile" which is the direct child of an element with a class of "container" which is a direct child of an element with a class of "box"',
    answer: 4,
    hint: 'This is quiz Approximately what percent ',
    image: '/assets/images/help images/question 8.png',
  },
  {
    question: '"div#cta div.box img.thumbnail" is what kind of selector?',
    choice1: 'Selects all elements with a class of "thumbnail" which are inside divs with a class of "box" which are insive divs with an ID of "cta"',
    choice2: 'Selects all divs with an ID of "cta", all divs with a class of "box", and all images with a class of "thumbnail"',
    choice3: 'Selects all divs with an ID of "cta" which contains a div with a class of "box" which contains an image with a class of "thumbnail"',
    choice4: 'Selects all images with a class of "thumbnail" which are inside divs with a class of "box" which are insive divs with an ID of "cta"',
    answer: 4,
    hint: 'This is quiz Approximately what percent ',
    image: '/assets/images/help images/question 9.png',
  },
  {
    question: '"h1, h3, div.box" is what kind of selector?',
    choice1: 'Selects all h1, all h3, and a div with a class of "box"',
    choice2: 'Selects all h1, all h3, all divs, and all elements with a class of "box"',
    choice3: 'Selects all h1, all h3, and all divs with a class of "box"',
    choice4: 'Selects all h1, all h3, all divs, and all elements with an ID of "box"',
    answer: 3,
    hint: 'This is answer  2 + 2? ',
    image: '/assets/images/help images/question 10.png',
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

const getNewQuestion = function () {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);

    return window.location.assign('/assets/html/end.html');
  }

  questionCounter += 1;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerHTML = currentQuestion.question;
  hintText.innerHTML = currentQuestion.hint;
  choices.forEach((choice) => {
    const { number } = choice.dataset;
    choice.innerText = currentQuestion[`choice${number}`];
  });
  image.innerHTML = currentQuestion.image;
  // Improve images!!!!
  document.getElementById('image').src = `${currentQuestion.image}`;
  availableQuestions.splice(questionsIndex, 1);
  acceptingAnswers = true;
};

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset.number;

    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

startGame();
