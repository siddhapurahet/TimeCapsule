import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    maxHeight: '400px',
    overflow: 'hidden',
    width: '200px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  title: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  countChip: {
    fontSize: '0.75rem',
  },
  userList: {
    maxHeight: '300px',
    overflowY: 'auto',
    padding: 0,
  },
  userItem: {
    padding: theme.spacing(0.25, 0),
    minHeight: 'auto',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      borderRadius: theme.spacing(0.5),
    },
  },
  avatar: {
    marginRight: theme.spacing(0.5),
  },
  userName: {
    fontWeight: 500,
    fontSize: '0.8rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '140px',
  },
  noUsers: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
}));
