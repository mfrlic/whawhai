import axios from "axios";
import { Warrior } from "../utils/warriors";

const apiUrl: string =
  "https://recruitment-test.ants.house/jsonrpc2/whawhai/v1";

export const Register = (warrior: Warrior) =>
  axios.post(apiUrl, {
    jsonrpc: "2.0",
    id: 1,
    method: "Register",
    params: {
      application: warrior,
    },
  });

export const Status = (fightId: string) =>
  axios.post(apiUrl, {
    jsonrpc: "2.0",
    id: 1,
    method: "Status",
    params: {
      id: fightId,
    },
  });

export const Cancel = (fightId: string) => {
  axios
    .post(apiUrl, {
      jsonrpc: "2.0",
      id: 1,
      method: "Cancel",
      params: {
        id: fightId,
      },
    })
    .then((result) => console.log(result));
};
