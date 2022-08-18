export interface StarshipListResponse {
  count: number;
  next: string;
  previous: string;
  results: StarshipItem[];
}

export interface StarshipItem {
  MGLT: string;
  appeared_in_most_films?: boolean;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  films: string[];
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: string;
  starship_class: string;
  url: string;
}
