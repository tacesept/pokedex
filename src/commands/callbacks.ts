import {
  getLocation,
  getLocations,
  getPokemon,
  type Pokemon,
} from "../services/pokeapi.js";

import { commands } from "./commands.js";

interface State {
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  caughtPokemon: Record<string, Pokemon>;
}

export const state: State = {
  nextLocationsURL: null,
  prevLocationsURL: null,
  caughtPokemon: {},
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

export async function commandCatch(args: string[]) {
  if (args.length !== 1) {
    throw new Error("you must provide a pokemon name");
  }

  const pokemon = await getPokemon(args[0]);

  console.log(`Throwing a Pokeball at ${pokemon.name}...`);

  const res = Math.floor(Math.random() * pokemon.base_experience);
  if (res > 40) {
    console.log(`${pokemon.name} escaped!`);
    return;
  }

  console.log(`${pokemon.name} was caught!`);
  console.log("You may now inspect it with the inspect command.");
  state.caughtPokemon[pokemon.name] = pokemon;
}

export async function commandInspect(args: string[]) {
  if (args.length !== 1) {
    throw new Error("you must provide a pokemon name");
  }

  const pokemon = state.caughtPokemon[args[0]];
  if (!pokemon) {
    throw new Error("you have not caught that pokemon");
  }

  console.log("Name:", pokemon.name);
  console.log("Height:", pokemon.height);
  console.log("Weight:", pokemon.weight);
  console.log("Stats:");
  for (const stat of pokemon.stats) {
    console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
  }
  console.log("Types:");
  for (const typeInfo of pokemon.types) {
    console.log("  -", typeInfo.type.name);
  }
}
