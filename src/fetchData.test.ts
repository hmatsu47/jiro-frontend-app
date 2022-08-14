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
import { OrderRequest, OrderResponse } from "./type";

describe("fetchData", () => {
  beforeEach(() => {
    mockFetch.clearAll();
  });
  test("API 呼び出し", async () => {
    const mock = mockFetch(
      "POST",
      "http://localhost:8080/JiroApi/AcceptOrder"
    ).willResolve({
      noodle: 300,
      chaSiuPork: 2,
      vegetable: 1.0,
      garlic: 1.0,
      fat: 1.0,
      kaeshi: 1.0,
    } as OrderResponse);
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
