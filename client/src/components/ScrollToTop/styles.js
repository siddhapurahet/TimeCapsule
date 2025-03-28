import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    scrollButton: {
        zIndex: 1000,
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }
    }
})); 