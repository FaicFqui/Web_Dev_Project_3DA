const express = require('express');
const router = express.Router();
const controller = require('./Controller.js');


// Lire tous les utilisateurs
router.get('/', controller.getAllUsers);

// Lire un utilisateur spécifique
router.get('/:id', controller.getUserById);

// Créer un nouvel utilisateur
router.post('/', controller.createUser);

// Mettre à jour un utilisateur
router.put('/:id', controller.updateUser);

// Supprimer un utilisateur
router.delete('/:id', controller.deleteUser);

module.exports = router;
