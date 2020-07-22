export const GET_POSTS_QUERY = `
  query posts($limit: Int, $offset: Int) {
    posts(
      pagination: {
        offset: $offset,
        limit: $limit
      }
    )
    {
      id, title, content, image, createdAt
    }
  }
`;

export const GET_POST_QUERY = `
  query post($id: Int!) {
    post(id: $id) { 
      id, title, content, image, createdAt, comments { id, content, createdAt } 
    }
  }
`;