import * as React from 'react';
import noumiso from "../assets/脳みそ.png"
export default function Edit() {
  // TODO: 座標を取得
  // TODO: 単語見るポップアップ出す
  // TODO: 
  const handleOnClick = (e: any) => {
    console.log([e.pageX, e.pageY]);
  }
  return (
    <span>
      <div>
        <img src={noumiso} alt={"noumiso"} onClick={handleOnClick} />
      </div>
    </span>
  )
}