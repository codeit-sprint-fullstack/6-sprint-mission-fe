import React from 'react'
import Writer from './Writer'
import ActionDropDown from '@/components/ui/ActionDropDown'
import LikedCount from '@/components/ui/article/detail/LikedCount'
interface ArticleHeaderProps {
  title: string;
}
function ArticleHeader({ title } : ArticleHeaderProps) : React.JSX.Element {
  return (
    <div className="border-b-1 border-[#E5E7EB]">
        <div className="flex justify-between gap-5 mb-4">
          <div className="flex-1 text-xl font-[700]">{title}</div>
          <ActionDropDown />
        </div>
        <div className="flex justify-start gap-6 mb-4">
          <Writer />
          <LikedCount />
        </div>
    </div>
  )
}

export default ArticleHeader