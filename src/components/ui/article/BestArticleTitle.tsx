import React, { ReactNode } from 'react'
interface BestArticlesTitleProps {
  children: ReactNode;
}
function BestArticlesTitle({ children } : BestArticlesTitleProps) {
  return (
    <div>{ children }</div>
  )
}

export default BestArticlesTitle