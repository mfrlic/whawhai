import { _avatars } from "../utils/avatars";
import Title from "../components/common/Title";
import { warriorAttacks } from "../utils/warriorAttacks";
import {
    Grid,
} from "@mui/material";
import Button from "../components/common/Button";
import { _colors } from "../utils/colors";
import { Fight } from "../components/Router";
import { CssGrid } from "../components/common/Grid";
import Avatar from "../components/common/Avatar";

const Done = ({ fightResult, calculateWinner, setDoneScreen, setWaitingScreen, validateForm }: { fightResult: Fight, calculateWinner: () => { roundWinners: number[], matchWinner: number }, setDoneScreen: React.Dispatch<React.SetStateAction<boolean>>, setWaitingScreen: React.Dispatch<React.SetStateAction<boolean>>, validateForm: () => void }) => {
    return (
        <>
            <Title>Pakipaki</Title>
            <Grid container>
                <CssGrid
                    item
                    xs={5}
                >
                    <Avatar
                        size="lg"
                        winner={calculateWinner().matchWinner === 1 ? "true" : undefined}
                        name={fightResult.Warrior1.Name}
                        src={_avatars[fightResult.Warrior1.WarriorType]}
                    />
                </CssGrid>
                <CssGrid
                    item
                    xs={2}
                    style={{ fontSize: 70 }}
                >
                    VS
                </CssGrid>
                <CssGrid
                    item
                    xs={5}
                >
                    <Avatar
                        size="lg"
                        winner={calculateWinner().matchWinner === 2 ? "true" : undefined}
                        name={fightResult.Warrior2.Name}
                        src={_avatars[fightResult.Warrior2.WarriorType]}
                    />
                </CssGrid>
            </Grid>

            <div
                style={{
                    color: _colors.secondary,
                    width: "100%",
                    textAlign: "center",
                    padding: 20,
                    marginTop: 20,
                    fontSize: 40,
                }}
            >
                {fightResult.Rounds.map((round, i) => (
                    <div key={i}>
                        {i + 1}.{" "}
                        <span
                            style={{
                                opacity:
                                    calculateWinner().roundWinners[i] === 0 || calculateWinner().roundWinners[i] === 1
                                        ? 1
                                        : 0.7,
                            }}
                        >
                            {
                                warriorAttacks[fightResult.Warrior1.WarriorType][
                                round.Warrior1Attack
                                ]
                            }
                        </span>{" "}
                        -{" "}
                        <span
                            style={{
                                opacity:
                                    calculateWinner().roundWinners[i] === 0 || calculateWinner().roundWinners[i] === 2
                                        ? 1
                                        : 0.7,
                            }}
                        >
                            {
                                warriorAttacks[fightResult.Warrior2.WarriorType][
                                round.Warrior2Attack
                                ]
                            }
                        </span>
                    </div>
                ))}
            </div>

            <Button
                onClick={() => {
                    validateForm() //calls Register and starts again
                    setDoneScreen(false);
                    setWaitingScreen(true);
                }}
                style={{ marginTop: 30 }}
            >
                Again!!!
            </Button>
        </>
    );
};

export default Done;
