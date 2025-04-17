import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  AvatarGroup,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Divider,
  Tab,
  Tabs
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DatasetIcon from '@mui/icons-material/Dataset';
import CodeIcon from '@mui/icons-material/Code';
import ChatIcon from '@mui/icons-material/Chat';

// Date de exemplu pentru grupuri
const MOCK_GROUPS = [
  {
    id: 1,
    name: 'Machine Learning Enthusiasts',
    description: 'Un grup dedicat învățării și explorării conceptelor de machine learning și aplicațiilor practice.',
    members: [
      { id: 1, name: 'Ana Popescu', avatar: 'A', role: 'admin' },
      { id: 2, name: 'Mihai Ionescu', avatar: 'M', role: 'member' },
      { id: 3, name: 'Elena Dumitrescu', avatar: 'E', role: 'member' },
    ],
    projects: 2,
    datasets: 4,
    isOwner: true,
    tags: ['Machine Learning', 'Python', 'Deep Learning']
  },
  {
    id: 2,
    name: 'Data Visualization Club',
    description: 'Grup focusat pe tehnici și instrumente de vizualizare a datelor pentru a crea grafice și dashboarduri impresionante.',
    members: [
      { id: 2, name: 'Mihai Ionescu', avatar: 'M', role: 'admin' },
      { id: 1, name: 'Ana Popescu', avatar: 'A', role: 'member' },
      { id: 4, name: 'Andrei Munteanu', avatar: 'A', role: 'member' },
      { id: 5, name: 'Cristina Popa', avatar: 'C', role: 'member' },
    ],
    projects: 3,
    datasets: 2,
    isOwner: false,
    tags: ['Vizualizare', 'D3.js', 'Tableau', 'PowerBI']
  },
  {
    id: 3,
    name: 'Big Data Analysis',
    description: 'Grup dedicat analizei seturilor mari de date folosind tehnologii precum Hadoop, Spark și tehnici avansate de procesare.',
    members: [
      { id: 3, name: 'Elena Dumitrescu', avatar: 'E', role: 'admin' },
      { id: 1, name: 'Ana Popescu', avatar: 'A', role: 'member' },
    ],
    projects: 1,
    datasets: 5,
    isOwner: false,
    tags: ['Big Data', 'Hadoop', 'Spark', 'Analiza datelor']
  }
];

// Date de exemplu pentru utilizatori
const MOCK_USERS = [
  { id: 1, name: 'Ana Popescu', avatar: 'A' },
  { id: 2, name: 'Mihai Ionescu', avatar: 'M' },
  { id: 3, name: 'Elena Dumitrescu', avatar: 'E' },
  { id: 4, name: 'Andrei Munteanu', avatar: 'A' },
  { id: 5, name: 'Cristina Popa', avatar: 'C' },
  { id: 6, name: 'Ion Vasilescu', avatar: 'I' },
  { id: 7, name: 'Maria Stanescu', avatar: 'M' },
  { id: 8, name: 'George Popescu', avatar: 'G' }
];

