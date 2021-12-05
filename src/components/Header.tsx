import { useState } from "react"
import "./Header.module.css"
import ReactModal from "react-modal"
import { Link } from "react-router-dom"
import logo from "../assets/脳みそ.png"
import FromNewPalace from "./DialogFromNewPalace"

function Header() {
  const [userName, setUserName] = useState("(ユーザー名)")
  const [isOpen, setIsOpen] = useState(false)
  const customStyles: ReactModal.Styles = {
    // ダイアログ内のスタイル（中央に表示）
    content: {
      top: "30%",
      left: "50%",
      right: "auto",
      bottom: "auto",
    },
    // 親ウィンドウのスタイル
    overlay: {},
  }
  return (
    <div className="Header">
      <img src={logo} alt="logo" width="2%" />
      <span>アプリ名</span>
      <span>{userName}でログイン中</span>
      <FromNewPalace />
      <button onClick={() => setIsOpen(true)}>新規作成</button>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
      >
        <span>新規作成</span>
        <br />
        <button onClick={() => alert("作成方法1")}>作成方法1</button>
        <br />
        <button onClick={() => alert("作成方法2")}>作成方法2</button>
        <br />
        <button onClick={() => alert("作成方法3")}>作成方法3</button>
        <br />
        <button onClick={() => alert("作成方法4")}>作成方法4</button>
      </ReactModal>
      <button onClick={() => alert("ログアウト")}>ログアウト</button>
      <Link to="login">ログイン</Link>
    </div>
  )
}

export default Header
