import { useQuery } from "@tanstack/react-query";

function useCategories() {
  return useQuery({
    queryKey: ["shopCategories"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products/categories").then((res) => {
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }
        return res.json();
      }),
    staleTime: 1000 * 60,
  });
}
export default useCategories;
