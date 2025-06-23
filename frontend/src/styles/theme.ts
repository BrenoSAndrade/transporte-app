import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1E4B87',
      light: '#4A6FA5',
      dark: '#0F2A4A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2E7D32',
      light: '#66BB6A',
      dark: '#1B5E20',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#5A6C7D',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#1E4B87',
    },
    h5: {
      fontWeight: 500,
      color: '#2C3E50',
    },
    h6: {
      fontWeight: 500,
      color: '#2C3E50',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: '12px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});