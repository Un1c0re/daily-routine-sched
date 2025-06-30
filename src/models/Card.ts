import { generateId } from "@/utils/idGenerator";

export default class Card {
  constructor(options: Partial<Card>) {
    this.id = options.id ?? generateId();
    this.title = options.title ?? "";
    this.description = options.description ?? "";
    this.day = options.day ?? 0;
    this.startTime = options.startTime ?? "";
    this.endTime = options.endTime ?? "";
  }

  id: number;
  title: string;
  description: string;
  day: number;
  startTime: string;
  endTime: string;
}
