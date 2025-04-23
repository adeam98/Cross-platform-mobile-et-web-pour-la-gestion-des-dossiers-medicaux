const pool = require('../config/db'); 

const getmedicament = async (req, res) => {
    const {id_user, id_medicament} = req.params;
    if (!id_user || !id_medicament) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (isNaN(id_user) || isNaN(id_medicament)) {
        return res.status(400).json({ message: "id_user and id_medicament must be numbers" });
    }
    if (id_user <= 0 || id_medicament <= 0) {
        return res.status(400).json({ message: "id_user and id_medicament must be positive numbers" });
    }
    try {
        const userCheck = await pool.query('SELECT * FROM patients WHERE id_user = $1', [id_user]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const result = await pool.query('SELECT * FROM medicaments WHERE id_user = $1 AND id_medicament = $2', [id_user, id_medicament]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Medicament not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching medicament:", error);
        res.status(500).json({ message: "Server error" });
    }
}
const updatemedicament = async (req, res) => {
   const { id_user, id_medicament } = req.params;
   
    const { nom, description } = req.body;
    if (!id_user || !id_medicament || !nom || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (isNaN(id_user) || isNaN(id_medicament)) {
        return res.status(400).json({ message: "id_user and id_medicament must be numbers" });
    }
    if (id_user <= 0 || id_medicament <= 0) {
        return res.status(400).json({ message: "id_user and id_medicament must be positive numbers" });
    }
    try {
        const userCheck = await pool.query('SELECT * FROM patients WHERE id_user = $1', [id_user]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const result = await pool.query('SELECT * FROM medicaments WHERE id_user = $1 AND id_medicament = $2', [id_user, id_medicament]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Medicament not found" });
        }

        await pool.query('UPDATE medicaments SET nom = $1, description = $2 WHERE id_user = $3 AND id_medicament = $4', [nom, description, id_user, id_medicament]);

        res.status(200).json({ message: "Medicament updated successfully" });
    } catch (error) {
        console.error("Error updating medicament:", error);
        res.status(500).json({ message: "Server error" });
    }
}
const deletemedicament = async (req, res) => {
    const { id_user, id_medicament } = req.params;
    if (!id_user || !id_medicament) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (isNaN(id_user) || isNaN(id_medicament)) {
        return res.status(400).json({ message: "id_user and id_medicament must be numbers" });
    }
    if (id_user <= 0 || id_medicament <= 0) {
        return res.status(400).json({ message: "id_user and id_medicament must be positive numbers" });
    }
    try {
        const userCheck = await pool.query('SELECT * FROM patients WHERE id_user = $1', [id_user]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const result = await pool.query('DELETE FROM medicaments WHERE id_user = $1 AND id_medicament = $2 RETURNING *', [id_user, id_medicament]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Medicament not found" });
        }

        res.status(200).json({ message: "Medicament deleted successfully" });
    } catch (error) {
        console.error("Error deleting medicament:", error);
        res.status(500).json({ message: "Server error" });
    }
}
const addmedicament = async (req, res) => {
   const { id_user } = req.params;
    const { nom, description } = req.body;
    if (!id_user || !nom || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (isNaN(id_user)) {
        return res.status(400).json({ message: "id_user must be numbers" });
    }
    if (id_user <= 0) {
        return res.status(400).json({ message: "id_user must be positive numbers" });
    }
    try {
        const userCheck = await pool.query('SELECT * FROM patients WHERE id_user = $1', [id_user]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        await pool.query('INSERT INTO medicaments (id_user, nom, description) VALUES ($1, $2, $3)', [id_user, nom, description]);

        res.status(201).json({ message: "Medicament added successfully" });
    } catch (error) {
        console.error("Error adding medicament:", error);
        res.status(500).json({ message: "Server error" });
    }
}
const getAllmedicament = async (req, res) => {
    const {idu}=req.params;

    try{

        const result = await pool.query('SELECT *FROM patients WHERE id_user=$1',[idu]);
        if(result.rows.length==0)
        {
            return res.status(400).json({message:"user not found"});
        }

            const resu=await pool.query('SELECT *FROM medicaments where id_user=$1',[idu]);
            if(res.rows.length==0)
            {
                res.status(400).json({message:"no medicaments available"});
            }
            res.status(200).json(resu);
    }
    catch(err){
        console.error("Error getting all medicaments:", err);
        res.status(500).json({ message: "Server error" });
    }
}
module.exports = {
    getmedicament,
    updatemedicament,
    deletemedicament,
    addmedicament,
    getAllmedicament
}