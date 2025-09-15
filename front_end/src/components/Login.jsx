import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: { fontFamily: 'Inter, sans-serif' },
  components: {
    MuiTextField: { styleOverrides: { root: { marginBottom: '16px' } } },
    MuiButton: { styleOverrides: { root: { marginTop: '8px' } } },
  },
});

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Sending form data:", form);

    try {
      const response = await axios.post('/api/user/login', form);

      // Show message
      alert(response.data.message);

      // Save token only if available
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      // Redirect on success
      if (response.data.message === "Login Successfull") {
        navigate('/');
      }

    } catch (error) {
      console.error('Login error:', error);

      if (error.response) {
        alert(error.response.data.message || "Login failed");
      } else {
        alert("Server not reachable");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <Box sx={{
          width: 320, padding: '20px', border: '2px solid black', borderRadius: '5px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          backgroundColor: '#ffffffff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
        }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>Log In</Typography>
          <form style={{ width: '100%' }} onSubmit={handleLogin}>
            <TextField
              fullWidth label="E-mail Id" placeholder="e-mail" variant="outlined"
              type="email" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              fullWidth label="Password" placeholder="password" variant="outlined"
              type="password" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button fullWidth variant="contained" color="primary" type="submit" sx={{ backgroundColor: 'blue', color: 'white' }}>
              Log In
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
