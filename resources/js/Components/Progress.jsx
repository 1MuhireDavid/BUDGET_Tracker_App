import React from 'react';

export default function Progress(props) {
  const progress = props.progress || 10; // Assuming progress is a number between 0 and 100

  return (
    <div className='flex h-4 w-100 rounded-lg border-2 border-gray items-center py-2'>
      <div
        className="text-black text-center bg-red-500 h-3 rounded-lg items-center justify-center"
        style={{ width: `${progress}%` }}
      >
        <p className='p-2'>{progress}%</p>
      </div>
    </div>
  );
}