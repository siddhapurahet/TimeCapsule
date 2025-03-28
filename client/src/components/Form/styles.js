import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
//   paper: {
//     padding: theme.spacing(2),
//     borderRadius: '10px',
//     borderColor: 'black',
//     borderWidth: '1px',
//     borderStyle: 'solid',
//     position: 'absolute',
//     left: '50%',
//     transform: 'translateX(-50%)',
// },
paper: {
  padding: theme.spacing(2),
  borderRadius: '10px',
  borderColor: 'black',
  borderWidth: '1px',
  borderStyle: 'solid',
  position: 'absolute',
  top: '40%', // Moves up from absolute center
  left: '50%',
  transform: 'translate(-50%, -50%, -50%, -50%)',
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