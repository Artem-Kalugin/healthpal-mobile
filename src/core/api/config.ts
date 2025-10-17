type Page = { size: number; page: number; count: number };

export const PaginationConfig = {
  initialPageParam: 1,
  getNextPageParam: (
    lastPage: Page,
    allPages: Page[],
    lastPageParam: number,
  ) => {
    if (lastPage.page * lastPage.size > lastPage.count) {
      return undefined;
    }
    return lastPageParam + 1;
  },
};

export const API_PAGINATION_PAGE_SIZE = 20;
