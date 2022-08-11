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

  test("チケット：ぶたラーメン＆ロットオプション：なし（デフォルト）", () => {
    const { getByText, unmount } = render(() => <Order />);
    const ticketButton = getByText("ぶたラーメン") as HTMLInputElement;
    fireEvent.click(ticketButton);
    expect(ticketLabel()).toBe("ぶたラーメン");
    expect(lotOption()).toBe("なし");
    unmount();
  });

  test("チケット：ぶたダブルラーメン＆ロットオプション：なし（デフォルト）", () => {
    const { getByText, unmount } = render(() => <Order />);
    const ticketButton = getByText("ぶたダブルラーメン") as HTMLInputElement;
    fireEvent.click(ticketButton);
    expect(ticketLabel()).toBe("ぶたダブルラーメン");
    expect(lotOption()).toBe("なし");
    unmount();
  });

  test("チケット：ラーメン＆ロットオプション：少なめ", () => {
    const { getByText, unmount } = render(() => <Order />);
    const ticketButton = getByText("ラーメン") as HTMLInputElement;
    fireEvent.click(ticketButton);
    expect(ticketLabel()).toBe("ラーメン");
    const lotButton = getByText("少なめ（2/3）") as HTMLInputElement;
    fireEvent.click(lotButton);
    expect(lotOption()).toBe("少なめ");
    unmount();
  });

  test("チケット：ぶたラーメン＆ロットオプション：半分", () => {
    const { getByText, unmount } = render(() => <Order />);
    const ticketButton = getByText("ぶたラーメン") as HTMLInputElement;
    fireEvent.click(ticketButton);
    expect(ticketLabel()).toBe("ぶたラーメン");
    const lotButton = getByText("半分") as HTMLInputElement;
    fireEvent.click(lotButton);
    expect(lotOption()).toBe("半分");
    unmount();
  });

  test("チケット：ぶたダブルラーメン＆ロットオプション：1/3", () => {
    const { getByText, unmount } = render(() => <Order />);
    const ticketButton = getByText("ぶたダブルラーメン") as HTMLInputElement;
    fireEvent.click(ticketButton);
    expect(ticketLabel()).toBe("ぶたダブルラーメン");
    const lotButton = getByText("1/3") as HTMLInputElement;
    fireEvent.click(lotButton);
    expect(lotOption()).toBe("1/3");
    unmount();
  });

  test("チケット：大ラーメン（ロットオプション：なし）", () => {
    const { getByText, unmount } = render(() => <Order />);
    const ticketButton = getByText("大ラーメン") as HTMLInputElement;
    fireEvent.click(ticketButton);
    expect(ticketLabel()).toBe("大ラーメン");
    expect(lotOption()).toBe("なし");
    unmount();
  });

  test("チケット：ぶた入り大ラーメン（ロットオプション：なし）", () => {
    const { getByText, unmount } = render(() => <Order />);
    // 直前にロットオプションを指定していても「なし」に変わることを期待
    const beforeTicketButton = getByText("ぶたラーメン") as HTMLInputElement;
    fireEvent.click(beforeTicketButton);
    const lotButton = getByText("半分") as HTMLInputElement;
    fireEvent.click(lotButton);
    const ticketButton = getByText("ぶた入り大ラーメン") as HTMLInputElement;
    fireEvent.click(ticketButton);
    expect(ticketLabel()).toBe("ぶた入り大ラーメン");
    expect(lotOption()).toBe("なし");
    unmount();
  });

  test("チケット：ぶたダブル大ラーメン（ロットオプション：なし）", () => {
    const { getByText, unmount } = render(() => <Order />);
    // 直前にロットオプションを指定していても「なし」に変わることを期待
    const beforeTicketButton = getByText(
      "ぶたダブルラーメン"
    ) as HTMLInputElement;
    fireEvent.click(beforeTicketButton);
    const lotButton = getByText("1/3") as HTMLInputElement;
    fireEvent.click(lotButton);
    const ticketButton = getByText("ぶたダブル大ラーメン") as HTMLInputElement;
    fireEvent.click(ticketButton);
    expect(ticketLabel()).toBe("ぶたダブル大ラーメン");
    expect(lotOption()).toBe("なし");
    unmount();
  });
});
