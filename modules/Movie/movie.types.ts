export interface IMovie {
  id?: number;
  title: string;
  year: number;
  format: string;
  actors: { name: string; id: number }[];
}

export interface IMovieParams {
  actor: string;

  title: string;

  search: string;

  sort: string;

  order: string;

  limit: number;

  offset: number;
}
