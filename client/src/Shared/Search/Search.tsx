import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  textAlign: 'left',
  [theme.breakpoints.up('sm')]: {
    // marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: '3.5em',
    transition: theme.transitions.create('width'),
    width: 'auto',
    minWidth: 'auto',

    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      minWidth: 'auto',
      marginRight: '0',
      '&:focus': {
        width: 'auto',
        minWidth: 'auto',
        marginRight: '0',
      },
    },
  },
}))
