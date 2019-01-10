var db = require('./models');

// db.category.create({
// 	name: 'node'
// }).then((category) => {
// 	console.log(category.get());
// });

db.project.find({
	where: {id: 1},
	include: [db.category]
})
.then((project) => {
	console.log(project.categories);
	project.createCategory({
	name: 'node'
	}).then((category) => {
		console.log(category.get())
	});
});