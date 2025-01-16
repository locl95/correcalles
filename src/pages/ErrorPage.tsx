import React from 'react';

type ErrorComponentProps = {
  error: {
    code: string;
    status: string;
    message: string;
  };
};

const ErrorPage: React.FC<ErrorComponentProps> = ({ error })  => {
  return (
    <div className={`correcalles`} >
      <div className="error font-white">
        <h2>{error.code} {error.status}</h2>
        <h3>{error.message}</h3>
      </div> 
    </div> 
  );
}

export default ErrorPage;