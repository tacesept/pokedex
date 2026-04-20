import { getLocations } from "../services/pokeapi.js";

import { commands } from "./commands.js";

interface LocationState {
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
}

export const state: LocationState = {
  nextLocationsURL: null,
  prevLocationsURL: null,
};

export async function commandHelp() {
  console.log("\nWelcome to the Pokedex!");
  console.log("Usage: \n");

  for (const cmd of Object.values(commands)) {
    console.log(`  ${cmd.name}: ${cmd.description}`);
  }
  console.log();
}

export async function commandExit() {
  console.log("Closing the Pokedex... Goodbye!");
  process.exit(0);
}

export async function commandMapForward(args: string[] | undefined) {
  const locations = await getLocations(state.nextLocationsURL);

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;

  console.log();
  for (const loc of locations.results) {
    console.log(loc.name);
  }
  console.log();
}

export async function commandMapBack(args: string[] | undefined) {
  if (!state.prevLocationsURL) {
    throw new Error("\nyou're on the first page\n");
  }

  const locations = await getLocations(state.prevLocationsURL);

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;

  console.log();
  for (const loc of locations.results) {
    console.log(loc.name);
  }
  console.log();
}
