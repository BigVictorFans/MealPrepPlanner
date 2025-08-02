import * as React from "react";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { Container, Box, Typography, Grid, IconButton } from "@mui/material";
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
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewIcon from "@mui/icons-material/Visibility";
import DoneIcon from "@mui/icons-material/Done";


function Homepage() {
  // useNavigate hook to navigate between pages
  const navigate = useNavigate();

  // load the meal plan data from local storage
  const mealplanLocalStorage = localStorage.getItem("mealplanlist");
  // create a state to store the meal plan data from local storage
  const [mealplan, setMealPlan] = useState(
    mealplanLocalStorage ? JSON.parse(mealplanLocalStorage) : []
  );

  // toggle complete / planned
  const [isCompleted, setisCompleted] = useState(false);

  const TogglePrep = () => {
    setisCompleted(!isCompleted);
  };

  // states for week / status (not in use for now)
  const [week, setWeek] = useState("w1");
  const [status, setStatus] = useState("planned");

  // tabs
  const [tabvalue, setTabvalue] = useState("mon");
  {
    /* want to implement a feature that automatically selects the day based on computer date */
  }

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  /* 8. delete */
  const handleMealsDelete = (id) => {
    // 8. do a confirmation alert to confirm delete
    const confirmation = confirm("Do you want to delete this meal plan?");
    if (confirmation) {
      // 9. use filter and remove the meal from the mealplan state
      const updatedMealPlan = mealplan.filter((meal) => {
        if (meal.id !== id) {
          return true;
        } else {
          return false;
        }
      });
      // 10. update the notes state with the updatedMealPlan
      setMealPlan(updatedMealPlan);
      // 11. update the local storage with the updatedMealPlan
      localStorage.setItem("mealplanlist", JSON.stringify(updatedMealPlan));
      // 12. show success notification
      alert("Notes deleted successfully");
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: "20px",
        }}
      >
        <Box
          sx={{
            minWidth: 260,
            paddingRight: "10px",
            display: "flex",
            gap: "10px",
          }}
        >
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="status"
              onChange={(event) => {
                setStatus(event.target.value);
              }}
            >
              <MenuItem value="planned">Planned</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TabContext value={tabvalue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
              sx={{ mx: "auto" }}
            >
              <Tab label="Monday" value="mon" />
              <Tab label="Tuesday" value="tue" />
              <Tab label="Wednesday" value="wed" />
              <Tab label="Thursday" value="thu" />
              <Tab label="Friday" value="fri" />
              <Tab label="Saturday" value="sat" />
              <Tab label="Sunday" value="sun" />
            </TabList>
          </Box>
          {/* <TabPanel value="1">Monday</TabPanel> */}
        </TabContext>
      </Box>
      {/* meal trackers */}
      <Container sx={{ m: 0, p: 2, mx: "auto", maxWidth: "100%" }}>
        {/* the cards */}
        <Grid container spacing={2}>
          {mealplan
            .filter((meal) => {
              // if selected week matches the week, then only move onto filter through day
              if (week === meal.week) {
                return true;
              }
              return false;
            })
            .filter((meal) => {
              // if selected tab matches the day value in the meal, then show the meal
              if (tabvalue === meal.day) {
                return true;
              }
              return false;
            })
            .map((meal) => (
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} key={meal.id}>
                <Card sx={{ minWidth: 350, bgcolor: "white" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ p: 2, textAlign: "center", fontWeight: "bold" }}
                  >
                    {meal.category}
                  </Typography>
                  <CardMedia
                    component="img"
                    alt={meal.name}
                    height="200"
                    width="100%"
                    image={meal.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/No_image_available_600_x_450.svg/2560px-No_image_available_600_x_450.svg.png"}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {meal.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Estimated prep time: <br />
                      {meal.preptime}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ display: "flex", justifyContent: "end", p: 2 }}
                  >
                    <IconButton>
                      <DoneIcon
                        onClick={TogglePrep}
                        sx={{
                          color: isCompleted ? "green" : "grey",
                        }}
                      />
                    </IconButton>
                    <Button
                      variant="contained"
                      component={RouterLink}
                      to={`meal/${meal.id}`}
                    >
                      <ViewIcon />
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleMealsDelete(meal.id)}
                      sx={{ bgcolor: "red" }}
                    >
                      <DeleteIcon />
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
