import styled from "@emotion/styled";
import { Close } from "@mui/icons-material";
import { Dialog as MUIDialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { _colors } from "../../utils/colors";

const CssDialog = styled(MUIDialog)(({ severity }: { severity: string }) => ({
  "& .MuiPaper-root": {
    borderRadius: 0,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    background: _colors.secondary,
    border: "3px solid " + severity === "error" ? _colors.primary : _colors.green,
    minWidth: "40vw",
    textAlign: "center",
    "& h2": {
      fontFamily: "Roboto, sans-serif",
      background: severity === "error" ? _colors.primary : _colors.green,
      color: "white",
      fontWeight: 600,
    },
    "& .MuiDialogContent-root": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Roboto, sans-serif",
      color:  severity === "error" ? _colors.primary : "#000",
      fontWeight: 600,
      fontSize: 26,
      padding: 80,
    },
    "& .MuiButtonBase-root": {
      color: "white",
    },
  },
}));

const Dialog = ({ severity, message, open, setOpen }: { severity: string, message: string, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <CssDialog open={open} severity={severity}>
      <DialogTitle>
        {severity[0].toUpperCase() + severity.substring(1)}{" "}
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>{message}</DialogContent>
    </CssDialog>)
}

export default Dialog;
