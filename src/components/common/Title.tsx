import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { _colors } from "../../utils/colors";

const Title = styled(Typography)({
  color: _colors.secondary,
  fontFamily: "inherit",
  fontSize: 120,

  "& span": {
    transition: "0.3s", "&:hover": {
      cursor: "pointer",
      color: _colors.secondary80,
    }
  }
});

export default Title;
