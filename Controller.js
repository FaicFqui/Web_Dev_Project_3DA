const db = require('./database');  // Connexion à la base de données SQLite

// Lire tous les utilisateurs
exports.getAllUsers = (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
};

// Lire un utilisateur spécifique
exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }
    res.json(row);
  });
};

// Créer un nouvel utilisateur
exports.createUser = (req, res) => {
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({ msg: "Les champs 'firstName' et 'lastName' sont requis" });
  }

  const sql = 'INSERT INTO users (firstName, lastName) VALUES (?, ?)';
  db.run(sql, [firstName, lastName], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: this.lastID,  // L'ID de l'utilisateur inséré
      firstName,
      lastName,
    });
  });
};

// Mise à jour complète d'un utilisateur
exports.updateUser = (req, res) => {
  const { firstName, lastName } = req.body;
  const id = parseInt(req.params.id);

  const sql = 'UPDATE users SET firstName = ?, lastName = ? WHERE id = ?';
  db.run(sql, [firstName, lastName, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }
    res.json({
      msg: "Utilisateur mis à jour",
      user: { id, firstName, lastName },
    });
  });
};

// Supprimer un utilisateur
exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  const sql = 'DELETE FROM users WHERE id = ?';
  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }
    res.json({ msg: "Utilisateur supprimé" });
  });
};
