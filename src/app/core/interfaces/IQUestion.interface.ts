import { IOption } from "./IOption.interface";

export interface IQuestion {
  type: 'shortAnswer' | 'longAnswer' | 'options' | 'checkboxes' | 'date' | 'time';
  question: string;
  options?: IOption[];
}