import { useEffect, useState } from "react";
import { Register, Status } from "../api/axios";
import Dialog from "./common/Dialog";
import { errors } from "../utils/errors";
import Home from "../views/Home";
import SelectWarrior from "../views/SelectWarrior";
import Waiting from "../views/Waiting";
import Fighting from "../views/Fighting";
import Done from "../views/Done";


//Warrior - object sent to the Register method as application and received in fight report
export interface Warrior {
  Name: string;
  WarriorType: number;
  Attacks: number[];
}

//Round - defines one of 3 rounds in a match
interface Round {
  Warrior1Attack: number;
  Warrior2Attack: number;
}

//Fight - received as a reply from the Status method
export interface Fight {
  ID: string;
  Status: number;
  Warrior1: Warrior;
  Warrior2: Warrior;
  Rounds: Round[];
  Err?: any; //?
}

const Router = () => {
  //warrior - stores your warrior information, send to Register method
  const [warrior, setWarrior] = useState<Warrior>({
    Name: "",
    WarriorType: 0,
    Attacks: [-99, -99, -99],
  });

  //frequency of checking the fight status while waiting for the fight to be concluded (ms)
  const timeout: number = 2000;

  //used instead of react-router-dom so that everything is under "/"
  const [dialogOpen, setDialogOpen] = useState<boolean>(false); //dialog trigger
  const [warriorSelection, setWarriorSelection] = useState<boolean>(false); //switch to SelectWarrior
  const [waitingScreen, setWaitingScreen] = useState<boolean>(false); //switch to Waiting
  const [fightingScreen, setFightingScreen] = useState<boolean>(false); //switch to Fighting
  const [doneScreen, setDoneScreen] = useState<boolean>(false); //switch to Done

  const [message, setMessage] = useState<string>("") //message to display in the modal
  const [severity, setSeverity] = useState<string>("info") //severity of the modal - "error" or info(any)

  //storing the fight result received as a reply from the Status method
  const [fightResult, setFightResult] = useState<Fight>({
    ID: "",
    Status: 0,
    Warrior1: { Name: "", WarriorType: 0, Attacks: [0] },
    Warrior2: { Name: "", WarriorType: 0, Attacks: [0] },
    Rounds: [{ Warrior1Attack: 0, Warrior2Attack: 0 }],
  });

  //sets used to check if the numbers in warrior.WarriorType and warrior.Attacks are valid 
  //easier and cleaner to use - Set.has(x)
  const warriorTypeSet: Set<number> = new Set([0, 1, 2, 3, 4]);
  const warriorAttacksSet: Set<number> = new Set([0, 1, 2]);

  //storing the fight id generated in the Register method reply
  const [currentFightId, setCurrentFightId] = useState<string>("");

  //loop for checking and handling the fight result - occurres every {timeout} ms
  useEffect(() => {
    const interval = setInterval(() => {
      if ((waitingScreen || fightingScreen) && currentFightId) { //if not on Waiting or Fighting screen - stop here
        Status(currentFightId).then((result) => {
          if (result.data.result) { //is fulfilled?
            if (result.data.result.fight.Status === 1) { //fighting in progress
              setWaitingScreen(false);
              setFightingScreen(true);
              setDoneScreen(false);
              setFightResult(result.data.result.fight);
            }
            if (result.data.result.fight.Status === 2) { //fighting finished
              setDialogOpen(false); //close the possibly triggered surrender dialog as the results are in
              setWaitingScreen(false);
              setFightingScreen(false);
              setDoneScreen(true);
              setFightResult(result.data.result.fight);
            }
          }
          else if (result.data.error) { //error handling
            setSeverity("error");
            setMessage(result.data.error.message);
            setDialogOpen(true);
          }
        }
        );
      }
    }, timeout);
    return () => clearInterval(interval); //key to making this a loop
  }, [waitingScreen, fightingScreen, currentFightId]); //deps

  //returns winners by rounds and overall
  const calculateWinner = () => {
    const roundWinner = (r: Round): number => { //calculates the winner for each round
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
          else if (r.Warrior2Attack === 1) return 1; //rock - scissors - w1
          else if (r.Warrior2Attack === 2) return 0; //rock - rock - tie
          break;
        }
      }
      return -99;
    };

    let winner: number[] = []; //winners of each round, example 
    //[0,1,2] - round 1-tie, 2-player1, 3-player2

    let counts: number[] = [0, 0, 0]; //frequency of rounds won, example
    //[2,1,0] - 2 rounds were tied, player1 won 1 round - player1 wins

    fightResult.Rounds.map((round) =>
      winner.push(roundWinner(round)) //populate the round winners array
    );

    for (const num of winner) {
      counts[num] = counts[num] ? counts[num] + 1 : 1; //count frequency of rounds won
    }

    //player1 won at least 2 rounds or he won 1 and tied 2 - player1 wins
    if (counts[1] > 1 || (counts[1] > 0 && counts[0] > 1)) return { roundWinners: winner, matchWinner: 1 };

    //player2 won at least 2 rounds or he won 1 and tied 2 - player2 wins 
    else if (counts[2] > 1 || (counts[2] > 0 && counts[0] > 1)) return { roundWinners: winner, matchWinner: 2 };

    //none of the above happened, players are tied
    else if (counts[0] > 1) return { roundWinners: winner, matchWinner: 0 };

    return { roundWinners: winner, matchWinner: 0 };
  };

  //check if warrior object is ready to be sent to the server - if yes, send it
  const validateForm = () => {
    let err: number = 0; //error code as defined in errors.ts
    if (
      warrior.Name.length <= 0) err = 1 //no name input
    else if (
      warrior.Name.length >= 26) err = 2 //name too long
    else if (!warriorTypeSet.has(warrior.WarriorType)) err = 3 //invalid warrior type - unlikely
    else if (warrior.Attacks.length !== 3) err = 4 //invalid length of the Attacks array - unlikely
    else if (!warriorAttacksSet.has(warrior.Attacks[0])) err = 5 //warrior attack #x is not selected
    else if (!warriorAttacksSet.has(warrior.Attacks[1])) err = 6
    else if (!warriorAttacksSet.has(warrior.Attacks[2])) err = 7
    if (err === 0) { //no error
      Register(warrior).then((result) => {
        if (result.data.result) {
          setCurrentFightId(result.data.result.id);
          setWaitingScreen(true);
        }
        else if (result.data.error) {
          setSeverity("error");
          setMessage(result.data.error.message);
          setDialogOpen(true);
        }
      }
      );
    } else { setMessage(errors[err - 1]); setSeverity("error"); setDialogOpen(true) }; //display error
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
        <Waiting warrior={warrior} currentFightId={currentFightId} setCurrentFightId={setCurrentFightId} setWaitingScreen={setWaitingScreen} setSeverity={setSeverity} setMessage={setMessage} setDialogOpen={setDialogOpen} />
      ) : fightingScreen && fightResult ? (
        <Fighting warrior={warrior} fightResult={fightResult} setSeverity={setSeverity} setMessage={setMessage} setDialogOpen={setDialogOpen} />
      ) : doneScreen ? (
        <Done fightResult={fightResult} calculateWinner={calculateWinner} setDoneScreen={setDoneScreen} setWaitingScreen={setWaitingScreen} validateForm={validateForm} />
      ) : (
        <Home warrior={warrior} setWarrior={setWarrior} setWarriorSelection={setWarriorSelection} validateForm={validateForm} />
      )}
    </div>
  );
};

export default Router;
