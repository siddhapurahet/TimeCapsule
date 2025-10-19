import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    maxHeight: '400px',
    overflow: 'hidden',
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
    padding: theme.spacing(0.5, 0),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      borderRadius: theme.spacing(0.5),
    },
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  userName: {
    fontWeight: 500,
    fontSize: '0.875rem',
  },
  noUsers: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
}));
