
import "./index.css"

const MyTasks = (props)=>{
    const {eachObject,checkBoxProp,deleteButtonClickedProp}=props
    const {task,completed,_id}=eachObject // changed
    console.log(eachObject,"hi")

    const checkBoxTiggerred=()=>{
        checkBoxProp(_id)
    }

    const addlabelTextDecoration = completed===1 ? "label-textDecoration" : "" 
    
    const status = completed===1 ? true:false


    const deleteButtonClicked = ()=>{
        deleteButtonClickedProp(_id)
    }

    return (
    <li className='todo-item-container'>
        <input id={_id} type="checkbox" className="checkbox-input" onChange={checkBoxTiggerred} checked={status} />
        <div className='label-container'>
          <label htmlFor={_id} className={`checkbox-label ${addlabelTextDecoration}`}>{task}</label>
          <button type="button" className="deleteButton" onClick={deleteButtonClicked}>
            <img className='delete-icon' alt="delete Icon" src="https://cdn-icons-png.flaticon.com/128/6096/6096937.png" />
          </button>
        </div>
    </li>
    )
}

export default MyTasks
