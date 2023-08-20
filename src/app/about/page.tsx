import Footer from "@/UI/footer";
import NAV from "@/UI/nav";
export default function Home() {
  return (
    <div className="flex flex-col">
      <NAV />
      <div className="w-full my-5 p-2 flex">
        <div className="max-w-[900px] mx-auto w-full flex flex-col gap-2  items-center justify-center">
         {/* title */}
          <div className="relative p-4 py-10 overflow-clip flex flex-col items-center justify-center">
            <div className="bg-blue-700 absolute mix-blend-overlay bottom-9 -left-50 -rotate-3 h-2/6 w-80" />
            <h1 className="text-2xl text-white">About Us</h1>
          </div>
          {/* content */}
          <ul className="my-10 list-disc flex flex-col gap-5">
            <li>
              Myth Debunking: TARA DB is your source for debunking myths and
              misinformation surrounding Dalit, Bahujan, Ambedkar, Buddha, and
              related areas. We provide well-sourced articles and resources that
              address common misconceptions and provide evidence-based insights.
              🛡️📢
            </li>
            <li>
              Comprehensive Database: Our database contains a curated collection
              of articles, videos, podcasts, and scholarly works. Whether you&apos;re
              a student, researcher, or simply curious, you&apos;ll find a wealth of
              reliable information here. 📚🔍
            </li>
            <li>
              Educational Resources: TARA DB is committed to education and
              awareness. We offer educational resources for teachers, students,
              and anyone interested in learning more about the history, culture,
              and contributions of Dalit, Bahujan, Ambedkar, and Buddha
              communities. 🎓🌟
            </li>
            <li>
              Inclusive Community: We encourage open and respectful discussions.
              TARA DB fosters an inclusive community where people from all
              backgrounds can engage in meaningful conversations, share their
              perspectives, and learn from one another. 🌍🤝
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
