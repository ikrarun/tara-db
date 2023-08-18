import Footer from "@/UI/footer";
import NAV from "@/UI/nav";

const getConsole = async (data:FormData) => {
  "use server";
  console.log("Fucked");
  console.log(data);
};

const Post = () => {
  return (
    <div className="flex flex-col">
      <NAV />
      <div className="w-full my-5  p-2 flex">
        <div className="max-w-[900px] mx-auto w-full mt-14 flex flex-col gap-2  items-center justify-center">
          <form action={getConsole} className="flex gap-2 flex-col">
            <div className="p-2 border border-gray-800 rounded-md">
            <input type="text" placeholder="title" className="outline-none ring-0" name="title" id="title" />
            </div>
            <button className="bg-blue-700 rounded-md text-white px-4 py-2" type="submit">
              Add to Cart
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Post;
