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
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const counter = [1, 2, 3, 4, 5];

function ShoppingList() {
  return (
    <>
      <Container maxWidth="md" sx={{ py: "60px" }}>
        <Typography variant="h3">Your Shopping List</Typography>
        {/* the add new items bar */}
        <Paper
          elevation={3}
          sx={{
            p: "20px",
            mt: "20px",
          }}
        >
          <Typography variant="h6">Add New Item</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <TextField
              fullWidth
              label="Item Name"
              variant="outlined"
              // value={label}
              // onChange={(event) => setLabel(event.target.value)}
            />
            <Button color="primary" variant="contained">
              Add
            </Button>
          </Box>
        </Paper>
        {/* the shopping list */}
        <Paper
          elevation={3}
          sx={{
            p: "20px",
            mt: "20px",
          }}
        >
          <Typography variant="h6">Existing Items (?)</Typography>
          <List sx={{ width: "100%" }}>
            {[...counter].map((_, index) => (
              <ListItem
                key={index}
                divider
                disableGutters
                secondaryAction={
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <IconButton>
                      <Edit />
                    </IconButton>
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText primary={`#${index + 1} — Hello`} />
              </ListItem>
            ))}
          </List>
        </Paper>
        {/* the auto generate list button */}
        <Box sx={{ mt: "20px" , textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            // onClick={() => {
            //   // Logic to auto-generate the shopping list
            //   alert("Auto-generating shopping list...");
            // }}
          >
            Auto-Generate Shopping List
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default ShoppingList;
