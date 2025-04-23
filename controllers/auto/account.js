const pool = require('../config/db'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const createAccount = async (req, res) => {
  const { email, password, role, nom, prenom, cin, telephone, adresse, specialite } = req.body;

  
  if (!email || !password || !role || !nom || !prenom || !cin) {
      return res.status(400).json({ message: "Please provide all required fields" });
  }

  if (role !== 'patient' && role !== 'medcin') {
      return res.status(400).json({ message: "Invalid role" });
  }

  try {
      const emailQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (emailQuery.rows.length > 0) {
          return res.status(400).json({ message: "Email already in use" });
      }

      // Step 3: Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Step 4: Create the user in the `users` table
      const userQuery = await pool.query(
          'INSERT INTO users (email, mot_de_passe, role) VALUES ($1, $2, $3) RETURNING id_user',
          [email, hashedPassword, role]
      );

      const userId = userQuery.rows[0].id_user;

     
      if (role === 'patient') {
        try{
          const patientQuery = await pool.query(
              'INSERT INTO patients (id_user, email, mot_de_passe, role, nom, prenom, cin, telephone, adresse) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
              [userId, email, hashedPassword, role, nom, prenom, cin, telephone, adresse]
          );
          
          if(patientQuery.rowCount === 0) {
              return res.status(500).json({ message: "Error creating patient" });
          }
        }catch(err)
        {
          console.error(err);
          return res.status(500).json({ message: "Error creating patient" });
        }
      }
      else if (role === 'medcin') {
          
        try{
          const medcinQuery = await pool.query(
              'INSERT INTO medcins (id_user, email, mot_de_passe, role, nom, prenom, cin, telephone, adresse, specialite) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
              [userId, email, hashedPassword, role, nom, prenom, cin, telephone, adresse, specialite]
          );
          if(medcinQuery.rowCount === 0) {
              return res.status(500).json({ message: "Error creating medcin" });
          }
        }catch(err)
        {
          console.error(err);
          return res.status(500).json({ message: "Error creating medcin" });
        }

      }

      // Step 6: Generate JWT token
      const token = jwt.sign({ id: userId, role: role }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ message: "Account created successfully", token });

  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating user" });
  }
};
const modifyInformation = async (req, res) => {
  const userId = parseInt(req.params.id); 
  
  // Check if the user exists in the database
  const userQuery = await pool.query('SELECT * FROM users WHERE id_user = $1', [userId]);
  
  if (userQuery.rowCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  // Get the updated information from the request body
  const { name, birthdate, address, email, password } = req.body;

  // Prepare the update query
  const updateQuery = `UPDATE users SET email = $1, mot_de_passe = $2, name = $3, birthdate = $4, address = $5 WHERE id_user = $6 RETURNING id_user;`;

  try {
    
    const result = await pool.query(updateQuery, [
      email || userQuery.rows[0].email,  
      password || userQuery.rows[0].mot_de_passe, 
      name || userQuery.rows[0].name, 
      birthdate || userQuery.rows[0].birthdate,  
      address || userQuery.rows[0].address, 
      userId
    ]);

    // If update was successful
    if (result.rowCount === 0) {
      return res.status(500).json({ message: "Failed to update user information" });
    }

    // Send a success response
    res.status(200).json({ message: "User information updated successfully", userId: result.rows[0].id_user });

  } catch (err) {
    console.error('Database error:', err.message);
    // Catch and handle any database errors
    res.status(500).json({ message: "Error updating user information" });
  }
};

//const deleteAccount = (req, res) => {
   // const userId = parseInt(req.params.id);
   // const userIndex = users.findIndex(user => user.id === userId);
   // if (userIndex === -1) {
    //    return res.status(404).json({ message: "User not found" });
   // }
    //users.splice(userIndex, 1);
    //res.status(200).json({ message: "Account deleted successfully" });
//}
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.mot_de_passe);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id_user, role: user.role },process.env.JWT_SECRET,{ expiresIn: '1h' }
    );
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id_user: user.id_user,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  createAccount,         
  modifyInformation,
  login
};




