export enum Season {
  Spring = 'SPRING',
  Summer = 'SUMMER',
  Fall = 'FALL',
}
export interface Term {
  id: number;
  season: Season;
  year: string;
}
