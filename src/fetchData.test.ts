// @vitest-environment jsdom

import { describe, expect, test } from "vitest";
import "vi-fetch/setup";
import { mockPost } from "vi-fetch";
import { fetchData } from "./fetchData";
import {
  ticketLabel,
  setTicketLabel,
  lotOption,
  setLotOption,
  yasai,
  setYasai,
  ninniku,
  setNinniku,
  abura,
  setAbura,
  karame,
  setKarame,
} from "./signal";
import { OrderRequest, OrderResponse } from "./type";

describe("fetchData", () => {
  test("API 呼び出し（デフォルト）", async () => {
    const mock = mockPost("http://localhost:8080/JiroApi/AcceptOrder")
      .withHeaders([["Content-Type", "application/json;charset=utf8"]])
      .willResolve({
        noodle: 300,
        chaSiuPork: 2,
        vegetable: 1.0,
        garlic: 1.0,
        fat: 1.0,
        kaeshi: 1.0,
      } as OrderResponse);
    await fetchData();
    // とりあえず呼び出しが行われたことだけを確認（戻り値は今のところ上手くテストできず）
    expect(mock).toHaveFetched();
    expect(mock).toHaveFetchedWithBody({
      ticketLabel: ticketLabel(),
      lotOption: lotOption(),
      yasai: yasai(),
      ninniku: ninniku(),
      abura: abura(),
      karame: karame(),
    } as OrderRequest);
    mock.clear();
  });

  const apiCall = [
    {
      title:
        "ぶたラーメン・麺少なめ・ヤサイ抜き・ニンニク少なめ・アブラマシ・カラメマシマシ",
      ticketLabel: "ぶたラーメン",
      lotOption: "麺少なめ（2/3）",
      yasai: "抜き",
      ninniku: "少なめ",
      abura: "マシ",
      karame: "マシマシ",
      ingredients: {
        noodle: 200,
        chaSiuPork: 4,
        vegetable: 0.0,
        garlic: 0.5,
        fat: 2.0,
        kaeshi: 3.0,
      },
    },
    {
      title:
        "ぶたダブル大ラーメン（麺指定なし）・ヤサイ指定なし・ニンニク抜き・アブラ少なめ・カラメマシ",
      ticketLabel: "ぶたダブル大ラーメン",
      lotOption: "なし",
      yasai: "指定なし",
      ninniku: "抜き",
      abura: "少なめ",
      karame: "マシ",
      ingredients: {
        noodle: 450,
        chaSiuPork: 8,
        vegetable: 1.0,
        garlic: 0.0,
        fat: 0.5,
        kaeshi: 2.0,
      },
    },
  ];
  apiCall.forEach((testCase) => {
    test(`API 呼び出し（${testCase.title}）`, async () => {
      setTicketLabel(testCase.ticketLabel);
      setLotOption(testCase.lotOption);
      setYasai(testCase.yasai);
      setNinniku(testCase.ninniku);
      setAbura(testCase.abura);
      setKarame(testCase.karame);
      const mock = mockPost("http://localhost:8080/JiroApi/AcceptOrder")
        .withHeaders([["Content-Type", "application/json;charset=utf8"]])
        .willResolve({
          noodle: testCase.ingredients.noodle,
          chaSiuPork: testCase.ingredients.chaSiuPork,
          vegetable: testCase.ingredients.vegetable,
          garlic: testCase.ingredients.garlic,
          fat: testCase.ingredients.fat,
          kaeshi: testCase.ingredients.kaeshi,
        } as OrderResponse);
      await fetchData();
      // とりあえず呼び出しが行われたことだけを確認（戻り値は今のところ上手くテストできず）
      expect(mock).toHaveFetched();
      expect(mock).toHaveFetchedWithBody(
        JSON.stringify({
          ticketLabel: ticketLabel(),
          lotOption: lotOption(),
          yasai: yasai(),
          ninniku: ninniku(),
          abura: abura(),
          karame: karame(),
        } as OrderRequest)
      );
      mock.clear();
    });
  });
});
