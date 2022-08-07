import Card from "@suid/material/Card";
import CardContent from "@suid/material/CardContent";
import Paper from "@suid/material/Paper";
import Table from "@suid/material/Table";
import TableBody from "@suid/material/TableBody";
import TableCell from "@suid/material/TableCell";
import TableContainer from "@suid/material/TableContainer";
import TableHead from "@suid/material/TableHead";
import TableRow from "@suid/material/TableRow";
import Typography from "@suid/material/Typography";
import { ingredients } from "./signal";

export const Ingredients = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          必要食材量
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>食材</TableCell>
                <TableCell align="right">必要量</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  麺
                </TableCell>
                <TableCell align="right">{ingredients()!.noodle} g</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  チャーシュー
                </TableCell>
                <TableCell align="right">
                  {ingredients()!.charSiuPork} 枚
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  野菜（もやし＆キャベツ）
                </TableCell>
                <TableCell align="right">
                  {ingredients()!.vegetable * 200} g
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  ニンニク
                </TableCell>
                <TableCell align="right">{ingredients()!.garlic} 片</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  背脂
                </TableCell>
                <TableCell align="right">{ingredients()!.fat * 10} g</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  返し
                </TableCell>
                <TableCell align="right">
                  {ingredients()!.kaeshi * 75} cc
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
