import React from 'react';
import Lottie from 'react-lottie';
import animations from './../../Lottie/loading3.json';

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animations,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Lottie
        options={defaultOptions}
        height={200} // Adjust the height as needed
        width={200}  // Adjust the width as needed
      />
    </div>
  );
};

export default Loading;
