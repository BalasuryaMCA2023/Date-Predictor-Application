/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    useMediaQuery,
    Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { EventAvailable, ArrowBack, WhatsAppIcon, TelegramIcon, EmailIcon, EventIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

const PredictionPage = () => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const navigate = useNavigate();

    const [currentDate, setCurrentDate] = useState("");
    const [currentTime, setCurrentTime] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [resultDate, setResultDate] = useState("");
    // const [resultTime ,setresultTime] =useState("");

    // Set today's date and time on load
    useEffect(() => {
        const now = new Date();
        const dateStr = now.toISOString().split("T")[0];
        const timeStr = now.toTimeString().slice(0, 5);
        setCurrentDate(dateStr);
        setCurrentTime(timeStr);
        setSelectedDate(dateStr);
        setSelectedTime(timeStr);
        calculateNextTaskDate(dateStr, timeStr);
    }, []);

    const calculateNextTaskDate = (date, time) => {
        const baseDate = new Date(`${date}T${time}`);
        const futureDate = new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000); // +7 days
        setResultDate(futureDate.toLocaleString());
    };

    const handleManualCalculation = () => {
        calculateNextTaskDate(selectedDate, selectedTime);
    };

    return (
        <Container maxWidth="sm" sx={{ py: 5 }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Typography variant={isMobile ? "h5" : "h4"} align="center" gutterBottom>
                    Predict Your Next Task Date
                </Typography>

                <Typography variant="body1" align="center" sx={{ mb: 3 }}>
                    Automatically calculates the 8th calendar day from today. You can also
                    adjust the date/time manually.
                </Typography>

                <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
                    <Grid item xs={12}>
                        <Typography variant="h6" align="center">
                            <strong>Today's Date:</strong> {currentDate} {currentTime}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" align="center">
                            <strong>Next Task Date:</strong> {resultDate ? resultDate : "--"}
                        </Typography>
                    </Grid>
                </Grid>

                <Alert severity="info" sx={{ mb: 4 }}>
                    This app does not store data. Use it freely for your personal task planning.
                </Alert>

                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Select Date"
                            type="date"
                            fullWidth
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Select Time"
                            type="time"
                            fullWidth
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item xs={12} textAlign="center">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                            <Button
                                variant="contained"
                                onClick={handleManualCalculation}
                                startIcon={<EventAvailable />}
                                sx={{
                                    backgroundColor: "#007bff",
                                    "&:hover": { backgroundColor: "#0056b3" },
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 3,
                                }}
                            >
                                Recalculate Task Date
                            </Button>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} textAlign="center">
                        <Typography variant="subtitle1" sx={{ mt: 4, mb: 1 }}>
                            Share this task reminder:
                        </Typography>

                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    startIcon={<WhatsAppIcon />}
                                    onClick={() => {
                                        const message = encodeURIComponent(`My next task is scheduled on ${resultDate}`);
                                        window.open(`https://wa.me/?text=${message}`, "_blank");
                                    }}
                                    sx={{ borderColor: "#25D366", color: "#25D366" }}
                                >
                                    WhatsApp
                                </Button>
                            </Grid>

                            <Grid item>
                                <Button
                                    variant="outlined"
                                    startIcon={<TelegramIcon />}
                                    onClick={() => {
                                        const message = encodeURIComponent(`My next task is scheduled on ${resultDate}`);
                                        window.open(`https://t.me/share/url?url=&text=${message}`, "_blank");
                                    }}
                                    sx={{ borderColor: "#0088cc", color: "#0088cc" }}
                                >
                                    Telegram
                                </Button>
                            </Grid>

                            <Grid item>
                                <Button
                                    variant="outlined"
                                    startIcon={<EmailIcon />}
                                    onClick={() => {
                                        const subject = encodeURIComponent("Next Task Reminder");
                                        const body = encodeURIComponent(`Hi,\n\nJust a reminder that my next task is on: ${resultDate}`);
                                        window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
                                    }}
                                    sx={{ borderColor: "#D44638", color: "#D44638" }}
                                >
                                    Email
                                </Button>
                            </Grid>

                            <Grid item>
                                <Button
                                    variant="contained"
                                    startIcon={<EventIcon />}
                                    onClick={() => {
                                        const dateTime = new Date(`${selectedDate}T${selectedTime}`);
                                        const start = dateTime.toISOString().replace(/[-:]|\.\d{3}/g, "");
                                        const end = new Date(dateTime.getTime() + 30 * 60000)
                                            .toISOString()
                                            .replace(/[-:]|\.\d{3}/g, "");
                                        const url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=Next+Task+Reminder&dates=${start}/${end}`;
                                        window.open(url, "_blank");
                                    }}
                                    sx={{
                                        backgroundColor: "#4285F4",
                                        color: "#fff",
                                        "&:hover": { backgroundColor: "#3367D6" },
                                    }}
                                >
                                    Google Calendar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>



                    <Grid item xs={12} textAlign="center">
                        <Button
                            startIcon={<ArrowBack />}
                            onClick={() => navigate("/")}
                            sx={{ mt: 2 }}
                        >
                            Back to Home
                        </Button>
                    </Grid>
                </Grid>
            </motion.div>
        </Container>
    );
};

export default PredictionPage;
