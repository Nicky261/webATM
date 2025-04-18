import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Grid, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SaveIcon from '@mui/icons-material/Save';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MonacoEditor from 'react-monaco-editor';
import { useAuth } from '../../contexts/AuthContext';

// Template-uri de cod predefinite
const CODE_TEMPLATES = {
  python: {
    basic: `# Cod Python simplu
print("Hello, world!")

# Definim o funcție
def greet(name):
    return f"Hello, {name}!"

# Apelăm funcția
result = greet("Data Scientist")
print(result)`,
    
    datascience: `# Import biblioteci
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Creăm un set de date simplu
data = {
    'x': np.random.rand(100),
    'y': np.random.rand(100)
}

# Convertim la DataFrame
df = pd.DataFrame(data)

# Afișăm primele rânduri
print(df.head())

# Calculăm statistici de bază
print(df.describe())

# Creăm un grafic scatter
plt.scatter(df['x'], df['y'])
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Scatter Plot')
plt.show()`,
    
    ml: `# Import biblioteci pentru machine learning
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Generăm date
np.random.seed(42)
X = np.random.rand(100, 1) * 10
y = 2 * X + 1 + np.random.randn(100, 1)

# Împărțim datele în seturi de antrenare și testare
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Creăm și antrenăm modelul
model = LinearRegression()
model.fit(X_train, y_train)

# Facem predicții
y_pred = model.predict(X_test)

# Evaluăm modelul
mse = mean_squared_error(y_test, y_pred)
print(f"Coeficient: {model.coef_[0][0]:.4f}")
print(f"Interceptor: {model.intercept_[0]:.4f}")
print(f"Mean Squared Error: {mse:.4f}")

# Visualizăm rezultatele
import matplotlib.pyplot as plt
plt.scatter(X_test, y_test, color='black', label='Actual')
plt.plot(X_test, y_pred, color='blue', linewidth=3, label='Predicted')
plt.xlabel('X')
plt.ylabel('y')
plt.title('Linear Regression')
plt.legend()
plt.show()`
  }
};

// Date mock pentru proiecte salvate
const MOCK_SAVED_PROJECTS = [
  { 
    id: 1, 
    name: 'Analiză de date - Titanic', 
    language: 'python', 
    isPublic: true, 
    description: 'Analiză exploratorie a setului de date Titanic',
    createdAt: '2024-04-10'
  },
  { 
    id: 2, 
    name: 'Recunoaștere cifre MNIST', 
    language: 'python', 
    isPublic: false, 
    description: 'Model simplu pentru recunoașterea cifrelor scrise de mână',
    createdAt: '2024-04-05'
  }
];

