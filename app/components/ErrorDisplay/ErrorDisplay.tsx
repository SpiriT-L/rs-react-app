import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import React from 'react';

interface ErrorDisplayProps {
  error: FetchBaseQueryError | SerializedError;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if ('status' in error && 'data' in error) {
    return (
      <div>
        <p>Error: {error.status}</p>
        <p>{JSON.stringify(error.data)}</p>
      </div>
    );
  } else if ('message' in error) {
    return <p>{error.message}</p>;
  } else {
    return <p>Unknown error occurred</p>;
  }
};

export default ErrorDisplay;
