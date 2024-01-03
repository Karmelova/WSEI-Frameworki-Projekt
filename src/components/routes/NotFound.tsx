import { styled, alpha } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

export default function NotFound() {
  const navigate = useNavigate();
  const CustomTypography = styled(Typography)`
    font-family: "Olga-Regular", sans-serif;
    font-weight: 700;
    letter-spacing: 0.3rem;
    text-decoration: none;
    font-size: 11em;
  ` as typeof Typography;

  return (
    <CustomTypography
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      color="secondary"
      component="a"
      href="/"
      sx={{
        mr: 2,
        display: "flex",
      }}
    >
      404
      <Typography variant="body1" color="initial" sx={{ textAlign: "center", marginBottom:10 }}>
        WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND
      </Typography>
      <Button
        size="large"
        variant="outlined"
        component={Link}
        to={`/`}
        color="secondary"
        startIcon={<HomeIcon />}
      >
        Home
      </Button>
    </CustomTypography>
  );
}
