import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Grid, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import SkeletonTable from 'components/SkeletonTable';

const Voices = () => {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const getVoices = async () => {
      const response = await fetch('https://api.breakoutpicker.com/api/voices');
      const data = await response.json();
      setVoices(data.voices);
    };
    getVoices();
  }, []);

  return (
    <MainCard title="Voices">
      <Grid container spacing={2}>
        {voices.length > 0 ? (
          voices.map((voice) => (
            <Grid item xs={12} sm={6} md={4} key={voice.id}>
              <Typography variant="h5" gutterBottom>
                {voice.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {voice.description}
              </Typography>
            </Grid>
          ))
        ) : (
          <SkeletonTable rows={5} columns={3} />
        )}
      </Grid>
    </MainCard>
  );
};

export default Voices;
