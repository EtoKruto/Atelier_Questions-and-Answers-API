import mongoose from 'mongoose';
const { Schema } = mongoose;

const Questions = mongoose.model('Questions', new Schema({
  product_id: Number,
  question_body:String,
  question_date: Date,
  asker_name: String,
  asker_email: String,
  question_helpfulness: Number,
  reported: Boolean
}));

const Answers = mongoose.model('Answers', new Schema({
  question__id: Number,
  body: String,
  answerer_name: String,
  answerer_email: String,
  date: Date,
  reported: Boolean,
  helpfulness: Number
}));

const Answer_Photos = mongoose.model('Answer_Photos', new Schema({
  answers__id: Number,
  url:String
}));

// db.createCollection('questions', {
//   validator: {
//     $jsonSchema: {
//       bsonType: 'object',
//       title: 'questions',
//       properties: {
//         product_id: {
//           bsonType: 'int'
//         },
//         question_body: {
//           bsonType: 'string'
//         },
//         question_date: {
//           bsonType: 'date'
//         },
//         asker_name: {
//           bsonType: 'string'
//         },
//         asker_email: {
//           bsonType: 'string'
//         },
//         question_helpfulness: {
//           bsonType: 'int'
//         },
//         reported: {
//           bsonType: 'bool'
//         }
//       }
//     }
//   }
// });
// db.createCollection('answers', {
//   validator: {
//     $jsonSchema: {
//       bsonType: 'object',
//       title: 'answers',
//       required: ['question__id'],
//       properties: {
//         question__id: {
//           bsonType: 'objectId'
//         },
//         body: {
//           bsonType: 'string'
//         },
//         answerer_name: {
//           bsonType: 'string'
//         },
//         answerer_email: {
//           bsonType: 'string'
//         },
//         date: {
//           bsonType: 'date'
//         },
//         reported: {
//           bsonType: 'string'
//         },
//         helpfulness: {
//           bsonType: 'int'
//         }
//       }
//     }
//   }
// });
// db.createCollection('photos', {
//   validator: {
//     $jsonSchema: {
//       bsonType: 'object',
//       title: 'photos',
//       required: ['answers__id'],
//       properties: {
//         answers__id: {
//           bsonType: 'objectId'
//         },
//         url: {
//           bsonType: 'string'
//         }
//       }
//     }
//   }
// });