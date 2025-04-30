const pool = require('../config/db'); 

const AddConsultation = async (req, res) => {
    const {id_user, date,time,rapport} = req.body;

    if (!id_user || !date || !time || !rapport) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const userCheck = await pool.query('SELECT * FROM patients WHERE id_user = $1', [id_user]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const result = await pool.query(
            `INSERT INTO consultations (id_user, date, time, rapport)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [id_user, date, time, rapport]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error adding consultation:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

/*const getConsultationById = async (req, res) => {
   const {id_user,id_consultation} = req.params;
    if (!id_user || !id_consultation) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (isNaN(id_user) || isNaN(id_consultation)) {
        return res.status(400).json({ message: "id_user and id_consultation must be numbers" });
    }
    if (id_user <0 || id_consultation <0) {
        return res.status(400).json({ message: "id_user and id_consultation must be positive numbers" });
    } 
    try{
          const check = await pool.query('SELECT * FROM patients where id_user = $1',[id_user])
          if(check.rows.length === 0){
            return res.status(404).json({ message: "User not found" });
          }
          const result = await pool.query('SELECT * FROM consultations where id_user = $1 and id_consultation = $2',[id_user,id_consultation])
          if(result.rows.length === 0){
            return res.status(404).json({ message: "Consultation not found" });
          }
          res.status(200).json(result.rows[0]);
    }catch(error){
        console.error("Error getting consultation:", error);
        res.status(500).json({ message: "Server error", error });
    }
}*/
const getAllConsultations = async (req, res) => {
    const {id_user} = req.params;
    if (!id_user) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (isNaN(id_user)) {
        return res.status(400).json({ message: "id_user must be numbers" });
    }
    if (id_user <0) {
        return res.status(400).json({ message: "id_user must be positive numbers" });
    } 
    try{
          const check = await pool.query('SELECT * FROM patients where id_user = $1',[id_user])
          if(check.rows.length === 0){
            return res.status(404).json({ message: "User not found" });
          }
          const result = await pool.query('SELECT * FROM consultations where id_user = $1',[id_user])
          if(result.rows.length === 0){
            return res.status(404).json({ message: "Consultation not found" });
          }
          res.status(200).json(result.rows);
    }catch(error){
        console.error("Error getting consultation:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

const updateConsultation = async (req, res) => {
 
    const { id_user, id_consultation } = req.params;
    const { date, time, rapport } = req.body;

    if (!id_user || !id_consultation || !date || !time || !rapport) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const userCheck = await pool.query('SELECT * FROM patients WHERE id_user = $1', [id_user]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const result = await pool.query(
            `UPDATE consultations 
             SET date = $1, time = $2, rapport = $3
             WHERE id_user = $4 AND id_consultation = $5 RETURNING *`,
            [date, time, rapport, id_user, id_consultation]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Consultation not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error updating consultation:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

module.exports = {
    AddConsultation,
    //getConsultationById,
    getAllConsultations,
    updateConsultation
}
    
