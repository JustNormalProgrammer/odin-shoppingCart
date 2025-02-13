import { useQuery } from "@tanstack/react-query";

function useShopItems() {
  return useQuery({
    queryKey: ["shopItems"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => {
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }
        return res.json();
      }),
    staleTime: 1000 * 60,
  });
}
export default useShopItems;
