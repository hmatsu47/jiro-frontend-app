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

  const ticketSmallRamenAndNoLotOption = [
    {
      ticketButtonLabel: "ぶたラーメン",
      expectTicketLabel: "ぶたラーメン",
      expectLotOption: "なし",
    },
    {
      ticketButtonLabel: "ぶたダブルラーメン",
      expectTicketLabel: "ぶたダブルラーメン",
      expectLotOption: "なし",
    },
    {
      ticketButtonLabel: "ラーメン",
      expectTicketLabel: "ラーメン",
      expectLotOption: "なし",
    },
  ];
  ticketSmallRamenAndNoLotOption.forEach((testCase) => {
    test(`チケット：${testCase.ticketButtonLabel}＆ロットオプション：なし（デフォルト）`, async () => {
      const { getByText, unmount } = render(() => <Order />);
      const ticketButton = (await getByText(
        testCase.ticketButtonLabel
      )) as HTMLInputElement;
      fireEvent.click(ticketButton);
      expect(ticketLabel()).toBe(testCase.expectTicketLabel);
      expect(lotOption()).toBe(testCase.expectLotOption);
      unmount();
    });
  });

  const ticketSmallRamenAndLotOption = [
    {
      ticketButtonLabel: "ぶたラーメン",
      lotButtonLabel: "麺少なめ（2/3）",
      expectTicketLabel: "ぶたラーメン",
      expectLotOption: "少なめ",
    },
    {
      ticketButtonLabel: "ぶたダブルラーメン",
      lotButtonLabel: "麺半分",
      expectTicketLabel: "ぶたダブルラーメン",
      expectLotOption: "半分",
    },
    {
      ticketButtonLabel: "ラーメン",
      lotButtonLabel: "麺 1/3",
      expectTicketLabel: "ラーメン",
      expectLotOption: "1/3",
    },
    {
      ticketButtonLabel: "ぶたラーメン",
      lotButtonLabel: "麺の量：指定なし",
      expectTicketLabel: "ぶたラーメン",
      expectLotOption: "なし",
    },
  ];
  ticketSmallRamenAndLotOption.forEach((testCase) => {
    test(`チケット：${testCase.ticketButtonLabel}＆ロットオプション：${testCase.lotButtonLabel}`, async () => {
      const { getByText, unmount } = render(() => <Order />);
      const ticketButton = (await getByText(
        testCase.ticketButtonLabel
      )) as HTMLInputElement;
      fireEvent.click(ticketButton);
      expect(ticketLabel()).toBe(testCase.expectTicketLabel);
      const lotButton = (await getByText(
        testCase.lotButtonLabel
      )) as HTMLInputElement;
      fireEvent.click(lotButton);
      expect(lotOption()).toBe(testCase.expectLotOption);
      unmount();
    });
  });

  const ticketLargeRamen = [
    {
      ticketButtonLabel: "大ラーメン",
      expectTicketLabel: "大ラーメン",
      expectLotOption: "なし",
    },
    {
      ticketButtonLabel: "ぶた入り大ラーメン",
      expectTicketLabel: "ぶた入り大ラーメン",
      expectLotOption: "なし",
    },
    {
      ticketButtonLabel: "ぶたダブル大ラーメン",
      expectTicketLabel: "ぶたダブル大ラーメン",
      expectLotOption: "なし",
    },
  ];
  ticketLargeRamen.forEach((testCase) => {
    test(`チケット：${testCase.ticketButtonLabel}（ロットオプション：なし）`, async () => {
      const { getByText, unmount } = render(() => <Order />);
      // 直前にロットオプションを指定していても「なし」に変わることを期待
      const beforeTicketButton = (await getByText(
        "ラーメン"
      )) as HTMLInputElement;
      fireEvent.click(beforeTicketButton);
      const lotButton = (await getByText(
        "麺少なめ（2/3）"
      )) as HTMLInputElement;
      fireEvent.click(lotButton);
      const ticketButton = (await getByText(
        testCase.ticketButtonLabel
      )) as HTMLInputElement;
      fireEvent.click(ticketButton);
      expect(ticketLabel()).toBe(testCase.expectTicketLabel);
      expect(lotOption()).toBe(testCase.expectLotOption);
      unmount();
    });
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
