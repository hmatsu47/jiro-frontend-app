import { Show } from "solid-js";
import Alert from "@suid/material/Alert";
import Box from "@suid/material/Box";
import Button from "@suid/material/Button";
import Card from "@suid/material/Card";
import CardContent from "@suid/material/CardContent";
import { ThemeProvider } from "@suid/material/styles";
import ToggleButton from "@suid/material/ToggleButton";
import ToggleButtonGroup from "@suid/material/ToggleButtonGroup";
import Typography from "@suid/material/Typography";
import RamenIcon from "@suid/icons-material/RamenDining";
import { CallButtons } from "./CallButtons";
import { JiroTheme } from "./JiroTheme";
import { postApiData } from "./apiHandler";
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
  setIngredients,
  errorMessage,
  setErrorMessage,
} from "./signal";
import { OrderRequest, OrderResponse, ErrorResponse } from "./type";

export const Order = () => {
  const fetchData = async () => {
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

  return (
    <>
      <ThemeProvider theme={JiroTheme}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              注文
            </Typography>
            <Typography variant="subtitle1" sx={{ verticalAlign: "center" }}>
              チケット
            </Typography>
            <ToggleButtonGroup
              color="secondary"
              value={ticketLabel()}
              exclusive
              onChange={(event, newValue) => {
                setTicketLabel(newValue);
                if (newValue.indexOf("大") != -1) {
                  setLotOption("なし");
                }
              }}
            >
              <ToggleButton value="ラーメン">ラーメン</ToggleButton>
              <ToggleButton value="ぶたラーメン">ぶたラーメン</ToggleButton>
              <ToggleButton value="ぶたダブルラーメン">
                ぶたダブルラーメン
              </ToggleButton>
              <ToggleButton value="大ラーメン">大ラーメン</ToggleButton>
              <ToggleButton value="ぶた入り大ラーメン">
                ぶた入り大ラーメン
              </ToggleButton>
              <ToggleButton value="ぶたダブル大ラーメン">
                ぶたダブル大ラーメン
              </ToggleButton>
            </ToggleButtonGroup>
            <Box sx={{ padding: "10px 0 0 0" }} />
            <Typography variant="subtitle2" sx={{ verticalAlign: "center" }}>
              ロットオプション（麺の量） :
            </Typography>
            <ToggleButtonGroup
              color="secondary"
              value={lotOption()}
              exclusive
              onChange={(event, newValue) => {
                setLotOption(newValue);
              }}
              disabled={ticketLabel().indexOf("大") != -1}
            >
              <ToggleButton value="なし">なし（標準量）</ToggleButton>
              <ToggleButton value="少なめ">少なめ</ToggleButton>
              <ToggleButton value="半分">半分</ToggleButton>
              <ToggleButton value="1/3">1/3</ToggleButton>
            </ToggleButtonGroup>
            <Box sx={{ padding: "10px 0 0 0" }} />
            <Typography variant="subtitle1" sx={{ verticalAlign: "center" }}>
              コール
            </Typography>
            <Typography variant="subtitle2" sx={{ verticalAlign: "center" }}>
              ヤサイ :
            </Typography>
            <ToggleButtonGroup
              color="secondary"
              value={yasai()}
              exclusive
              onChange={(event, newValue) => {
                setYasai(newValue);
              }}
            >
              <CallButtons />
            </ToggleButtonGroup>
            <Box sx={{ padding: "10px 0 0 0" }} />
            <Typography variant="subtitle2" sx={{ verticalAlign: "center" }}>
              ニンニク :
            </Typography>
            <ToggleButtonGroup
              color="secondary"
              value={ninniku()}
              exclusive
              onChange={(event, newValue) => {
                setNinniku(newValue);
              }}
            >
              <CallButtons />
            </ToggleButtonGroup>
            <Box sx={{ padding: "10px 0 0 0" }} />
            <Typography variant="subtitle2" sx={{ verticalAlign: "center" }}>
              アブラ :
            </Typography>
            <ToggleButtonGroup
              color="secondary"
              value={abura()}
              exclusive
              onChange={(event, newValue) => {
                setAbura(newValue);
              }}
            >
              <CallButtons />
            </ToggleButtonGroup>
            <Box sx={{ padding: "10px 0 0 0" }} />
            <Typography variant="subtitle2" sx={{ verticalAlign: "center" }}>
              カラメ :
            </Typography>
            <ToggleButtonGroup
              color="secondary"
              value={karame()}
              exclusive
              onChange={(event, newValue) => {
                setKarame(newValue);
              }}
            >
              <CallButtons />
            </ToggleButtonGroup>
            <Box sx={{ padding: "20px 0 0 0" }} />
            <Button
              variant="contained"
              aria-live="polite"
              onClick={() => fetchData()}
              endIcon={<RamenIcon />}
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              注文
            </Button>
          </CardContent>
        </Card>
      </ThemeProvider>
      <Show when={errorMessage()} fallback={<></>}>
        <Alert severity="error">{errorMessage()}</Alert>
      </Show>
    </>
  );
};
