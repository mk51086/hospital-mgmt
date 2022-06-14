import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/logo.png";
import { useAuthContext } from "../../hooks/useAuthContext";
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

export default function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const { user, logout_user } = useAuthContext();
  const handleLogout = () => {
    logout_user();
    handleCloseUserMenu();
    navigate("/");
  };

 

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="" />
            <span>HMS</span>
          </Link>
        </div>
        <nav className="navbar">
          <ul>
            {!user && (
              <>
                <li className="menu-link">
                  <Link to="/login">Log in</Link>
                </li>
                <li className="btn-link">
                  <Link to="/register">register</Link>
                </li>
              </>
            )}
          
            {user && (
              <>
             <Link to={user.isStaff ? "/staff/dashboard" : "/patient/dashboard"} className="menu-link">
                    Dashboard
                  </Link>
                <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="M" src="" />
              </IconButton>
            </Tooltip>
            
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
                <MenuItem component={Link}
                  to={user.isStaff ? "/staff/dashboard" : "/patient/dashboard"}
                >Profile</MenuItem>
                <MenuItem>Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
