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
    {
      ticketButtonLabel: "ぶたダブルラーメン",
      lotButtonLabel: "麺少なめ（2/3）",
      expectTicketLabel: "ぶたダブルラーメン",
      expectLotOption: "少なめ",
    },
    {
      ticketButtonLabel: "ラーメン",
      lotButtonLabel: "麺半分",
      expectTicketLabel: "ラーメン",
      expectLotOption: "半分",
    },
    {
      ticketButtonLabel: "ぶたラーメン",
      lotButtonLabel: "麺 1/3",
      expectTicketLabel: "ぶたラーメン",
      expectLotOption: "1/3",
    },
    {
      ticketButtonLabel: "ぶたダブルラーメン",
      lotButtonLabel: "麺の量：指定なし",
      expectTicketLabel: "ぶたダブルラーメン",
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

  const yasaiCallOption = [
    {
      callButtonLabel: "ヤサイ抜き",
      expectCallOption: "抜き",
    },
    {
      callButtonLabel: "ヤサイ少なめ",
      expectCallOption: "少なめ",
    },
    {
      callButtonLabel: "ヤサイマシ",
      expectCallOption: "マシ",
    },
    {
      callButtonLabel: "ヤサイマシマシ",
      expectCallOption: "マシマシ",
    },
    {
      callButtonLabel: "ヤサイ：指定なし",
      expectCallOption: "指定なし",
    },
  ];
  yasaiCallOption.forEach((testCase) => {
    test(`${testCase.callButtonLabel}（チケット：ラーメン＆ロットオプション：なし）`, async () => {
      const { getByText, unmount } = render(() => <Order />);
      const ticketButton = (await getByText("ラーメン")) as HTMLInputElement;
      fireEvent.click(ticketButton);
      const lotButton = (await getByText(
        "麺の量：指定なし"
      )) as HTMLInputElement;
      fireEvent.click(lotButton);
      const callButton = (await getByText(
        testCase.callButtonLabel
      )) as HTMLInputElement;
      fireEvent.click(callButton);
      expect(yasai()).toBe(testCase.expectCallOption);
      unmount();
    });
  });

  const ninnikuCallOption = [
    {
      callButtonLabel: "ニンニク抜き",
      expectCallOption: "抜き",
    },
    {
      callButtonLabel: "ニンニク少なめ",
      expectCallOption: "少なめ",
    },
    {
      callButtonLabel: "ニンニクマシ",
      expectCallOption: "マシ",
    },
    {
      callButtonLabel: "ニンニクマシマシ",
      expectCallOption: "マシマシ",
    },
    {
      callButtonLabel: "ニンニク：指定なし",
      expectCallOption: "指定なし",
    },
  ];
  ninnikuCallOption.forEach((testCase) => {
    test(`${testCase.callButtonLabel}（チケット：ラーメン＆ロットオプション：なし）`, async () => {
      const { getByText, unmount } = render(() => <Order />);
      const ticketButton = (await getByText("ラーメン")) as HTMLInputElement;
      fireEvent.click(ticketButton);
      const lotButton = (await getByText(
        "麺の量：指定なし"
      )) as HTMLInputElement;
      fireEvent.click(lotButton);
      const callButton = (await getByText(
        testCase.callButtonLabel
      )) as HTMLInputElement;
      fireEvent.click(callButton);
      expect(ninniku()).toBe(testCase.expectCallOption);
      unmount();
    });
  });

  const aburaCallOption = [
    {
      callButtonLabel: "アブラ抜き",
      expectCallOption: "抜き",
    },
    {
      callButtonLabel: "アブラ少なめ",
      expectCallOption: "少なめ",
    },
    {
      callButtonLabel: "アブラマシ",
      expectCallOption: "マシ",
    },
    {
      callButtonLabel: "アブラマシマシ",
      expectCallOption: "マシマシ",
    },
    {
      callButtonLabel: "アブラ：指定なし",
      expectCallOption: "指定なし",
    },
  ];
  aburaCallOption.forEach((testCase) => {
    test(`${testCase.callButtonLabel}（チケット：ラーメン＆ロットオプション：なし）`, async () => {
      const { getByText, unmount } = render(() => <Order />);
      const ticketButton = (await getByText("ラーメン")) as HTMLInputElement;
      fireEvent.click(ticketButton);
      const lotButton = (await getByText(
        "麺の量：指定なし"
      )) as HTMLInputElement;
      fireEvent.click(lotButton);
      const callButton = (await getByText(
        testCase.callButtonLabel
      )) as HTMLInputElement;
      fireEvent.click(callButton);
      expect(abura()).toBe(testCase.expectCallOption);
      unmount();
    });
  });

  const karameCallOption = [
    {
      callButtonLabel: "カラメ抜き",
      expectCallOption: "抜き",
    },
    {
      callButtonLabel: "カラメ少なめ",
      expectCallOption: "少なめ",
    },
    {
      callButtonLabel: "カラメマシ",
      expectCallOption: "マシ",
    },
    {
      callButtonLabel: "カラメマシマシ",
      expectCallOption: "マシマシ",
    },
    {
      callButtonLabel: "カラメ：指定なし",
      expectCallOption: "指定なし",
    },
  ];
  karameCallOption.forEach((testCase) => {
    test(`${testCase.callButtonLabel}（チケット：ラーメン＆ロットオプション：なし）`, async () => {
      const { getByText, unmount } = render(() => <Order />);
      const ticketButton = (await getByText("ラーメン")) as HTMLInputElement;
      fireEvent.click(ticketButton);
      const lotButton = (await getByText(
        "麺の量：指定なし"
      )) as HTMLInputElement;
      fireEvent.click(lotButton);
      const callButton = (await getByText(
        testCase.callButtonLabel
      )) as HTMLInputElement;
      fireEvent.click(callButton);
      expect(karame()).toBe(testCase.expectCallOption);
      unmount();
    });
  });

  test("エラーメッセージ表示", async () => {
    const { getByText, unmount } = render(() => <Order />);
    setErrorMessage("データが取得できません");
    const alert = (await getByText("データが取得できません")) as HTMLElement;
    expect(alert).toHaveTextContent("データが取得できません");
    unmount();
  });
});
