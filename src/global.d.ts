type Votes = {
  positive: number;
  negative: number;
}

declare type Celebrity = {
  id: string;
  name: string;
  description: string;
  category: string;
  picture: string;
  lastUpdated: string;
  votes: Votes;
}

declare type ViewMode = 'list' | 'grid'

declare type ThumbsMode = 'up' | 'down' | 'none'

declare type Vote = 'positive' | 'negative'
