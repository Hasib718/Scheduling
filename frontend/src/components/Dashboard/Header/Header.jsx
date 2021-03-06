import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Sidebar from "../Sidebar/Sidebar";
import SearchIcon from "@mui/icons-material/Search";
import { getAdmin, getSingleEmployee } from "../../../Api/Api";

const Header = () => {
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [admin, setAdmin] = useState({});
  const [employee, setEmployee] = useState({});

  const id = JSON.parse(localStorage.getItem("user")).id;
  const role = JSON.parse(localStorage.getItem("user")).role;
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  useState(() => {
    const fetchData = async () => {
      console.log(id);
      console.log(role);
      if (role === "admin") {
        const res = await getAdmin(id);
        console.log(res.data.data);
        setAdmin(res.data.data);
      } else {
        const res = await getSingleEmployee(id);
        setEmployee(res.data.data);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          boxShadow: "none",
          width: { xs: "100%", md: "calc(100% - 280px)" },
          position: "fixed",
          right: 0,
          bgcolor: "background.paper",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <FormatListBulletedIcon
              onClick={() => setisDrawerOpen(true)}
              sx={{
                display: { xs: "block", sm: "none" },
                cursor: "pointer",
                color: "#000",
              }}
            />
          </Box>
          <Box
            sx={{
              height: "auto",
              width: "50%",
              bgColor: "#eeee",
              fontSize: "1rem",
            }}
            className="flex items-center justify-center border border-gray-300 px-2 rounded-xl"
          >
            <SearchIcon className=" text-gray-400" />
            <input
              placeholder="Search..."
              className=" p-1 w-full rounded-lg border-none outline-none text-black px-2 "
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              onClick={handleOpenUserMenu}
              sx={{
                fontSize: "1rem",
                color: "#fff",
                bgcolor: "#4e1ab6",
                padding: ".2rem .7rem",
                cursor: "pointer",
                borderRadius: "20px",
              }}
            >
              {role === "admin" ? admin.name : employee.name}
            </Typography>
            <Tooltip title="Open Setting">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt="Gojo" sx={{ height: "35px", width: "35px" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setisDrawerOpen(false)}
      >
        <Sidebar isDrawerOpen={isDrawerOpen} />
      </Drawer>
    </>
  );
};

export default Header;
