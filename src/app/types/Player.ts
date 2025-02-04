export interface Player {
    name: string;
    position: string;
    score: number;
    link: string;
    club: string;
    league: string;
    hired: boolean;
    contrato: string;
    games: number;
    age: number;
    value: string;
    video: string;
  }

  export interface Players {
    data: Player[];
    total: number;
    page: number;
    pageSize:number;
  }