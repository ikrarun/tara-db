export default function Home() {
  return (
    <div className="max-w-[900px] mx-auto w-full flex flex-col gap-2  items-center justify-center">
      {/* title */}
      <div className="relative flex flex-col items-center justify-center p-4 py-10 overflow-clip">
        <div className="absolute bg-gray-950 mix-blend-overlay bottom-9 -left-50 -rotate-3 h-2/6 w-80" />
        <h1 className="text-2xl text-white">Book&apos;s</h1>
      </div>
      {/* content */}
      <ul className="flex flex-col gap-5 my-10 list-disc">
        <li>
          Vast Library: Our goal is to provide a vast library of books covering
          a wide range of topics, from literature and history to science and
          self-help. While we are actively working on building this collection,
          please bear with us as we curate and organize the books for your
          enjoyment. 📚📖
        </li>
        <li>
          Diverse Genres: We aspire to offer a diverse selection of genres,
          including fiction, non-fiction, fantasy, mystery, and more. We are
          committed to catering to all literary tastes and preferences, and we
          appreciate your patience as we expand our offerings. 📖🌟
        </li>
        <li>
          Author Highlights: Our vision includes featuring works from renowned
          authors and emerging talents. While we work diligently to include a
          wide range of authors, we encourage you to check back with us for
          updates on new additions to our collection. 🖋️👩‍🏫
        </li>
        <li>
          Reading Recommendations: In the meantime, we are actively developing
          curated reading lists and recommendations to assist you in finding
          great reads. Thank you for your interest, and we look forward to
          bringing you an exceptional reading experience in the future. 📚🤓
        </li>
      </ul>
    </div>
  );
}
