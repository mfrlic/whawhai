import styled from "@emotion/styled";
import { _colors } from "../../utils/colors";

const Input = styled("input")({
  borderRadius: 0,
  border: "none",
  background: "transparent",
  outline: "none",
  fontSize: 40,
  color: _colors.secondary,
  fontFamily: "inherit",
  "&::placeholder": {
    color: "inherit",
    opacity: 0.8,
  },
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: _colors.secondary,
});

export default Input;
