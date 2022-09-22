import styled from "@emotion/styled";
import { _colors } from "../../utils/colors";

//not actually a select component - a button that enables you to select an attack for a specific round
const Select = styled("button")({
  borderRadius: 0,
  border: "none",
  outline: "none",
  fontSize: 40,
  width: "100% !important",
  textAlign: "center",
  color: _colors.tertiary,
  fontFamily: "inherit",
  transition: "0.3s",
  "&:hover": {
    cursor: "pointer",
    opacity: 0.8,
  },
});

export default Select;
