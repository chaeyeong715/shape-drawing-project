import { Button } from "react-native";

export default function MyButton({ loginInfo, checkLogin }) {
  return (
    <Button
      title="로그인"
      onPress={() => checkLogin(loginInfo.userId, loginInfo.pass)}
    />
  );
}
