import React, { useEffect } from 'react';
import '../../../sass/components/Page-not-found.scss';

function PageNotFound() {
  useEffect(() => {
    window.scrollTo(0, 100);
  }, [])

  return(
    <div className="flex flex-align-center flex-center page-not-found">
      <h2 className="page-not-found-header">
        <span>4</span>
        <span>0</span>
        <span>4</span>
      </h2>
    </div>
  )
}

export default PageNotFound;
