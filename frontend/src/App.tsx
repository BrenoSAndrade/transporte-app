import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './styles/theme';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { Monitoramento } from './pages/Monitoramento';
import { Demanda } from './pages/Demanda';
import { Relatorios } from './pages/Relatorios';
import { ImportarDados } from './pages/ImportarDados';
import { Alertas } from './pages/Alertas';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header onMenuClick={handleMenuClick} onRefresh={handleRefresh} />
          <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
          
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              pt: '64px', // Height of AppBar
              backgroundColor: '#F5F7FA',
              minHeight: '100vh',
            }}
          >
            <Routes>
              <Route path="/" element={<Monitoramento />} />
              <Route path="/demanda" element={<Demanda />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="/importar" element={<ImportarDados />} />
              <Route path="/alertas" element={<Alertas />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;