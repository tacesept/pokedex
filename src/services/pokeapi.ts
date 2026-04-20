const BASE_URL = "https://pokeapi.co/api/v2";

export async function getLocations(pageURL?: string) {
  const url = pageURL || `${BASE_URL}/location-area`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    const locations: ShallowLocations = await res.json();
    return locations;
  } catch (e) {
    throw new Error(`Error fetching locations: ${(e as Error).message}`);
  }
}

export async function getLocation(locationName: string) {
  const url = `${BASE_URL}/location-area/${locationName}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    const location: Location = await res.json();
    return location;
  } catch (e) {
    throw new Error(
      `Error fetching location '${locationName}': ${(e as Error).message}`,
    );
  }
}

export interface ShallowLocations {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
}

interface Location {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
}
