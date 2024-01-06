export interface Habbit {
  name: string;
  status: boolean;
  id: number;
}

export interface Day {
  id: number;
  date: string;
  habbits: Habbit[];
}
