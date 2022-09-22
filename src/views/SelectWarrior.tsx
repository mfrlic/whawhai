import { _avatars } from "../utils/avatars";
import Title from "../components/common/Title";
import { Warrior } from "../components/Router";
import {
    Grid,
} from "@mui/material";
import Avatar from "../components/common/Avatar";

const SelectWarrior = ({ warrior, setWarriorSelection, setWarrior }: { warrior: Warrior, setWarriorSelection: React.Dispatch<React.SetStateAction<boolean>>, setWarrior: React.Dispatch<React.SetStateAction<Warrior>> }) => {
    return (
        <>
            <Title>
                <span onClick={() => setWarriorSelection(false)}>{"<"}</span>{" "}
                Tangata toa
            </Title>
            <Grid container>
                {_avatars.map(
                    (key, index) =>
                        index !== warrior.WarriorType && (
                            <Grid
                                key={key}
                                item
                                xs={6}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: 20,
                                }}
                            >
                                <Avatar
                                    name=""
                                    size="lg"
                                    src={_avatars[index]}
                                    hover="true"
                                    onClick={() => {
                                        setWarrior((old) => {
                                            return {
                                                ...old,
                                                WarriorType: index,
                                                Attacks: [-99, -99, -99],
                                            };
                                        });
                                        setWarriorSelection(false);
                                    }}
                                />
                            </Grid>
                        )
                )}
            </Grid>
        </>
    );
};

export default SelectWarrior;
