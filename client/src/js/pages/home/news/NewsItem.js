import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

const NewsItem = (props) => {
  let formatDate = moment(new Date(props.date)).format('YYYY.MM.DD');

  return (
    <li className="news-list-item">
      <Link to={`/news/${props.id}`}>
        <article className="news-article">
          <div className="news-article-image">
            <img className="img-responsive" src={props.image ? props.image : require('../../../../images/placeholder280x200.png')} alt="news item" />
          </div>
          <div className="news-article-content">
            <time className="news-article-time" dateTime={formatDate}>{formatDate}</time>
            <p className="news-article-text">{props.title}</p>
          </div>
        </article>
      </Link>
    </li>
  )
}

export default NewsItem;
