import React, { useRef, useEffect, useState } from 'react';
import video1 from '../../assets/backgroundvideo.mp4';
// import video2 from '../../assets/sunset.mp4';
import useStyles from './styles';


const BackgroundVideo = () => {
  const videoRef = useRef(null);
  // const videos = [video1, video2];
  // const [currentIndex, setCurrentIndex] = useState(0);
  const classes = useStyles();

  // Switch video on end
  // const handleVideoEnd = () => {
  //   setCurrentIndex((prev) => (prev + 1) % videos.length);
  // };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className={classes.backgroundVideo}
      autoPlay
      muted
      loop={true}
      playsInline
      // onEnded={handleVideoEnd}
    >
      <source src={video1} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default BackgroundVideo;
