var db = require('../database.js');
var router = require('express').Router();

_insertId = null;

var api = {
	create: function(req, res){
		var data = req.body;
		db.query('INSERT INTO `roles` SET ?', [data], function(err, result){
			if(err) throw new Error(err);
			if(result.affectedRows===1){
				_insertId = result.insertId;
				api.read(req, res);
			}
		});
	},
	read: function(req, res){
		var query = "\
			SELECT\
				roles.id,\
				roles.title,\
				roles.client,\
				roles.salary,\
				roles.location,\
				roles.archived,\
				roles.agent_id,\
				agents.name as `agent_name`,\
				agents.company as `agent_company`,\
				interviews.stage as `interview_stage`\
			FROM `roles`\
			LEFT JOIN `agents` ON roles.agent_id = agents.id\
			LEFT JOIN `interviews` ON roles.id = interviews.role_id\
			WHERE roles.archived = 0\
		";
		if(_insertId){
			query += " AND roles.id = " + _insertId;
			_insertId = null;
		}
		db.query(query, function(err, rows){
			if(err) throw new Error(err);
			res.json(rows.length > 1 ? rows : rows[0]);
		});
	},
	update: function(req, res){
		var data = req.body;
		var id = req.params.id;
		db.query('UPDATE `roles` SET ? WHERE `id` = ?', [data, id], function(err, result){
			if(err) throw new Error(err);
			console.log(result);
		});
	},
	destroy: function(req, res){
		var id = parseInt(req.body.id,10);
		db.query('DELETE FROM `roles` WHERE id = ?', [id], function(err, rows){
			if(err) throw new Error(err);
			res.json({"success":true});
		});
	}
};

// Set API CRUD endpoints
router.get('/', api.read);
router.post('/', api.create);
router.put('/', api.update);
router.patch('/', api.update);
router.delete('/', api.destroy);

module.exports = router;
