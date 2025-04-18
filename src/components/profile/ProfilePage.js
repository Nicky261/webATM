import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Avatar, 
  Divider, 
  Chip, 
  Button, 
  Card, 
  CardContent,
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tab,
  Tabs
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DatasetIcon from '@mui/icons-material/Dataset';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CodeIcon from '@mui/icons-material/Code';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Mock data pentru grupuri si contributii
const MOCK_GROUPS = [
  { id: 1, name: 'Machine Learning Enthusiasts', role: 'Membru', members: 12 },
  { id: 2, name: 'Data Visualization Club', role: 'Admin', members: 8 },
];

const MOCK_RESOURCES = [
  { id: 1, title: 'Ghid Python pentru Data Science', type: 'document', date: '2024-04-10' },
  { id: 2, title: 'Set date Kaggle - Housing Prices', type: 'dataset', date: '2024-03-25' },
  { id: 3, title: 'Tutorial Pandas avansate', type: 'tutorial', date: '2024-02-15' },
];

const MOCK_LINKS = [
  { id: 1, title: 'GitHub', url: 'https://github.com' },
  { id: 2, title: 'LinkedIn', url: 'https://linkedin.com' },
  { id: 3, title: 'Blog personal', url: 'https://medium.com' },
];

const MOCK_POSTS = [
  { id: 1, title: 'Introducere în Python pentru Data Science', likes: 42, comments: 8, date: '2024-04-15' },
  { id: 2, title: 'Vizualizarea datelor cu Matplotlib și Seaborn', likes: 35, comments: 5, date: '2024-04-10' },
];

function ProfilePage() {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // in aplicatia reala, am face cerere catre backend pentru a obtine detaliile utilizatorului
    // in acest demo, vom folosi date mock sau utilizatorul curent
    
    // Simulare cere API
    setTimeout(() => {
      // Dacă nu avem userId sau userId este al utilizatorului curent, aratam profilul curent
      if (!userId || userId === currentUser.id) {
        setUser({
          ...currentUser,
          joinDate: currentUser.createdAt || '2024-01-01',
          education: 'Universitatea Politehnica din București',
          occupation: 'Student / Data Scientist',
          links: MOCK_LINKS,
          groups: MOCK_GROUPS,
          resources: MOCK_RESOURCES,
          posts: MOCK_POSTS
        });
      } else {
        // Date mock pentru alt utilizator
        setUser({
          id: userId,
          displayName: 'Ana Popescu',
          email: 'ana.popescu@example.com',
          avatarUrl: null,
          role: 'teacher',
          bio: 'Profesor de Data Science cu 5 ani de experiență în industrie. Pasionată de machine learning și vizualizare de date.',
          joinDate: '2023-10-15',
          education: 'Universitatea din București, Doctorat în Informatică',
          occupation: 'Profesor / Data Scientist Senior',
          links: MOCK_LINKS,
          groups: MOCK_GROUPS,
          resources: MOCK_RESOURCES,
          posts: MOCK_POSTS
        });
      }
      setLoading(false);
    }, 1000);
  }, [userId, currentUser]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'teacher':
        return 'Profesor';
      default:
        return 'Student';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'teacher':
        return 'primary';
      default:
        return 'success';
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'document':
        return <InsertDriveFileIcon />;
      case 'dataset':
        return <DatasetIcon />;
      case 'tutorial':
        return <CodeIcon />;
      default:
        return <BookmarkIcon />;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Typography>Se încarcă profilul...</Typography>
      </Box>
    );
  }

  const isCurrentUser = !userId || userId === currentUser.id;

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4 }}>
      {/* Informatii de baza despre profil */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, position: 'relative' }}>
        {isCurrentUser && (
          <IconButton 
            component={RouterLink} 
            to="/dashboard/settings" 
            sx={{ position: 'absolute', top: 16, right: 16 }}
          >
            <EditIcon />
          </IconButton>
        )}
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar 
              src={user.avatarUrl} 
              sx={{ width: 150, height: 150, mb: 2 }}
            >
              {!user.avatarUrl && user.displayName?.[0]}
            </Avatar>
            <Chip 
              label={getRoleLabel(user.role)} 
              color={getRoleColor(user.role)} 
              sx={{ mb: 1 }}
            />
          </Grid>
          
          <Grid item xs={12} md={9}>
            <Typography variant="h4" gutterBottom>
              {user.displayName}
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
              {user.bio || 'Nicio biografie specificată.'}
            </Typography>
            
            <Grid container spacing={2} sx={{ my: 1 }}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">{user.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">Membru din {new Date(user.joinDate).toLocaleDateString('ro-RO')}</Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                {user.education && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <SchoolIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{user.education}</Typography>
                  </Box>
                )}
                {user.occupation && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <WorkIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{user.occupation}</Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
            
            {user.links && user.links.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Link-uri
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {user.links.map((link) => (
                    <Chip
                      key={link.id}
                      icon={<LinkIcon />}
                      label={link.title}
                      component="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      clickable
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
      
      {/* Tabs pentru diferite sectiuni */}
      <Paper elevation={3} sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
        >
          <Tab label="Contribuții" />
          <Tab label="Grupuri" />
          <Tab label="Postări" />
        </Tabs>
        
        <Divider />
        
        {/* Continutul pentru tab-ul Contributii */}
        {tabValue === 0 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resurse și contribuții
            </Typography>
            
            {user.resources && user.resources.length > 0 ? (
              <List>
                {user.resources.map((resource) => (
                  <ListItem key={resource.id}>
                    <ListItemIcon>
                      {getResourceIcon(resource.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={resource.title}
                      secondary={`${resource.type.charAt(0).toUpperCase() + resource.type.slice(1)} • ${new Date(resource.date).toLocaleDateString('ro-RO')}`}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 3 }}>
                Nu există contribuții.
              </Typography>
            )}
          </Box>
        )}
        
        {/* Continutul pentru tab-ul Grupuri */}
        {tabValue === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Grupuri
            </Typography>
            
            {user.groups && user.groups.length > 0 ? (
              <Grid container spacing={2}>
                {user.groups.map((group) => (
                  <Grid item xs={12} sm={6} key={group.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {group.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {group.role} • {group.members} membri
                        </Typography>
                        <Button variant="text" size="small" sx={{ mt: 1 }}>
                          Vezi grupul
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 3 }}>
                Nu este membru în niciun grup.
              </Typography>
            )}
          </Box>
        )}
        
        {/* Continutul pentru tab-ul Postari */}
        {tabValue === 2 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Postări recente
            </Typography>
            
            {user.posts && user.posts.length > 0 ? (
              <List>
                {user.posts.map((post) => (
                  <React.Fragment key={post.id}>
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={
                        <Button variant="text" size="small">
                          Citește
                        </Button>
                      }
                    >
                      <ListItemText
                        primary={post.title}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {`${post.likes} aprecieri • ${post.comments} comentarii`}
                            </Typography>
                            {` — ${new Date(post.date).toLocaleDateString('ro-RO')}`}
                          </>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 3 }}>
                Nu există postări.
              </Typography>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default ProfilePage;