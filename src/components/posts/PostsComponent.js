import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import CodeIcon from '@mui/icons-material/Code';
import DatasetIcon from '@mui/icons-material/Storage';
import VisualizationIcon from '@mui/icons-material/InsertChart';
import MLIcon from '@mui/icons-material/Psychology';

const MOCK_POSTS = [
  {
    id: 1,
    title: 'Introducere în Python pentru Data Science',
    content: 'Python este unul dintre cele mai populare limbaje de programare pentru Data Science datorită simplității sale și a multitudinii de biblioteci precum Pandas, NumPy și Scikit-learn. În acest post, vom explora elementele de bază ale Python pentru analiza datelor.',
    author: {
      name: 'Ana Popescu',
      avatar: 'A',
    },
    date: '2024-04-15',
    tags: ['Python', 'Începători', 'Tutorial'],
    category: 'code',
    likes: 42,
    comments: 8
  },
  {
    id: 2,
    title: 'Vizualizarea datelor cu Matplotlib și Seaborn',
    content: 'Vizualizarea datelor este o parte esențială a analizei de date. Prin reprezentări grafice bine realizate, putem înțelege mai bine datele și putem comunica mai eficient rezultatele. În acest articol, vom explora câteva tehnici de vizualizare folosind Matplotlib și Seaborn.',
    author: {
      name: 'Mihai Ionescu',
      avatar: 'M',
    },
    date: '2024-04-10',
    tags: ['Vizualizare', 'Matplotlib', 'Seaborn'],
    category: 'visualization',
    likes: 35,
    comments: 5
  },
  {
    id: 3,
    title: 'Seturi de date publice pentru proiecte de Machine Learning',
    content: 'Accesul la seturi de date de calitate este crucial pentru antrenarea modelelor de Machine Learning. În acest articol, voi prezenta 10 surse de date publice care pot fi folosite pentru diverse proiecte, de la clasificare la analiză de sentiment și predicții de serii temporale.',
    author: {
      name: 'Elena Dumitrescu',
      avatar: 'E',
    },
    date: '2024-04-05',
    tags: ['Dataset', 'Resurse', 'Open Data'],
    category: 'dataset',
    likes: 28,
    comments: 12
  }
];

function PostsComponent() {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    tags: '',
    category: 'code' // valoare implicită
  });
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [comment, setComment] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

  // Funcție pentru deschiderea dialogului de creare post
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Funcție pentru închiderea dialogului de creare post
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Funcție pentru modificarea câmpurilor formularului de post nou
  const handleNewPostChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value
    });
  };

  // Funcție pentru adăugarea unui post nou
  const handleAddPost = () => {
    const tagsArray = newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    
    const post = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.content,
      author: {
        name: JSON.parse(localStorage.getItem('user')).name || 'Utilizator',
        avatar: (JSON.parse(localStorage.getItem('user')).name || 'U')[0].toUpperCase()
      },
      date: new Date().toISOString().split('T')[0],
      tags: tagsArray,
      category: newPost.category,
      likes: 0,
      comments: 0
    };
    
    setPosts([post, ...posts]);
    setNewPost({
      title: '',
      content: '',
      tags: '',
      category: 'code'
    });
    handleCloseDialog();
  };

  // Funcții pentru gestionarea like-urilor
  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  // Funcții pentru gestionarea comentariilor
  const handleOpenCommentDialog = (post) => {
    setCurrentPost(post);
    setCommentDialogOpen(true);
  };

  const handleCloseCommentDialog = () => {
    setCommentDialogOpen(false);
    setComment('');
  };

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      setPosts(
        posts.map((post) =>
          post.id === currentPost.id
            ? { ...post, comments: post.comments + 1 }
            : post
        )
      );
      handleCloseCommentDialog();
    }
  };

  // Funcții pentru meniul de acțiuni pe post
  const handleMenuOpen = (event, postId) => {
    setAnchorEl(event.currentTarget);
    setSelectedPostId(postId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPostId(null);
  };

  const handleDeletePost = () => {
    setPosts(posts.filter(post => post.id !== selectedPostId));
    handleMenuClose();
  };

  // Funcție helper pentru a obține icoana categoriei
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'code':
        return <CodeIcon />;
      case 'dataset':
        return <DatasetIcon />;
      case 'visualization':
        return <VisualizationIcon />;
      case 'machine-learning':
        return <MLIcon />;
      default:
        return <CodeIcon />;
    }
  };

  // Funcție helper pentru formatarea datei
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ro-RO', options);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Postări despre Data Science
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Postare nouă
        </Button>
      </Box>

      {/* Dialog pentru crearea unei postări noi */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Creează o postare nouă</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Titlu"
            type="text"
            fullWidth
            variant="outlined"
            value={newPost.title}
            onChange={handleNewPostChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            id="content"
            name="content"
            label="Conținut"
            multiline
            rows={6}
            fullWidth
            variant="outlined"
            value={newPost.content}
            onChange={handleNewPostChange}
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
            value={newPost.tags}
            onChange={handleNewPostChange}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            margin="dense"
            id="category"
            name="category"
            label="Categorie"
            fullWidth
            variant="outlined"
            value={newPost.category}
            onChange={handleNewPostChange}
          >
            <MenuItem value="code">Cod</MenuItem>
            <MenuItem value="dataset">Dataset</MenuItem>
            <MenuItem value="visualization">Vizualizare</MenuItem>
            <MenuItem value="machine-learning">Machine Learning</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Anulează</Button>
          <Button 
            onClick={handleAddPost} 
            variant="contained" 
            disabled={!newPost.title || !newPost.content}
          >
            Publică
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog pentru adăugarea unui comentariu */}
      <Dialog open={commentDialogOpen} onClose={handleCloseCommentDialog}>
        <DialogTitle>Adaugă un comentariu</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Comentariul tău"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCommentDialog}>Anulează</Button>
          <Button 
            onClick={handleAddComment} 
            variant="contained" 
            disabled={!comment.trim()}
          >
            Publică
          </Button>
        </DialogActions>
      </Dialog>

      {/* Lista de postări */}
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Card elevation={3}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: post.category === 'code' ? 'primary.main' : 
                                          post.category === 'dataset' ? 'secondary.main' : 
                                          post.category === 'visualization' ? 'success.main' : 'warning.main',
                                mr: 1 }}>
                      {post.author.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1">{post.author.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(post.date)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip 
                      icon={getCategoryIcon(post.category)} 
                      label={post.category === 'code' ? 'Cod' : 
                              post.category === 'dataset' ? 'Dataset' : 
                              post.category === 'visualization' ? 'Vizualizare' : 'Machine Learning'} 
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <IconButton 
                      aria-label="post actions" 
                      onClick={(e) => handleMenuOpen(e, post.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="h6" component="h2" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {post.content}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {post.tags.map((tag, index) => (
                    <Chip key={index} label={tag} size="small" />
                  ))}
                </Box>
              </CardContent>
              <Divider />
              <CardActions>
                <Button 
                  startIcon={<ThumbUpIcon />} 
                  onClick={() => handleLike(post.id)}
                >
                  {post.likes}
                </Button>
                <Button 
                  startIcon={<CommentIcon />}
                  onClick={() => handleOpenCommentDialog(post)}
                >
                  {post.comments}
                </Button>
                <Button startIcon={<ShareIcon />}>
                  Distribuie
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Meniu pentru acțiuni pe postare */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Editează</MenuItem>
        <MenuItem onClick={handleDeletePost}>Șterge</MenuItem>
        <MenuItem onClick={handleMenuClose}>Salvează</MenuItem>
      </Menu>
    </Box>
  );
}

export default PostsComponent;