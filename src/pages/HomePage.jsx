import React from "react";
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
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


function Homepage() {

  const [tabvalue, setTabvalue] = React.useState('1');

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  // useNavigate hook to navigate between pages
  const navigate = useNavigate();
  const [isCompleted, setisCompleted] = useState(false);

  // just some button functions
  const TogglePrep = () => {
    setisCompleted(!isCompleted);
  };

  const [week, setWeek] = useState("");

  const [status, setStatus] = useState("");

  // Dummy data for demonstration
  const counter = [1, 2, 3];

  return(
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabvalue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange} aria-label="lab API tabs example" sx={{ mx: 'auto' }}>
              <Tab label="Monday" value="1" />
              <Tab label="Tuesday" value="2" />
              <Tab label="Wednesday" value="3" />
              <Tab label="Thursday" value="4" />
              <Tab label="Friday" value="5" />
              <Tab label="Saturday" value="6" />
              <Tab label="Sunday" value="7" />
            </TabList>
          </Box>
          <TabPanel value="1">Monday</TabPanel>
          <TabPanel value="2">Tuesday</TabPanel>
          <TabPanel value="3">Wednesday</TabPanel>
          <TabPanel value="4">Thursday</TabPanel>
          <TabPanel value="5">Friday</TabPanel>
          <TabPanel value="6">Saturday</TabPanel>
          <TabPanel value="7">Sunday</TabPanel>
        </TabContext>
      </Box>
      {/* meal trackers */}
      <Container sx={{ m: 0, p: 2, mx: "auto", maxWidth: "100%" }}>
        {/* the cards */}
        <Grid
          container
          spacing={2}
          sx={{ m: 0, p: 2, display: "flex", gap: 4, justifyContent: "center" }}
        >
          {counter.map(() => (
            // one card
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ minWidth: 350, bgcolor: "#eceff1" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ p: 2, textAlign: "center", fontWeight: "bold" }}
                >
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
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Ingredients: <br />
                    Chicken, Rice, feinsauce, victorsauce
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", justifyContent: "end", p: 2 }}
                >
                  <Button
                    onClick={TogglePrep}
                    sx={{
                      bgcolor: isCompleted ? "green" : "grey",
                      color: "white",
                    }}
                  >
                    {isCompleted ? "Completed" : "Planned"}
                  </Button>
                  <Button variant="contained">View</Button>
                  <Button variant="contained" sx={{ bgcolor: "red" }}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* fab button */}
        <Fab
          color="warning"
          aria-label="add"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={() => navigate("/add")}
        >
          <AddIcon />
        </Fab>
      </Container>
    </>
  );
}

export default Homepage;
