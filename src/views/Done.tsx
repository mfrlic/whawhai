import { _avatars } from "../utils/avatars";
import Title from "../components/common/Title";
import { warriorAttacks } from "../utils/warriors";
import {
    Avatar, Grid,
} from "@mui/material";
import Button from "../components/common/Button";
import { _colors } from "../utils/colors";
import { Fight } from "../components/Router";

const Done = ({ fightResult, calculateMatchWinner, calculateWinner, setDoneScreen, setWaitingScreen, validateForm }: { fightResult: Fight, calculateMatchWinner: () => number, calculateWinner: () => number[], setDoneScreen: React.Dispatch<React.SetStateAction<boolean>>, setWaitingScreen: React.Dispatch<React.SetStateAction<boolean>>, validateForm: () => void }) => {
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
                        sx={{
                            width: 100,
                            height: 100,
                            border:
                                calculateMatchWinner() === 1
                                    ? "3px solid" + _colors.green
                                    : "",
                        }}
                        src={_avatars[fightResult.Warrior1.WarriorType]}
                    />
                    {calculateMatchWinner() === 1 && (
                        <span style={{ color: _colors.green }}>Winner</span>
                    )}
                </Grid>
                <Grid
                    item
                    xs={4}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 75,
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
                        sx={{
                            width: 100,
                            height: 100,
                            border:
                                calculateMatchWinner() === 2
                                    ? "3px solid" + _colors.green
                                    : "",
                        }}
                        src={_avatars[fightResult.Warrior2.WarriorType]}
                    />
                    {calculateMatchWinner() === 2 && (
                        <span style={{ color: _colors.green }}>Winner</span>
                    )}
                </Grid>
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
                    <div>
                        {i + 1}.{" "}
                        <span
                            style={{
                                opacity:
                                    calculateWinner()[i] === 0 || calculateWinner()[i] === 1
                                        ? 1
                                        : 0.8,
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
                                    calculateWinner()[i] === 0 || calculateWinner()[i] === 2
                                        ? 1
                                        : 0.8,
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

            <div style={{ marginTop: 30 }}>
                <Button
                    onClick={() => {
                        validateForm()
                        setDoneScreen(false);
                        setWaitingScreen(true);
                    }}
                >
                    Again!!!
                </Button>
            </div>
        </>
    );
};

export default Done;
