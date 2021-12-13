import { Option } from './option';

export interface Reservation {
  cost: number;
  start: Date;
  finish: Date;
  user_id: number | null;
  email: string;
  first_name: string;
  second_name: string;
  phone_number: string;
  room_id: number;
  id: number;
  options: Option[];
}
