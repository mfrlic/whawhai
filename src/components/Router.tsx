import { useEffect, useState } from "react";
import { Warrior } from "../utils/warriors";
import { Register, Status } from "../api/axios";
import Dialog from "./common/Dialog";
import { errors } from "../utils/errors";
import Home from "../views/Home";
import SelectWarrior from "../views/SelectWarrior";
import Waiting from "../views/Waiting";
import Fighting from "../views/Fighting";
import Done from "../views/Done";

interface FightWarrior {
  Name: string;
  WarriorType: number;
  Attacks: number[];
}

interface Round {
  Warrior1Attack: number;
  Warrior2Attack: number;
}

export interface Fight {
  ID: string;
  Status: number;
  Warrior1: FightWarrior;
  Warrior2: FightWarrior;
  Rounds: Round[];
  Err?: any;
}

const Router = () => {
  const [warrior, setWarrior] = useState<Warrior>({
    name: "",
    warriorType: 0,
    attacks: [-99, -99, -99],
  });

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [warriorSelection, setWarriorSelection] = useState<boolean>(false);
  const [waitingScreen, setWaitingScreen] = useState<boolean>(false);
  const [fightingScreen, setFightingScreen] = useState<boolean>(false);
  const [doneScreen, setDoneScreen] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("")
  const [severity, setSeverity] = useState<string>("info")

  const [fightResult, setFightResult] = useState<Fight>({
    ID: "",
    Status: 0,
    Warrior1: { Name: "", WarriorType: 0, Attacks: [0] },
    Warrior2: { Name: "", WarriorType: 0, Attacks: [0] },
    Rounds: [{ Warrior1Attack: 0, Warrior2Attack: 0 }],
  });

  const warriorTypeSet: Set<number> = new Set([0, 1, 2, 3, 4]);
  const warriorAttacksSet: Set<number> = new Set([0, 1, 2]);

  const [currentFightId, setCurrentFightId] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      if ((waitingScreen || fightingScreen) && currentFightId) {
        Status(currentFightId).then((result) => {
          if (result.data.result.fight.Status === 1) {
            setWaitingScreen(false);
            setFightingScreen(true);
            setDoneScreen(false);
            setFightResult(result.data.result.fight);
          }
          if (result.data.result.fight.Status === 2) {
            setDialogOpen(false);
            setWaitingScreen(false);
            setFightingScreen(false);
            setDoneScreen(true);
            setFightResult(result.data.result.fight);
          }
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [waitingScreen, fightingScreen, currentFightId]);

  const roundWinner = (r: Round): number => {
    switch (r.Warrior1Attack) {
      case 0: {
        if (r.Warrior2Attack === 0) return 0; //paper - paper: tie
        else if (r.Warrior2Attack === 1) return 2; //paper - scissors - w2
        else if (r.Warrior2Attack === 2) return 1; //paper - rock - w1
        break;
      }
      case 1: {
        if (r.Warrior2Attack === 0) return 1; //scissors - paper: w1
        else if (r.Warrior2Attack === 1) return 0; //scissors - scissors - tie
        else if (r.Warrior2Attack === 2) return 2; //scissors - rock - w2
        break;
      }
      case 2: {
        if (r.Warrior2Attack === 0) return 2; //rock - paper: w2
        else if (r.Warrior2Attack === 1) return 1; //scissors - scissors - w1
        else if (r.Warrior2Attack === 2) return 0; //scissors - rock - tie
        break;
      }
    }
    return 99;
  };

  const calculateWinner = () => {
    let winner: number[] = [];
    fightResult.Rounds.map((round) =>
      winner.push(roundWinner(round))
    );
    console.log(winner);
    return winner;
  };

  const calculateMatchWinner = () => {
    let winner: number[] = [];
    let counts: number[] = [0, 0, 0];
    fightResult.Rounds.map((round) =>
      winner.push(roundWinner(round))
    );
    for (const num of winner) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    if (counts[1] > 1 || (counts[1] > 0 && counts[0] > 1)) return 1;
    else if (counts[2] > 1 || (counts[2] > 0 && counts[0] > 1)) return 2;
    else if (counts[0] > 1) return 0;
    return 99;
  };

  useEffect(() => {
    if (doneScreen) {
    }
  }, [doneScreen]);

  const validateForm = () => {
    let err: number = 0;
    if (
      warrior.name.length <= 0) err = 1
    else if (
      warrior.name.length >= 26) err = 2
    else if (!warriorTypeSet.has(warrior.warriorType)) err = 3
    else if (warrior.attacks.length !== 3) err = 4
    else if (!warriorAttacksSet.has(warrior.attacks[0])) err = 5
    else if (!warriorAttacksSet.has(warrior.attacks[1])) err = 6
    else if (!warriorAttacksSet.has(warrior.attacks[2])) err = 7
    if (err === 0) {
      Register(warrior).then((result) => {
        if (result.data.result.id) {
          setCurrentFightId(result.data.result.id);
          setWaitingScreen(true);
        }
      });
    } else { setMessage(errors[err - 1]); setSeverity("error"); setDialogOpen(true) };
  };

  return (
    <div
      style={{
        textAlign: "center",
        maxWidth: "45vw",
        marginLeft: "30vw",
      }}
    >
      <Dialog severity={severity} open={dialogOpen} setOpen={setDialogOpen} message={message} />
      {warriorSelection ? (
        <SelectWarrior warrior={warrior} setWarrior={setWarrior} setWarriorSelection={setWarriorSelection} />
      ) : waitingScreen ? (
        <Waiting warrior={warrior} currentFightId={currentFightId} setCurrentFightId={setCurrentFightId} setWaitingScreen={setWaitingScreen} />
      ) : fightingScreen && fightResult ? (
        <Fighting warrior={warrior} fightResult={fightResult} setSeverity={setSeverity} setMessage={setMessage} setDialogOpen={setDialogOpen} />
      ) : doneScreen ? (
        <Done fightResult={fightResult} calculateMatchWinner={calculateMatchWinner} calculateWinner={calculateWinner} setDoneScreen={setDoneScreen} setWaitingScreen={setWaitingScreen} validateForm={validateForm} />
      ) : (
        <Home warrior={warrior} setWarrior={setWarrior} setWarriorSelection={setWarriorSelection} validateForm={validateForm} />
      )}
    </div>
  );
};

export default Router;
