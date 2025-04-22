'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { deleteArticle, deleteComment } from '@/lib/api';

export default function DropdownMenu({
  id, 
  type, 
  boardType, 
  articleId, 
  onEdit,
  onDeleted,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const handleDelete = async () => {
    const confirmed = confirm('정말 삭제하시겠습니까?');
    if (!confirmed) return;

    try {
      if (type === 'article') {
        await deleteArticle(id);
        router.push('/free-board');
      } else if (type === 'comment') {
        await deleteComment(boardType, articleId, id); 
        onDeleted?.();
      }
    } catch (error) {
      alert(`${type === 'article' ? '게시글' : '댓글'} 삭제에 실패했습니다.`);
    } finally {
      closeMenu();
    }
  };

  const handleEdit = () => {
    if (type === 'article') {
      router.push(`/free-board/${id}/edit`);
    } else {
      onEdit?.();
    }
    closeMenu();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <Image src="/ic_kebab.svg" alt="kebab" width={24} height={24} />
      </button>

      {isOpen && (
        <div className="absolute right-0 bg-white border border-gray-300 text-primary-500 rounded-[8px] w-[120px] z-10">
          <button
            className="pt-[12px] pb-[8px] w-full text-[16px] text-center hover:bg-gray-100 hover:rounded-t-[8px]"
            onClick={handleEdit}
          >
            수정하기
          </button>
          <button
            className="pt-[12px] pb-[8px] w-full text-[16px] text-center hover:bg-gray-100 hover:rounded-b-[8px]"
            onClick={handleDelete}
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
