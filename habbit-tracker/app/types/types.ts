export interface Habbit {
  id: string;
  name: string;
  status: boolean;
  done: number;
}

export interface Day {
  id: string;
  date: string;
  habbits: Habbit[];
}

export interface UserTypes {
  streak: string;
  _id: string;
  email: string;
  username: string;
  passwordHash: string;
  habits: Habbit[];
  days: Day[];
}

export interface UserHabbits {
  id: string;
  name: string;
  done: number;
}
