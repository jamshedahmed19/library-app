import React from 'react';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

const DetailsSkeletons: React.FC = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="circular" animation="wave" height={30} width={30} />
      <Skeleton variant="text" animation="wave" height={60} width={350} />
      <Skeleton variant="text" animation="wave" height={30} />
      <Skeleton variant="text" animation="wave" height={20} width={200}/>
      <Skeleton variant="text" animation="wave" height={20} width={200}/>
      <Skeleton variant="text" animation="wave" height={15} width={100}/>
      <Skeleton variant="rectangular" animation="wave" height={50}/>
    </Stack>
  );
};

export default DetailsSkeletons;