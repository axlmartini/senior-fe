import React from 'react';
import * as moment from 'moment';

function PostComment(props) {
  let now = moment(new Date());
  let postDate = moment(new Date(props.date));
  let duration = moment.duration(now.diff(postDate));
  let months = Math.floor(duration.asMonths());
  let days = Math.floor(duration.asDays());
  let hours = Math.floor(duration.asHours());
  let minutes = Math.floor(duration.asMinutes());
  let seconds = Math.floor(duration.asSeconds());
  let date = seconds > 1 ? `${seconds} seconds` : `${seconds} second`;

  if(months > 0) {
    date = months > 1 ? `${months} months` : `${months} month`;
  } else if(days > 0) {
    date = days > 1 ? `${days} days` : `${days} day`;
  } else if(hours > 0) {
    date = hours > 1 ? `${hours} hours` : `${hours} hour`;
  } else if(minutes > 0) {
    date = minutes > 1 ? `${minutes} minutes` : `${minutes} minute`;
  }


  return(
    <div className="comment-item">
      <p className="comment-content">{props.content}</p>
      <time className="comment-date">{date} ago</time>
    </div>
  );
}

export default PostComment;