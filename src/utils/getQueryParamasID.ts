import queryString from 'query-string';

export function getQueryParamasId(query: string) {
  const parsedQuery: queryString.ParsedQuery<string> = queryString.parse(query);

  return parsedQuery;
}
