var db = require('./models');

// can this be made into a function
// ... and called from node command

// injectionTest
// var db = database to test
// var injectionTest = function(){
//   db.db.create({
//     name: 'node'
//   }).then(function(db) {
//     console.log(db.get());
//   });
// };

// test category model
  // .. and db
// db.category.create({
//   name: 'node'
// }).then(function(category) {
//   console.log(category.get());
// });

// will this work
// var cats = ['pizza','ga','weddings','whiskey','Seattle'];
// cats.forEach(function(item){
  // db.category.create({
  //   name: item
  // }).then(function(category) {
  //   console.log('success');
  // });
  // console.log(category.get());
// });


// db.categoriesProjects.create({
//   projectId: 1,
//   categoryId: 7
// }).then(function(category) {
//   console.log(category.get());
// });
