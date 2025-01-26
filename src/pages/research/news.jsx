import React from 'react';
import MainCard from 'components/MainCard';
import { Grid, Typography } from '@mui/material';

// Sample News data
const newsItems = [
  { title: 'News Title 1', description: 'Description for news item 1' },
  { title: 'News Title 2', description: 'Description for news item 2' },
  // Add more news items as needed
];

const News = () => {
  return (
    <MainCard>
      <Grid container spacing={3}>
        {newsItems.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Typography variant="h6" gutterBottom>
              {item.title}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {item.description}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </MainCard>
  );
};

export default News;