function WorkGroupsComponent() {
  const [groups, setGroups] = useState(MOCK_GROUPS);
  const [openDialog, setOpenDialog] = useState(false);
  const [openGroupDialog, setOpenGroupDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    tags: ''
  });
  const [tabValue, setTabValue] = useState(0);
  const [openMembersDialog, setOpenMembersDialog] = useState(false);
  const [searchMember, setSearchMember] = useState('');

  // Funcție pentru deschiderea dialogului de creare grup
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Funcție pentru închiderea dialogului de creare grup
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewGroup({
      name: '',
      description: '',
      tags: ''
    });
  };

  // Funcție pentru modificarea câmpurilor formularului de grup nou
  const handleNewGroupChange = (e) => {
    const { name, value } = e.target;
    setNewGroup({
      ...newGroup,
      [name]: value
    });
  };

  // Funcție pentru adăugarea unui grup nou
  const handleAddGroup = () => {
    const tagsArray = newGroup.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    
    const group = {
      id: groups.length + 1,
      name: newGroup.name,
      description: newGroup.description,
      members: [
        { 
          id: 1, 
          name: JSON.parse(localStorage.getItem('user')).name || 'Utilizator', 
          avatar: (JSON.parse(localStorage.getItem('user')).name || 'U')[0].toUpperCase(),
          role: 'admin' 
        }
      ],
      projects: 0,
      datasets: 0,
      isOwner: true,
      tags: tagsArray
    };
    
    setGroups([...groups, group]);
    handleCloseDialog();
  };

  // Funcție pentru deschiderea dialogului de grup
  const handleOpenGroupDialog = (group) => {
    setSelectedGroup(group);
    setOpenGroupDialog(true);
  };

  // Funcție pentru închiderea dialogului de grup
  const handleCloseGroupDialog = () => {
    setOpenGroupDialog(false);
    setTabValue(0);
  };

  // Funcție pentru schimbarea tab-ului în dialogul de grup
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Funcție pentru deschiderea dialogului de membri
  const handleOpenMembersDialog = () => {
    setOpenMembersDialog(true);
  };

  // Funcție pentru închiderea dialogului de membri
  const handleCloseMembersDialog = () => {
    setOpenMembersDialog(false);
    setSearchMember('');
  };

  // Funcție pentru adăugarea unui membru în grup
  const handleAddMember = (user) => {
    if (selectedGroup) {
      const updatedGroups = groups.map(group => {
        if (group.id === selectedGroup.id) {
          // Verificăm dacă utilizatorul este deja membru
          if (!group.members.some(member => member.id === user.id)) {
            return {
              ...group,
              members: [...group.members, { ...user, role: 'member' }]
            };
          }
        }
        return group;
      });
      
      setGroups(updatedGroups);
      setSelectedGroup(updatedGroups.find(group => group.id === selectedGroup.id));
    }
  };

  // Funcție pentru eliminarea unui membru din grup
  const handleRemoveMember = (memberId) => {
    if (selectedGroup) {
      const updatedGroups = groups.map(group => {
        if (group.id === selectedGroup.id) {
          return {
            ...group,
            members: group.members.filter(member => member.id !== memberId)
          };
        }
        return group;
      });
      
      setGroups(updatedGroups);
      setSelectedGroup(updatedGroups.find(group => group.id === selectedGroup.id));
    }
  };

  // Funcție pentru părăsirea unui grup
  const handleLeaveGroup = (groupId) => {
    const updatedGroups = groups.filter(group => group.id !== groupId);
    setGroups(updatedGroups);
    if (selectedGroup && selectedGroup.id === groupId) {
      handleCloseGroupDialog();
    }
  };

  // Filtrarea utilizatorilor pentru adăugare în grup
  const filteredUsers = MOCK_USERS.filter(user => {
    const isAlreadyMember = selectedGroup?.members.some(member => member.id === user.id);
    const matchesSearch = user.name.toLowerCase().includes(searchMember.toLowerCase());
    return !isAlreadyMember && matchesSearch;
  });

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Grupuri de lucru
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Grup nou
        </Button>
      </Box>

      {/* Dialog pentru crearea unui grup nou */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Creează un grup nou</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Nume grup"
            type="text"
            fullWidth
            variant="outlined"
            value={newGroup.name}
            onChange={handleNewGroupChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Descriere"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={newGroup.description}
            onChange={handleNewGroupChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            id="tags"
            name="tags"
            label="Etichete (separate prin virgulă)"
            type="text"
            fullWidth
            variant="outlined"
            value={newGroup.tags}
            onChange={handleNewGroupChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Anulează</Button>
          <Button 
            onClick={handleAddGroup} 
            variant="contained" 
            disabled={!newGroup.name || !newGroup.description}
          >
            Creează
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog pentru vizualizarea și gestionarea grupului */}
      <Dialog open={openGroupDialog} onClose={handleCloseGroupDialog} maxWidth="md" fullWidth>
        {selectedGroup && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {selectedGroup.name}
                <Chip 
                  label={selectedGroup.isOwner ? "Administrator" : "Membru"} 
                  color={selectedGroup.isOwner ? "primary" : "default"} 
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" paragraph>
                {selectedGroup.description}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedGroup.tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" />
                ))}
              </Box>
              
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="group tabs">
                  <Tab label="Membri" icon={<GroupIcon />} iconPosition="start" />
                  <Tab label="Proiecte" icon={<InsertDriveFileIcon />} iconPosition="start" />
                  <Tab label="Date" icon={<DatasetIcon />} iconPosition="start" />
                  <Tab label="Discuții" icon={<ChatIcon />} iconPosition="start" />
                </Tabs>
              </Box>
              
              {tabValue === 0 && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      Membri ({selectedGroup.members.length})
                    </Typography>
                    {selectedGroup.isOwner && (
                      <Button 
                        variant="outlined" 
                        startIcon={<PersonAddIcon />}
                        onClick={handleOpenMembersDialog}
                      >
                        Adaugă membri
                      </Button>
                    )}
                  </Box>
                  
                  <List>
                    {selectedGroup.members.map((member) => (
                      <ListItem
                        key={member.id}
                        secondaryAction={
                          selectedGroup.isOwner && member.role !== 'admin' ? (
                            <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveMember(member.id)}>
                              <DeleteIcon />
                            </IconButton>
                          ) : null
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>{member.avatar}</Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={member.name} 
                          secondary={member.role === 'admin' ? 'Administrator' : 'Membru'} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {tabValue === 1 && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      Proiecte ({selectedGroup.projects})
                    </Typography>
                    <Button 
                      variant="outlined" 
                      startIcon={<AddIcon />}
                    >
                      Adaugă proiect
                    </Button>
                  </Box>
                  
                  {selectedGroup.projects === 0 ? (
                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', my: 4 }}>
                      Nu există proiecte în acest grup. Adaugă primul proiect!
                    </Typography>
                  ) : (
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar><CodeIcon /></Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary="Analiza sentimentelor din recenzii" 
                          secondary="Creat pe 10 aprilie 2024" 
                        />
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar><CodeIcon /></Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary="Predicția prețurilor imobiliare" 
                          secondary="Creat pe 5 aprilie 2024" 
                        />
                      </ListItem>
                    </List>
                  )}
                </Box>
              )}

              {tabValue === 2 && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      Seturi de date ({selectedGroup.datasets})
                    </Typography>
                    <Button 
                      variant="outlined" 
                      startIcon={<AddIcon />}
                    >
                      Adaugă date
                    </Button>
                  </Box>
                  
                  {selectedGroup.datasets === 0 ? (
                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', my: 4 }}>
                      Nu există seturi de date în acest grup. Adaugă primul set de date!
                    </Typography>
                  ) : (
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar><DatasetIcon /></Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary="Recenzii filme IMDB" 
                          secondary="50.000 rânduri • CSV • 8.5 MB" 
                        />
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar><DatasetIcon /></Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary="Date imobiliare România" 
                          secondary="12.000 rânduri • Excel • 3.2 MB" 
                        />
                      </ListItem>
                    </List>
                  )}
                </Box>
              )}

              {tabValue === 3 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Discuții
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', my: 4 }}>
                    Funcționalitatea de chat va fi implementată într-o versiune viitoare.
                  </Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={() => handleLeaveGroup(selectedGroup.id)} 
                color="error"
                startIcon={<ExitToAppIcon />}
              >
                {selectedGroup.isOwner ? 'Șterge grupul' : 'Părăsește grupul'}
              </Button>
              <Button onClick={handleCloseGroupDialog}>Închide</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Dialog pentru adăugarea membrilor */}
      <Dialog open={openMembersDialog} onClose={handleCloseMembersDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Adaugă membri noi</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="search-member"
            label="Caută utilizatori"
            type="text"
            fullWidth
            variant="outlined"
            value={searchMember}
            onChange={(e) => setSearchMember(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <List>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <ListItem key={user.id}>
                  <ListItemAvatar>
                    <Avatar>{user.avatar}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.name} />
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => handleAddMember(user)}
                  >
                    Adaugă
                  </Button>
                </ListItem>
              ))
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', my: 2 }}>
                {searchMember ? 'Niciun utilizator găsit' : 'Introdu un nume pentru a căuta utilizatori'}
              </Typography>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMembersDialog}>Închide</Button>
        </DialogActions>
      </Dialog>

      {/* Lista de grupuri */}
      <Grid container spacing={3}>
        {groups.map((group) => (
          <Grid item xs={12} sm={6} md={4} key={group.id}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {group.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {group.description}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Membri:
                  </Typography>
                  <AvatarGroup max={3}>
                    {group.members.map((member) => (
                      <Avatar key={member.id} sx={{ width: 24, height: 24 }}>
                        {member.avatar}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Chip 
                    label={`${group.projects} proiecte`} 
                    size="small" 
                    icon={<InsertDriveFileIcon />} 
                    variant="outlined"
                  />
                  <Chip 
                    label={`${group.datasets} seturi de date`} 
                    size="small" 
                    icon={<DatasetIcon />} 
                    variant="outlined"
                  />
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                  {group.tags.slice(0, 2).map((tag, index) => (
                    <Chip key={index} label={tag} size="small" />
                  ))}
                  {group.tags.length > 2 && (
                    <Chip label={`+${group.tags.length - 2}`} size="small" />
                  )}
                </Box>
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  variant="contained" 
                  onClick={() => handleOpenGroupDialog(group)}
                >
                  Deschide
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default WorkGroupsComponent;