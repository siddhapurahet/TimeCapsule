import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  chatBox: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: '15px',
    maxHeight: '500px',
    display: 'flex',
    flexDirection: 'column',
  },
  chatHeader: {
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  chatTitle: {
    fontWeight: 'bold',
    // color: theme.palette.primary.main,
    color: 'rgba(0,183,255, 1)',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    minHeight: '200px',
    maxHeight: '300px',
    marginBottom: theme.spacing(1),
  },
  messagesList: {
    padding: 0,
  },
  messageSent: {
    justifyContent: 'flex-end',
    textAlign: 'right',
    marginBottom: theme.spacing(0.5),
  },
  messageReceived: {
    justifyContent: 'flex-start',
    textAlign: 'left',
    marginBottom: theme.spacing(0.5),
  },
  sentMessageText: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: theme.spacing(0.75, 1.5),
    borderRadius: '18px',
    display: 'inline-block',
    maxWidth: '70%',
    wordWrap: 'break-word',
  },
  receivedMessageText: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.primary,
    padding: theme.spacing(0.75, 1.5),
    borderRadius: '18px',
    display: 'inline-block',
    maxWidth: '70%',
    wordWrap: 'break-word',
  },
  noMessages: {
    textAlign: 'center',
    fontStyle: 'italic',
    padding: theme.spacing(2),
  },
  inputContainer: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  messageInput: {
    flex: 1,
  },
  sendButton: {
    minWidth: '48px',
    height: '40px',
  },
}));
