import { Component, ErrorBoundary, Suspense } from "solid-js";
import Box from "@suid/material/Box";
import Stack from "@suid/material/Stack";
import { Order } from "./Order";
import { Ingredients } from "./Ingredients";
import { TitleBar } from "./TitleBar";

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
          <Order />
          <ErrorBoundary
            fallback={(err) => (
              <div>
                データ読み込み時にエラーが発生しました：{err.toString()}
              </div>
            )}
          >
            <Suspense fallback={<div>読み込み中...</div>}>
              <Ingredients />
            </Suspense>
          </ErrorBoundary>
        </Stack>
      </Box>
    </>
  );
};
