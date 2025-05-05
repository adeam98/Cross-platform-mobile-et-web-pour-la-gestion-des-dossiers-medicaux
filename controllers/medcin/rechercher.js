const pool = require('../../config/db');

const getpatient = async (req, res) => {
    const {cin} = req.body;

  try{
     const result = await pool.query('SELECT * FROM patients WHERE cin=$1',[cin]);      
        if(result.rows.length==0)
        {
            return res.status(404).json({message:"no patient found"});
        }
        res.status(200).json(result.rows[0]);   
     }catch(err)
     {  
        console.error("Error getting patient:", err);
        res.status(500).json({ message: "Server error" });
     }
    }
     module.exports = { 
          getpatient
     }