const express = require('express');
const app = express();
const port = 3000;
const usersRoutes = require('./usersRoutes');
app.use(express.json());

// Utilisation des routes des utilisateurs
app.use('/api/users', usersRoutes);

//démarrage du serveur
app.listen(port, () => {
	console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});