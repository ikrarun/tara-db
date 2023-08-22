'use client'
import Image from "next/image";
import Link from "next/link";
const BookCard = ({
  imageUrl,
  link,
  title,
  desc,
}: {
  imageUrl?: string;
  link?: string;
  title: string;
  desc: string;
}) => (
  <div className="sm:grow text-white hover:scale-105 hover:z-20 ease-in-out duration-75 z-10 relative aspect-video rounded-lg overflow-clip ">
    <div className="relative  grow h-full overflow-clip rounded-md p-1">
      <Image
        src={imageUrl ?? "https://picsum.photos/640/360"}
        fill={true}
        className="blur-sm"
        style={{ objectFit: "cover" }}
        alt="book cover"
      />
    </div>
    <Link
      href={link ?? "/"}
      target="_blank"
      className="p-4 absolute top-0 w-full flex bg-gradient-to-t from-black/90 to-white/10 h-full gap-3 items-start justify-end flex-col"
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      <h1 className="text-base font-semibold">{desc}</h1>
    </Link>
  </div>
);

export default BookCard;
