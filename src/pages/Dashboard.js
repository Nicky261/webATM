import React from 'react';
import { Box, Typography, AppBar, Toolbar, IconButton, Drawer, List, ListItem, 
         ListItemIcon, ListItemText, Divider, Container } from '@mui/material';
import { Routes, Route, Link as RouterLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import FileUploadComponent from '../components/fileUpload/FileUploadComponent';
import BarChartIcon from '@mui/icons-material/BarChart';
import StockMarketComponent from '../components/stockMarket/StockMarketComponent';

import { useTheme } from '../contexts/ThemeContext';
// În componenta Dashboard, adaugă:

import PostsComponent from '../components/posts/PostsComponent';
import WorkGroupsComponent from '../components/groups/WorkGroupsComponent';

import DashboardHomeComponent from '../components/dashboard/DashboardHomeComponent';

// Importăm componentele dashboard (vom crea aceste componente mai târziu)
const DashboardHome = () => (
    <Box sx={{ mt: 3 }}>
      <DashboardHomeComponent />
    </Box>
  );

const FileUpload = () => (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Încărcare fișiere
      </Typography>
      <Typography variant="body1" paragraph>
        Încarcă fișiere pentru analiza de date și vizualizare.
      </Typography>
      <FileUploadComponent />
    </Box>
  );
const Posts = () => (
<Box sx={{ mt: 3 }}>
    <PostsComponent />
</Box>
);

const WorkGroups = () => (
    <Box sx={{ mt: 3 }}>
      <WorkGroupsComponent />
    </Box>
    );

const StockMarket = () => (
    <Box sx={{ mt: 3 }}>
        <StockMarketComponent />
    </Box>
    );

function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const { mode, toggleTheme } = useTheme();

  // Funcție pentru gestionarea deschiderii/închiderii drawer-ului
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Funcție pentru logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Obținem informațiile utilizatorului (în aplicația reală acestea ar veni de la backend)
  const user = JSON.parse(localStorage.getItem('user') || '{"name": "Utilizator"}');

  const menuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/dashboard' },
    { text: 'Încărcare fișiere', icon: <UploadFileIcon />, path: '/dashboard/upload' },
    { text: 'Postări', icon: <ArticleIcon />, path: '/dashboard/posts' },
    { text: 'Grupuri de lucru', icon: <GroupIcon />, path: '/dashboard/groups' },
    { text: 'Analiză Bursă', icon: <BarChartIcon />, path: '/dashboard/stocks' }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            DataLearn Platform
          </Typography>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            Bine ai venit, {user.name}
          </Typography>

          <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 1 }}>
             {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer (Sidebar) */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true, // Pentru performanță mai bună pe mobile
        }}
        sx={{
          '& .MuiDrawer-paper': { 
            width: 240,
            boxSizing: 'border-box' 
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem 
                button 
                key={item.text} 
                component={RouterLink} 
                to={item.path}
                onClick={toggleDrawer}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Deconectare" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Conținutul principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Acest spațiu asigură că conținutul nu este ascuns sub AppBar */}
        <Container>
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/groups" element={<WorkGroups />} />
            <Route path="/stocks" element={<StockMarket />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard;