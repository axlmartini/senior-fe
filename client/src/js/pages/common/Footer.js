import React, 
{ 
  useEffect, 
  useCallback,
  useState
} from 'react';

function Footer() {
  const [ showScrollUp, setShowScrollUp ] = useState(false);
  const [ stickyScroll, setStickyScroll ] = useState(false);

  const handleScrollEvent = useCallback(() => {
    const winScroll = window.scrollY;
    const copyright = document.getElementById('js-footer-copyright');
    const sticky = document.getElementById('js-back-to-top');
    const stickyPos = (sticky.getBoundingClientRect().top + document.body.scrollTop) + sticky.offsetHeight;
    const copyrightPos = copyright.getBoundingClientRect().top + document.body.scrollTop;
    
    setShowScrollUp(() => {
      return (winScroll >= 600) ? true : false;
    });

    setStickyScroll(() => {
      return (stickyPos >= copyrightPos) ? true : false;
    });

  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent);

    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, [handleScrollEvent]);

  return(
    <footer className="l-footer">
      <div className="footer-info">
        <div className="l-container">
          <div className="footer-image">
            <img 
            className="img-responsive" 
            src={require('../../../images/footer-logo.png')} 
            alt="footer logo" /> 
          </div>
          <p className="footer-text">サンプルテキストサンプル ルテキストサンプルテキストサンプルテキストサンプル ルテキスト</p>
        </div>
      </div>
      <div className="footer-copyright" id="js-footer-copyright">
        <div className="l-container">
          <p>Copyright&copy;2007-2020 Blog Inc.</p>
        </div>
      </div>
      <button className={`back-to-top ${showScrollUp && 'is-active'} ${stickyScroll && 'is-sticky'}`} 
      id="js-back-to-top"
      onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'})}} >
      <img 
        src={require('../../../images/back-to-top.png')} 
        alt="back to top" /> 
      <p>TOP</p>
      </button>
    </footer>
  )
}

export default Footer