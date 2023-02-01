import React from 'react';
import { useNavigate } from 'react-router-dom';
//* MUI IMPORTS
import Grid from '@mui/material/Grid';
// * COMPONENTS IMPORTS
import CategoryCard from '../../components/CategoryCard';
//* ASSETS / ICONS IMPORTS
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
// * UTILS
import { paths } from '../../routes/paths';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <CategoryCard
          title="Books"
          Icon={BookRoundedIcon}
          handleClick={() => navigate(paths.books)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CategoryCard
          title="Newspapers"
          Icon={NewspaperRoundedIcon}
          handleClick={() => navigate(paths.newspapers)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CategoryCard
          title="Documentaries"
          Icon={HistoryEduRoundedIcon}
          handleClick={() => navigate(paths.documentaries)}
        />
      </Grid>
    </Grid>
  );
}

export default Dashboard;