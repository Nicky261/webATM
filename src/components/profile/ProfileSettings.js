import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Grid, 
  Avatar, 
  Divider, 
  Alert, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  IconButton
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import { useAuth } from '../../contexts/AuthContext';

function ProfileSettings() {
  const { currentUser, updateProfile, isAdmin } = useAuth();
  const [formData, setFormData] = useState({
    displayName: currentUser?.displayName || '',
    email: currentUser?.email || '',
    bio: currentUser?.bio || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    role: currentUser?.role || 'student'
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(currentUser?.avatarUrl || null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      
      // Cream un URL pentru previzualizare
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // validari
    if (formData.newPassword !== '' && formData.newPassword !== formData.confirmPassword) {
      return setError('Parolele nu coincid');
    }

    // in realitate, aici am face o cerere către backend
    // pentru a actualiza informațiile utilizatorului

    // Pentru demo, vom simula actualizarea profilului
    const updatedData = {
      displayName: formData.displayName,
      bio: formData.bio,
      role: formData.role
    };

    if (avatarPreview && avatarPreview !== currentUser?.avatarUrl) {
      updatedData.avatarUrl = avatarPreview;
    }

    updateProfile(updatedData);
    setSuccess('Profilul a fost actualizat cu succes!');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Setări Profil
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar 
                src={avatarPreview} 
                sx={{ width: 150, height: 150, mb: 2 }}
              >
                {!avatarPreview && (currentUser?.displayName?.[0] || 'U')}
              </Avatar>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="avatar-upload"
                type="file"
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<PhotoCameraIcon />}
                >
                  Schimbă avatarul
                </Button>
              </label>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                Tip fișier: JPG, PNG, GIF<br />
                Dimensiune maximă: 2MB
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <TextField
                margin="normal"
                fullWidth
                label="Nume afișat"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                disabled
                helperText="Emailul nu poate fi modificat"
              />
              <TextField
                margin="normal"
                fullWidth
                label="Bio"
                name="bio"
                multiline
                rows={3}
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Scrie câteva cuvinte despre tine..."
              />

              {isAdmin && (
                <FormControl fullWidth margin="normal">
                  <InputLabel id="role-select-label">Rol</InputLabel>
                  <Select
                    labelId="role-select-label"
                    id="role-select"
                    name="role"
                    value={formData.role}
                    label="Rol"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="teacher">Profesor</MenuItem>
                    <MenuItem value="admin">Administrator</MenuItem>
                  </Select>
                </FormControl>
              )}
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>
            Schimbă parola
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Parola curentă"
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Parola nouă"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Confirmă parola"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Salvează modificările
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default ProfileSettings;