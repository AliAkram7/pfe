import { useMutation } from "react-query";
import { sendChoice } from "./axiosUrl";

export const useSendChoice = () => {
  return useMutation(sendChoice, {
  });
};