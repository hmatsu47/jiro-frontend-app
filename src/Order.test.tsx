import { describe, expect, test } from "vitest";
import { render, fireEvent } from "solid-testing-library";
import { Order } from "./Order";
import {
  ticketLabel,
  lotOption,
  yasai,
  ninniku,
  abura,
  karame,
  setErrorMessage,
} from "./signal";

describe("<Order />", () => {
  test("全てデフォルト", () => {
    const { unmount } = render(() => <Order />);
    expect(ticketLabel()).toBe("ラーメン");
    expect(lotOption()).toBe("なし");
    expect(yasai()).toBe("指定なし");
    expect(ninniku()).toBe("指定なし");
    expect(abura()).toBe("指定なし");
    expect(karame()).toBe("指定なし");
    unmount();
  });

  test("チケット：ぶたラーメン＆ロットオプション：なし（デフォルト）", async () => {
    const { getByText, unmount } = render(() => <Order />);
    const ticketButton = (await getByText("ぶたラーメン")) as HTMLInputElement;
    fireEvent.click(ticketButton);
    expect(ticketLabel()).toBe("ぶたラーメン");
    expect(lotOption()).toBe("なし");
    unmount();
  });

  test("チケット：ぶたダブルラーメン＆ロットオプション：なし（デフォルト）", async () => {
    const { getByText, unmount } = render(() => <Order />);
    const ticketButton = (await getByText(
      "ぶたダブルラーメン"
    )) as HTMLInputElement;
    fireEvent.click(ticketButton);
    expect(ticketLabel()).toBe("ぶたダブルラーメン");
    expect(lotOption()).toBe("なし");
    unmount();
  });

  test("チケット：ラーメン＆ロットオプション：少なめ", async () => {
    const { getByText, unmount } = render(() => <Order />);
    const ticketButton = (await getByText("ラーメン")) as HTMLInputElement;
    fireEvent.click(ticketButton);
    expect(ticketLabel()).toBe("ラーメン");
    const lotButton = (await getByText("麺少なめ（2/3）")) as HTMLInputElement;
    fireEvent.click(lotButton);
    expect(lotOption()).toBe("少なめ");
    unmount();
  });

  test("チケット：ぶたラーメン＆ロットオプション：半分", async () => {
    const { getByText, unmount } = render(() => <Order />);
    const ticketButton = (await getByText("ぶたラーメン")) as HTMLInputElement;
    fireEvent.click(ticketButton);
    expect(ticketLabel()).toBe("ぶたラーメン");
    const lotButton = (await getByText("麺半分")) as HTMLInputElement;
    fireEvent.click(lotButton);
    expect(lotOption()).toBe("半分");
    unmount();
  });

  test("チケット：ぶたダブルラーメン＆ロットオプション：1/3", async () => {
    const { getByText, unmount } = render(() => <Order />);
    const ticketButton = (await getByText(
      "ぶたダブルラーメン"
    )) as HTMLInputElement;
    fireEvent.click(ticketButton);
    expect(ticketLabel()).toBe("ぶたダブルラーメン");
    const lotButton = (await getByText("麺 1/3")) as HTMLInputElement;
    fireEvent.click(lotButton);
    expect(lotOption()).toBe("1/3");
    unmount();
  });

  test("チケット：ラーメン＆ロットオプション：なし", async () => {
    const { getByText, unmount } = render(() => <Order />);
    const ticketButton = (await getByText("ラーメン")) as HTMLInputElement;
    fireEvent.click(ticketButton);
    expect(ticketLabel()).toBe("ラーメン");
    const lotButton = (await getByText("麺の量：指定なし")) as HTMLInputElement;
    fireEvent.click(lotButton);
    expect(lotOption()).toBe("なし");
    unmount();
  });
  test("チケット：大ラーメン（ロットオプション：なし）", async () => {
    const { getByText, unmount } = render(() => <Order />);
    // 直前にロットオプションを指定していても「なし」に変わることを期待
    const beforeTicketButton = (await getByText(
      "ラーメン"
    )) as HTMLInputElement;
    fireEvent.click(beforeTicketButton);
    const lotButton = (await getByText("麺少なめ（2/3）")) as HTMLInputElement;
    fireEvent.click(lotButton);
    const ticketButton = (await getByText("大ラーメン")) as HTMLInputElement;
    fireEvent.click(ticketButton);
    expect(ticketLabel()).toBe("大ラーメン");
    expect(lotOption()).toBe("なし");
    unmount();
  });

  test("チケット：ぶた入り大ラーメン（ロットオプション：なし）", async () => {
    const { getByText, unmount } = render(() => <Order />);
    // 直前にロットオプションを指定していても「なし」に変わることを期待
    const beforeTicketButton = (await getByText(
      "ぶたラーメン"
    )) as HTMLInputElement;
    fireEvent.click(beforeTicketButton);
    const lotButton = (await getByText("麺半分")) as HTMLInputElement;
    fireEvent.click(lotButton);
    const ticketButton = (await getByText(
      "ぶた入り大ラーメン"
    )) as HTMLInputElement;
    fireEvent.click(ticketButton);
    expect(ticketLabel()).toBe("ぶた入り大ラーメン");
    expect(lotOption()).toBe("なし");
    unmount();
  });

  test("チケット：ぶたダブル大ラーメン（ロットオプション：なし）", async () => {
    const { getByText, unmount } = render(() => <Order />);
    // 直前にロットオプションを指定していても「なし」に変わることを期待
    const beforeTicketButton = (await getByText(
      "ぶたダブルラーメン"
    )) as HTMLInputElement;
    fireEvent.click(beforeTicketButton);
    const lotButton = (await getByText("麺 1/3")) as HTMLInputElement;
    fireEvent.click(lotButton);
    const ticketButton = (await getByText(
      "ぶたダブル大ラーメン"
    )) as HTMLInputElement;
    fireEvent.click(ticketButton);
    expect(ticketLabel()).toBe("ぶたダブル大ラーメン");
    expect(lotOption()).toBe("なし");
    unmount();
  });

  test("ヤサイ抜き（チケット：ラーメン＆ロットオプション：なし）", async () => {
    const { getByText, unmount } = render(() => <Order />);
    const ticketButton = (await getByText("ラーメン")) as HTMLInputElement;
    fireEvent.click(ticketButton);
    const lotButton = (await getByText("麺の量：指定なし")) as HTMLInputElement;
    fireEvent.click(lotButton);
    const callOption = (await getByText("ヤサイ抜き")) as HTMLInputElement;
    fireEvent.click(callOption);
    expect(yasai()).toBe("抜き");
    unmount();
  });

  test("ニンニク少なめ（チケット：ラーメン＆ロットオプション：なし）", async () => {
    const { getByText, unmount } = render(() => <Order />);
    const ticketButton = (await getByText("ラーメン")) as HTMLInputElement;
    fireEvent.click(ticketButton);
    const lotButton = (await getByText("麺の量：指定なし")) as HTMLInputElement;
    fireEvent.click(lotButton);
    const callOption = (await getByText("ニンニク少なめ")) as HTMLInputElement;
    fireEvent.click(callOption);
    expect(ninniku()).toBe("少なめ");
    unmount();
  });

  test("アブラマシ（チケット：ラーメン＆ロットオプション：なし）", async () => {
    const { getByText, unmount } = render(() => <Order />);
    const ticketButton = (await getByText("ラーメン")) as HTMLInputElement;
    fireEvent.click(ticketButton);
    const lotButton = (await getByText("麺の量：指定なし")) as HTMLInputElement;
    fireEvent.click(lotButton);
    const callOption = (await getByText("アブラマシ")) as HTMLInputElement;
    fireEvent.click(callOption);
    expect(abura()).toBe("マシ");
    unmount();
  });

  test("カラメマシマシ（チケット：ラーメン＆ロットオプション：なし）", async () => {
    const { getByText, unmount } = render(() => <Order />);
    const ticketButton = (await getByText("ラーメン")) as HTMLInputElement;
    fireEvent.click(ticketButton);
    const lotButton = (await getByText("麺の量：指定なし")) as HTMLInputElement;
    fireEvent.click(lotButton);
    const callOption = (await getByText("カラメマシマシ")) as HTMLInputElement;
    fireEvent.click(callOption);
    expect(karame()).toBe("マシマシ");
    unmount();
  });

  test("ヤサイ指定なし（チケット：ラーメン＆ロットオプション：なし）", async () => {
    const { getByText, unmount } = render(() => <Order />);
    const ticketButton = (await getByText("ラーメン")) as HTMLInputElement;
    fireEvent.click(ticketButton);
    const lotButton = (await getByText("麺の量：指定なし")) as HTMLInputElement;
    fireEvent.click(lotButton);
    const callOption = (await getByText(
      "ヤサイ：指定なし"
    )) as HTMLInputElement;
    fireEvent.click(callOption);
    expect(yasai()).toBe("指定なし");
    unmount();
  });

  test("エラーメッセージ表示", async () => {
    const { getByText, unmount } = render(() => <Order />);
    setErrorMessage("データが取得できません");
    const alert = (await getByText("データが取得できません")) as HTMLElement;
    expect(alert).toHaveTextContent("データが取得できません");
    unmount();
  });
});
