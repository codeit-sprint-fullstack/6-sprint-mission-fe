interface ArticleParams {
  page: number;
  pageSize: number;
  orderBy?: "recent" | "like" | "favorite";
  keyword?: string;
}

export function toQueryString(params: ArticleParams): string {
  const query = new URLSearchParams();

  if (params.page !== undefined) query.append("page", params.page.toString());
  if (params.pageSize !== undefined) query.append("pageSize", params.pageSize.toString());
  if (params.orderBy) query.append("orderBy", params.orderBy);
  if (params.keyword) query.append("keyword", params.keyword);

  return query.toString();
}
