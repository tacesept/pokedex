# Pokedex CLI

A simple interactive command-line Pokedex built with TypeScript and Node.js.

It uses the [PokeAPI](https://pokeapi.co/) to browse location areas, explore encounter data, and catch Pokemon into an in-memory Pokedex.

## Requirements

- nvm
- Node.js `v24.15.0` (from `.nvmrc`)
- npm

## Installation

```bash
nvm install
nvm use
npm install
```

## Running the app

Build and run once:

```bash
npm run dev
```

Or run in two steps:

```bash
npm run build
npm start
```

You will see a prompt like:

```text
Pokedex >
```

## Available commands

- `help` - Display all available commands
- `exit` - Exit the app
- `map` - Show the next page of location areas
- `mapb` - Show the previous page of location areas
- `explore <location_name>` - List Pokemon encounters for a location area
- `catch <pokemon_name>` - Attempt to catch a Pokemon
- `inspect <pokemon_name>` - Show details for a caught Pokemon
- `pokedex` - List all Pokemon you've caught in this session

## Example session

```text
Pokedex > help
Pokedex > map
Pokedex > explore canalave-city-area
Pokedex > catch pikachu
Pokedex > inspect pikachu
Pokedex > pokedex
Pokedex > exit
```

## Tests

Run test suite:

```bash
npm test
```

## Project structure

- `src/main.ts` - CLI prompt and input loop
- `src/commands/` - command registry, handlers, and command processing
- `src/services/pokeapi.ts` - PokeAPI HTTP client functions and types
- `src/utils/cache.ts` - in-memory cache utility
- `src/test/` - test files

## Notes

- Caught Pokemon are stored in memory only and reset when the process exits.
