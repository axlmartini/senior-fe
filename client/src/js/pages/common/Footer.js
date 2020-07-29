import React from 'react';
import BackToTop from './BackToTop';
import '../../../sass/components/Footer.scss';

function Footer() {
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
      <BackToTop/>
    </footer>
  )
}

export default Footer
