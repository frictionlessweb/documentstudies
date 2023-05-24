interface DataFetcherProps<T> {
  isLoading: boolean;
  fetchAttempted: boolean;
  apiError: string;
}


export const DataFetcher = <T,>(props: DataFetcherProps<T>) => {
  return null;
}
