import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Chip,
  Button,
  LinearProgress
} from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import DatasetIcon from '@mui/icons-material/Dataset';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';

function DashboardHomeComponent() {
  // Date sim. pentru activ. recente
  const recentActivities = [
    { id: 1, type: 'dataset', title: 'Ai încărcat setul de date "Vânzări 2024.csv"', time: '2 ore în urmă' },
    { id: 2, type: 'post', title: 'Ana Popescu a comentat la postarea ta', time: '5 ore în urmă' },
    { id: 3, type: 'group', title: 'Ai fost adăugat în grupul "Machine Learning Enthusiasts"', time: '1 zi în urmă' },
    { id: 4, type: 'post', title: 'Postarea ta a primit 5 aprecieri noi', time: '2 zile în urmă' }
  ];

  // Date sim. pentru proiecte active
  const activeProjects = [
    { id: 1, title: 'Analiză sentiment recenzii', progress: 70, group: 'Machine Learning Enthusiasts' },
    { id: 2, title: 'Predicție prețuri imobiliare', progress: 40, group: 'Data Science Club' },
    { id: 3, title: 'Vizualizare COVID-19', progress: 90, group: 'Data Visualization Club' }
  ];

  // Date sim. pentru cursuri recomandate
  const recommendedCourses = [
    { id: 1, title: 'Python pentru Data Science', level: 'Începător', duration: '20 ore' },
    { id: 2, title: 'Machine Learning Fundamentals', level: 'Intermediar', duration: '35 ore' },
    { id: 3, title: 'Visualization with D3.js', level: 'Avansat', duration: '25 ore' }
  ];

  // iconita coresp pt tipului de activitate
  const getActivityIcon = (type) => {
    switch (type) {
      case 'dataset':
        return <DatasetIcon color="primary" />;
      case 'post':
        return <InsertChartIcon color="secondary" />;
      case 'group':
        return <PeopleIcon color="success" />;
      default:
        return <CodeIcon />;
    }
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bine ai venit pe DataLearn Platform!
      </Typography>
      <Typography variant="body1" paragraph>
        Aceasta este o platformă educațională pentru Data Science unde poți încărca fișiere, 
        crea postări și gestiona grupuri de lucru.
      </Typography>

      {/* Panouri de statistici */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              height: '100%',
              bgcolor: 'background.default',
              borderTop: '4px solid #3f51b5',
            }}
          >
            <DatasetIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h5" component="div">
              12
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Seturi de date
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              height: '100%',
              bgcolor: 'background.default',
              borderTop: '4px solid #f50057',
            }}
          >
            <InsertChartIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h5" component="div">
              8
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Postări
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              height: '100%',
              bgcolor: 'background.default',
              borderTop: '4px solid #4caf50',
            }}
          >
            <PeopleIcon sx={{ fontSize: 40, mb: 1, color: '#4caf50' }} />
            <Typography variant="h5" component="div">
              3
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Grupuri de lucru
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              height: '100%',
              bgcolor: 'background.default',
              borderTop: '4px solid #ff9800',
            }}
          >
            <TrendingUpIcon sx={{ fontSize: 40, mb: 1, color: '#ff9800' }} />
            <Typography variant="h5" component="div">
              5
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Proiecte active
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* activ recente & proiecte */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardHeader 
              title="Activități recente" 
              titleTypographyProps={{ variant: 'h6' }}
              sx={{ pb: 0 }}
            />
            <CardContent>
              <List>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem alignItems="flex-start" sx={{ py: 1 }}>
                      <Avatar sx={{ mr: 2, bgcolor: 'transparent' }}>
                        {getActivityIcon(activity.type)}
                      </Avatar>
                      <ListItemText
                        primary={activity.title}
                        secondary={activity.time}
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Button variant="text">Vezi toate activitățile</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardHeader 
              title="Proiecte active" 
              titleTypographyProps={{ variant: 'h6' }}
              sx={{ pb: 0 }}
            />
            <CardContent>
              <List>
                {activeProjects.map((project, index) => (
                  <React.Fragment key={project.id}>
                    <ListItem alignItems="flex-start" sx={{ py: 1 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle1">
                            {project.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {project.progress}%
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={project.progress} 
                          sx={{ mb: 1, height: 8, borderRadius: 5 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          Grup: {project.group}
                        </Typography>
                      </Box>
                    </ListItem>
                    {index < activeProjects.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Button variant="text">Vezi toate proiectele</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* cursuri recomandate */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardHeader 
          title="Cursuri recomandate" 
          titleTypographyProps={{ variant: 'h6' }}
          sx={{ pb: 0 }}
        />
        <CardContent>
          <Grid container spacing={2}>
            {recommendedCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <SchoolIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" component="div">
                      {course.title}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Chip 
                      label={course.level} 
                      size="small" 
                      color={
                        course.level === 'Începător' ? 'success' : 
                        course.level === 'Intermediar' ? 'primary' : 'secondary'
                      }
                      sx={{ mr: 1 }}
                    />
                    <Chip 
                      label={course.duration} 
                      size="small" 
                      variant="outlined"
                    />
                  </Box>
                  <Box sx={{ mt: 'auto', pt: 1 }}>
                    <Button variant="outlined" fullWidth>
                      Detalii curs
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Resurse utile */}
      <Card elevation={3}>
        <CardHeader 
          title="Resurse utile pentru Data Science" 
          titleTypographyProps={{ variant: 'h6' }}
          sx={{ pb: 0 }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                variant="outlined" 
                sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }}
              >
                <CodeIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="subtitle1">
                  Python Cheatsheet
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                variant="outlined" 
                sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }}
              >
                <DatasetIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="subtitle1">
                  Resurse de date
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                variant="outlined" 
                sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }}
              >
                <InsertChartIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="subtitle1">
                  Vizualizare date
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                variant="outlined" 
                sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }}
              >
                <PeopleIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="subtitle1">
                  Comunitate DS
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DashboardHomeComponent;