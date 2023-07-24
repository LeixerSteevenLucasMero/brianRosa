// Layout.js
import React, { useState } from "react";
import { adminMenu, userMenu } from "../Data/data";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    message.success("Cierre de sesión exitoso");
    navigate("/login");
  };

  const doctorMenu = [
    {
      name: "Inicio",
      path: "/home",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
    {
      name: "Modulo Reserva",
      icon: "fa-solid fa-calendar",
      // Submenu anidado
      submenu: [
        {
          name:  "Agendamineto de reserva",
          path: "/doctor/calendario",
          icon: "fa-solid fa-file",
        },
        {
          name: "Ver todas las reservas",
          path: "/doctor/Reservalist",
          icon: "fa-solid fa-file-alt",
        },
      ],
    },
  ];

  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  // Estado para controlar la visibilidad del submenu
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  // Función para manejar el clic en un elemento del menú con submenú
  const handleToggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "initial" }}>
                <Badge
                  count={user && user.notifcation.length}
                  onClick={() => navigate("/notification")}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>
                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="sidebar">
              <div className="menu">
                {SidebarMenu.map((menu, index) => {
                  const isActive = location.pathname === menu.path;
                  const hasSubmenu = menu.submenu && menu.submenu.length > 0;
                  const isSubmenuActive = activeSubmenu === index;

                  return (
                    <div
                      key={menu.path}
                      className={`menu-item ${
                        isActive && !hasSubmenu ? "active" : ""
                      }`}
                    >
                      <i className={menu.icon}></i>
                      <Link
                        to={menu.path}
                        onClick={() => handleToggleSubmenu(index)}
                      >
                        {menu.name}
                      </Link>
                      {hasSubmenu && (
                        <div
                          className={`submenu ${isSubmenuActive ? "active" : ""}`}
                        >
                          {menu.submenu.map((submenuItem) => (
                            <Link key={submenuItem.path} to={submenuItem.path}>
                              {submenuItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="menu-item" onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <Link to="/login">Logout</Link>
                </div>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
