import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    backgroundVideo : {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
        zIndex: -1,
        pointerEvents: "none",
      }
}))


  