import React from 'react';

export default function Progress(props) {
  const progress = props.progress || 10; // Assuming progress is a number between 0 and 100

  return (
    <div className='h-3 rounded-lg b-1 bg-green-100 py-2'>
      <div
        className="text-white text-center bg-red-500 h-full rounded-lg items-center justify-center"
        style={{ width: `${progress}%` }}
      >
        {progress}%
      </div>
    </div>
  );
}
