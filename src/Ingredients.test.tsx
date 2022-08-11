import { describe, expect, test } from "vitest";
import { render } from "solid-testing-library";
import { Ingredients } from "./Ingredients";
import { setIngredients } from "./signal";
import { OrderResponse } from "./type";

describe("<Ingredients />", () => {
  test("ラーメン・ロットオプション指定なし・ヤサイ抜き・ニンニク少なめ・アブラ指定なし・カラメマシ", async () => {
    setIngredients({
      noodle: 300,
      chaSiuPork: 2,
      vegetable: 0.0,
      garlic: 0.5,
      fat: 1.0,
      kaeshi: 2.0,
    });
    const { getByText, unmount } = render(() => <Ingredients />);
    const noodle = (await getByText("300 g")) as HTMLElement;
    expect(noodle).toHaveTextContent("300 g");
    const chaSiuPork = (await getByText("2 枚")) as HTMLElement;
    expect(chaSiuPork).toHaveTextContent("2 枚");
    const vegetable = (await getByText(
      "もやし 0 g + キャベツ 0 g"
    )) as HTMLElement;
    expect(vegetable).toHaveTextContent("もやし 0 g + キャベツ 0 g");
    const garlic = (await getByText("0.5 片")) as HTMLElement;
    expect(garlic).toHaveTextContent("0.5 片");
    const fat = (await getByText("10 g")) as HTMLElement;
    expect(fat).toHaveTextContent("10 g");
    const kaeshi = (await getByText("150 cc")) as HTMLElement;
    expect(kaeshi).toHaveTextContent("150 cc");
    unmount();
  });

  test("ぶたラーメン・ロットオプション麺少なめ・ヤサイ少なめ・ニンニク指定なし・アブラマシ・カラメマシマシ", async () => {
    setIngredients({
      noodle: 200,
      chaSiuPork: 4,
      vegetable: 0.5,
      garlic: 1.0,
      fat: 2.0,
      kaeshi: 3.0,
    });
    const { getByText, unmount } = render(() => <Ingredients />);
    const noodle = (await getByText("200 g")) as HTMLElement;
    expect(noodle).toHaveTextContent("200 g");
    const chaSiuPork = (await getByText("4 枚")) as HTMLElement;
    expect(chaSiuPork).toHaveTextContent("4 枚");
    const vegetable = (await getByText(
      "もやし 80 g + キャベツ 20 g"
    )) as HTMLElement;
    expect(vegetable).toHaveTextContent("もやし 80 g + キャベツ 20 g");
    const garlic = (await getByText("1 片")) as HTMLElement;
    expect(garlic).toHaveTextContent("1 片");
    const fat = (await getByText("20 g")) as HTMLElement;
    expect(fat).toHaveTextContent("20 g");
    const kaeshi = (await getByText("225 cc")) as HTMLElement;
    expect(kaeshi).toHaveTextContent("225 cc");
    unmount();
  });

  test("ぶたダブルラーメン・ロットオプション麺半分・ヤサイ指定なし・ニンニクマシ・アブラマシマシ・カラメ抜き", async () => {
    setIngredients({
      noodle: 150,
      chaSiuPork: 8,
      vegetable: 1.0,
      garlic: 2.0,
      fat: 3.0,
      kaeshi: 0.0,
    });
    const { getByText, unmount } = render(() => <Ingredients />);
    const noodle = (await getByText("150 g")) as HTMLElement;
    expect(noodle).toHaveTextContent("150 g");
    const chaSiuPork = (await getByText("8 枚")) as HTMLElement;
    expect(chaSiuPork).toHaveTextContent("8 枚");
    const vegetable = (await getByText(
      "もやし 160 g + キャベツ 40 g"
    )) as HTMLElement;
    expect(vegetable).toHaveTextContent("もやし 160 g + キャベツ 40 g");
    const garlic = (await getByText("2 片")) as HTMLElement;
    expect(garlic).toHaveTextContent("2 片");
    const fat = (await getByText("30 g")) as HTMLElement;
    expect(fat).toHaveTextContent("30 g");
    const kaeshi = (await getByText("0 cc")) as HTMLElement;
    expect(kaeshi).toHaveTextContent("0 cc");
    unmount();
  });

  test("ラーメン・ロットオプション麺 1/3・ヤサイマシ・ニンニクマシマシ・アブラ抜き・カラメ少なめ", async () => {
    setIngredients({
      noodle: 100,
      chaSiuPork: 2,
      vegetable: 2.0,
      garlic: 3.0,
      fat: 0.0,
      kaeshi: 0.5,
    });
    const { getByText, unmount } = render(() => <Ingredients />);
    const noodle = (await getByText("100 g")) as HTMLElement;
    expect(noodle).toHaveTextContent("100 g");
    const chaSiuPork = (await getByText("2 枚")) as HTMLElement;
    expect(chaSiuPork).toHaveTextContent("2 枚");
    const vegetable = (await getByText(
      "もやし 320 g + キャベツ 80 g"
    )) as HTMLElement;
    expect(vegetable).toHaveTextContent("もやし 320 g + キャベツ 80 g");
    const garlic = (await getByText("3 片")) as HTMLElement;
    expect(garlic).toHaveTextContent("3 片");
    const fat = (await getByText("0 g")) as HTMLElement;
    expect(fat).toHaveTextContent("0 g");
    const kaeshi = (await getByText("37.5 cc")) as HTMLElement;
    expect(kaeshi).toHaveTextContent("37.5 cc");
    unmount();
  });

  test("大ラーメン・ロットオプションなし・ヤサイマシマシ・ニンニク抜き・アブラ少なめ・カラメ指定なし", async () => {
    setIngredients({
      noodle: 450,
      chaSiuPork: 2,
      vegetable: 3.0,
      garlic: 0.0,
      fat: 0.5,
      kaeshi: 1.0,
    });
    const { getByText, unmount } = render(() => <Ingredients />);
    const noodle = (await getByText("450 g")) as HTMLElement;
    expect(noodle).toHaveTextContent("450 g");
    const chaSiuPork = (await getByText("2 枚")) as HTMLElement;
    expect(chaSiuPork).toHaveTextContent("2 枚");
    const vegetable = (await getByText(
      "もやし 480 g + キャベツ 120 g"
    )) as HTMLElement;
    expect(vegetable).toHaveTextContent("もやし 480 g + キャベツ 120 g");
    const garlic = (await getByText("0 片")) as HTMLElement;
    expect(garlic).toHaveTextContent("0 片");
    const fat = (await getByText("5 g")) as HTMLElement;
    expect(fat).toHaveTextContent("5 g");
    const kaeshi = (await getByText("75 cc")) as HTMLElement;
    expect(kaeshi).toHaveTextContent("75 cc");
    unmount();
  });

  test("ぶた入り大ラーメン・ロットオプションなし・ヤサイ抜き・ニンニク少なめ・アブラ指定なし・カラメマシ", async () => {
    setIngredients({
      noodle: 450,
      chaSiuPork: 4,
      vegetable: 0.0,
      garlic: 0.5,
      fat: 1.0,
      kaeshi: 2.0,
    });
    const { getByText, unmount } = render(() => <Ingredients />);
    const noodle = (await getByText("450 g")) as HTMLElement;
    expect(noodle).toHaveTextContent("450 g");
    const chaSiuPork = (await getByText("4 枚")) as HTMLElement;
    expect(chaSiuPork).toHaveTextContent("4 枚");
    const vegetable = (await getByText(
      "もやし 0 g + キャベツ 0 g"
    )) as HTMLElement;
    expect(vegetable).toHaveTextContent("もやし 0 g + キャベツ 0 g");
    const garlic = (await getByText("0.5 片")) as HTMLElement;
    expect(garlic).toHaveTextContent("0.5 片");
    const fat = (await getByText("10 g")) as HTMLElement;
    expect(fat).toHaveTextContent("10 g");
    const kaeshi = (await getByText("150 cc")) as HTMLElement;
    expect(kaeshi).toHaveTextContent("150 cc");
    unmount();
  });

  test("ぶたダブル大ラーメン・ロットオプションなし・ヤサイ少なめ・ニンニク指定なし・アブラマシ・カラメマシマシ", async () => {
    setIngredients({
      noodle: 450,
      chaSiuPork: 8,
      vegetable: 0.5,
      garlic: 1.0,
      fat: 2.0,
      kaeshi: 3.0,
    });
    const { getByText, unmount } = render(() => <Ingredients />);
    const noodle = (await getByText("450 g")) as HTMLElement;
    expect(noodle).toHaveTextContent("450 g");
    const chaSiuPork = (await getByText("8 枚")) as HTMLElement;
    expect(chaSiuPork).toHaveTextContent("8 枚");
    const vegetable = (await getByText(
      "もやし 80 g + キャベツ 20 g"
    )) as HTMLElement;
    expect(vegetable).toHaveTextContent("もやし 80 g + キャベツ 20 g");
    const garlic = (await getByText("1 片")) as HTMLElement;
    expect(garlic).toHaveTextContent("1 片");
    const fat = (await getByText("20 g")) as HTMLElement;
    expect(fat).toHaveTextContent("20 g");
    const kaeshi = (await getByText("225 cc")) as HTMLElement;
    expect(kaeshi).toHaveTextContent("225 cc");
    unmount();
  });
});
