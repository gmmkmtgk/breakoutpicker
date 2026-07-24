import { Typography, Box, Grid, Card, CardContent, CardActions, Button, Chip } from '@mui/material';
import { CloudOutlined, HeartOutlined, ClockCircleOutlined, SafetyOutlined } from '@ant-design/icons';


const Pranayam = () => {
  const breathingTechniques = [
    {
      name: 'Kumbhak Therapy',
      sanskrit: 'Krama Kumbhaka',
      description: 'Equal breathing pattern with 4-count inhale, hold, exhale, hold cycle.',
      duration: '5-10 minutes',
      difficulty: "Intermediate to Advanced",
      benefits:  [
    "Strengthens lungs",
    "Improves oxygen utilization",
    "Calms nervous system",
    "Enhances focus and willpower",
    "Balances Prana flow"
  ],
      htmlPage: "/kumbhak-therapy.html",
      color: '#009688'
    },
    {
      name: 'Box Breathing',
      sanskrit: 'Sama Vritti',
      description: 'Equal breathing pattern with 4-count inhale, hold, exhale, hold cycle.',
      duration: '5-10 minutes',
      difficulty: 'Beginner',
      benefits: ['Reduces stress', 'Improves focus', 'Calms nervous system'],
      htmlPage: '/box-breathing.html',
      color: '#4CAF50'
    },
    {
      name: 'Alternate Nostril',
      sanskrit: 'Nadi Shodhana',
      description: 'Breathing through one nostril at a time to balance energy channels.',
      duration: '5-15 minutes',
      difficulty: 'Intermediate',
      benefits: ['Balances energy', 'Enhances concentration', 'Harmonizes brain hemispheres'],
      htmlPage: '/alternate-nostril.html',
      color: '#2196F3'
    },
    {
      name: 'Bee Breath',
      sanskrit: 'Bhramari',
      description: 'Humming sound breathing technique that creates vibrations.',
      duration: '3-10 minutes',
      difficulty: 'Beginner',
      benefits: ['Reduces anxiety', 'Improves memory', 'Calms mind'],
      htmlPage: '/bee-breath.html',
      color: '#FF9800'
    },
    {
      name: 'Ocean Breath',
      sanskrit: 'Ujjayi',
      description: 'Deep breathing with slight throat constriction creating ocean-like sound.',
      duration: '5-20 minutes',
      difficulty: 'Beginner',
      benefits: ['Builds heat', 'Enhances focus', 'Regulates blood pressure'],
      htmlPage: '/ocean-breath.html',
      color: '#00BCD4'
    },
    {
      name: 'Cooling Breath',
      sanskrit: 'Sheetali',
      description: 'Inhaling through curled tongue to cool the body and mind.',
      duration: '3-8 minutes',
      difficulty: 'Beginner',
      benefits: ['Cools body', 'Reduces pitta', 'Calms emotions'],
      htmlPage: '/cooling-breath.html',
      color: '#9C27B0'
    },
    {
      name: 'Fire Breath',
      sanskrit: 'Kapalabhati',
      description: 'Rapid, forceful exhalations followed by natural inhalations.',
      duration: '1-5 minutes',
      difficulty: 'Advanced',
      benefits: ['Energizes body', 'Detoxifies', 'Strengthens core'],
      htmlPage: '/fire-breath.html',
      color: '#F44336'
    }
  ];


  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'default';
    }
  };


  const openBreathingExercise = (htmlPage) => {
    window.open(htmlPage, '_blank');
  };


  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🫁 Pranayam - Breathing Practices
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          Master the art of breath control through ancient yogic techniques for enhanced well-being and spiritual growth
        </Typography>
      </Box>


      {/* Introduction */}
      <Box sx={{ mb: 4 }}>
        <Card sx={{ background: 'linear-gradient(135deg, #E3F2FD, #F1F8FF)', p: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CloudOutlined style={{ color: '#1976d2' }} />
            What is Pranayam?
          </Typography>
          <Typography variant="body1" paragraph>
            Pranayam is the yogic practice of breath control and regulation. The word comes from Sanskrit:
            "Prana" meaning life force or vital energy, and "Yama" meaning restraint or control.
            Through conscious breathing techniques, we can influence our physical, mental, and emotional states.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <SafetyOutlined style={{ fontSize: 40, color: '#1976d2', marginBottom: 8 }} />
                <Typography variant="h6">Mind Control</Typography>
                <Typography variant="body2">Calms the mind and reduces mental chatter</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <HeartOutlined style={{ fontSize: 40, color: '#f44336', marginBottom: 8 }} />
                <Typography variant="h6">Heart Health</Typography>
                <Typography variant="body2">Improves cardiovascular function and circulation</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <CloudOutlined style={{ fontSize: 40, color: '#2196f3', marginBottom: 8 }} />
                <Typography variant="h6">Energy Balance</Typography>
                <Typography variant="body2">Harmonizes and balances life force energy</Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>


      {/* Breathing Techniques Cards */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ClockCircleOutlined style={{ color: '#1976d2' }} />
          Breathing Techniques
        </Typography>
        <Grid container spacing={3}>
          {breathingTechniques.map((technique, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: `0 8px 25px ${technique.color}40`
                },
                border: `2px solid ${technique.color}20`,
                borderTop: `4px solid ${technique.color}`
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: technique.color, fontWeight: 'bold' }}>
                      {technique.name}
                    </Typography>
                    <Chip
                      label={technique.difficulty}
                      size="small"
                      color={getDifficultyColor(technique.difficulty)}
                    />
                  </Box>


                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontStyle: 'italic' }}>
                    Sanskrit: {technique.sanskrit}
                  </Typography>


                  <Typography variant="body2" paragraph>
                    {technique.description}
                  </Typography>


                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <ClockCircleOutlined style={{ fontSize: '14px', color: technique.color }} />
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      Duration: {technique.duration}
                    </Typography>
                  </Box>


                  <Typography variant="subtitle2" gutterBottom sx={{ color: technique.color }}>
                    Benefits:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {technique.benefits.map((benefit, idx) => (
                      <Typography component="li" variant="body2" key={idx} sx={{ mb: 0.5 }}>
                        {benefit}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>


                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => openBreathingExercise(technique.htmlPage)}
                    sx={{
                      backgroundColor: technique.color,
                      '&:hover': { backgroundColor: `${technique.color}CC` },
                      fontWeight: 'bold'
                    }}
                  >
                    Start Practice
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>


      {/* Guidelines */}
      <Box sx={{ mb: 4 }}>
        <Card sx={{ background: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)', p: 3 }}>
          <Typography variant="h5" gutterBottom>
            🌟 Practice Guidelines
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Before You Begin:</Typography>
              <Typography variant="body2">
                • Practice on an empty stomach<br/>
                • Choose a quiet, well-ventilated space<br/>
                • Sit in a comfortable upright position<br/>
                • Start slowly and gradually increase duration<br/>
                • Stop if you feel dizzy or uncomfortable
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Best Times to Practice:</Typography>
              <Typography variant="body2">
                • Early morning (sunrise)<br/>
                • Evening (before sunset)<br/>
                • Before meditation<br/>
                • When feeling stressed<br/>
                • Before important events for focus
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, p: 2, backgroundColor: 'rgba(255,193,7,0.1)', borderRadius: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'warning.main' }}>
              ⚠️ Important: If you have respiratory conditions, heart problems, or are pregnant,
              consult with a healthcare provider before practicing advanced breathing techniques.
            </Typography>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};


export default Pranayam;