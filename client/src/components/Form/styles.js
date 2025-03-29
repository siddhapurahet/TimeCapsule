import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    margin: '20px auto',
    maxWidth: '800px',
    borderRadius: '10px',
    borderColor: 'black',
    borderWidth: '1px',
    borderStyle: 'solid',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));