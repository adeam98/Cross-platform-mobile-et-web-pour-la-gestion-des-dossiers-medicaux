// controllers/centreAnalyse.js

const pool = require('../../config/db'); // Database connection

// Controller for adding an analysis record with a file
const AddAnalyse = async (req, res) => {
  try {
     console.log("Request Body:", req.body);  // Log body to check values
    console.log("Request Params:", req.params);  // Log params to check the id_user

    const { id_user } = req.params;
    const { id_analyse, cin, date_exam } = req.body;
    const file = req.file;

    // Check if the file was uploaded
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = `/uploads/${file.filename}`; // Path for the uploaded file
    const dateExamParsed = new Date(date_exam);

    if (isNaN(dateExamParsed)) {
      return res.status(400).json({ message: 'Invalid date_exam' });
    }

    // Check if the center exists
    const centreResult = await pool.query('SELECT * FROM centres_analyses WHERE id_user=$1', [id_user]);
    if (centreResult.rows.length === 0) {
      return res.status(404).json({ message: 'Centre not found' });
    }

    // Check if the patient exists (if necessary)
    const patientResult = await pool.query('SELECT * FROM patients WHERE cin=$1', [cin]);
    if (patientResult.rows.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

   const analyseResult = await pool.query('SELECT * FROM analyses WHERE id_analyse=$1', [id_analyse]);
    if (analyseResult.rows.length === 0) {
      return res.status(404).json({ message: 'Analyse not found' });
    }
    await pool.query(
      'UPDATE analyses SET resultat=$1, date_examen=$2, nom_centre_analyse=$3, etat=1 WHERE id_analyse=$4',
      [filePath, dateExamParsed, centreResult.rows[0].nom, id_analyse]
    );

    res.status(200).json({ message: 'Analyse added successfully!' });
  } catch (err) {
    console.error("Error adding analyse:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  AddAnalyse
};
