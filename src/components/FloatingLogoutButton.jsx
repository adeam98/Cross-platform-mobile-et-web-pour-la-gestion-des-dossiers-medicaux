import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"; 

export default function FloatingLogoutButton() {
  const navigate = useNavigate();
  const location = window.location;

  const hiddenRoutes = ['/login', '/register'];
  if (hiddenRoutes.includes(location.pathname)) return null;

  const handleLogout = () => {
    const confirmLogout = window.confirm("Voulez-vous vraiment vous déconnecter ?");
    if (!confirmLogout) return;
  
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
  
    navigate("/login");
    window.location.reload();
  };
  
  return (
    <div style={styles.container}>
      <button onClick={handleLogout} style={styles.button} title="Se déconnecter">
        <LogOut size={24} />
      </button>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 9999,
  },
  button: {
    backgroundColor: "#3a7bd5",
    color: "white",
    border: "none",
    borderRadius: "50%",
    padding: "12px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease",
  },
};
