import React from "react";
import { Outlet } from "react-router-dom";
//* MUI IMPORTS
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
// * COMPONENTS IMPORTS
import Header from "./Header";

interface ILayoutProps {
}

const Layout: React.FC<ILayoutProps> = () => {
  return (
    <>
      <Header>
        <Container maxWidth="lg">
          <Box sx={{ marginTop: "50px" }}>
            <Outlet />
          </Box>
        </Container>
      </Header>
    </>
  );
};

export default Layout;
