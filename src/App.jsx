import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// 🔐 Auth Pages
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

// 🏠 Main Pages
import Acceuil from "./pages/acceuil";
import Consultation from "./pages/consultation";
import AnalysePrescrit from "./pages/analyseprescrit";
import Maladie from "./pages/maladie";
import Medicament from "./pages/medicament";
import PatientInfo from "./pages/patientinfo";
import Rdv from "./pages/rdv";
import ResultatAnalyse from "./pages/resultatanalyse";

// ➕ Add Pages
import AddAnalyse from "./pages/add/addanalyse";
import AddMaladie from "./pages/add/addmaladie";
import AddMedicament from "./pages/add/addmedicament";
import AddRapport from "./pages/add/addrapport";
import AddRdv from "./pages/add/addrdv";
import FloatingLogoutButton from "./components/FloatingLogoutButton"; 
import ProtectedRoute from "./components/ProtectedRoute"; 

function App() {
  return (
    <BrowserRouter>
     <FloatingLogoutButton />
      <Routes>
        {/*  Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/*  Auth Pages */}
        <Route path="/login" element={
        localStorage.getItem("token") ? <Navigate to="/acceuil" /> : <Login />
          } />
        <Route path="/register" element={<Register />} />

        {/*  Main Pages */}
        <Route path="/acceuil" element={
          <ProtectedRoute>
            <Acceuil />
          </ProtectedRoute>
          } />
        <Route path="/consultation" element={
          <ProtectedRoute>
            <Consultation />
          </ProtectedRoute>
           } />
        <Route path="/analyseprescrit" element={
          <ProtectedRoute>
            <AnalysePrescrit />
          </ProtectedRoute>
        } />
        <Route path="/maladie" element={
          <ProtectedRoute>
            <Maladie />
          </ProtectedRoute>
        } />
        <Route path="/medicament" element={
          <ProtectedRoute>
            <Medicament />
          </ProtectedRoute>
        } />
        <Route path="/patientinfo" element={
          <ProtectedRoute>
            <PatientInfo />
          </ProtectedRoute>
          } />
        <Route path="/rdv" element={
          <ProtectedRoute>
            <Rdv />
          </ProtectedRoute>
        } />
        <Route path="/resultatanalyse" element={
          <ProtectedRoute>
            <ResultatAnalyse />
          </ProtectedRoute>
        } />

        {/*  Add Pages */}
        <Route path="/add/analyse" element={ 
          <ProtectedRoute>
            <AddAnalyse />
          </ProtectedRoute>
         } />
        <Route path="/add/maladie" element={
          <ProtectedRoute>
            <AddMaladie />
          </ProtectedRoute>
        } />
        <Route path="/add/medicament" element={
          <ProtectedRoute>
            <AddMedicament />
          </ProtectedRoute>
        } />
        <Route path="/add/consultation" element={
          <ProtectedRoute>
            <AddRapport />
          </ProtectedRoute>
        } />
        <Route path="/add/rdv" element={
          <ProtectedRoute>
            <AddRdv />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
