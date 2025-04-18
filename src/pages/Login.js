import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Link,
  Alert,
  IconButton
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ParticlesBackground from '../components/common/ParticlesBackground';
import { useTheme } from '../contexts/ThemeContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { mode, toggleTheme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    // in realitate, aici e cerere catre backend
    
    // simulare autentificare reusita
    if (email === 'demo@example.com' && password === 'password') {
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('user', JSON.stringify({ email, name: 'Demo User' }));
      window.location.href = '/dashboard';
    } else {
      setError('Email sau parolă incorecte');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <ParticlesBackground theme={mode} />
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper 
          elevation={3} 
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            bgcolor: 'background.paper',
            position: 'relative',
            zIndex: 1
          }}
        >
          <Typography component="h1" variant="h5">
            DataLearn Platform
          </Typography>
          <Typography component="h2" variant="h5" sx={{ mt: 1 }}>
            Autentificare
          </Typography>
          
          {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresă de email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Parolă"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Autentificare
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Nu ai un cont? Înregistrează-te"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;