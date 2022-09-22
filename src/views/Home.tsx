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
    const [attackSelect, setAttackSelect] = useState<number>(0)

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
                        name=""
                        size="md"
                        src={_avatars[warrior.warriorType]}
                        hover="true"
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
                    {attackSelect === 0 ? warrior.attacks.map((attack, index) => (
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
                            {attack === -99 ? "Attack for round #" + (index + 1) : warriorAttacks[warrior.warriorType][attack]}
                        </Select>
                    )) : warriorAttacks[warrior.warriorType].map((key, i) => (
                        <Select
                            style={{
                                backgroundColor: warrior.attacks[attackSelect - 1] === i ? _colors.green : i === 0
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
                                        attacks: [
                                            attackSelect === 1
                                                ? i
                                                : old.attacks[0],
                                            attackSelect === 2
                                                ? i
                                                : old.attacks[1],
                                            attackSelect === 3
                                                ? i
                                                : old.attacks[2],
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
