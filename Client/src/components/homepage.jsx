/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AccessTime, ArrowCircleRight , Language } from "@mui/icons-material";
import { motion } from "framer-motion";

const predictionDescriptionEN = `This tool helps you identify your next important task date. It uses your selected time to suggest when your next task might be and allows you to set a reminder via Google.`;
const predictionDescriptionTA = `இந்த கருவி உங்கள் அடுத்த முக்கியமான SBO பணி தேதியை கண்டறிய உதவுகிறது. நீங்கள் தேர்ந்தெடுத்த நேரத்தின் அடிப்படையில் அடுத்த பணி எப்போது இருக்கலாம் என்பதை கணித்து, Google மூலம் நினைவூட்டலை அமைக்க உதவுகிறது.`;

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNavigate = () => {
    navigate("/predict");
  };

  const handleNextTask = () => {
    navigate("/nexttask");
  }

  return (
    <Container className="py-5 text-center" style={{ maxWidth: '100%', padding: '1rem' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={10} lg={8}>
            <h1 className="display-5">{language === 'en' ? 'Next Task Predictor' : 'அடுத்த பணி கணிப்பான்'}</h1>
            <p className="lead">{currentDateTime.toLocaleString()}</p>
            <p>{language === 'en' ? predictionDescriptionEN : predictionDescriptionTA}</p>
            <Alert variant="info">
              {language === 'en'
                ? 'This app does not store any data. Feel free to use it for your personal productivity planning.'
                : 'இந்த பயன்பாடு உங்கள் தரவுகளை சேமிக்கவில்லை. உங்கள் திட்டமிடலுக்கு இது உதவும் கருவி.'}
            </Alert>

            <br></br>
            <Button variant="outline-secondary" onClick={() => setLanguage(lang => lang === 'en' ? 'ta' : 'en')}>
              {language === 'en' ? 'தமிழில் பார்க்க' : 'View in English'}{'  '}
              <Language className="ms-2" style={{ verticalAlign: 'middle'}} />
            </Button>
          </Col>
        </Row>
      </motion.div>
      <br></br>
      <br></br>

      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Button
              variant="primary"
              size="lg"
              className="mb-3 w-100"
              onClick={handleNavigate}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center',gap: '0.5rem' }}>
                <AccessTime className="me-2" style={{ verticalAlign: 'middle' }} />
                {language === 'en'
                  ? 'Predict Next SBO Task Exact Date and Time'
                  : 'அடுத்த SBO பணி நேரத்தை கணிக்கவும்'}
              </span>
            </Button>

            <div></div>
            <div></div>
            <br></br>

            <Button
              variant="primary"
              size="lg"
              className="w-100"
              onClick={handleNextTask}
            >
              
              <span style={{ display: 'inline-flex', alignItems: 'center',gap: '0.5rem' }}>
                {language === 'en' ? 'Next Task Date' : 'அடுத்த பணி தேதி'}
                <ArrowCircleRight className="ms-2" style={{ verticalAlign: 'middle' }} />
              </span>
            </Button>

          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
