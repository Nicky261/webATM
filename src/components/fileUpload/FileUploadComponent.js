import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  LinearProgress, 
  List, 
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
  Divider,
  Alert
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function FileUploadComponent() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState('');

  // Gestionare selectare fișiere
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  // Verificare tipuri de fișiere (pentru platformă de data science)
  const isValidFileType = (file) => {
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 
                       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                       'application/json', 'text/plain', 'application/x-python-code'];
    return validTypes.includes(file.type) || file.name.endsWith('.py') || file.name.endsWith('.ipynb');
  };

  // Simulăm încărcarea fișierelor
  const handleUpload = () => {
    if (files.length === 0) {
      setError('Te rog selectează cel puțin un fișier.');
      return;
    }

    // Verificăm dacă toate fișierele sunt valide
    const invalidFiles = files.filter(file => !isValidFileType(file));
    if (invalidFiles.length > 0) {
      setError(`Următoarele fișiere nu sunt acceptate: ${invalidFiles.map(f => f.name).join(', ')}. 
                Acceptăm doar CSV, Excel, JSON, TXT, Python și Jupyter Notebook.`);
      return;
    }

    setError('');
    setUploading(true);
    setUploadProgress(0);

    // Simulăm procesul de încărcare
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          // Adăugăm fișierele la lista de fișiere încărcate
          setUploadedFiles(prevFiles => [...prevFiles, ...files.map(file => ({
            name: file.name,
            size: file.size,
            type: file.type,
            uploadDate: new Date().toISOString()
          }))]);
          setFiles([]);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  // Funcție pentru a șterge un fișier din lista de fișiere selectate
  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Funcție pentru a șterge un fișier din lista de fișiere încărcate
  const removeUploadedFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  // Funcție pentru a formata dimensiunea fișierului
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Funcție pentru a obține tipul de fișier pentru afișare
  const getFileTypeLabel = (file) => {
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) return 'CSV';
    if (file.type.includes('spreadsheetml') || file.type.includes('excel') || 
        file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) return 'Excel';
    if (file.type === 'application/json' || file.name.endsWith('.json')) return 'JSON';
    if (file.type === 'text/plain' || file.name.endsWith('.txt')) return 'Text';
    if (file.type === 'application/x-python-code' || file.name.endsWith('.py')) return 'Python';
    if (file.name.endsWith('.ipynb')) return 'Jupyter';
    return 'Other';
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Încărcare fișiere pentru analiză
        </Typography>
        <Typography variant="body1" paragraph>
          Încarcă fișiere CSV, Excel, JSON sau Jupyter Notebook pentru analiza datelor.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box 
          sx={{ 
            border: '2px dashed #ccc', 
            borderRadius: 2, 
            p: 3, 
            textAlign: 'center',
            mb: 3,
            backgroundColor: '#f9f9f9'
          }}
        >
          <input
            accept=".csv,.xlsx,.xls,.txt,.json,.py,.ipynb"
            style={{ display: 'none' }}
            id="upload-file-button"
            multiple
            type="file"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <label htmlFor="upload-file-button">
            <Button
              component="span"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2 }}
              disabled={uploading}
            >
              Selectează fișiere
            </Button>
          </label>
          <Typography variant="body2" color="textSecondary">
            Trage și plasează fișierele aici sau click pentru a selecta
          </Typography>
        </Box>

        {files.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Fișiere selectate ({files.length})
            </Typography>
            <List dense>
              {files.map((file, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => removeFile(index)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={file.name} 
                    secondary={formatFileSize(file.size)} 
                  />
                  <Chip 
                    label={getFileTypeLabel(file)} 
                    size="small" 
                    color={isValidFileType(file) ? "primary" : "error"}
                    sx={{ ml: 1 }}
                  />
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={uploading || files.length === 0}
              sx={{ mt: 2 }}
            >
              Încarcă {files.length} fișiere
            </Button>
          </Box>
        )}

        {uploading && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" gutterBottom>
              Se încarcă... {uploadProgress}%
            </Typography>
            <LinearProgress variant="determinate" value={uploadProgress} />
          </Box>
        )}
      </Paper>

      {uploadedFiles.length > 0 && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Fișiere încărcate
          </Typography>
          <List>
            {uploadedFiles.map((file, index) => (
              <React.Fragment key={index}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => removeUploadedFile(index)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={file.name} 
                    secondary={`${formatFileSize(file.size)} • ${new Date(file.uploadDate).toLocaleString()}`} 
                  />
                  <Chip 
                    label={getFileTypeLabel(file)} 
                    size="small" 
                    color="primary"
                    sx={{ ml: 1 }}
                  />
                </ListItem>
                {index < uploadedFiles.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

export default FileUploadComponent;