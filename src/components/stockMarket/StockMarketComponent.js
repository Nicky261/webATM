import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Grid, 
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Card,
  CardContent,
  Divider,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import axios from 'axios';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

function StockMarketComponent() {
  const [symbol, setSymbol] = useState('');
  const [period, setPeriod] = useState('1month');
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  // Funcție mock pentru a genera date pentru demo
  // În aplicația reală, aici s-ar face cererea către API-ul extern
  const fetchStockData = async () => {
    if (!symbol.trim()) {
      setError('Te rugăm să introduci un simbol bursier valid.');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // În aplicația reală, aici ar fi cererea axios
      // const response = await axios.get(`https://api-endpoint/stock/${symbol}/period/${period}`);
      
      // Pentru demo, generăm date fictive
      const mockData = generateMockStockData(symbol, period);
      
      setTimeout(() => {
        setStockData(mockData.data);
        setStats(mockData.stats);
        setLoading(false);
      }, 1000); // Simulăm un delay de rețea
    } catch (err) {
      setError('A apărut o eroare la încărcarea datelor. Te rugăm să încerci din nou.');
      setLoading(false);
    }
  };

  // Funcție helper pentru a genera date mock
  const generateMockStockData = (symbol, period) => {
    const today = new Date();
    const data = [];
    
    let numberOfDays;
    switch (period) {
      case '1week':
        numberOfDays = 7;
        break;
      case '1month':
        numberOfDays = 30;
        break;
      case '3months':
        numberOfDays = 90;
        break;
      case '1year':
        numberOfDays = 365;
        break;
      default:
        numberOfDays = 30;
    }
    
    // Generăm un preț de start aleatoriu între 50 și 500
    let basePrice = Math.floor(Math.random() * 450) + 50;
    let trend = Math.random() > 0.5 ? 1 : -1; // tendință aleatorie
    
    // Adăugăm un element pentru fiecare zi
    for (let i = numberOfDays; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      // Fluctuație zilnică între -3% și +3%
      const dailyChange = (Math.random() * 0.06 - 0.03 + (trend * 0.005)) * basePrice;
      basePrice += dailyChange;
      
      // Ne asigurăm că prețul nu scade sub 10
      basePrice = Math.max(basePrice, 10);
      
      data.push({
        date: date.toISOString().split('T')[0],
        price: parseFloat(basePrice.toFixed(2)),
        volume: Math.floor(Math.random() * 10000000) + 1000000
      });
    }
    
    // Calculăm câteva statistici
    const lastPrice = data[data.length - 1].price;
    const firstPrice = data[0].price;
    const change = lastPrice - firstPrice;
    const percentChange = (change / firstPrice) * 100;
    
    const min = Math.min(...data.map(item => item.price));
    const max = Math.max(...data.map(item => item.price));
    
    // Calculăm mediile mobile
    const sma10 = calculateSMA(data, 10);
    const sma30 = calculateSMA(data, 30);
    
    return {
      data: data,
      stats: {
        lastPrice: lastPrice,
        change: change,
        percentChange: percentChange,
        min: min,
        max: max,
        volume: data[data.length - 1].volume,
        sma10: sma10,
        sma30: sma30
      }
    };
  };
  
  // Funcție pentru calculul mediei mobile (Simple Moving Average)
  const calculateSMA = (data, period) => {
    if (data.length < period) return null;
    
    const lastValues = data.slice(-period).map(item => item.price);
    const sum = lastValues.reduce((acc, price) => acc + price, 0);
    return parseFloat((sum / period).toFixed(2));
  };

  // Formatăm datele pentru grafic, inclusiv mediile mobile
  const formatChartData = () => {
    if (!stockData) return [];
    
    return stockData.map((dataPoint, index, array) => {
      let sma10 = null;
      let sma30 = null;
      
      if (index >= 9) {
        // Calculăm SMA-10 pentru acest punct
        sma10 = array.slice(index - 9, index + 1)
          .reduce((sum, item) => sum + item.price, 0) / 10;
      }
      
      if (index >= 29) {
        // Calculăm SMA-30 pentru acest punct
        sma30 = array.slice(index - 29, index + 1)
          .reduce((sum, item) => sum + item.price, 0) / 30;
      }
      
      return {
        ...dataPoint,
        sma10: sma10 ? parseFloat(sma10.toFixed(2)) : null,
        sma30: sma30 ? parseFloat(sma30.toFixed(2)) : null
      };
    });
  };

  // Pentru exemple de simboluri
  const exampleSymbols = [
    { name: 'Apple', symbol: 'AAPL' },
    { name: 'Microsoft', symbol: 'MSFT' },
    { name: 'Google', symbol: 'GOOGL' },
    { name: 'Amazon', symbol: 'AMZN' },
    { name: 'Tesla', symbol: 'TSLA' },
    { name: 'Meta', symbol: 'META' }
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Analiză Prețuri Bursiere
        </Typography>
        <Typography variant="body1" paragraph>
          Caută simbolul unei acțiuni pentru a vedea evoluția prețului și statistici.
        </Typography>
        
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Simbol bursier (ex: AAPL, MSFT)"
              variant="outlined"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              InputProps={{
                endAdornment: (
                  <SearchIcon color="action" />
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Perioadă</InputLabel>
              <Select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                label="Perioadă"
              >
                <MenuItem value="1week">1 Săptămână</MenuItem>
                <MenuItem value="1month">1 Lună</MenuItem>
                <MenuItem value="3months">3 Luni</MenuItem>
                <MenuItem value="1year">1 An</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              fullWidth
              onClick={fetchStockData}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <BarChartIcon />}
            >
              {loading ? 'Se încarcă...' : 'Analizează'}
            </Button>
          </Grid>
        </Grid>
        
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Exemple: 
            {exampleSymbols.map((item, index) => (
              <Chip 
                key={index}
                label={`${item.name} (${item.symbol})`}
                onClick={() => setSymbol(item.symbol)}
                sx={{ ml: 1, mt: 1 }}
                size="small"
              />
            ))}
          </Typography>
        </Box>
      </Paper>
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      
      {stockData && stats && !loading && (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Preț curent
                  </Typography>
                  <Typography variant="h4" component="div">
                    ${stats.lastPrice.toFixed(2)}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    {stats.change >= 0 ? (
                      <TrendingUpIcon sx={{ color: 'success.main', mr: 1 }} />
                    ) : (
                      <TrendingDownIcon sx={{ color: 'error.main', mr: 1 }} />
                    )}
                    <Typography 
                      color={stats.change >= 0 ? 'success.main' : 'error.main'}
                      variant="body2"
                    >
                      {stats.change >= 0 ? '+' : ''}{stats.change.toFixed(2)} ({stats.percentChange.toFixed(2)}%)
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Volum tranzacționat
                  </Typography>
                  <Typography variant="h4" component="div">
                    {(stats.volume / 1000000).toFixed(2)}M
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Volumul tranzacțiilor din ultima zi
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Interval de preț
                  </Typography>
                  <Typography variant="h5" component="div">
                    ${stats.min.toFixed(2)} - ${stats.max.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Min-Max în perioada selectată
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Medii mobile
                  </Typography>
                  <Box>
                    <Typography variant="body1">
                      SMA10: ${stats.sma10 ? stats.sma10.toFixed(2) : 'N/A'}
                    </Typography>
                    <Typography variant="body1">
                      SMA30: ${stats.sma30 ? stats.sma30.toFixed(2) : 'N/A'}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Indicatori de tendință
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Evoluția prețului pentru {symbol} - {period === '1week' ? 'Ultima săptămână' : 
                                             period === '1month' ? 'Ultima lună' : 
                                             period === '3months' ? 'Ultimele 3 luni' : 'Ultimul an'}
            </Typography>
            <Box sx={{ height: 400, pt: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={formatChartData()}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      // Afișăm doar o parte din datele pe axa X pentru a evita aglomerarea
                      const date = new Date(value);
                      return `${date.getDate()}/${date.getMonth() + 1}`;
                    }}
                  />
                  <YAxis 
                    domain={['auto', 'auto']}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Preț']}
                    labelFormatter={(value) => `Data: ${value}`}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    name="Preț"
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sma10" 
                    name="SMA 10 zile"
                    stroke="#ff7300" 
                    dot={false}
                    activeDot={false}
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sma30" 
                    name="SMA 30 zile"
                    stroke="#82ca9d" 
                    dot={false}
                    activeDot={false}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
          
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Volumul tranzacțiilor
            </Typography>
            <Box sx={{ height: 200, pt: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={stockData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getDate()}/${date.getMonth() + 1}`;
                    }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${(value / 1000000).toFixed(2)}M`, 'Volum']}
                    labelFormatter={(value) => `Data: ${value}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="volume"
                    name="Volum"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
}

export default StockMarketComponent;