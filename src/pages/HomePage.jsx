import * as React from 'react';
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { Container, Box, Typography, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CardMedia from '@mui/material/CardMedia';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


function Homepage() {

  const navigate = useNavigate();
  const [isPrepped, setIsPrepped] = useState(false);

  const TogglePrep = () => {
    setIsPrepped(!isPrepped);
  };

  const [week, setweek] = React.useState('');

  const handleChange1 = (event) => {
    setweek(event.target.value);
  };

  const [show, setshow] = useState('');

  const handleChange2 = (event) => {
    setshow(event.target.value);
  };

  const counter = [1, 2, 3];

  return(
    <>
      <Container sx={{ m:0, p:2, display: 'flex', gap: 2, maxwidth: '100%'}}>
        {/* week label */}
        <Box sx={{ minWidth: 120, p:0 }}>
          <Typography variant="h6">Week:</Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Week</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={week}
              label="week"
              onChange={handleChange1}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* status */}
        <Box sx={{ minWidth: 120, p:0 }}>
          <Typography variant="h6">Status</Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={show}
              label="show"
              onChange={handleChange2}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Container>
      {/* meal trackers */}
      <Container sx={{p: 0, m:0, p:2, mx: 'auto', maxWidth: '100%'}}>
        <Typography variant='h6'>Monday:</Typography>
        {/* the cards */}
        <Grid container spacing={2}  sx={{m:0, p:2, display: 'flex', gap: 4, justifyContent: 'center'}}>
          {counter.map(() => (
            // one card
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ minWidth: 350, bgcolor: '#eceff1' }}>
                <Typography gutterBottom variant="h5" component="div" sx={{ p: 2, textAlign: 'center', fontWeight: 'bold' }}>
                    Breakfast
                  </Typography>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="200"
                  width="100%"
                  image="https://www.beyondthechickencoop.com/wp-content/uploads/2024/02/Baked-Italian-Sausage.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    FoodName
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Ingredients: <br/>Chicken, Rice, feinsauce, victorsauce
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: "end", p: 2 }}>
                  <Button
                    onClick={TogglePrep}
                    sx={{ bgcolor: isPrepped ? 'green' : 'grey', color: 'white' }}
                  >
                    {isPrepped ? "Prepped" : "Not Prepped"}
                  </Button>
                  <Button variant="contained">View</Button>
                  <Button variant="contained" sx={{bgcolor:'red'}}>Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* fab button */}
        <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={() => navigate('/add')}>
          <AddIcon />
        </Fab>
      </Container>
    </>
  );
}

export default Homepage;
