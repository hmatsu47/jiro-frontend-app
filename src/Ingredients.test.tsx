import { describe, expect, test } from "vitest";
import { render } from "solid-testing-library";
import { Ingredients } from "./Ingredients";
import { setIngredients } from "./signal";

describe("<Ingredients />", () => {
  const resultList = [
    {
      title:
        "ラーメン・ロットオプション指定なし・ヤサイ抜き・ニンニク少なめ・アブラ指定なし・カラメマシ",
      result: {
        noodle: 300,
        chaSiuPork: 2,
        vegetable: 0.0,
        garlic: 0.5,
        fat: 1.0,
        kaeshi: 2.0,
      },
      expectNoodle: "300 g",
      expectChaSiuPork: "2 枚",
      expectVegetable: "もやし 0 g + キャベツ 0 g",
      expectGarlic: "0.5 片",
      expectFat: "10 g",
      expectKaeshi: "150 cc",
    },
    {
      title:
        "ぶたラーメン・ロットオプション麺少なめ・ヤサイ少なめ・ニンニク指定なし・アブラマシ・カラメマシマシ",
      result: {
        noodle: 200,
        chaSiuPork: 4,
        vegetable: 0.5,
        garlic: 1.0,
        fat: 2.0,
        kaeshi: 3.0,
      },
      expectNoodle: "200 g",
      expectChaSiuPork: "4 枚",
      expectVegetable: "もやし 80 g + キャベツ 20 g",
      expectGarlic: "1 片",
      expectFat: "20 g",
      expectKaeshi: "225 cc",
    },
    {
      title:
        "ぶたダブルラーメン・ロットオプション麺半分・ヤサイ指定なし・ニンニクマシ・アブラマシマシ・カラメ抜き",
      result: {
        noodle: 150,
        chaSiuPork: 8,
        vegetable: 1.0,
        garlic: 2.0,
        fat: 3.0,
        kaeshi: 0.0,
      },
      expectNoodle: "150 g",
      expectChaSiuPork: "8 枚",
      expectVegetable: "もやし 160 g + キャベツ 40 g",
      expectGarlic: "2 片",
      expectFat: "30 g",
      expectKaeshi: "0 cc",
    },
    {
      title:
        "ラーメン・ロットオプション麺 1/3・ヤサイマシ・ニンニクマシマシ・アブラ抜き・カラメ少なめ",
      result: {
        noodle: 100,
        chaSiuPork: 2,
        vegetable: 2.0,
        garlic: 3.0,
        fat: 0.0,
        kaeshi: 0.5,
      },
      expectNoodle: "100 g",
      expectChaSiuPork: "2 枚",
      expectVegetable: "もやし 320 g + キャベツ 80 g",
      expectGarlic: "3 片",
      expectFat: "0 g",
      expectKaeshi: "37.5 cc",
    },
    {
      title:
        "大ラーメン・ロットオプションなし・ヤサイマシマシ・ニンニク抜き・アブラ少なめ・カラメ指定なし",
      result: {
        noodle: 450,
        chaSiuPork: 2,
        vegetable: 3.0,
        garlic: 0.0,
        fat: 0.5,
        kaeshi: 1.0,
      },
      expectNoodle: "450 g",
      expectChaSiuPork: "2 枚",
      expectVegetable: "もやし 480 g + キャベツ 120 g",
      expectGarlic: "0 片",
      expectFat: "5 g",
      expectKaeshi: "75 cc",
    },
    {
      title:
        "ぶた入り大ラーメン・ロットオプションなし・ヤサイ抜き・ニンニク少なめ・アブラ指定なし・カラメマシ",
      result: {
        noodle: 450,
        chaSiuPork: 4,
        vegetable: 0.0,
        garlic: 0.5,
        fat: 1.0,
        kaeshi: 2.0,
      },
      expectNoodle: "450 g",
      expectChaSiuPork: "4 枚",
      expectVegetable: "もやし 0 g + キャベツ 0 g",
      expectGarlic: "0.5 片",
      expectFat: "10 g",
      expectKaeshi: "150 cc",
    },
    {
      title:
        "ぶたダブル大ラーメン・ロットオプションなし・ヤサイ少なめ・ニンニク指定なし・アブラマシ・カラメマシマシ",
      result: {
        noodle: 450,
        chaSiuPork: 8,
        vegetable: 0.5,
        garlic: 1.0,
        fat: 2.0,
        kaeshi: 3.0,
      },
      expectNoodle: "450 g",
      expectChaSiuPork: "8 枚",
      expectVegetable: "もやし 80 g + キャベツ 20 g",
      expectGarlic: "1 片",
      expectFat: "20 g",
      expectKaeshi: "225 cc",
    },
  ];
  resultList.forEach((testCase) => {
    test(testCase.title, async () => {
      setIngredients(testCase.result);
      const { getByText, unmount } = render(() => <Ingredients />);
      const noodle = (await getByText(testCase.expectNoodle)) as HTMLElement;
      expect(noodle).toHaveTextContent(testCase.expectNoodle);
      const chaSiuPork = (await getByText(
        testCase.expectChaSiuPork
      )) as HTMLElement;
      expect(chaSiuPork).toHaveTextContent(testCase.expectChaSiuPork);
      const vegetable = (await getByText(
        testCase.expectVegetable
      )) as HTMLElement;
      expect(vegetable).toHaveTextContent(testCase.expectVegetable);
      const garlic = (await getByText(testCase.expectGarlic)) as HTMLElement;
      expect(garlic).toHaveTextContent(testCase.expectGarlic);
      const fat = (await getByText(testCase.expectFat)) as HTMLElement;
      expect(fat).toHaveTextContent(testCase.expectFat);
      const kaeshi = (await getByText(testCase.expectKaeshi)) as HTMLElement;
      expect(kaeshi).toHaveTextContent(testCase.expectKaeshi);
      unmount();
    });
  });
});
