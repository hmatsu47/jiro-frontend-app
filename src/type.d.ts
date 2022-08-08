export type OrderRequest = {
  ticketLabel: string;
  lotOption: string;
  yasai: string;
  ninniku: string;
  abura: string;
  karame: string;
};
export type OrderResponse = {
  noodle: number;
  charSiuPork: number;
  vegetable: number;
  garlic: number;
  fat: number;
  kaeshi: number;
};
export type ErrorResponse = {
  message: string;
};
