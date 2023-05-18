import React from "react";

const Loading = ({ children, loading, error }) => {
  return (
    <div>
      {loading ? <div>Loading....</div> : error ? <div>{error}</div> : children}
    </div>
  );
};

export default Loading;
