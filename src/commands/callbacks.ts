import { getLocation, getLocations } from "../services/pokeapi.js";

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

export async function commandMapForward() {
  const locations = await getLocations(state.nextLocationsURL);

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;

  console.log();
  for (const loc of locations.results) {
    console.log(loc.name);
  }
  console.log();
}

export async function commandMapBack() {
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

export async function commandExplore(args: string[]) {
  if (args.length !== 1) {
    throw new Error("you must provide a location name");
  }

  const location = await getLocation(args[0]);

  console.log(`Exploring ${args[0]}...`);
  console.log("Found Pokemon:");
  for (const enc of location.pokemon_encounters) {
    console.log(` - ${enc.pokemon.name}`);
  }
}
