import styled from "@emotion/styled";
import { Avatar as MUIAvatar } from "@mui/material";
import { _colors } from "../../utils/colors";

const CssAvatar = styled(MUIAvatar)(({ size, hover, winner }: { size: string, hover?: string, winner?: string }) => ({
    width: (size === "unknown" ? 146 : size === "lg" ? 150 : 100),
    height: (size === "unknown" ? 146 : size === "lg" ? 150 : 100),
    transition: "0.3s",
    // unknown - font
    color: _colors.secondary,
    fontFamily: "inherit",
    fontSize: 90,
    // 
    marginBottom: !winner ? 40 : 0,
    border: size === "unknown" ? "2px solid " +_colors.tertiary : winner ? "3px solid" + _colors.green : "",
    "&:hover": {
        cursor: hover ? "pointer" : "",
        opacity: hover ? 0.8 : 1
    }
}));

const Avatar = ({ name, size, hover, src, onClick, winner }: { name: string, size: string, hover?: string, src?: string, onClick?: () => void, winner?: string }) => {
    return (<>
        <div>{name}</div>
        <CssAvatar size={size} hover={hover} winner={winner} src={src} onClick={onClick}>{size === "unknown" && "?"}</CssAvatar>
        {winner && (
            <span style={{ color: _colors.green }}>Winner</span>
        )}
    </>)
}

export default Avatar;
