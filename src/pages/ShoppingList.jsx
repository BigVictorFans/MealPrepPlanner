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
      </Container>
    </>
  );
}

export default ShoppingList;
