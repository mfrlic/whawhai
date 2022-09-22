import { _avatars } from "../utils/avatars";
import Title from "../components/common/Title";
import { Warrior } from "../utils/warriors";
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
                        index !== warrior.warriorType && (
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
                                                warriorType: index,
                                                attacks: [-99, -99, -99],
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
