import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../../redux/modules/post';

function News() {
  const limit = 6;
  const [ index, setIndex ] = useState(0);
  const { posts, errors, isLoadLimit } = useSelector(state => state.post);
  const { isAuthenticated } = useSelector(state => state.auth);
  const [ isLoading, setIsLoading ] = useState(false);
  const dispatch = useDispatch();

  function handleLoadMore(e) {
    e.preventDefault();
    setIsLoading(true);
    dispatch(getPosts({ offset: index, limit: limit}));
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  useEffect(() => {
    dispatch(getPosts({ offset: index, limit: limit}));
  }, []);

  useEffect(() => {
    if(posts) {
      setIndex(prevIndex => prevIndex + limit);
    }
    
  }, [posts]);

  if(errors && errors.length) return <h2>Network Error</h2>
  return(
    <section className="section news-section" id="js-news-section">
      <div className="l-container">
        <div className="section-title flex">
          <h2 className="section-heading">NEWS</h2>
          { isAuthenticated && 
            <Link to="/news/new">Create New Post</Link> }
        </div>

        <div className="news-content">
          <ul className="news-list">
            { 
              posts && posts.map((post, index) => 
                <div className={`news-list-group flex flex-start`} key={`post-group-${index}`}>
                  {
                    post.map(item => 
                      <NewsItem 
                      key={`news-item-${item.id}`} 
                      id={item.id}
                      title={item.title}
                      date={item.createdAt}   
                      image={item.image} />
                    )
                  }
                </div>
              )
            }
          </ul>
        </div>
        { posts && 
          <button 
          className={`button ${isLoading || isLoadLimit ? 'is-disabled' : ''}`}
          onClick={handleLoadMore}> {isLoading ? 'LOADING...' : (isLoadLimit ? 'NO MORE POSTS' : 'LOAD MORE') }</button>
        }
      </div>
    </section>
  );
}

export default News;