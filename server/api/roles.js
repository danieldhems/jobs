"use strict";

var db = require('../database');
var router = require('express').Router();

var _insertId = null;

var api = {
	create: function(req, res){
		var data = req.body;
		// Create new role with insertId returned from creation of agent
		db.query('INSERT INTO `roles` SET ?', [data], (err, result) => {
			if(err) throw new Error(err);
			if(result.affectedRows===1){
				_insertId = result.insertId;
				api.read(req, res);
			}
		})
	},
	read: function(req, res){
		var query = "\
			SELECT\
				roles.id,\
				roles.title,\
				roles.client,\
				roles.salary,\
				roles.location,\
				roles.notes,\
				roles.archived,\
				roles.agent_id,\
				agents.name as `agent_name`,\
				agents.company as `agent_company`,\
				agents.phone_number as `agent_phone_number`,\
				interviews.stage as `interview_stage`\
			FROM `roles`\
			LEFT JOIN `agents` ON roles.agent_id = agents.id\
			LEFT JOIN `interviews` ON roles.id = interviews.role_id\
			WHERE roles.archived = 0\
		";
		if(_insertId){
			query += " AND roles.id = " + _insertId;
		}
		db.query(query, function(err, rows){
			if(err) throw new Error(err);
			console.log('rows', rows);
			// If insertId is not null then we've just inserted a new record, so return only this new record, else return 
			if(rows.length === 1 && _insertId){
				// reset _insertId
				_insertId = null;
				res.json(rows[0]);
			} else {
				res.json(rows);
			}
		});
	},
	update: function(req, res){
		var data = req.body;
		if(data['agent_name']){
			db.query('INSERT INTO `agents` SET name="'+data['agent_name']+'"', function(err, result){
				if(err) throw new Error(err);0
				_insertId = result.insertId;
				delete data['agent_name'];
				data.agent_id = _insertId;
				db.query('UPDATE `roles` SET ? WHERE `id` = ?', [data, data.id], function(err, result){
					if(err) throw new Error(err);
					if(result.affectedRows===1){
						_insertId = data.id;
						api.read(req, res);
					}
				});
			})
		} else {
			db.query('UPDATE `roles` SET ? WHERE `id` = ?', [data, data.id], function(err, result){
				if(err) throw new Error(err);
				if(result.affectedRows===1){
					_insertId = data.id;
					api.read(req, res);
				}
			});
		}
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
