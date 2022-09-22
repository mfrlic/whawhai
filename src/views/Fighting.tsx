import { _avatars } from "../utils/avatars";
import Title from "../components/common/Title";
import { Warrior } from "../utils/warriors";
import { Fight } from "../components/Router";
import {
    Grid,
} from "@mui/material";
import Button from "../components/common/Button";
import { CssGrid } from "../components/common/Grid";
import Avatar from "../components/common/Avatar";
import { GreenBox } from "../components/common/GreenBox";

const Fighting = ({ warrior, fightResult, setSeverity, setMessage, setDialogOpen }: { warrior: Warrior, fightResult: Fight, setSeverity: React.Dispatch<React.SetStateAction<string>>, setMessage: React.Dispatch<React.SetStateAction<string>>, setDialogOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <>
            <Title>Pakipaki</Title>
            <Grid container>
                <CssGrid
                    item
                    xs={4}
                >
                    <Avatar
                        size="md"
                        name={fightResult.Warrior1.Name}
                        src={_avatars[fightResult.Warrior1.WarriorType]}
                    />
                </CssGrid>
                <CssGrid
                    item
                    xs={4}
                    style={{fontSize: 70}}
                >
                    VS
                </CssGrid>
                <CssGrid
                    item
                    xs={4}
                >
                    <Avatar
                        size="md"
                        name={fightResult.Warrior2.Name}
                        src={_avatars[fightResult.Warrior2.WarriorType]}
                    />
                </CssGrid>
            </Grid>

            <GreenBox
            >
                Beating the shit out of "
                {fightResult.Warrior1.Name === warrior.name
                    ? fightResult.Warrior2.Name
                    : fightResult.Warrior1.Name}"
            </GreenBox>

            <Button
                onClick={() => {
                    setSeverity("info");
                    setMessage("It's never ever possible to surrender in this state always show nasty insult to the coward.")
                    setDialogOpen(true)
                }}
                style={{ marginTop: 30 }}
            >
                Surrender!!!
            </Button>
        </>
    );
};

export default Fighting;
