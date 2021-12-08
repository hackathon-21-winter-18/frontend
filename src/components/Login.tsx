import axios from "axios";
import React, { useState } from "react";
import styles from "./Login.module.css";
import { useContext } from "react";
import { UserContext } from "./UserProvider";

const Login: React.VFC = () => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const { login } = useContext(UserContext);
  function handleRegister() {
    const data = {
      name: userName,
      password: passWord,
    };
    axios.post("/oauth/signup", { data }).then((res) => {
      login(userName, passWord);
      setUserName("");
      setPassWord("");
    });
  }
  function handleLogin(e: React.MouseEvent) {
    e.preventDefault();
    const data = {
      name: userName,
      password: passWord,
    };
    axios.post("/oauth/login", { data }).then((res) => {
      login(userName, passWord);
      setUserName("");
      setPassWord("");
    });
  }
  function handleUserNameChange(e: any) {
    setUserName(e.target.value);
  }
  function handlePassWordChange(e: any) {
    setPassWord(e.target.value);
  }
  return (
    <div>
      <span>新規登録orログイン</span>
      <form>
        <input
          type="text"
          name="userName"
          placeholder="ユーザー名"
          onChange={handleUserNameChange}
        />
        <br />
        <input
          type="text"
          name="passWord"
          placeholder="パスワード"
          onChange={handlePassWordChange}
        />
        <br />
        <button onClick={handleRegister}>新規登録</button>
        <button onClick={handleLogin}>ログイン</button>
      </form>
    </div>
  );
};
export default Login;
