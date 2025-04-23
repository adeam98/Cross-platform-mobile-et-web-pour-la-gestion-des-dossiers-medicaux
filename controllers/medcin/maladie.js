const pool = require('../config/db'); 

const addmaladie = async (req, res) => {
   const { id_user, nom, description } = req.body;
    if (!id_user || !nom || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (isNaN(id_user)) {
        return res.status(400).json({ message: "id_user must be a number" });
    }
    if (id_user <= 0) {
        return res.status(400).json({ message: "id_user must be a positive number" });
    }

    try {
        const userCheck = await pool.query('SELECT * FROM patients WHERE id_user = $1', [id_user]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const result = await pool.query(
            `INSERT INTO maladies (id_user, nom, description)
             VALUES ($1, $2, $3) RETURNING *`,
            [id_user, nom, description]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error adding maladie:", error);
        res.status(500).json({ message: "Server error", error });
    }

}
const getMaladies = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (isNaN(id)) {
        return res.status(400).json({ message: "id must be a number" });
    }
    if (id <= 0) {
        return res.status(400).json({ message: "id must be a positive number" });
    }
    try {
        const userCheck = await pool.query('SELECT * FROM patients WHERE id_user = $1', [id]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const result = await pool.query('SELECT * FROM maladies WHERE id_user = $1', [id]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error getting maladies:", error);
        res.status(500).json({ message: "Server error", error });
    }
}
const getMaladie = async (req, res) => {
   const { id_user, id_maladie } = req.params;
    if (!id_user || !id_maladie) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (isNaN(id_user) || isNaN(id_maladie)) {
        return res.status(400).json({ message: "id_user and id_maladie must be numbers" });
    }
    if (id_user <= 0 || id_maladie <= 0) {
        return res.status(400).json({ message: "id_user and id_maladie must be positive numbers" });
    }
    try {
        const userCheck = await pool.query('SELECT * FROM patients WHERE id_user = $1', [id_user]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const result = await pool.query('SELECT * FROM maladies WHERE id_user = $1 AND id_maladie = $2', [id_user, id_maladie]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Maladie not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error getting maladie:", error);
        res.status(500).json({ message: "Server error", error });
    }
}
const updateMaladie = async (req, res) => {
    const { id_user, id_maladie } = req.params;
    const { nom, description } = req.body;
    if (!id_user || !id_maladie || !nom || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (isNaN(id_user) || isNaN(id_maladie)) {
        return res.status(400).json({ message: "id_user and id_maladie must be numbers" });
    }
    if (id_user <= 0 || id_maladie <= 0) {
        return res.status(400).json({ message: "id_user and id_maladie must be positive numbers" });
    }
    try {
        const userCheck = await pool.query('SELECT * FROM patients WHERE id_user = $1', [id_user]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const result = await pool.query(
            `UPDATE maladies SET nom = $1, description = $2 WHERE id_user = $3 AND id_maladie = $4 RETURNING *`,
            [nom, description, id_user, id_maladie]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Maladie not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error updating maladie:", error);
        res.status(500).json({ message: "Server error", error });
    }
}
const deleteMaladie = async (req, res) => {
   const { id_user, id_maladie } = req.params;
    if (!id_user || !id_maladie) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (isNaN(id_user) || isNaN(id_maladie)) {
        return res.status(400).json({ message: "id_user and id_maladie must be numbers" });
    }
    if (id_user <= 0 || id_maladie <= 0) {
        return res.status(400).json({ message: "id_user and id_maladie must be positive numbers" });
    }
    try {
        const userCheck = await pool.query('SELECT * FROM patients WHERE id_user = $1', [id_user]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const result = await pool.query(
            `DELETE FROM maladies WHERE id_user = $1 AND id_maladie = $2 RETURNING *`,
            [id_user, id_maladie]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Maladie not found" });
        }
        res.status(200).json({ message: "Maladie deleted successfully" });
    } catch (error) {
        console.error("Error deleting maladie:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

module.exports = {
    addmaladie,
    getMaladies,
    getMaladie,
    updateMaladie,
    deleteMaladie
}
