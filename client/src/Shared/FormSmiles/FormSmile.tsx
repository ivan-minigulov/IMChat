import { useEffect, useState } from 'react'
import styles from './FormSmile.module.scss'
import { useAppDispatch, useAppSelector } from '../../App/Redux/hooks'
import {
  hoverSmile,
  addInputMessage,
} from '../../App/Redux/Reducers/contentReducer'

export default function FormSmile() {
  const [emojiState, setEmojiState] = useState([])
  const [search, setSearch] = useState([])
  const dispatch = useAppDispatch()
  const hoverSmileState = useAppSelector(
    (state) => state.contentReduser.hoverSmile
  )

  // getKey API Emoji = d1820302e3f26b0529fa521fdc7496affc7fb847
  // c624e16ef534dc7971c3b793bf2f9cde8122634a
  // f781f95d62df9d77dac66b62f957a04da3eb7706

  const getSmiles = (data: Array<any>) => {
    const emojiArray = data.map((emoji) => {
      const li = {
        textContent: emoji.character,
        emojiName: emoji.slug,
      }
      return li
    })
    return emojiArray
  }

  const emojiFetch = async () => {
    try {
      await fetch(
        'https://emoji-api.com/emojis?access_key=f781f95d62df9d77dac66b62f957a04da3eb7706'
        // { mode: 'no-cors' }
      )
        .then((res) => res.json())
        .then((data) => getSmiles(data))
        .then((emojiArray) => setEmojiState(emojiArray))
        .catch((e) => console.log(e))
    } catch (e) {
      setEmojiState([])
    }
  }

  useEffect(() => {
    async function fetchData() {
      await emojiFetch()
    }
    fetchData()
  }, [])

  const searchFun = (event) => {
    setSearch(event.target.value.toLowerCase())
  }

  return (
    <div
      className={styles.FormSmile}
      onMouseLeave={(e) => {
        if (hoverSmileState) dispatch(hoverSmile(false))
      }}
    >
      <div>
        <input
          className={styles.input}
          onChange={searchFun}
          placeholder="Search"
        ></input>
      </div>
      <div className={styles.Content}>
        {emojiState.map(
          (emoji, key) =>
            emoji.emojiName.includes(search) && (
              <span
                className={styles.smile}
                key={key}
                id={emoji.emojiName}
                onClick={() => dispatch(addInputMessage(emoji.textContent))}
              >
                {emoji.textContent}
              </span>
            )
        )}
      </div>
      <div></div>
    </div>
  )
}
