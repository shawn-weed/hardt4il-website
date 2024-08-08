import YoutubeSearch from "../components/YoutubeSearch";

export default function Projects() {
  return (
    <div className="">
      <h1 className="text-center text-6xl font-bold m-5 dark:text-gray-200 border-b-4 border-spacing-5 border-fuchsia-500">Media</h1>
      <div className="justify-center">
        <h1 className="flex mt-5 ml-5 justify-center md:justify-start text-3xl dark:text-gray-200">Popular Videos</h1>
        <YoutubeSearch playlist='UULPk28LohA5hlp-7aVN0lWQMQ' />
        <h1 className="flex mt-5 ml-5 justify-center md:justify-start text-3xl dark:text-gray-200">Most Recent</h1>
        <YoutubeSearch playlist='UUk28LohA5hlp-7aVN0lWQMQ' />
        <h1 className="flex mt-5 ml-5 justify-center md:justify-start text-3xl dark:text-gray-200">Shorts</h1>
        <YoutubeSearch playlist='UUSHk28LohA5hlp-7aVN0lWQMQ' />
      </div>
    </div>
  );
}
