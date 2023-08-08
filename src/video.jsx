// import React, { useRef, useEffect } from 'react';
// import vid from './vid.mp4'

// function DelayedAutoplayVideo() {
//   const videoRef = useRef(null);
//   const isMute = true

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       if (videoRef.current) {
//         videoRef.current.muted = !isMute;        
//       }
//     }, 0);

//     const timeout2 = setTimeout(() => {
//         videoRef.current.play()
//     }, 3000)

//     return () => clearTimeout(timeout);
//   }, []);

//   const handlePlay = () => {
//     videoRef.current.play();
//   }

//   return (
//     <div>
//       <h2>Delayed Autoplay Video Example</h2>
//       <video ref={videoRef} controls autoPlay muted={isMute}>
//         <source src={vid} type="video/mp4" />
//         Hello Video
//       </video>
//       <button onClick={handlePlay}>Play</button>
//     </div>
//   );
// }

// export default DelayedAutoplayVideo;
