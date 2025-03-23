import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  promptContainer: {
    padding: '10px',
    width: '300px',
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  aibotContainer: {
    position: 'fixed',
    right: '100px',
    top: '50px',
    zIndex: 1000,
  },
  iconButton: {
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.04)',
    },
  },
}));
