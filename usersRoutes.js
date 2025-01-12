const express = require('express');
const router = express.Router();
//const usersController = require('./usersControllers');



const usersController = require('./usersControllers');

// Routes pour les utilisateurs
router.get('/', usersController.getAllUsers); // Lire tous les utilisateurs
router.get('/:id', usersController.getUserById); // Lire un utilisateur spécifique
router.post('/', usersController.createUser); // Créer un nouvel utilisateur
router.put('/:id', usersController.updateUser); // Mise à jour complète d'un utilisateur
router.delete('/:id', usersController.deleteUser); // Supprimer un utilisateur

module.exports = router;
