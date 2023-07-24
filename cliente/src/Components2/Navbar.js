/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Logo from "../Assets/logo2.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "Inicio",
      icon: <HomeIcon />,
      href: "/",
    },
   
    {
      text: "Servicios",
      icon: <CommentRoundedIcon />,
      href: "#servicios",
    },
    {
      text: "Nosotros",
      icon: <InfoIcon />,
      href: "#nosotros",
    },
   
    {
      text: "Reservar",
      icon: <PhoneRoundedIcon />,
      href: "#reservar",
    },
    
    {
      text: "Contactanos",
      icon: <ShoppingCartRoundedIcon />,
      href: "#contactanos",
    },
    {
      text: "Login",
      icon: <ShoppingCartRoundedIcon />,
    },
  ];
  return (
    <div className="navcolor">
      <nav>
        <div className="nav-logo-container">
          <img src={Logo} alt="" />
        </div>
        <div className="nav-text-container">
          <p
            style={{
              fontFamily: "Cambria, serif",
              fontWeight: "bold",
              fontStyle: "italic",
              color: "#0D506E",
              fontSize: "22px",
            }}
          >
            Consultorio Ecográfico
          </p>
          <p
            style={{
              fontFamily: "Cambria, serif",
              fontWeight: "bold",
              fontStyle: "italic",
              color: "#0D506E",
              fontSize: "22px",
            }}
          >
            "Dra. Mercedes Del Pino Caicedo"
          </p>
        </div>
        <div className="navbar-links-container">
          <a href="/">Inicio</a>
          <a href="#servicios">Servicios</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contactanos">Contactanos</a>
          <a href="#reservar">Reservar</a>
          <a href="/login">Login</a>
        </div>
        <div className="navbar-menu-container">
          <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
        </div>
        <Drawer
          open={openMenu}
          onClose={() => setOpenMenu(false)}
          anchor="right"
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setOpenMenu(false)}
            onKeyDown={() => setOpenMenu(false)}
          >
            <List>
              {menuOptions.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton href={item.href}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>
      </nav>
    </div>
  );
  
};

export default Navbar;
