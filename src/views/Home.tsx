import { _avatars } from "../utils/avatars";
import Title from "../components/common/Title";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import { _colors } from "../utils/colors";
import { warriorAttacks, Warrior } from "../utils/warriors";
import Button from "../components/common/Button";
import {
    Avatar,
} from "@mui/material";

const Home = ({ warrior, setWarriorSelection, setWarrior, validateForm }: { warrior: Warrior, setWarriorSelection: React.Dispatch<React.SetStateAction<boolean>>, setWarrior: React.Dispatch<React.SetStateAction<Warrior>>, validateForm: () => void }) => {
    return (
        <>
            <Title>Whawhai</Title>
            <div style={{ textAlign: "center" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        sx={{ width: 100, height: 100 }}
                        src={_avatars[warrior.warriorType]}
                        onClick={() => setWarriorSelection(true)}
                    />
                    <Input
                        placeholder="$WARRIOR-NAME"
                        value={warrior.name}
                        onChange={(e) =>
                            setWarrior((old) => {
                                return { ...old, name: e.target.value };
                            })
                        }
                    />
                </div>

                <div
                    style={{
                        marginTop: 20,
                    }}
                >
                    {warrior.attacks.map((attack, index) => (
                        <div
                            key={attack + index}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Select
                                style={{
                                    backgroundColor:
                                        index === 0
                                            ? _colors.secondary
                                            : index === 1
                                                ? _colors.secondary80
                                                : _colors.secondary60,
                                }}
                                value={attack}
                                onChange={(e) =>
                                    setWarrior((old) => {
                                        return {
                                            ...old,
                                            attacks: [
                                                index === 0
                                                    ? parseInt(e.target.value)
                                                    : old.attacks[0],
                                                index === 1
                                                    ? parseInt(e.target.value)
                                                    : old.attacks[1],
                                                index === 2
                                                    ? parseInt(e.target.value)
                                                    : old.attacks[2],
                                            ],
                                        };
                                    })
                                }
                            >
                                <option value={-99} disabled>
                                    Attack for round #{index + 1}
                                </option>
                                {warriorAttacks[warrior.warriorType].map((key, i) => (
                                    <option value={i} key={key + i}>
                                        {key}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: 30 }}>
                    <Button onClick={validateForm}>Fight!!!</Button>
                </div>
            </div>
        </>
    );
};

export default Home;
