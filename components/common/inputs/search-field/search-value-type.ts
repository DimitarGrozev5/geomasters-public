export type SearchValue = {
  type: 'rnd-text' | 'status' | 'category' | 'date-from' | 'date-to';
  value: string;
  raw: string;
};
