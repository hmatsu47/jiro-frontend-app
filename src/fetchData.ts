import { OrderRequest, OrderResponse, ErrorResponse } from "./type";
import { postApiData } from "./apiHandler";
import {
  ticketLabel,
  lotOption,
  yasai,
  ninniku,
  abura,
  karame,
  setIngredients,
  setErrorMessage,
} from "./signal";

export const fetchData = async () => {
  const load = async (): Promise<void> => {
    const data: OrderResponse | ErrorResponse = await postApiData(
      "http://localhost:8080/JiroApi/AcceptOrder",
      {
        ticketLabel: ticketLabel(),
        lotOption: lotOption(),
        yasai: yasai(),
        ninniku: ninniku(),
        abura: abura(),
        karame: karame(),
      } as OrderRequest
    );
    if (
      typeof data === "object" &&
      data !== null &&
      typeof (data as ErrorResponse).message === "string"
    ) {
      // 戻り値がエラーメッセージの場合
      setIngredients(undefined);
      setErrorMessage((data as ErrorResponse).message);
      return;
    }
    setIngredients(data as OrderResponse);
    setErrorMessage(undefined);
  };
  void load();
};
