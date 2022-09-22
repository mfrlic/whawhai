import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { _colors } from "../../utils/colors";

export const CssGrid = styled(Grid)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 35,
    color: _colors.secondary,
})