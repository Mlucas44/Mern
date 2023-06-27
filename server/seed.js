require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/userModel');

// Connexion à votre cluster MongoDB Atlas
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('Database connected');

        // Génération des utilisateurs d'essai
        const users = [];
        for (let i = 1; i <= 50; i++) {
            const user = new User({
                name: `User ${i}`,
                username: `user${i}`,
                email: `user${i}@example.com`,
                password: 'P@ssword44',
                role: 'user'
            });
            users.push(user);
        }

        // Insertion des utilisateurs dans la base de données
        User.insertMany(users)
            .then(() => {
                console.log('Users inserted successfully');
                mongoose.disconnect();
            })
            .catch((error) => {
                console.error('Error inserting users:', error);
                mongoose.disconnect();
            });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
