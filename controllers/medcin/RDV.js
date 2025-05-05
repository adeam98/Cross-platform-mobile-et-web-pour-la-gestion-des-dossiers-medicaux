
const pool = require('../../config/db');

const addRDV = async (req, res) => {
    const {id_user} = req.params;
       const {hopitale,date,heure,motif} = req.body;

       const check= await pool.query('SELECT * FROM patients WHERE id_user=$1',[id_user]);
        if(check.rows.length==0)
        {
            return res.status(400).json({message:"user not found"});
        }
        
    try{
    await pool.query('INSERT INTO rdvs(date,hopitale,id_user,heure,motif) VALUES($1,$2,$3,$4,$5)',[date,hopitale,id_user,heure,motif]);

     return res.status(200).json({message:"RDV added successfully"});
   }
   catch(err)
   {
    console.error("Error adding RDV:", err);
    res.status(500).json({ message: "Server error" });
   }
}
const updateRDV = async (req, res) => {
   const {id_user,id_rdv}=req.params;
   const {date,hopitale,heure,motif}=req.body;

    if(!id_user||!id_rdv||!date||!hopitale)
    {
     return res.status(400).json({message:"all field required"});
    } 
    try {
        const check = await 
        pool.query('SELECT *FROM patients WHERE id_user=$1',[id_user]);
        if(check.rows.length==0)
        {
            return res.status(400).json({message:"user not found"});
        }
        const result = await pool.query('UPDATE rdvs SET date=$1,hopitale=$2,heure=$3,motif=$4 WHERE id_rdv=$5 AND id_user=$6 RETURNING *',[date,hopitale,heure,motif,id_rdv,id_user]);
        if(result.rows.length==0)
        {
            return res.status(400).json({message:"no rdv found"});
        }
        res.status(200).json(result.rows[0]);
    } catch(err) {
        console.error("Error updating RDV:", err);
        res.status(500).json({ message: "Server error" });
    }
}
const getAllRDVs = async (req, res) => {
    const {id_user}=req.params;
    if(!id_user)
    {
        return  res.status(400).json({message:"all field required"});
    }
    try {
        const check = await pool.query('SELECT * FROM patients WHERE id_user=$1',[id_user]);
        if(check.rows.length==0)
        {
            return res.status(400).json({message:"user not found"});
        }
        const result = await pool.query('SELECT * FROM rdvs WHERE id_user=$1', [id_user]);
        if (result.rows.length == 0) {
            return res.status(400).json({ message: "no rdv found" });
        }
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error getting rdv:", err);
        res.status(500).json({ message: "Server error" });
    }
}

const deleteRDV = async (req, res) => {
    const {id_user,id_rdv}=req.params;
    if(!id_user||!id_rdv)
    {
        return res.status(400).json({message:"all field required"});
    }
    try {
        const check = await pool.query('SELECT * FROM patients WHERE id_user=$1',[id_user]);
        if(check.rows.length==0)
        {
            return res.status(400).json({message:"user not found"});
        }
        const result = await pool.query('DELETE FROM rdvs WHERE id_rdv=$1 AND id_user=$2 RETURNING *',[id_rdv,id_user]);
        if(result.rows.length==0)
        {
            return res.status(400).json({message:"no rdv found"});
        }
        res.status(200).json({message:"rdv deleted successfully"});
    } catch(err) {
        console.error("Error deleting RDV:", err);
        res.status(500).json({ message: "Server error" });
    }
}
 /*const getRDV = async (req, res) => {
     const {idu,rdvid}=req.body;
     try{
        
         const check =await pool.query('SELECT *FROM patients WHERE id_user=$1',[idu]);
 
         if(check.rows.length==0)
         {
             return res.status(404).json({message:"no user found"});
         }
         const result = await pool.query('SELECT *FROM rdvs WHERE id_user=$1 AND id_rdv=$2',[idu,rdvid]);
         if(result.rows.length==0)
         {
             return res.status(404).json({message:"no rdv found"});
         }
         res.status(200).json(result.rows[0]);
 
     } catch(err)
     {
         console.error("Error getting user:", err);
         res.status(500).json({ message: "Server error" });
     }
 }*/
 
 module.exports = {
     addRDV,
     updateRDV,
     deleteRDV,
     getAllRDVs 
 }
 

