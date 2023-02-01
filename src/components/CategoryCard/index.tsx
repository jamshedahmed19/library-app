import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import { SvgIconComponent } from "@mui/icons-material";

const CardContent = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignContent: "center",
}));

interface ICategoryCardProps {
  title: string;
  Icon: SvgIconComponent;
  handleClick: () => void;
}

const CategoryCard: React.FC<ICategoryCardProps> = ({
    title,
    Icon,
    handleClick,
}) => {
  return (
    <Paper>
      <Box padding={2}>
        <Icon />
        <CardContent>
          <Typography variant="h5">{title}</Typography>
          <Button
            endIcon={<ArrowRightAltRoundedIcon />}
            onClick={() => handleClick()}
          >
            {`View ${title} List`}
          </Button>
        </CardContent>
      </Box>
    </Paper>
  );
}

export default CategoryCard;