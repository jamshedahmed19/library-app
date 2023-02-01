import React from 'react';
import {v4 as uuid} from 'uuid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

interface ISkeletonProps {
  count: number;
}

const Skeletons: React.FC<ISkeletonProps> = ({count}) => {
  return (
    <Stack spacing={2}>
      {[...Array(count)].map((_) => (
        <Paper key={uuid()}>
          <Box p={2}>
            <Skeleton variant="rectangular" animation="wave" height={20} />
          </Box>
        </Paper>
      ))}
    </Stack>
  ); 
};

export default Skeletons;