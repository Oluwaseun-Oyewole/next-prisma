"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

interface Product {
  id: number;
  name: string;
  price: string;
}

const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.string(),
});

const searchParamsSchema = z.object({
  page: z.coerce.number(),
  query: z.enum(["lagos", "osun"]),
});

export default function Home() {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const searchParamObject = Object.fromEntries(searchParams);
  const validParams = searchParamsSchema.safeParse(searchParamObject);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const { products } = await res.json();
      setValue(products);
    } catch (error) {
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!validParams.success) {
    return <p>Invalid search Params {searchParamObject.query}</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center ">
      Next Auth Prisma
      {error && error}
      {loading ? (
        <p> Loading...</p>
      ) : (
        <div>
          {value.length > 0 &&
            value?.map((val: Product) => {
              const validProduct = productSchema.safeParse(val);
              if (!validProduct.success) {
                console.log("valid", validProduct.error);
              }
              console.log("data products", validProduct);
              return (
                <p key={val.id}>
                  {/* {validProduct.name} */}
                  {val.price}
                </p>
              );
            })}
        </div>
      )}
    </main>
  );
}
