import React from 'react'
interface ArticleContentProps {
  content: string;
}
function ArticleContent({ content } : ArticleContentProps) : React.JSX.Element {
  return (
    <div className="pt-4 pb-8 text-md">{content}</div>
  )
}

export default ArticleContent