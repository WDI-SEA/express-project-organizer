var db = require('./models');

db.project.find({
	where: {id: 1}
})
.then(function(p) {
	console.log(p.categories);

	p.createCategory({name: 'node'}).
	then(function(category) {
		console.log(category.get());
	});
});