function CodeEditorComponent() {
  const [language, setLanguage] = useState('python');
  const [template, setTemplate] = useState('basic');
  const [code, setCode] = useState(CODE_TEMPLATES.python.basic);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [openProjectDialogOpen, setOpenProjectDialogOpen] = useState(false);
  const [savedProjects, setSavedProjects] = useState(MOCK_SAVED_PROJECTS);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    isPublic: false
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const { currentUser } = useAuth();
  
  // Efect pentru actualizarea codului cand se schimba template-ul
  useEffect(() => {
    if (CODE_TEMPLATES[language] && CODE_TEMPLATES[language][template]) {
      setCode(CODE_TEMPLATES[language][template]);
    }
  }, [language, template]);
  
  // Opțiuni pentru editor
  const editorOptions = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
  };
  
  // func pentru rularea codului (simulare)
  const runCode = () => {
    setIsRunning(true);
    setOutput('');

    // simulare rularea codului cu un delay
    setTimeout(() => {
      let simulatedOutput = '';
      
      if (language === 'python') {
        if (template === 'basic') {
          simulatedOutput = `Hello, world!
Hello, Data Scientist!`;
        } else if (template === 'datascience') {
          simulatedOutput = `   x         y
0  0.374540  0.950714
1  0.731994  0.598658
2  0.598658  0.156019
3  0.156019  0.155995
4  0.155995  0.058084

              x         y
count  100.000000  100.00000
mean     0.503198    0.49346
std      0.292520    0.28838
min      0.020584    0.01724
25%      0.256890    0.23145
50%      0.538817    0.49692
75%      0.750865    0.76175
max      0.978618    0.99756

[INFO] Plot displayed: Scatter Plot`;
        } else if (template === 'ml') {
          simulatedOutput = `Coeficient: 2.0336
Interceptor: 0.9526
Mean Squared Error: 0.9942

[INFO] Plot displayed: Linear Regression Model`;
        }
      }
      
      setOutput(simulatedOutput);
      setIsRunning(false);
    }, 1500);
  };
  
  // func pentru gestionarea dialogului de salvare
  const handleOpenSaveDialog = () => {
    setSaveDialogOpen(true);
    setNewProject({
      name: '',
      description: '',
      isPublic: false
    });
  };
  
  const handleCloseSaveDialog = () => {
    setSaveDialogOpen(false);
  };
  
  const handleNewProjectChange = (e) => {
    const { name, value, checked } = e.target;
    setNewProject({
      ...newProject,
      [name]: name === 'isPublic' ? checked : value
    });
  };
  
  const handleSaveProject = () => {
    // aici ar fi o cerere catre backend
    const project = {
      id: savedProjects.length + 1,
      name: newProject.name,
      description: newProject.description,
      language: language,
      isPublic: newProject.isPublic,
      createdAt: new Date().toISOString().split('T')[0],
      code: code
    };
    
    setSavedProjects([...savedProjects, project]);
    setSaveDialogOpen(false);
    
    setNotification({
      open: true,
      message: 'Proiectul a fost salvat cu succes!',
      severity: 'success'
    });
  };
  
  // func pentru gestionarea dialogului de deschidere proiect
  const handleOpenProjectDialog = () => {
    setOpenProjectDialogOpen(true);
  };
  
  const handleCloseProjectDialog = () => {
    setOpenProjectDialogOpen(false);
  };
  
  const handleOpenProject = (project) => {
    // backend... de fapt
    // Pentru demo, simulam codul pentru proiectul selectat
    const mockedCode = CODE_TEMPLATES[project.language][
      project.name.includes('Titanic') ? 'datascience' : 
      project.name.includes('MNIST') ? 'ml' : 'basic'
    ];

    setCode(mockedCode);
    setTemplate(
      project.name.includes('Titanic') ? 'datascience' : 
      project.name.includes('MNIST') ? 'ml' : 'basic'
    );
    setOpenProjectDialogOpen(false);
    
    setNotification({
      open: true,
      message: `Proiectul "${project.name}" a fost deschis.`,
      severity: 'info'
    });
  };
  
  // func pentru copierea codului în clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code).then(
      () => {
        setNotification({
          open: true,
          message: 'Codul a fost copiat în clipboard!',
          severity: 'success'
        });
      },
      (err) => {
        setNotification({
          open: true,
          message: 'Eroare la copierea codului!',
          severity: 'error'
        });
      }
    );
  };
  
  // inchidere notificare
  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Editor de Cod
        </Typography>
        <Typography variant="body1" paragraph>
          Scrie, rulează și salvează cod pentru analiză de date și machine learning.
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth>
              <InputLabel id="language-select-label">Limbaj</InputLabel>
              <Select
                labelId="language-select-label"
                id="language-select"
                value={language}
                label="Limbaj"
                onChange={(e) => setLanguage(e.target.value)}
              >
                <MenuItem value="python">Python</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth>
              <InputLabel id="template-select-label">Template</InputLabel>
              <Select
                labelId="template-select-label"
                id="template-select"
                value={template}
                label="Template"
                onChange={(e) => setTemplate(e.target.value)}
              >
                <MenuItem value="basic">Python de bază</MenuItem>
                <MenuItem value="datascience">Analiză de date</MenuItem>
                <MenuItem value="ml">Machine Learning</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={6}>
            <Box sx={{ display: 'flex', gap: 1, height: '100%', alignItems: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PlayArrowIcon />}
                onClick={runCode}
                disabled={isRunning}
                sx={{ flexGrow: 1 }}
              >
                {isRunning ? 'Se execută...' : 'Rulează codul'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<SaveIcon />}
                onClick={handleOpenSaveDialog}
                sx={{ flexGrow: 1 }}
              >
                Salvează
              </Button>
              <Button
                variant="outlined"
                onClick={handleOpenProjectDialog}
                sx={{ flexGrow: 1 }}
              >
                Deschide
              </Button>
              <IconButton onClick={handleCopyCode} title="Copiază codul">
                <ContentCopyIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ border: '1px solid #ccc', borderRadius: 1, mb: 2 }}>
          <MonacoEditor
            width="100%"
            height="400"
            language={language}
            theme="vs-dark"
            value={code}
            options={editorOptions}
            onChange={setCode}
          />
        </Box>
        
        <Typography variant="h6" gutterBottom>
          Output
        </Typography>
        <Box 
          sx={{ 
            backgroundColor: '#1e1e1e', 
            color: '#fff', 
            p: 2, 
            borderRadius: 1, 
            fontFamily: 'monospace', 
            whiteSpace: 'pre-wrap',
            minHeight: '150px',
            maxHeight: '300px',
            overflow: 'auto'
          }}
        >
          {isRunning ? (
            <Typography sx={{ color: '#ccc' }}>
              Se execută codul...
            </Typography>
          ) : output ? (
            output
          ) : (
            <Typography sx={{ color: '#ccc' }}>
              Rulează codul pentru a vedea rezultatele aici.
            </Typography>
          )}
        </Box>
      </Paper>
      
      {/* Dialog pentru salvarea proiectului */}
      <Dialog open={saveDialogOpen} onClose={handleCloseSaveDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Salvează proiectul</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Numele proiectului"
            type="text"
            fullWidth
            variant="outlined"
            value={newProject.name}
            onChange={handleNewProjectChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Descriere"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={newProject.description}
            onChange={handleNewProjectChange}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={newProject.isPublic}
                onChange={handleNewProjectChange}
                name="isPublic"
              />
            }
            label="Proiect public (vizibil pentru toți utilizatorii)"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSaveDialog}>Anulează</Button>
          <Button 
            onClick={handleSaveProject} 
            variant="contained"
            disabled={!newProject.name}
          >
            Salvează
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Dialog pentru deschiderea unui proiect */}
      <Dialog open={openProjectDialogOpen} onClose={handleCloseProjectDialog} maxWidth="md" fullWidth>
        <DialogTitle>Deschide un proiect</DialogTitle>
        <DialogContent>
          {savedProjects.length > 0 ? (
            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Proiectele tale
              </Typography>
              <Grid container spacing={2}>
                {savedProjects.map((project) => (
                  <Grid item xs={12} sm={6} md={4} key={project.id}>
                    <Paper 
                      elevation={2} 
                      sx={{ 
                        p: 2, 
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        }
                      }}
                      onClick={() => handleOpenProject(project)}
                    >
                      <Typography variant="h6" noWrap>
                        {project.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {project.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="caption">
                          {project.language.toUpperCase()}
                        </Typography>
                        <Typography variant="caption">
                          {project.isPublic ? 'Public' : 'Privat'}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {project.createdAt}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Typography sx={{ textAlign: 'center', py: 4 }}>
              Nu ai niciun proiect salvat. Salvează-ți primul proiect!
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProjectDialog}>Închide</Button>
        </DialogActions>
      </Dialog>
      
      {/* Notificari */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CodeEditorComponent;