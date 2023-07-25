import React from 'react'
import styles from './InputPanel.module.scss'
import InputMessage from '../../Shared/InputMessage/InputMessage'
import ButtonAtachFile from '../../Shared/ButtonAtachFile/ButtonAtachFile'
import ButtonSendMessage from '../../Shared/ButtonSendMessage/ButtonSendMessage'
import ButtonSmile from '../../Shared/ButtonSmile/ButtonSmile'
import FormSmile from '../../Shared/FormSmiles/FormSmile'
import { useAppDispatch, useAppSelector } from '../../App/Redux/hooks'
import { hoverSmile } from '../../App/Redux/Reducers/contentReducer'

export default function InputPanel({ socket }) {
  const dispatch = useAppDispatch()
  const hoverSmileState = useAppSelector(
    (state) => state.contentReduser.hoverSmile
  )

  return (
    <div className={styles.inputPanel}>
      <ButtonAtachFile />
      <div
        className={styles.InputMessage}
        onMouseEnter={(e) => {
          if (hoverSmileState) dispatch(hoverSmile(false))
        }}
      >
        <InputMessage socket={socket} />
      </div>

      <div className={styles.RigthPanel}>
        <ButtonSendMessage socket={socket} />
        <ButtonSmile />
      </div>
      <div>{hoverSmileState && <FormSmile />}</div>
    </div>
  )
}
