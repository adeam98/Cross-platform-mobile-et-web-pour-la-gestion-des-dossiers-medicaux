
const addRDV = async (req, res) => {
   const {idu,hopitale,date}=req.body;

   if(!idu||!hopitale||!date)
   {
      return  res.status(400).json({message:"all field required"});
   }

   try {
    const check = await Pool.query('SELECT *FROM patients WHERE id_user=$1',[idu]);
    if(check.rows.length==0)
    {
        return res.status(400).json({message:"user not found"});
    }
    await Pool.query('INSERT INTO rdvs(date,hopital,id_user) VALUES($1,$2,$3)',[date,hopitale,idu]);

     return res.status(200).json({message:"RDV add succefully"});
   }
   catch(err)
   {
    console.error("Error adding RDV:", err);
    res.status(500).json({ message: "Server error" });
   }
}
const getRDV = async (req, res) => {
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
}
const updateRDV = async (req, res) => {
   const {idu,rdvid,date,hopitale}=req.body;
    if(!idu||!rdvid||!date||!hopitale)
    {
        return  res.status(400).json({message:"all field required"});
    }
    try {
        const check = await Pool.query('SELECT *FROM patients WHERE id_user=$1',[idu]);
        if(check.rows.length==0)
        {
            return res.status(400).json({message:"user not found"});
        }
        const result = await Pool.query('UPDATE rdvs SET date=$1,hopital=$2 WHERE id_rdv=$3 AND id_user=$4',[date,hopitale,rdvid,idu]);
        if(result.rowCount==0)
        {
            return res.status(400).json({message:"no rdv found"});
        }
        res.status(200).json({message:"rdv updated successfully"});
    } catch(err) {
        console.error("Error updating medicament:", err);
        res.status(500).json({ message: "Server error" });
    }
}
const deleteRDV = async (req, res) => {
    const {idu,rdvid}=req.body;
    if(!idu||!rdvid)
    {
        return  res.status(400).json({message:"all field required"});
    }
    try {
        const check = await Pool.query('SELECT *FROM patients WHERE id_user=$1',[idu]);
        if(check.rows.length==0)
        {
            return res.status(400).json({message:"user not found"});
        }
        const result = await Pool.query('DELETE FROM rdvs WHERE id_rdv=$1 AND id_user=$2',[rdvid,idu]);
        if(result.rowCount==0)
        {
            return res.status(400).json({message:"no rdv found"});
        }
        res.status(200).json({message:"rdv deleted successfully"});
    } catch(err) {
        console.error("Error deleting rdv:", err);
        res.status(500).json({ message: "Server error" });
    }
}
const getAllRDVs = async (req, res) => {
    const {idu}=req.body;
    if(!idu)
    {
        return  res.status(400).json({message:"all field required"});
    }
    try {
        const check = await Pool.query('SELECT *FROM patients WHERE id_user=$1',[idu]);
        if(check.rows.length==0)
        {
            return res.status(400).json({message:"user not found"});
        }
        const result = await Pool.query('SELECT *FROM rdvs WHERE id_user=$1',[idu]);
        if(result.rows.length==0)
        {
            return res.status(400).json({message:"no rdv found"});
        }
        res.status(200).json(result.rows);
    } catch(err) {
        console.error("Error getting rdv:", err);
        res.status(500).json({ message: "Server error" });
    }
}
module.exports = {
    addRDV,
    getRDV,
    updateRDV,
    deleteRDV,
    getAllRDVs
}

