const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');  

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());

app.use(bodyParser.json());

const authRoutes = require('./routes/create_account');
app.use('/api/auth', authRoutes);

const maladieRoutes = require('./routes/patient/maladie');
app.use('/api/patient', maladieRoutes);

const RDVRoutes = require('./routes/patient/RDV');
app.use('/api/patient', RDVRoutes);

const medicamentRoutes = require('./routes/patient/medicament');
app.use('/api/patient', medicamentRoutes);

const consultationRoutes = require('./routes/patient/consultation');
app.use('/api/patient', consultationRoutes);

const analyseRoutes = require('./routes/patient/analyse');
app.use('/api/patient', analyseRoutes);

const rechercher = require('./routes/medcin/rechercher');
app.use('/api/medcin', rechercher); 
app.use('/api/centre', rechercher);

const medcinRoutes = require('./routes/medcin/maladie');
app.use('/api/medcin', medcinRoutes);

const rdvmedin = require('./routes/medcin/RDV');
app.use('/api/medcin', rdvmedin);

const medciament = require('./routes/medcin/medicament');
app.use('/api/medcin', medciament);

const consultation = require('./routes/medcin/consultation');
app.use('/api/medcin', consultation);

const analyse = require('./routes/medcin/analyse');
app.use('/api/medcin', analyse);

const analysecentre = require('./routes/centre_analyse/analyse');
app.use('/api/centre', analysecentre);


app.listen(PORT, () => {
  console.log(`✅ Backend is running on http://localhost:${PORT}`);
});
