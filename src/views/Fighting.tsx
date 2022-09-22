import { _avatars } from "../utils/avatars";
import Title from "../components/common/Title";
import { Warrior } from "../utils/warriors";
import { Fight } from "../components/Router";
import {
    Avatar, Grid,
} from "@mui/material";
import Button from "../components/common/Button";
import { _colors } from "../utils/colors";

const Fighting = ({ warrior, fightResult, setSeverity, setMessage, setDialogOpen }: { warrior: Warrior, fightResult: Fight, setSeverity: React.Dispatch<React.SetStateAction<string>>, setMessage: React.Dispatch<React.SetStateAction<string>>, setDialogOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
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
                    <div>{fightResult.Warrior1.Name}</div>
                    <Avatar
                        sx={{ width: 100, height: 100 }}
                        src={_avatars[fightResult.Warrior1.WarriorType]}
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
                    <div>{fightResult.Warrior2.Name}</div>
                    <Avatar
                        sx={{ width: 100, height: 100 }}
                        src={_avatars[fightResult.Warrior2.WarriorType]}
                    />
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
                Beating the shit out of "
                {fightResult.Warrior1.Name === warrior.name
                    ? fightResult.Warrior2.Name
                    : fightResult.Warrior1.Name}""
            </div>

            <div style={{ marginTop: 30 }}>
                <Button
                    onClick={() => {
                        setSeverity("error");
                        setMessage("It's never ever possible to surrender in this state always show nasty insult to the coward.")
                        setDialogOpen(true)
                    }}
                >
                    Surrender!!!
                </Button>
            </div>
        </>
    );
};

export default Fighting;
