import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Home, Users, LogOut, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    Swal.fire({
      title: "Log Out?",
      text: "Are you sure you want to log out?",
      icon: "warning",
      iconColor: "#ef4444",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
      background: "rgba(255, 255, 255, 0.65)",
      backdrop: `
      rgba(0, 0, 0, 0.4)
      blur(6px)
    `,
      customClass: {
        popup: "glass-popup",
        confirmButton: "glass-confirm-btn",
        cancelButton: "glass-cancel-btn",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged Out",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 1400,
          showConfirmButton: false,
          background: "rgba(255,255,255,0.7)",
          backdrop: "rgba(0,0,0,0.3) blur(6px)",
          customClass: {
            popup: "glass-popup",
          },
        });

        setTimeout(() => {
          localStorage.removeItem("token");
          navigate("/login");
        }, 1400);
      }
    });
  };

  return (
    <nav className="glass-nav">
      <div className="nav-left">
        <Link to="/" className="brand">
          MiniCRM
        </Link>
      </div>

      <div className="nav-right">
        {token ? (
          <>
            <Link to="/dashboard" className="nav-btn">
              <Home size={18} /> Home
            </Link>

            <Link to="/customers" className="nav-btn">
              <Users size={18} /> Customers
            </Link>

            <button onClick={logout} className="nav-btn nav-btn-danger">
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn">
              <LogIn size={18} /> Login
            </Link>

            <Link to="/register" className="nav-btn">
              <UserPlus size={18} /> Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
