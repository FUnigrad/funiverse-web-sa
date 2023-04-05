import React from 'react';
import MuiCircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function CircularProgress() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <MuiCircularProgress />
    </Box>
  );
}

export default CircularProgress;
