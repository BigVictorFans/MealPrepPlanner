import { Link as RouterLink, useNavigate } from "react-router";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Select,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { useState } from "react";

function AddMeals() {
  return (
    <>
      <Container maxWidth="md" sx={{ py: "60px" }}>
        <Typography variant="h3">Add a new meal plan</Typography>
        <Paper
          elevation={3}
          sx={{
            p: "20px",
            mt: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              mt: "20px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="meal_week_label">Week</InputLabel>
              <Select
                labelId="meal_week_label"
                id="meal_week"
                label="Week"
                // onChange={(event) => {
                //   setWeek(event.target.value);
                // }}
              >
                <MenuItem>Week 1</MenuItem>
                <MenuItem>Week 2</MenuItem>
                <MenuItem>Week 3</MenuItem>
                <MenuItem>Week 4</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="meal_day_label">Day</InputLabel>
              <Select
                labelId="meal_day_label"
                id="meal_day"
                label="Day"
                // onChange={(event) => {
                //   setDay(event.target.value);
                // }}
              >
                <MenuItem>Monday</MenuItem>
                <MenuItem>Tuesday</MenuItem>
                <MenuItem>Wednesday</MenuItem>
                <MenuItem>Thursday</MenuItem>
                <MenuItem>Friday</MenuItem>
                <MenuItem>Saturday</MenuItem>
                <MenuItem>Sunday</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <FormControl fullWidth sx={{ mt: "20px" }}>
            <InputLabel id="meal_category">Category</InputLabel>
            <Select
              labelId="meal_category"
              id="meal_day"
              label="Day"
              // onChange={(event) => {
              //   setDay(event.target.value);
              // }}
            >
              <MenuItem>Breakfast</MenuItem>
              <MenuItem>Lunch</MenuItem>
              <MenuItem>Dinner</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: "20px" }}>
            <TextField
              fullWidth
              id="meal_name"
              label="Name"
              variant="outlined"
              // value={name}
              // onChange={(event) => {
              //   setName(event.target.value);
              // }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              mt: "20px",
            }}
          >
            <TextField
              fullWidth
              id="meal_ingredients"
              label="Ingredients"
              variant="outlined"

              // value={name}
              // onChange={(event) => {
              //   setName(event.target.value);
              // }}
            />
            <Button
              color="primary"
              variant="contained"
              sx={{ minHeight: "55px" }}
            >
              Add
            </Button>
          </Box>
          <Box sx={{ mt: "20px" }}>
            <TextField
              fullWidth
              multiline
              maxRows={8}
              id="meal_steps"
              label="Steps"
              variant="outlined"
              // value={name}
              // onChange={(event) => {
              //   setName(event.target.value);
              // }}
            />
          </Box>
          <Box sx={{ mt: "20px" }}>
            <TextField
              fullWidth
              id="meal_name"
              label="Prep Time"
              variant="outlined"
              placeholder="Estimated Time"
              // value={name}
              // onChange={(event) => {
              //   setName(event.target.value);
              // }}
            />
          </Box>
        </Paper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            mt: "20px",
          }}
        >
          <Button color="primary" variant="contained">
            Save Meal
          </Button>
          <Button variant="outlined" component={RouterLink} to="/">
            Cancel
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default AddMeals;
