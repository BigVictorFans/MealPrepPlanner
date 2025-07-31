import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { Container, Box, Typography, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CardMedia from "@mui/material/CardMedia";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

function Homepage() {
  const navigate = useNavigate();
  const [isCompleted, setisCompleted] = useState(false);

  const TogglePrep = () => {
    setisCompleted(!isCompleted);
  };

  const [week, setWeek] = useState("");

  const [status, setStatus] = useState("");

  const counter = [1, 2, 3];

  return (
    <>
      <Container sx={{ m: 0, p: 2, display: "flex", gap: 2, maxwidth: "100%" }}>
        {/* week label */}
        <Box sx={{ minWidth: 120, p: 0 }}>
          <Typography variant="h6">Week:</Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Week</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={week}
              label="week"
              onChange={(event) => {
                setWeek(event.target.value);
              }}
            >
              <MenuItem value="w1">Week 1</MenuItem>
              <MenuItem value="w2">Week 2</MenuItem>
              <MenuItem value="w3">Week 3</MenuItem>
              <MenuItem value="w4">Week 4</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* status */}
        <Box sx={{ minWidth: 120, p: 0 }}>
          <Typography variant="h6">Status</Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={(event) => {
                setStatus(event.target.value);
              }}
            >
              <MenuItem value="planned">Planned</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Container>
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
