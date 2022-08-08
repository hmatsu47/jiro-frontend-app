import ToggleButton from "@suid/material/ToggleButton";

export const CallButtons = () => {
  return (
    <>
      <ToggleButton value="指定なし">指定なし（標準量）</ToggleButton>
      <ToggleButton value="抜き">抜き（0）</ToggleButton>
      <ToggleButton value="少なめ">少なめ（半分）</ToggleButton>
      <ToggleButton value="マシ">マシ（2倍）</ToggleButton>
      <ToggleButton value="マシマシ">マシマシ（3倍）</ToggleButton>
    </>
  );
};
