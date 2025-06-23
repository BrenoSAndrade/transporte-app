import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Chip,
} from '@mui/material';
import { Menu, Refresh } from '@mui/icons-material';

interface HeaderProps {
  onMenuClick: () => void;
  onRefresh?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, onRefresh }) => {
  const currentTime = new Date().toLocaleTimeString('pt-BR');

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuClick}
          edge="start"
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistema de Transporte Público - DF
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip 
            label={`Atualizado: ${currentTime}`}
            variant="outlined"
            sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
          />
          
          {onRefresh && (
            <IconButton color="inherit" onClick={onRefresh}>
              <Refresh />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};