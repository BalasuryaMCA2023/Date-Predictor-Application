/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Alert,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccessTime } from "@mui/icons-material";
import { motion } from "framer-motion";

const predictionDescription = `This tool helps you identify your next important task date. It uses your selected time to suggest when your next task might be and allows you to set a reminder via Google.`;

const LandingPage = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Updates every second
    return () => clearInterval(timer);
  }, []);

  const handleNavigate = () => {
    navigate("/predict");
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant={isMobile ? "h5" : "h3"}
          align="center"
          gutterBottom
        >
          Next Task Predictor
        </Typography>

        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
          {currentDateTime.toLocaleString()}
        </Typography>

        <Typography variant="body1" align="center" sx={{ mb: 2 }}>
          {predictionDescription}
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
        This app does not store any data. Feel free to use it for your personal productivity planning.
        </Alert>
      </motion.div>

      <Grid container justifyContent="center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={handleNavigate}
            startIcon={<AccessTime />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              backgroundColor: "#007bff",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            Predict Next SBO Task Date
          </Button>
        </motion.div>
      </Grid>
    </Container>
  );
};

export default LandingPage;
