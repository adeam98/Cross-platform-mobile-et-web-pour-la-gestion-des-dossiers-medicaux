const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => {
  console.log(`✅ Backend is running on http://localhost:${PORT}`);
});
