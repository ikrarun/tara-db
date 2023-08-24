import BookCard from "@/components/BookCard";
import { bookResponse } from "@/lib/ApiSafety";
import host from "@/server/Database/host";

export async function get_Books() {
  return await fetch(`${host}/api/suggested_readings`, {
    next: {
      revalidate: 10,
    },
  }).then((res) => res.json());
}



export const Book_of_Day = async () => {
  const data = await get_Books();
  try {
    const { title, desc, imageUrl, link } = bookResponse.parse(data);
    return (
      <BookCard imageUrl={imageUrl} link={link} title={title} desc={desc} />
    );
  } catch (error) {
    return (
      <BookCard
        title={"Can't Recommend Any Book Right Now"}
        desc={"Try again after a while"} />
    );
  }
};


