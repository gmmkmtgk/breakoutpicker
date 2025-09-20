import { Typography, Box, Grid, Card, CardContent, CardMedia, Button, Tabs, Tab, Chip } from '@mui/material';
import { HeartOutlined, ClockCircleOutlined, SafetyOutlined, MedicineBoxOutlined, FireOutlined, EyeOutlined } from '@ant-design/icons';
import { useState } from 'react';


const Yoga = () => {
  const [selectedTab, setSelectedTab] = useState(0);


  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };


  // Disease-specific yoga practices
  const diseaseSpecificYoga = {
    stomach: [
      {
        name: 'Wind Relieving Pose',
        sanskrit: 'Pavanamuktasana',
        duration: '1-2 minutes each leg',
        image: 'https://via.placeholder.com/300x200/FF5722/ffffff?text=Wind+Relief',
        benefits: 'Relieves gas, improves digestion, reduces bloating',
        instructions: 'Lie on back, hug knee to chest, hold and breathe deeply',
        htmlPage: '/yoga-wind-relieving-pose.html',
        color: '#FF5722'
      },
      {
        name: 'Seated Forward Fold',
        sanskrit: 'Paschimottanasana',
        duration: '2-3 minutes',
        image: 'https://via.placeholder.com/300x200/FF5722/ffffff?text=Forward+Fold',
        benefits: 'Stimulates digestive organs, relieves stomach pain',
        instructions: 'Sit with legs extended, fold forward over legs',
        htmlPage: '/yoga-seated-forward-fold.html',
        color: '#FF5722'
      },
      {
        name: 'Camel Pose',
        sanskrit: 'Ustrasana',
        duration: '30 seconds - 1 minute',
        image: 'https://via.placeholder.com/300x200/FF5722/ffffff?text=Camel+Pose',
        benefits: 'Stretches abdomen, improves digestion',
        instructions: 'Kneel, arch back, hands on heels',
        htmlPage: '/yoga-camel-pose.html',
        color: '#FF5722'
      }
    ],
    ibs: [
      {
        name: 'Cat-Cow Pose',
        sanskrit: 'Marjaryasana-Bitilasana',
        duration: '1-2 minutes',
        image: 'https://via.placeholder.com/300x200/9C27B0/ffffff?text=Cat+Cow',
        benefits: 'Massages abdominal organs, reduces IBS symptoms',
        instructions: 'On hands and knees, alternate between arching and rounding spine',
        htmlPage: '/yoga-cat-cow-pose.html',
        color: '#9C27B0'
      },
      {
        name: 'Supine Spinal Twist',
        sanskrit: 'Supta Matsyendrasana',
        duration: '1-2 minutes each side',
        image: 'https://via.placeholder.com/300x200/9C27B0/ffffff?text=Spinal+Twist',
        benefits: 'Improves digestion, relieves intestinal discomfort',
        instructions: 'Lie on back, drop knees to one side, arms in T-shape',
        htmlPage: '/yoga-spinal-twist.html',
        color: '#9C27B0'
      },
      {
        name: 'Happy Baby Pose',
        sanskrit: 'Ananda Balasana',
        duration: '1-3 minutes',
        image: 'https://via.placeholder.com/300x200/9C27B0/ffffff?text=Happy+Baby',
        benefits: 'Massages digestive organs, reduces stress',
        instructions: 'Lie on back, grab feet, gently rock side to side',
        htmlPage: '/yoga-happy-baby-pose.html',
        color: '#9C27B0'
      }
    ],
    hair: [
      {
        name: 'Headstand',
        sanskrit: 'Sirsasana',
        duration: '30 seconds - 2 minutes',
        image: 'https://via.placeholder.com/300x200/4CAF50/ffffff?text=Headstand',
        benefits: 'Increases blood flow to scalp, promotes hair growth',
        instructions: 'Support head with hands, lift legs up (advanced pose)',
        htmlPage: '/yoga-headstand.html',
        color: '#4CAF50'
      },
      {
        name: 'Downward Dog',
        sanskrit: 'Adho Mukha Svanasana',
        duration: '1-3 minutes',
        image: 'https://via.placeholder.com/300x200/4CAF50/ffffff?text=Downward+Dog',
        benefits: 'Improves blood circulation to head and scalp',
        instructions: 'Form inverted V-shape with body, hands and feet on ground',
        htmlPage: '/yoga-downward-dog.html',
        color: '#4CAF50'
      },
      {
        name: 'Camel Pose',
        sanskrit: 'Ustrasana',
        duration: '30 seconds - 1 minute',
        image: 'https://via.placeholder.com/300x200/4CAF50/ffffff?text=Camel+Hair',
        benefits: 'Stimulates scalp circulation, reduces hair fall',
        instructions: 'Kneel, arch back, let head hang back gently',
        htmlPage: '/yoga-camel-pose-hair.html',
        color: '#4CAF50'
      }
    ],
    eyes: [
      {
        name: 'Eye Palming',
        sanskrit: 'Netra Dhyana',
        duration: '2-5 minutes',
        image: 'https://via.placeholder.com/300x200/2196F3/ffffff?text=Eye+Palming',
        benefits: 'Relaxes eye muscles, reduces eye strain',
        instructions: 'Cover closed eyes with palms, breathe deeply',
        htmlPage: '/yoga-eye-palming.html',
        color: '#2196F3'
      },
      {
        name: 'Fish Pose',
        sanskrit: 'Matsyasana',
        duration: '30 seconds - 1 minute',
        image: 'https://via.placeholder.com/300x200/2196F3/ffffff?text=Fish+Pose',
        benefits: 'Improves blood flow to eyes, relieves eye tension',
        instructions: 'Lie on back, arch chest up, crown of head on floor',
        htmlPage: '/yoga-fish-pose.html',
        color: '#2196F3'
      },
      {
        name: 'Shoulder Stand',
        sanskrit: 'Sarvangasana',
        duration: '1-3 minutes',
        image: 'https://via.placeholder.com/300x200/2196F3/ffffff?text=Shoulder+Stand',
        benefits: 'Increases blood flow to eyes, improves vision',
        instructions: 'Lie on back, lift legs and torso up vertically',
        htmlPage: '/yoga-shoulder-stand.html',
        color: '#2196F3'
      }
    ]
  };


  // Advanced yoga for healthy individuals
  const advancedYoga = {
    strength: [
      {
        name: 'Crow Pose',
        sanskrit: 'Bakasana',
        duration: '30 seconds - 1 minute',
        image: 'https://via.placeholder.com/300x200/FF9800/ffffff?text=Crow+Pose',
        benefits: 'Builds arm and core strength, improves balance',
        difficulty: 'Advanced',
        instructions: 'Balance on hands with knees on upper arms',
        htmlPage: '/yoga-crow-pose.html',
        color: '#FF9800'
      },
      {
        name: 'Side Plank',
        sanskrit: 'Vasisthasana',
        duration: '30 seconds - 1 minute each side',
        image: 'https://via.placeholder.com/300x200/FF9800/ffffff?text=Side+Plank',
        benefits: 'Strengthens core, arms, and shoulders',
        difficulty: 'Intermediate',
        instructions: 'Support body weight on one arm, stack feet',
        htmlPage: '/yoga-side-plank.html',
        color: '#FF9800'
      },
      {
        name: 'Firefly Pose',
        sanskrit: 'Tittibhasana',
        duration: '15-30 seconds',
        image: 'https://via.placeholder.com/300x200/FF9800/ffffff?text=Firefly',
        benefits: 'Advanced arm strength, core stability',
        difficulty: 'Expert',
        instructions: 'Balance on hands with legs extended through arms',
        htmlPage: '/yoga-firefly-pose.html',
        color: '#FF9800'
      }
    ],
    flexibility: [
      {
        name: 'King Pigeon Pose',
        sanskrit: 'Eka Pada Rajakapotasana',
        duration: '1-3 minutes each side',
        image: 'https://via.placeholder.com/300x200/E91E63/ffffff?text=King+Pigeon',
        benefits: 'Deep hip and shoulder flexibility',
        difficulty: 'Advanced',
        instructions: 'Lunge position, back foot to hand, deep backbend',
        htmlPage: '/yoga-king-pigeon.html',
        color: '#E91E63'
      },
      {
        name: 'Lotus Pose',
        sanskrit: 'Padmasana',
        duration: '2-10 minutes',
        image: 'https://via.placeholder.com/300x200/E91E63/ffffff?text=Lotus+Pose',
        benefits: 'Hip flexibility, meditation posture',
        difficulty: 'Intermediate',
        instructions: 'Cross legs, feet on opposite thighs',
        htmlPage: '/yoga-lotus-pose.html',
        color: '#E91E63'
      },
      {
        name: 'Scorpion Pose',
        sanskrit: 'Vrschikasana',
        duration: '30 seconds - 1 minute',
        image: 'https://via.placeholder.com/300x200/E91E63/ffffff?text=Scorpion',
        benefits: 'Ultimate spine flexibility, balance',
        difficulty: 'Expert',
        instructions: 'Forearm stand with feet arched over head',
        htmlPage: '/yoga-scorpion-pose.html',
        color: '#E91E63'
      }
    ],
    advanced: [
      {
        name: 'Eight-Angle Pose',
        sanskrit: 'Astavakrasana',
        duration: '15-30 seconds each side',
        image: 'https://via.placeholder.com/300x200/673AB7/ffffff?text=Eight+Angle',
        benefits: 'Advanced strength and coordination',
        difficulty: 'Expert',
        instructions: 'Arm balance with legs wrapped around one arm',
        htmlPage: '/yoga-eight-angle.html',
        color: '#673AB7'
      },
      {
        name: 'Peacock Pose',
        sanskrit: 'Mayurasana',
        duration: '15-45 seconds',
        image: 'https://via.placeholder.com/300x200/673AB7/ffffff?text=Peacock',
        benefits: 'Core strength, wrist strength, balance',
        difficulty: 'Advanced',
        instructions: 'Balance on hands with body parallel to floor',
        htmlPage: '/yoga-peacock-pose.html',
        color: '#673AB7'
      },
      {
        name: 'Flying Lizard',
        sanskrit: 'Utthan Pristhasana',
        duration: '30 seconds - 1 minute each side',
        image: 'https://via.placeholder.com/300x200/673AB7/ffffff?text=Flying+Lizard',
        benefits: 'Hip flexibility, arm strength, balance',
        difficulty: 'Advanced',
        instructions: 'Low lunge with back leg lifted, hands planted',
        htmlPage: '/yoga-flying-lizard.html',
        color: '#673AB7'
      }
    ]
  };


  const basicYogaPoses = [
    {
      name: 'Mountain Pose',
      sanskrit: 'Tadasana',
      duration: '1-2 minutes',
      image: 'https://via.placeholder.com/300x200/4CAF50/ffffff?text=Mountain+Pose',
      benefits: 'Improves posture, strengthens legs, increases awareness',
      instructions: 'Stand tall with feet together, arms at sides, breathe deeply',
      htmlPage: '/yoga-mountain-pose.html',
      color: '#4CAF50'
    },
    {
      name: 'Tree Pose',
      sanskrit: 'Vrikshasana',
      duration: '30 seconds each side',
      image: 'https://via.placeholder.com/300x200/4CAF50/ffffff?text=Tree+Pose',
      benefits: 'Improves balance, strengthens legs, enhances focus',
      instructions: 'Stand on one leg, place other foot on inner thigh',
      htmlPage: '/yoga-tree-pose.html',
      color: '#4CAF50'
    },
    {
      name: 'Warrior I',
      sanskrit: 'Virabhadrasana I',
      duration: '30 seconds each side',
      image: 'https://via.placeholder.com/300x200/FF9800/ffffff?text=Warrior+I',
      benefits: 'Strengthens legs, improves balance, opens chest',
      instructions: 'Lunge position with arms overhead, back leg straight',
      htmlPage: '/yoga-warrior-one.html',
      color: '#FF9800'
    }
  ];


  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      case 'Expert': return 'error';
      default: return 'default';
    }
  };


  const openYogaPractice = (htmlPage) => {
    window.open(htmlPage, '_blank');
  };


  const renderYogaCards = (poses, showDifficulty = false) => (
    <Grid container spacing={3}>
      {poses.map((pose, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{
            height: '100%',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: `0 8px 25px ${pose.color || '#4CAF50'}40`
            },
            display: 'flex',
            flexDirection: 'column',
            border: `2px solid ${pose.color || '#4CAF50'}20`,
            borderTop: `4px solid ${pose.color || '#4CAF50'}`
          }}>
            <CardMedia
              component="img"
              height="200"
              image={pose.image}
              alt={pose.name}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ color: pose.color || '#4CAF50', fontWeight: 'bold' }}>
                  {pose.name}
                </Typography>
                {showDifficulty && pose.difficulty && (
                  <Chip
                    label={pose.difficulty}
                    size="small"
                    color={getDifficultyColor(pose.difficulty)}
                  />
                )}
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontStyle: 'italic' }}>
                Sanskrit: {pose.sanskrit}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <ClockCircleOutlined style={{ fontSize: '14px', color: pose.color || '#4CAF50' }} />
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  {pose.duration}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                {pose.benefits}
              </Typography>
              {pose.instructions && (
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'primary.main', mb: 2 }}>
                  How: {pose.instructions}
                </Typography>
              )}
            </CardContent>
            <Box sx={{ p: 2, pt: 0 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => openYogaPractice(pose.htmlPage)}
                sx={{
                  backgroundColor: pose.color || '#4CAF50',
                  '&:hover': { backgroundColor: `${pose.color || '#4CAF50'}CC` },
                  fontWeight: 'bold'
                }}
              >
                Start Practice
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );


  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #4CAF50, #8BC34A)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🧘‍♀️ Yoga Practice
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Discover the ancient practice of yoga for physical strength, mental clarity, and spiritual well-being
        </Typography>
      </Box>


      {/* Navigation Tabs */}
      <Box sx={{ mb: 4 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#4CAF50'
            }
          }}
        >
          <Tab label="🌱 Beginner Poses" />
          <Tab label="🏥 Health Issues" />
          <Tab label="💪 Advanced Practice" />
          <Tab label="📚 Benefits & Guide" />
        </Tabs>
      </Box>


      {/* Tab Content */}
      {selectedTab === 0 && (
        <Box>
          <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SafetyOutlined style={{ color: '#1976d2' }} />
            Essential Beginner Yoga Poses
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            Start your yoga journey with these foundational poses. Perfect for beginners and daily practice.
          </Typography>
          {renderYogaCards(basicYogaPoses)}
        </Box>
      )}


      {selectedTab === 1 && (
        <Box>
          <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MedicineBoxOutlined style={{ color: '#1976d2' }} />
            Yoga for Specific Health Issues
          </Typography>


          {/* Stomach Issues */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#FF5722', display: 'flex', alignItems: 'center', gap: 1 }}>
              🫄 Stomach Issues & Digestive Problems
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              These poses help with gas, bloating, indigestion, and general stomach discomfort.
            </Typography>
            {renderYogaCards(diseaseSpecificYoga.stomach)}
          </Box>


          {/* IBS */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#9C27B0', display: 'flex', alignItems: 'center', gap: 1 }}>
              🤲 IBS (Irritable Bowel Syndrome)
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Gentle poses that massage abdominal organs and reduce IBS symptoms.
            </Typography>
            {renderYogaCards(diseaseSpecificYoga.ibs)}
          </Box>


          {/* Hair Issues */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#4CAF50', display: 'flex', alignItems: 'center', gap: 1 }}>
              💇‍♀️ Hair Loss & Scalp Health
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Inversions and poses that increase blood flow to the scalp for healthier hair.
            </Typography>
            {renderYogaCards(diseaseSpecificYoga.hair)}
          </Box>


          {/* Eye Issues */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#2196F3', display: 'flex', alignItems: 'center', gap: 1 }}>
              👁️ Eye Strain & Vision Health
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Poses and techniques to relax eye muscles and improve circulation to the eyes.
            </Typography>
            {renderYogaCards(diseaseSpecificYoga.eyes)}
          </Box>
        </Box>
      )}


      {selectedTab === 2 && (
        <Box>
          <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FireOutlined style={{ color: '#1976d2' }} />
            Advanced Yoga for Healthy Individuals
          </Typography>


          {/* Strength Building */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#FF9800', display: 'flex', alignItems: 'center', gap: 1 }}>
              💪 Strength Building
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Challenge your body with these strength-building poses for advanced practitioners.
            </Typography>
            {renderYogaCards(advancedYoga.strength, true)}
          </Box>


          {/* Flexibility */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#E91E63', display: 'flex', alignItems: 'center', gap: 1 }}>
              🤸‍♀️ Advanced Flexibility
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Deep stretches and advanced poses for ultimate flexibility.
            </Typography>
            {renderYogaCards(advancedYoga.flexibility, true)}
          </Box>


          {/* Expert Level */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#673AB7', display: 'flex', alignItems: 'center', gap: 1 }}>
              🏆 Expert Level Poses
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Master-level poses that require years of practice and exceptional skill.
            </Typography>
            {renderYogaCards(advancedYoga.advanced, true)}
          </Box>
        </Box>
      )}


      {selectedTab === 3 && (
        <Box>
          {/* Benefits Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <HeartOutlined style={{ color: '#1976d2' }} />
              Benefits of Yoga
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #E8F5E8, #F1F8E9)' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      🧠 Mental Benefits
                    </Typography>
                    <Typography variant="body2">
                      • Reduces stress and anxiety<br/>
                      • Improves concentration<br/>
                      • Enhances mood<br/>
                      • Promotes better sleep
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #E3F2FD, #F1F8FF)' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      💪 Physical Benefits
                    </Typography>
                    <Typography variant="body2">
                      • Increases flexibility<br/>
                      • Builds strength<br/>
                      • Improves balance<br/>
                      • Enhances posture
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #FCE4EC, #F8BBD9)' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      ✨ Spiritual Benefits
                    </Typography>
                    <Typography variant="body2">
                      • Increases self-awareness<br/>
                      • Promotes inner peace<br/>
                      • Connects mind and body<br/>
                      • Cultivates mindfulness
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>


          {/* Getting Started */}
          <Box sx={{ mb: 4 }}>
            <Card sx={{ background: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)', p: 3 }}>
              <Typography variant="h5" gutterBottom>
                🌟 Getting Started with Yoga
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>For Beginners:</Typography>
                  <Typography variant="body2">
                    • Start with 10-15 minutes daily<br/>
                    • Focus on basic poses<br/>
                    • Listen to your body<br/>
                    • Use props when needed<br/>
                    • Consider joining a beginner class
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>What You Need:</Typography>
                  <Typography variant="body2">
                    • Yoga mat<br/>
                    • Comfortable clothing<br/>
                    • Quiet space<br/>
                    • Water bottle<br/>
                    • Optional: blocks, straps, bolster
                  </Typography>
                </Grid>
              </Grid>
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    background: 'linear-gradient(45deg, #4CAF50, #8BC34A)',
                    '&:hover': { background: 'linear-gradient(45deg, #388E3C, #689F38)' }
                  }}
                >
                  Start Your Yoga Journey Today
                </Button>
              </Box>
            </Card>
          </Box>
        </Box>
      )}
    </Box>
  );
};


export default Yoga;