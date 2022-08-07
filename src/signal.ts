import { createSignal } from "solid-js";

export const [ticketLabel, setTicketLabel] = createSignal<string>("ラーメン");
export const [lotOption, setLotOption] = createSignal<string>("なし");
export const [yasai, setYasai] = createSignal<string>("指定なし");
export const [ninniku, setNinniku] = createSignal<string>("指定なし");
export const [abura, setAbura] = createSignal<string>("指定なし");
export const [karame, setKarame] = createSignal<string>("指定なし");
