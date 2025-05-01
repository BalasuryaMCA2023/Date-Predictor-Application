import { format, addDays } from 'date-fns'
import {
  Mail as MailIcon,
  WhatsApp,
  Telegram,
  CalendarMonth,
  ContentCopy
} from '@mui/icons-material'
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  
} from '@mui/material'

import { useNavigate } from 'react-router-dom'

export default function NextTaskPredictor() {
  
  // Computed formats
  const currentDateFormatted = format(new Date(), 'dd-MM-yyyy')
  const nextDateFormatted = format(addDays(new Date(), 8), 'dd-MM-yyyy')
  const time12 = format(new Date(), 'h:mm:ss a')
   const navigate = useNavigate();

  // Clipboard copy handler
  const handleCopy = () => {
    const text = `Current: ${currentDateFormatted} ${time12}\nNext: ${nextDateFormatted} ${time12}`
    navigator.clipboard.writeText(text)
  }
  const handbackToHome = () => {
    navigate('/')
  }

  // Share handlers using current + next
  const shareText = `Today's date and time: ${currentDateFormatted} ${time12} Your Next SBO Task Date: ${nextDateFormatted} ${time12}`
  const shareWhatsApp = () => window.open(
    `https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
  const shareTelegram = () => window.open(
    `https://t.me/share/url?url=&text=${encodeURIComponent(shareText)}`, '_blank')

  // Google calendar link for next date/time
  const addToGoogleCalendar = () => {
    const start = new Date()
    const end = addDays(start, 7)
    const toGoogle = d => d.toISOString().replace(/[-:]/g, '').split('.')[0]
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=Next+Task&dates=${toGoogle(start)}/${toGoogle(end)}&details=Next+task+reminder`
    window.open(url, '_blank')
  }

  // Navigate to exact predictor page with prefilled
  const goToPrecise = () => {
    navigate("/predict");
  }

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3 }}>
      <CardContent>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Current date: {currentDateFormatted}
        </Typography>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Next task date: {nextDateFormatted}
        </Typography>
        <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
          {time12}
        </Typography>

        <Box mt={3} display="flex" flexWrap="wrap" gap={2}>
          <Button variant="outlined" startIcon={<ContentCopy />} onClick={handleCopy}>
            Copy
          </Button>
          <Button variant="outlined" startIcon={<WhatsApp />} onClick={shareWhatsApp}>
            WhatsApp
          </Button>
          <Button variant="outlined" startIcon={<Telegram />} onClick={shareTelegram}>
            Telegram
          </Button>
          <Button variant="outlined" startIcon={<CalendarMonth />} onClick={addToGoogleCalendar}>
            Google Calendar
          </Button>
          <Button variant="contained" color="secondary" onClick={goToPrecise}>
            Go to Exact Predictor
          </Button>
        </Box>

      </CardContent>
      
      <Button variant='outline'onClick={handbackToHome}>Back To Home</Button>
    </Card>
  )
}
