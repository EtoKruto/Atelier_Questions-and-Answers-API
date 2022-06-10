var controllers = require('./controllers/index.js');
// var router = require('express').Router();
const Router = require('express-promise-router')

const router = new Router()

//Connect controller methods to their corresponding routes

// -------------- Questions -------------- //

router.get('/qa/questions', controllers.questions.getQuestions)

router.get('/qa/questions/:question_id/answers', controllers.questions.getAnswers);

router.put('/qa/questions/:question_id/helpful', controllers.questions.updateHelpful);

router.put('/qa/questions/:question_id/report', controllers.questions.updateReport);

router.post('/qa/questions', controllers.questions.addQuestion);

router.post('/qa/questions/:question_id/answers', controllers.questions.addAnswer);


// -------------- Answers -------------- //

router.put('/qa/answers/:answer_id/helpful', controllers.answers.updateHelpful);

router.put('/qa/answers/:answer_id/report', controllers.answers.updateReport);


module.exports = router;

