"use client";
import Link from "next/link";
// import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
}

// const searchParamsSchema = z.object({
//   page: z.coerce.number(),
//   query: z.enum(["lagos",]),
// });

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  // const searchParams = useSearchParams();
  // const searchParamObject = Object.fromEntries(searchParams);
  // const validParams = searchParamsSchema.safeParse(searchParamObject);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/posts");
      const { posts } = await res.json();
      setPosts(posts);
    } catch (error) {
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // if (!validParams.success) {
  //   return <p>Invalid search Params {searchParamObject.query}</p>;
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <p>Total posts - {posts?.length}</p>
      {loading ? (
        <p> Loading...</p>
      ) : (
        <div>
          {/* {value.length > 0 &&
            value?.map((val: Product) => {
              const validProduct = productSchema.safeParse(val);
              if (!validProduct.success) {
                console.log("valid", validProduct.error);
              }
              return (
                <p key={val.id}>
                  {val.price}
                </p>
              );
            })} */}
        </div>
      )}

      <div className="flex gap-2 mt-5">
        <Link href="/auth/login">login</Link>
        <Link href="/auth/register">register</Link>
        <Link href="/settings">settings</Link>
      </div>
    </main>
  );
}
