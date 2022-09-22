import { _avatars } from "../utils/avatars";
import Title from "../components/common/Title";
import { Warrior } from "../utils/warriors";
import {
    Avatar, Grid,
} from "@mui/material";
import Button from "../components/common/Button";
import { _colors } from "../utils/colors";
import { Cancel } from "../api/axios";



const Waiting = ({ warrior, currentFightId, setCurrentFightId, setWaitingScreen }: { warrior: Warrior, currentFightId: string, setCurrentFightId: React.Dispatch<React.SetStateAction<string>>, setWaitingScreen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <>
            <Title>Pakipaki</Title>
            <Grid container>
                <Grid
                    item
                    xs={4}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 35,
                        color: _colors.secondary,
                    }}
                >
                    <div>{warrior.name}</div>
                    <Avatar
                        sx={{ width: 100, height: 100 }}
                        src={_avatars[warrior.warriorType]}
                    />
                </Grid>
                <Grid
                    item
                    xs={4}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 35,
                        color: _colors.secondary,
                    }}
                >
                    <div>VS</div>
                </Grid>
                <Grid
                    item
                    xs={4}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 35,
                        color: _colors.secondary,
                    }}
                >
                    <div>Unknown</div>
                    <Avatar
                        sx={{
                            border: "2px solid #000",
                            width: 96,
                            height: 96,
                            color: _colors.secondary,
                            fontFamily: "inherit",
                            fontSize: 75,
                        }}
                    >
                        ?
                    </Avatar>
                </Grid>
            </Grid>

            <div
                style={{
                    color: "white",
                    background: _colors.green,
                    width: "100%",
                    textAlign: "center",
                    padding: 20,
                    marginTop: 20,
                    fontSize: 40,
                }}
            >
                Waiting for 2nd player to join
            </div>

            <div style={{ marginTop: 30 }}>
                <Button
                    onClick={() => {
                        Cancel(currentFightId);
                        setCurrentFightId("");
                        setWaitingScreen(false);
                    }}
                >
                    Panic!!!
                </Button>
            </div>
        </>
    );
};

export default Waiting;
