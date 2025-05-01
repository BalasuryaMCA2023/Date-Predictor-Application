import { useState, useEffect, useRef } from 'react'
import { format, addDays, addMinutes } from 'date-fns'
import {
  Mail as MailIcon,
  CalendarToday,
  AccessTime,
  WhatsApp,
  Telegram,
  CalendarMonth,
  HelpOutline,
  ArrowBack,
  Language,
  ThumbUp
} from '@mui/icons-material'
import {
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  InputAdornment,
  Tooltip,
  Fade,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
  Container,
  useMediaQuery
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SBODATE from "../assets/video/SboDatePreditedToolVideo.mp4"

export default function NextTaskPredictor() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()

  const [openInstructions, setOpenInstructions] = useState(true)
  const [openVideo, setOpenVideo] = useState(true)
  const [secondsLeft, setSecondsLeft] = useState(30)
  const countdownRef = useRef(null)

  useEffect(() => {
    if (openVideo) {
      setSecondsLeft(30)
      countdownRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(countdownRef.current)
            setOpenVideo(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current)
        countdownRef.current = null
      }
    }
  }, [openVideo])

  const handleCloseInstructions = () => setOpenInstructions(false)
  const handleOpenInstructions = () => {
    setOpenInstructions(true)
    setOpenVideo(true)
    setSecondsLeft(30)
  }
  const handleSkipVideo = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current)
      countdownRef.current = null
    }
    setOpenVideo(false)
  }

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [inputTime12, setInputTime12] = useState('')
  const [nextTaskDate, setNextTaskDate] = useState('')
  const [nextTaskTime, setNextTaskTime] = useState('')
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    if (!date || !time) return
    const current = new Date(`${date}T${time}`)
    setInputTime12(format(current, 'h:mm:ss a'))
    const afterWeek = addDays(current, 7)
    const nextExact = addMinutes(afterWeek, 30)
    setNextTaskDate(format(nextExact, 'do MMMM, yyyy'))
    setNextTaskTime(format(nextExact, 'h:mm:ss a'))
  }, [date, time])

  const handleClear = () => {
    setDate('')
    setTime('')
    setInputTime12('')
    setNextTaskDate('')
    setNextTaskTime('')
  }

  const handbackToHome = () => {
    navigate('/')
  }

  const message = nextTaskDate
    ? `My next SBO task is scheduled for ${nextTaskDate} at ${nextTaskTime}`
    : ''
  const canShare = Boolean(nextTaskDate)

  const shareViaWhatsApp = () =>
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')

  const shareViaTelegram = () =>
    window.open(`https://t.me/share/url?url=&text=${encodeURIComponent(message)}`, '_blank')

  const shareViaEmail = () =>
    window.open(`mailto:?subject=Next Task Reminder&body=${encodeURIComponent(message)}`)

  const addToGoogleCalendar = () => {
    const start = new Date(`${date}T${time}`)
    const afterWeek = addDays(start, 7)
    const nextExact = addMinutes(afterWeek, 30)
    const endTime = addMinutes(nextExact, 15)

    const toGoogleFormat = d => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=Next+SBO+Task&dates=${toGoogleFormat(nextExact)}/${toGoogleFormat(endTime)}&details=Reminder:+Your+next+SBO+task+is+scheduled+at+${nextTaskDate}+${nextTaskTime}`

    window.open(url, '_blank')
  }

  return (
    <>
       <Dialog open={openInstructions} onClose={handleCloseInstructions} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {language === 'en' ? 'How This Tool Works ?' : 'இந்த கருவி எப்படி வேலை செய்கிறது ?'}
        <Button onClick={() => setOpenVideo(true)} color="primary" variant="contained" size="small">Watch Video</Button>
      </DialogTitle>
      <DialogContent dividers>
        {language === 'en' ? (
          <>
            <Typography paragraph>Follow the steps below to accurately determine your next SBO task date and time:</Typography>
            <Typography paragraph><strong>Step 1:</strong> Log in to the SBO Portal: <Link href="https://sboportal.org.in/" target="_blank">https://sboportal.org.in/</Link></Typography>
            <Typography paragraph><strong>Step 2:</strong> Go to the Training Task section and Payout History menu.</Typography>
            <Typography paragraph><strong>Step 3:</strong> Note the date and time of today’s completed task.</Typography>
            <Typography paragraph><strong>Step 4:</strong> Enter this date and time in the tool below.</Typography>
            <Typography paragraph><strong>Step 5:</strong> The system will calculate your next expected task — 7 days + 30 minutes later.</Typography>
            <Typography paragraph><strong>Step 6:</strong> Share or add the result to Google Calendar.</Typography>
          </>
        ) : (
          <>
            <Typography paragraph>உங்கள் அடுத்த SBO பணி தேதி மற்றும் நேரத்தை சரியாக கணிக்க கீழ்க்கண்ட படிகளை பின்பற்றவும்:</Typography>
            <Typography paragraph><strong>படி 1:</strong> SBO போர்ட்டலில் உள்நுழைக: <Link href="https://sboportal.org.in/" target="_blank">https://sboportal.org.in/</Link></Typography>
            <Typography paragraph><strong>படி 2:</strong> Training Task பகுதியில் உள்ள Payout History மெனுவைத் தேர்ந்தெடுக்கவும்.</Typography>
            <Typography paragraph><strong>படி 3:</strong> இன்று நீங்கள் முடித்த பணியின் தேதி மற்றும் நேரத்தை குறிக்கவும்.</Typography>
            <Typography paragraph><strong>படி 4:</strong> அந்த தேதி மற்றும் நேரத்தை கீழே உள்ள கருவியில் உள்ளிடவும்.</Typography>
            <Typography paragraph><strong>படி 5:</strong> கணினி உங்கள் அடுத்த SBO பணி தேதி மற்றும் நேரத்தை கணிக்கும் — 7 நாட்கள் + 30 நிமிடங்கள்.</Typography>
            <Typography paragraph><strong>படி 6:</strong> முடிவை பகிரவும் அல்லது Google Calendar-ல் சேர்க்கவும்.</Typography>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
      <Button onClick={() => setOpenVideo(true)} color="primary" variant="contained" size="small">Watch Video</Button>
        <Button onClick={handleCloseInstructions}>Got it <ThumbUp className="ms-5" style={{ verticalAlign: 'middle', gap: '1rem', mt: '0.5rem', mb: '0.5rem' }}/></Button>
        <Button onClick={() => setLanguage(prev => prev === 'en' ? 'ta' : 'en')}>
          {language === 'en' ? 'தமிழில் பார்க்க' : 'View in English'}{''}
          <Language className="ms-2" style={{ verticalAlign: 'middle', gap: '1rem'}} />
        </Button>
      </DialogActions>
    </Dialog>

      <Dialog open={openVideo} onClose={() => {}} maxWidth="sm" fullWidth>
        <DialogTitle>How This Tool Works (Video)</DialogTitle>
        <DialogContent dividers>
          <Typography paragraph>Watch the video below to understand how to use this tool:</Typography>
          <Typography paragraph>Note: The video will auto-close in {secondsLeft}s.</Typography>
          <Typography paragraph>Click the "Skip" button to close the video and continue.</Typography>
          <Typography paragraph>For any issues, please contact the developer.</Typography>
        </DialogContent>
        <DialogContent dividers>
          <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
            <Box
              component="video"
              src={SBODATE}
              controls
              autoPlay
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Typography variant="caption" color="textSecondary" mt={1} fontWeight={600} display="flex">
            Auto closing in: {secondsLeft}s
          </Typography>
          <Button onClick={handleSkipVideo}>Skip</Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="sm">
        <Card sx={{ mt: 4, p: 2 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Next Task Exact Predictor
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Enter a date and time (24-hour) to predict your next task in 7 days.
            </Typography>

            <Box mt={2} textAlign="center" border={`1px solid ${theme.palette.warning.main}`} p={2} borderRadius={2} bgcolor={theme.palette.warning.light}>
              <Typography variant="body2" color="text.primary">
                <strong>Note:</strong> Enter your last task's completion date/time to compute your next SBO task (7 days + 30 mins).
              </Typography>
            </Box>

            <Box mt={2} display="flex" flexDirection="column" gap={2}>
              <Tooltip title="Select the start date">
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  helperText="Choose a date"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                />
              </Tooltip>

              <Tooltip title="Use 24-hour format">
                <TextField
                  fullWidth
                  type="time"
                  label="Time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  helperText="24-hour format"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTime fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                />
              </Tooltip>

              {inputTime12 && (
                <Typography variant="body2" color="text.secondary">
                  Input Time: {time} (24h) / {inputTime12} (12h)
                </Typography>
              )}
            </Box>

            {nextTaskDate && (
              <Fade in>
                <Box mt={3} p={2} borderRadius={2} sx={{ bgcolor: theme.palette.success.light }}>
                  <Typography variant={isMobile ? 'body2' : 'subtitle1'} gutterBottom>
                    Your Exact Next Task Will Be:
                  </Typography>
                  <Typography variant={isMobile ? 'body1' : 'h6'}>
                    {nextTaskDate} at {nextTaskTime}
                  </Typography>
                </Box>
              </Fade>
            )}

            <Box mt={4} display="flex" flexWrap="wrap" gap={2} justifyContent="space-between">
              <Button variant="contained" color="error" onClick={handleClear}>Clear</Button>
              <Box display="flex" gap={1} flexWrap="wrap">
                <Button variant="outlined" onClick={shareViaWhatsApp} startIcon={<WhatsApp />} disabled={!canShare}>WhatsApp</Button>
                <Button variant="outlined" onClick={shareViaTelegram} startIcon={<Telegram />} disabled={!canShare}>Telegram</Button>
                <Button variant="outlined" onClick={shareViaEmail} startIcon={<MailIcon />} disabled={!canShare}>Email</Button>
                <Button variant="outlined" onClick={addToGoogleCalendar} startIcon={<CalendarMonth />} disabled={!canShare}>Calendar</Button>
              </Box>
            </Box>

            <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
              <Button variant="outlined" onClick={handbackToHome}><ArrowBack />Back To Home</Button>
              <Button variant="outlined" onClick={handleOpenInstructions}>How It Works<HelpOutline /></Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}