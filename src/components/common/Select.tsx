import styled from "@emotion/styled";
import { _colors } from "../../utils/colors";

const Select = styled("select")({
  borderRadius: 0,
  border: "none",
  outline: "none",
  fontSize: 40,
  width: "100% !important",
  textAlign: "center",
  color: "#000",
  fontFamily: "inherit",
  transition: "0.3s",
  "&::placeholder": {
    opacity: 0.8,
  },
  "&:hover": {
    cursor: "pointer",
    opacity: 0.8,
  },
  //    //    //    //    //
  "&:selected": {
    background: _colors.green,
  },
});

export default Select;
