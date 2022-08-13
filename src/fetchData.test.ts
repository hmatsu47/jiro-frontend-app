// @vitest-environment jsdom

import { beforeEach, describe, expect, test } from "vitest";
import "vi-fetch/setup";
import { mockFetch } from "vi-fetch";
import { fetchData } from "./fetchData";
import {
  abura,
  karame,
  lotOption,
  ninniku,
  ticketLabel,
  yasai,
} from "./signal";
import { OrderRequest, ErrorResponse } from "./type";

describe("fetchData", () => {
  beforeEach(() => {
    mockFetch.clearAll();
  });
  test("API 呼び出し", async () => {
    const mock = mockFetch(
      "POST",
      "http://localhost:8080/JiroApi/AcceptOrder"
    ).willResolve({
      message: "エラー",
    } as ErrorResponse);
    await fetchData();
    // とりあえず呼び出しが行われたことだけを確認
    expect(mock).toHaveFetched();
    expect(mock).toHaveFetchedWithBody({
      ticketLabel: ticketLabel(),
      lotOption: lotOption(),
      yasai: yasai(),
      ninniku: ninniku(),
      abura: abura(),
      karame: karame(),
    } as OrderRequest);
  });
});
