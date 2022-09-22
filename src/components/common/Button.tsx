import styled from "@emotion/styled";
import { _colors } from "../../utils/colors";

const Button = styled("button")({
  borderRadius: 0,
  border: "none",
  background: _colors.secondary,
  outline: "none",
  fontSize: 30,
  padding: "10px 20px",
  color: _colors.primary,
  fontFamily: "inherit",
  transition: "0.3s",
  "&:hover": {
    cursor: "pointer",
    opacity: 0.9,
  },
});

export default Button;
