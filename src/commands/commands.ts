import {
  commandCatch,
  commandExit,
  commandExplore,
  commandHelp,
  commandInspect,
  commandMapBack,
  commandMapForward,
} from "./callbacks.js";

interface CLICommand {
  name: string;
  description: string;
  callback: (args: string[]) => Promise<void>;
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
  map: {
    name: "map",
    description: "Get the next page of locations",
    callback: commandMapForward,
  },
  mapb: {
    name: "mapb",
    description: "Get the previous page of locations",
    callback: commandMapBack,
  },
  explore: {
    name: "explore <location_name>",
    description: "Explore a location",
    callback: commandExplore,
  },
  catch: {
    name: "catch <pokemon_name>",
    description: "Attempt to catch a pokemon",
    callback: commandCatch,
  },
  inspect: {
    name: "inspect <pokemon_name>",
    description: "View details about a caught pokemon",
    callback: commandInspect,
  },
};
