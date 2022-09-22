import { _avatars } from "../utils/avatars";
import Title from "../components/common/Title";
import { Warrior } from "../components/Router";
import {
    Grid,
} from "@mui/material";
import Button from "../components/common/Button";
import Avatar from "../components/common/Avatar";
import { Cancel } from "../api/axios";
import { CssGrid } from "../components/common/Grid";
import { GreenBox } from "../components/common/GreenBox";

const Waiting = ({ warrior, currentFightId, setCurrentFightId, setWaitingScreen, setSeverity, setMessage, setDialogOpen }: { warrior: Warrior, currentFightId: string, setCurrentFightId: React.Dispatch<React.SetStateAction<string>>, setWaitingScreen: React.Dispatch<React.SetStateAction<boolean>>, setSeverity: React.Dispatch<React.SetStateAction<string>>, setMessage: React.Dispatch<React.SetStateAction<string>>, setDialogOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <>
            <Title>Pakipaki</Title>
            <Grid container>
                <CssGrid
                    item
                    xs={4}
                >
                    <Avatar
                        name={warrior.name}
                        size="md"
                        src={_avatars[warrior.warriorType]}
                    />
                </CssGrid>
                <CssGrid
                    item
                    xs={4}
                    style={{ fontSize: 70 }}
                >
                    VS
                </CssGrid>
                <CssGrid
                    item
                    xs={4}
                >
                    <Avatar
                        name="Unknown"
                        size="unknown"
                    />
                </CssGrid>
            </Grid>

            <GreenBox>
                Waiting for 2nd player to join
            </GreenBox>

            <Button
                onClick={() => {
                    let err: boolean = false;
                    Cancel(currentFightId).then(result => {
                        if (result.data.error) {
                            setSeverity("error");
                            setMessage(result.data.error.message);
                            setDialogOpen(true);
                            err = true;
                        }
                    });
                    if (!err) {
                        setCurrentFightId("");
                        setWaitingScreen(false);
                    }
                }}
                style={{ marginTop: 30 }}
            >
                Panic!!!
            </Button>
        </>
    );
};

export default Waiting;
