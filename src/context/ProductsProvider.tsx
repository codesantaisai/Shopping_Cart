import { ReactElement, createContext, useEffect, useState } from "react";

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

const initState: ProductType[] = [];

// const initState:ProductType[] = [
//     {
//         "sku":"item0001",
//         "name":"Widget",
//         "price":9.99
//     },
//     {
//         "sku":"item0002",
//         "name":"Premium Widget",
//         "price":9.99
//     },
//     {
//         "sku":"item0003",
//         "name":"Deluxe Widget",
//         "price":9.99
//     }
// ]

export type UserProductContextType = { products: ProductType[] };

const initContextState: UserProductContextType = { products: [] };

const ProductContext = createContext<UserProductContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: ChildrenType) => {
  const [products, setProducts] = useState<ProductType[]>(initState);

  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      const data = await fetch("http://localhost:3500/products")
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          if (err instanceof Error) console.log(err.message);
        });
      return data;
    };
    fetchProducts().then(products=>setProducts(products))
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
