import { Component, ErrorBoundary } from "solid-js";
import Box from "@suid/material/Box";
import Stack from "@suid/material/Stack";
import { Order } from "./Order";
import { Ingredients } from "./Ingredients";
import { TitleBar } from "./TitleBar";
import { ingredients } from "./signal";

export const App: Component = () => {
  return (
    <>
      <TitleBar />
      <Box
        sx={{
          padding: "10px 0 0 0",
          width: "100%",
          minWidth: "320px",
          display: "flex",
          justifyContent: "center",
        }}
        aria-live="polite"
      >
        <Stack spacing={2} direction="column">
          <ErrorBoundary
            fallback={(err) => (
              <div>エラーが発生しました：{err.toString()}</div>
            )}
          >
            <Order />
            {!ingredients() ? <></> : <Ingredients />}
          </ErrorBoundary>
        </Stack>
      </Box>
    </>
  );
};
