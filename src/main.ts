import readline from "node:readline";
import { cleanInput } from "./utils/cleanInput.js";

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", async (input) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      rl.prompt();
      return;
    }

    console.log(`Your command was: ${words[0]}`);
    rl.prompt();
  });
}

main();
