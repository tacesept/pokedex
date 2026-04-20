import readline from "node:readline";
import { cleanInput } from "./utils/cleanInput.js";
import { processCommand } from "./commands/processCommand.js";

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", async (input) => {
    const words = cleanInput(input);

    if (words.length > 0) {
      try {
        await processCommand(words);
      } catch (e) {
        console.error("An unexpected error occurred.");
      }
    }

    rl.prompt();
  });
}

main();
