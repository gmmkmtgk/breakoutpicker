import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';
import { videos } from 'data/community';

const Videos = () => {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    // Fetch or update video list here
    setVideoList(videos);
  }, []);

  return (
    <MainCard>
      <Grid container spacing={3}>
        {videoList.map((video, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Typography variant="h6" gutterBottom>
              {video.title}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {video.description}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </MainCard>
  );
};

export default Videos;

