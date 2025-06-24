"use client";

import { useParams } from "next/navigation";
import CommentSection from "@/components/comment/CommentSection";
import ProductOverview from "./_components/ProductOverview";
import { useProduct } from "@/hooks/Products/useProduct";
import { useAuth } from "@/providers/AuthProvider";
import LoadingState from "@/components/common/LoadingState";

export default function ItemDetailPage() {
  const params = useParams();
  const { id } = params;
  const { user } = useAuth();

  const { product, loading, error } = useProduct(id as string);

  return (
    <section className="flex items-center justify-center">
      <div className="flex w-full max-w-[1200px] flex-col px-6 py-6">
        <LoadingState
          loading={loading}
          error={error}
          isEmpty={!loading && !error && !product}
          loadingMessage="상품 정보를 불러오는 중..."
          errorMessage="상품을 불러오는데 실패했습니다."
          emptyMessage="상품 정보를 찾을 수 없습니다."
        />

        {product && (
          <>
            <ProductOverview product={product} user={user!} />
            <CommentSection
              type="products"
              parentId={id as string}
              user={user!}
            />
          </>
        )}
      </div>
    </section>
  );
}
