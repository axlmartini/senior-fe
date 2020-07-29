import React,
{
  useEffect,
  useCallback,
  useState
} from 'react';
import '../../../sass/components/Back-to-top.scss';

function BackToTop() {
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
    <button className={`back-to-top ${showScrollUp && 'is-active'} ${stickyScroll && 'is-sticky'}`}
      id="js-back-to-top"
      onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'})}} >
      <img
        src={require('../../../images/back-to-top.png')}
        alt="back to top" />
      <p>TOP</p>
    </button>
  )
}

export default BackToTop;
