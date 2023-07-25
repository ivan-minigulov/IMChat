import React, { useState } from 'react'
import styles from './ButtonSmile.module.scss'
import { IconButton } from '@mui/material'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import FormSmile from '../FormSmiles/FormSmile'
import { useAppDispatch } from '../../App/Redux/hooks'
import { hoverSmile } from '../../App/Redux/Reducers/contentReducer'

export default function ButtonSmile() {
  const dispatch = useAppDispatch()

  return (
    <div className={styles.ButtonSmile}>
      <IconButton
        // onMouseEnter={(e) => dispatch(hoverSmile(true))}
        color="inherit"
      >
        <SentimentSatisfiedAltIcon color="inherit" />
      </IconButton>
    </div>
  )
}
