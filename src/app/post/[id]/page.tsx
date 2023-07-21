import React from 'react'

const PostPageById = ({params}:{params: {id:string}}) => {
  return (
    <div>{params.id}</div>
  )
}
export default PostPageById