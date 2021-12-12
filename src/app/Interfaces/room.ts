import { Option } from './option';

export interface Room {
  id: number;
  name: string;
  description: string;
  cost: number;
  start: number;
  finish: number;
  options: Option[];
}
