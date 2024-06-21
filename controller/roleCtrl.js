const boom = require('boom');
const db = require("../model");

//get all user
exports.getAllRoles = async (req, reply) => {
    try {
        let roles = await db.roleModel.findAll({});
        return roles;
    } catch (err) {
        throw boom.boomify(err)
    }
}
// get single user by id 
exports.getSingleRole = async (req, reply) => {
    try {
        const id = req.params.id
        let role = await db.roleModel.findOne({ where: { id: id } });
        return role;
    } catch (err) {
        throw boom.boomify(err)
    }
}
//add new user
exports.addNewRole = async (req, reply) => {
    try {
        const roleExtis = await db.roleModel.findOne({ where: { name: req.body.name } })
        if (roleExtis) {
            return ({
                status: 204,
                message: "role name already exits"
            })
        }
        else {
            const role = await db.roleModel.create(req.body);
            return ({
                status: 200,
                message: 'role Created Sucssfully'
            })
        }
    } catch (err) {
        throw boom.boomify(err)
    }
}
//update user by id
exports.updateRole = async (req, reply) => {
    try {
        const id = req.params.id;
        let roleResults = await db.roleModel.update(req.body, { where: { id: id } });
        return ({
            status: 200,
            message: " role update successfully"
        });
    } catch (err) {
        throw boom.boomify(err)
    }
}
//delete user by id
exports.deleteRole = async (req, reply) => {
    try {
        const id = req.params.id
        let roleResults = await db.roleModel.destroy({ where: { id: id } });
        return { Message: "role Deleted" }
    } catch (err) {
        throw boom.boomify(err)
    }
}







