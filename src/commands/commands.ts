import { commandExit, commandHelp } from "./callbacks.js";

interface CLICommand {
  name: string;
  description: string;
  callback: (args?: string[]) => Promise<void>;
}

export const commands: Record<string, CLICommand> = {
  help: {
    name: "help",
    description: "Displays a help message",
    callback: commandHelp,
  },
  exit: {
    name: "exit",
    description: "Exit the Pokedex",
    callback: commandExit,
  },
};
