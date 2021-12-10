import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import ReactModal from 'react-modal'
import {TemplateType} from '../types'
import axios from 'axios'

interface TemplateProps {
  template: TemplateType
}

const Template: React.VFC<TemplateProps> = ({template}) => {
  let navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const customStyles: ReactModal.Styles = {
    // ダイアログ内のスタイル（中央に表示）
    content: {
      top: '30%',
      bottom: 'auto',
      right: 'auto',
      left: '50%',
    },
    // 親ウィンドウのスタイル
    overlay: {},
  }
  function handleDelete() {
    //確認ダイアログ表示
    axios
      .delete('http://localhost:8080/api/templates/' + template.id, {withCredentials: true})
      .catch((error) => navigate('/error', {state: error}))
  }
  return (
    <div>
      <Link to={'/fromTemplate/' + template.id}>
        <img src={template.image} alt={template.name} width="20%" />
      </Link>
      <br />
      <span>{template.name}</span>
      <button onClick={() => setIsOpen(true)}>︙</button>
      <ReactModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
        <Link to="/templateEdit">テンプレートの編集</Link>
        <br />
        <button onClick={handleDelete}>テンプレートの削除</button>
      </ReactModal>
    </div>
  )
}

export default Template
