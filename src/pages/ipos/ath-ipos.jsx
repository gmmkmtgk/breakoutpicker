import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Grid, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import SkeletonTable from 'components/SkeletonTable';

const AthIpos = () => {
  const [rows, setRows] = useState([]);

  const { data, isLoading, error } = useQuery(['ath-ipos'], () => {
    return fetch('https://ipos.breakoutpicker.com/api/ath-ipos')
      .then((res) => res.json());
  });

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  return (
    <MainCard border={false} contentSX={{ p: 2.25 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h2">ATH Crossing IPOs</Typography>
      </Box>
      {isLoading ? (
        <SkeletonTable
          columns={6}
          rows={10}
        />
      ) : error ? (
        <Typography variant="subtitle2" sx={{ color: 'error.main' }}>
          Error fetching data
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {rows.map((row, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ mr: 1 }}>
                  {row.ticker}
                </Typography>
                <Typography variant="h4" sx={{ color: 'success.main' }}>
                  {row.price}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </MainCard>
  );
};

export default AthIpos;
