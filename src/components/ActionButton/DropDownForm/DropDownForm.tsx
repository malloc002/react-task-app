import React, { ChangeEvent, FC, useState } from 'react'
import { FiX } from 'react-icons/fi';
import { useTypedDispatch } from '../../../hooks/redux';
import { addList, addTask } from '../../../store/slices/boardsSlice';
import { v4 } from 'uuid';
import { addLog } from '../../../store/slices/loggerSlice';
import { button, buttons, close, input, listForm, taskForm } from './DropDownForm.css';

type TDropDownFormProps = {
  boardId: string,
  listId: string,
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
  list?: boolean
}

const DropDownForm: FC<TDropDownFormProps> = ({ setIsFormOpen, list, boardId, listId }) => {

  const dispatch = useTypedDispatch();

  const [text, setText] = useState("");
  const formPlaceholder = list? "리스트의 제목을 입력하세요." : "일의 제목을 입력하세요.";
  const buttonText = list? "리스트 추가하기" : "일 추가하기";

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleButtonClick = () => {
    if(text)
    {
      if(list)
      {
        dispatch(addList(
          {
            boardId, 
            list: {listId: v4(), listName: text, tasks: []}
          }
        ));

        dispatch(addLog(
          {
            logId: v4(),
            logMessage: `리스트 생성하기: ${text}`,
            logAuthor: "User",
            logTimestamp: String(Date.now())
          }
        ));
      }
      else {
        dispatch(addTask(
          {
            boardId,
            listId,
            task: {
              taskId: v4(),
              taskName: text,
              taskDescription: "",
              taskOwner: "User"
            }
          }
        ));
        
        dispatch(addLog(
          {
            logId: v4(),
            logMessage: `일 생성하기: ${text}`,
            logAuthor: "User",
            logTimestamp: String(Date.now())
          }
        ));
      }
    }
  }

  return (
    <div className={list? listForm : taskForm}>
      <textarea className={input} value={text} onChange={handleTextChange} onBlur={() => setIsFormOpen(false)} autoFocus placeholder={formPlaceholder} />
      <div className={buttons}>
        <button className={button} onMouseDown={handleButtonClick}>{buttonText}</button>
        <FiX className={close} />
      </div>
    </div>
  )
}

export default DropDownForm