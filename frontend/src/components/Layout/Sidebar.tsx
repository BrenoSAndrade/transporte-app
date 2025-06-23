import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import {
  Dashboard,
  DirectionsBus,
  Assessment,
  CloudUpload,
  Notifications,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { text: 'Monitoramento', icon: <Dashboard />, path: '/' },
  { text: 'Classificação de Demanda', icon: <DirectionsBus />, path: '/demanda' },
  { text: 'Relatórios', icon: <Assessment />, path: '/relatorios' },
  { text: 'Importar Dados', icon: <CloudUpload />, path: '/importar' },
  { text: 'Alertas', icon: <Notifications />, path: '/alertas' },
];

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1E4B87',
          color: 'white',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          Transporte DF
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 1 }}>
          Sistema de Monitoramento
        </Typography>
      </Box>
      
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
      
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            sx={{
              cursor: 'pointer',
              mx: 1,
              borderRadius: '8px',
              mb: 1,
              backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.05)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              sx={{ 
                '& .MuiTypography-root': { 
                  fontSize: '0.95rem',
                  fontWeight: location.pathname === item.path ? 500 : 400
                } 
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};