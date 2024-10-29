import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { ThemeProvider, createTheme } from "@mui/material";
import { mainLayoutStyle } from "./styles";
import "./layout.scss";
import Header from "../components/header";
import { useSelector } from "react-redux";

export function MainLayout(props) {

  const isCollapsed = useSelector((state) => state?.sidebar?.isCollapsed || false);

  const [theme, setTheme] = useState({
    palette: {
      primary: {
        main: "#101010",
      },
      secondary: {
        main: "#FBFBFB",
      },
    },
  });

  const muiTheme = createTheme(theme, {
    setTheme,
  });

  const classes = mainLayoutStyle();

  useEffect(() => {
    adjustSidebarWidth();
    window.addEventListener("resize", adjustSidebarWidth);
    document.addEventListener("DOMContentLoaded", adjustSidebarWidth);
  }, [])

  const adjustSidebarWidth = () => {
    const sidebar = document.getElementById("main");
    const width = window.innerWidth;

    if (width < 600) {
      sidebar.style.marginLeft = isCollapsed ? "12%" : "21%"
    } else if (width >= 600 && width <= 1024) {
      sidebar.style.marginLeft = isCollapsed ? "12%" : "21%"
    } else if (width > 1024 && width <= 1440) {
      sidebar.style.marginLeft = isCollapsed ? "12%" : "21%"
    } else if (width > 1440 && width <= 1920) {
      sidebar.style.marginLeft = isCollapsed ? "8%" : "16%"
    }
  }

  useEffect(() => {
    adjustSidebarWidth();
  }, [isCollapsed])

  return (
    <>
      <ThemeProvider theme={muiTheme}>
        <div className={`${classes.Root} mb-5 root`}>
          <Sidebar />

          <main id="main" className={`${classes.Content}`}>
            {props.children}
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}

export default MainLayout;
