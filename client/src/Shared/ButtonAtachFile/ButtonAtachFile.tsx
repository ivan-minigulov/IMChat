import React from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import styles from './ButtonAtachFile.module.scss'
import { IconButton } from '@mui/material'

export default function ButtonAtachFile() {
  return (
    <div className={styles.ButtonAtachFile}>
      <IconButton color="inherit">
        <AttachFileIcon color="inherit" />
      </IconButton>
    </div>
  )
}
