const express = require('express');
const router = express.Router();
const requireAuth = require('./../middleware/requireAuth');
const requireRole = require('./../middleware/requireRole');
const { signupUser, loginUser, getUserInfo, getAllUsers, addUser, updateUser, deleteUser} = require('./../controllers/userController')

router.post('/signup', signupUser)

router.post('/login', loginUser)

// route restreinte à l'administrateur
//router.get('/restricted', requireAuth, requireRole('admin'), restrictedController.getRestrictedPage);

//récupère les infos de l'user connecté 
router.get('/me', requireAuth, getUserInfo)

// récupère tous les users
router.get('/', requireAuth, requireRole('admin'), getAllUsers);

// ajoute un user
router.post('/add', requireAuth, requireRole('admin'), addUser);

//modifie un utilisateur 
router.put('/:id', requireAuth, requireRole('admin'), updateUser);

// supprime un user
router.delete('/:id', requireAuth, requireRole('admin'), deleteUser);


module.exports = router;