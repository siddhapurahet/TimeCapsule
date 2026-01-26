import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    maxHeight: '400px',
    overflow: 'hidden',
    width: '250px', // Increased from 200px to accommodate chat button
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      borderRadius: theme.spacing(0.5),
    },
  },
  listItemText: {
    flex: 1,
    minWidth: 0, // Allows text to shrink and ellipsis to work
    marginRight: theme.spacing(1.5), // Increased from 0.5 to create more space
    paddingRight: theme.spacing(0.5), // Additional padding for spacing
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
    maxWidth: '150px', // Increased from 100px to allow longer names
  },
  chatChip: {
    fontSize: '0.75rem',
    marginLeft: theme.spacing(1), // Increased from 0.5 to create more space
    flexShrink: 0, // Prevents chip from shrinking
  },
  noUsers: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
}));
