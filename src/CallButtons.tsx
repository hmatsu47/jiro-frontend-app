import ToggleButton from "@suid/material/ToggleButton";

type Props = {
  name: string;
};

export const CallButtons = (props: Props) => {
  return (
    <>
      <ToggleButton value="指定なし">{props.name}：指定なし</ToggleButton>
      <ToggleButton value="抜き">{props.name}抜き</ToggleButton>
      <ToggleButton value="少なめ">{props.name}少なめ</ToggleButton>
      <ToggleButton value="マシ">{props.name}マシ</ToggleButton>
      <ToggleButton value="マシマシ">{props.name}マシマシ</ToggleButton>
    </>
  );
};
