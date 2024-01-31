export interface Habbit {
  id: string;
  name: string;
  status: boolean;
}

export interface Day {
  id: string;
  date: string;
  habbits: Habbit[];
}

export interface UserTypes {
  id: string;
  email: string;
  days: Day[];
}
