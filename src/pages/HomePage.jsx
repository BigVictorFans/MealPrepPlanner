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
import CheckBoxIcon from "@mui/icons-material/CheckBox";

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
  const [selectedStatus, setSelectedStatus] = useState("all");

  // tabs
  const [tabvalue, setTabvalue] = useState("");

  // automatically get today's day with react useEffect
  // useEffect only renders once with the empty array at the end (without [] it also render infinitely) (because that [] is the dependency array)
  // useState renders constantly, which causes an infinite loop
  React.useEffect(() => {
    // Try to load saved tab from localStorage
    const savedTab = localStorage.getItem("selectedtab");

    if (savedTab) {
      setTabvalue(savedTab);
    } else {
      // get the date
      const d = new Date();
      // make an array of the days because .getDay() gets a number value
      const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      // set the tab value based on the days
      setTabvalue(days[d.getDay()]);
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
    localStorage.setItem("selectedtab", newValue);
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

  /* filter the meals */
  const filteredMeals = mealplan
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
    .filter((meal) => {
      // if selectedStatus === all, show all, else show planned / completed
      if (selectedStatus === "all") {
        return true;
      } else if (selectedStatus === meal.status) {
        return true;
      }
      return false;
    })
    .sort((a, b) => {
      const order = ["breakfast", "lunch", "dinner"];
      return (
        order.indexOf(a.category.toLowerCase()) -
        order.indexOf(b.category.toLowerCase())
      );
    });

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
        <TabContext value={tabvalue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange} sx={{ mx: "auto" }}>
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
        <Box
          sx={{
            minWidth: 260,
            paddingLeft: "10px",
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
              value={selectedStatus}
              label="status"
              onChange={(event) => {
                setSelectedStatus(event.target.value);
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="planned">Planned</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      {/* meal trackers */}
      <Container sx={{ m: 0, p: 2, mx: "auto", maxWidth: "100%" }}>
        {/* the cards */}
        <Grid container spacing={2}>
          {/* if no meal planned for that day (filteredMeals.length is 0), then show a button that go to add meal page */}
          {filteredMeals.length === 0 ? (
            <Grid item size={{ xs: 12 }} sx={{ mt: "5px" }}>
              <Box sx={{ textAlign: "center", justifyContent: "center" }}>
                <img
                  src="https://i.kym-cdn.com/entries/icons/original/000/043/474/FbYXe1xXgAEpAAG.png"
                  style={{ height: "400px", width: "550px" }}
                />
                <Typography variant="h6" sx={{ mb: 2 }}>
                  No meals planned for this day.
                </Typography>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => navigate("/add")}
                >
                  Add a Meal
                </Button>
              </Box>
            </Grid>
          ) : (
            filteredMeals.map((meal) => (
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} key={meal.id}>
                <Card
                  sx={{ minWidth: 350, bgcolor: "white", minHeight: "453px" }}
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      p: 2,
                      textAlign: "center",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
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
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ alignItems: "center" }}
                    >
                      {meal.name}
                    </Typography>

                    {meal.status === "completed" ? (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CheckBoxIcon
                          color="success"
                          sx={{ fontSize: "24px" }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          Completed
                        </Typography>
                      </Box>
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        Estimated prep time: <br />
                        {meal.preptime}
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions
                    sx={{ display: "flex", justifyContent: "end", p: 2 }}
                  >
                    <Button
                      variant="contained"
                      component={RouterLink}
                      to={`/meal/${meal.id}`}
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
            ))
          )}
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
