import { commands } from "./commands.js";

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
