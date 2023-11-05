import React from 'react';
import Lottie from 'react-lottie';
import animations from './../../Lottie/imgloading.json';

const ImageLoading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animations,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div >
      <Lottie 
       options={defaultOptions}
       height={200}
       width={200}

      />
    </div>
  );
};

export default ImageLoading;
