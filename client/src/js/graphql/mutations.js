export const AUTH_USER = `
  mutation authenticate($email: String!, $password: String!) {
    authenticate(
      email: $email,
      password: $password
    )
  }
`;

export const REGISTER_USER = `
  mutation register($email: String!, $password: String!) {
    register(
      email: $email,
      password: $password
    )
  }
`;

export const ADD_POST_QUERY = `
  mutation addPost($title: String!, $content: String!, $image: String!) {
    addPost(
      post: {
        title: $title,
        content: $content,
        image: $image
      }
    ) { id, title, content }
  }
`;

export const UPDATE_POST_QUERY = `
  mutation updatePost($id:Int! ,$title: String!, $content: String, $image: String) {
    updatePost(
      post: {
        id: $id,
        title: $title,
        content: $content,
        image: $image
      }
    ) { id, title, content, image, createdAt, comments { id, content } }
  }
`;

export const ADD_COMMENT_QUERY = `
  mutation addComment($postId: Int!, $content: String!) {
    addComment(
      postId: $postId,
      content: $content
    ) { id, content, createdAt }
  }
`;