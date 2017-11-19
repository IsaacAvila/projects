var promise = require('bluebird');

var options = {
	promiseLib : promise
};

var pgp = require('pg-promise')(options);
var connStr = 'postgres://postgres:postgres@localhost:5432/adviser';
var db = pgp(connStr);

function getPerfil(req, res, next){
	var negocio_id = parseInt(req.params.id);
	db.one('SELECT * FROM perfiles WHERE id_negocio = $1', negocio_id)
		.then(function (data){
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'perfil encontrado'
				});
		})
		.catch(function (err){
			return next(err);
		});

};


function getPosts(req, res, next){
	db.one('SELECT * FROM perfiles')
		.then(function (data){
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'posts conseguidos'
				});
		})
		.catch(function (err){
			return next(err);
		});

};
module.exports = {
	getPerfil: getPerfil,
	getPosts: getPosts
};