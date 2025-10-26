import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  mainContainer: {
    display: 'flex',
    gap: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  sidebar: {
    width: '200px',
    flexShrink: 0,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      order: 2,
    },
  },
  content: {
    flex: 1,
    minWidth: 0, // Prevents flex item from overflowing
  },
}));