import { IQuestion } from "./IQUestion.interface";

export interface ISection {
  title: string;
  description: string;
  questions: IQuestion[];
}