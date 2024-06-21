
const userController = require('../controller/userCtrl');
const roleController = require('../controller/roleCtrl');

const multer = require('fastify-multer') // or import multer from 'fastify-multer'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })
const routes = [
    {
        method: 'GET',
        url: '/api/alluser',
        handler: userController.getAllUser
    },
    {
        method: 'GET',
        url: '/api/user/:id',
        handler: userController.getSingleUser
    },
    {
        method: 'POST',
        url: '/api/user',
        handler: userController.addNewUser,
    },
    {
        method: 'POST',
        url: '/api/user/:id',
        preHandler: upload.single('image'),
        handler: userController.updateUser
    },
    {
        method: 'POST',
        url: '/api/user/login',
        handler: userController.loginUser
    },
    {
        method: 'DELETE',
        url: '/api/user/:id',
        handler: userController.deleteUser
    },
    {
        method: 'GET',
        url: '/api/role/getall',
        handler: roleController.getAllRoles
    },
    {
        method: 'POST',
        url: '/api/role/add',
        handler: roleController.addNewRole
    },
    {
        method: 'POST',
        url: '/api/role/update/:id',
        handler: roleController.updateRole
    },
     {
        method: 'DELETE',
        url: '/api/role/delete/:id',
        handler: roleController.deleteRole
    } ,
    {
        method: 'GET',
        url: '/api/role/getById/:id',
        handler: roleController.getSingleRole
    }

]
module.exports = routes