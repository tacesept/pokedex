import { commands } from "./commands.js";

export async function processCommand(words: string[]) {
  const commandName = words[0];
  const args = words.slice(1);

  const cmd = commands[commandName];
  if (!cmd) {
    console.log(
      `Unknown command: "${commandName}". Type "help" for a list of commands.`,
    );
    return;
  }

  try {
    await cmd.callback(args);
  } catch (e) {
    console.log((e as Error).message);
  }
}
