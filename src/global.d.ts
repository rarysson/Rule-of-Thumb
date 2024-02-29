type Votes = {
  positive: number;
  negative: number;
}

declare type Celebrity = {
  name: string;
  description: string;
  category: string;
  picture: string;
  lastUpdated: string;
  votes: Votes;
}
