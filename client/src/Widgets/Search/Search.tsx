import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import styles from './Search.module.scss'
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from '../../Shared/Search/Search'
import ListForSearch from '../../Shared/List/List'
import { usersSearch } from '../../Features/http/friendsApi'
import ClearIcon from '@mui/icons-material/Clear'
import { IconButton } from '@mui/material'

export default function SearchAndList() {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    try {
      if (search) {
        usersSearch(search).then((data: Array<{}>) => {
          const usersList = data.map(
            (obj: { username: string }) => obj.username
          )
          setUsers(usersList)
        })
      } else {
        setUsers([])
      }
    } catch (e) {
      console.log(e)
    }
  }, [search])

  return (
    <div className={styles.divSearch}>
      <Search className={styles.search}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Найти новых друзей"
          inputProps={{ 'aria-label': 'search' }}
          value={search}
          onChange={(event) => {
            setSearch(event.target.value)
            if (!search) setUsers([])
          }}
        />
        <IconButton
          className={styles.ClearIcon}
          onClick={() => {
            setSearch('')
            setUsers([])
          }}
        >
          <ClearIcon />
        </IconButton>
      </Search>

      {Boolean(users.length) && <ListForSearch list={users} />}
    </div>
  )
}
