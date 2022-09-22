import { _avatars } from "../utils/avatars";
import Title from "../components/common/Title";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import { _colors } from "../utils/colors";
import { warriorAttacks } from "../utils/warriorAttacks";
import Button from "../components/common/Button";
import Avatar from "../components/common/Avatar";
import { useState } from "react";
import { Warrior } from "../components/Router";

const Home = ({ warrior, setWarriorSelection, setWarrior, validateForm }: { warrior: Warrior, setWarriorSelection: React.Dispatch<React.SetStateAction<boolean>>, setWarrior: React.Dispatch<React.SetStateAction<Warrior>>, validateForm: () => void }) => {
    const [attackSelect, setAttackSelect] = useState<number>(0) //attack selection for one of the 3 rounds - 0: unselected, 1,2,3: round x

    return (
        <>
            <Title>Whawhai</Title>
            <div>
                <div
                    style={{
                        display: "flex", //center horizontally and vertically
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        name=""
                        size="md"
                        src={_avatars[warrior.WarriorType]}
                        hover="true"
                        onClick={() => setWarriorSelection(true)}
                    />

                    <Input
                        placeholder="WARRIOR NAME"
                        value={warrior.Name}
                        onChange={(e) =>
                            setWarrior((old) => {
                                return { ...old, Name: e.target.value };
                            })
                        }
                    />
                </div>

                <div
                    style={{
                        marginTop: 20,
                    }}
                >
                    {attackSelect === 0 ? warrior.Attacks.map((attack, index) => (
                        <Select
                            key={"sel" + attack + index}

                            style={{
                                backgroundColor:
                                    index === 0
                                        ? _colors.secondary
                                        : index === 1
                                            ? _colors.secondary80
                                            : _colors.secondary60,
                            }}
                            value={attack}
                            onClick={() => setAttackSelect(index + 1)}
                        >
                            {attack === -99 ? "Attack for round #" + (index + 1) : warriorAttacks[warrior.WarriorType][attack]}
                        </Select>
                    )) : warriorAttacks[warrior.WarriorType].map((key, i) => (
                        <Select
                            style={{
                                backgroundColor: warrior.Attacks[attackSelect - 1] === i ? _colors.green : i === 0
                                    ? _colors.secondary
                                    : i === 1
                                        ? _colors.secondary80
                                        : _colors.secondary60,
                            }}
                            value={i}
                            key={"opt" + key + i}
                            onClick={() => {
                                setWarrior((old) => {
                                    return {
                                        ...old,
                                        Attacks: [
                                            attackSelect === 1
                                                ? i
                                                : old.Attacks[0],
                                            attackSelect === 2
                                                ? i
                                                : old.Attacks[1],
                                            attackSelect === 3
                                                ? i
                                                : old.Attacks[2],
                                        ],
                                    };
                                });
                                setAttackSelect(0);
                            }
                            }
                        >
                            {key}
                        </Select>
                    ))}
                </div>
                <Button onClick={validateForm} style={{ marginTop: 30 }}>Fight!!!</Button>
            </div>
        </>
    );
};

export default Home;
