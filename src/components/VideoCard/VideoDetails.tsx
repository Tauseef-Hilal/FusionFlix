import { usePathname } from "next/navigation";
import { FiMoreVertical } from "react-icons/fi";

import LazyImage from "../LazyImage";
import { FeedQuery } from "@/lib/graphql/client/generated/graphql";
import { getFormattedDifference, getFormattedViewCount } from "@/lib/utils/abc";

interface VideoDetailsProps {
  videoSnippet: FeedQuery["videos"][0]["snippet"];
  videoStats: FeedQuery["videos"][0]["statistics"];
  showMoreBtn: boolean;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({
  videoSnippet,
  videoStats,
  showMoreBtn,
}) => {
  const timeSinceUpload = getFormattedDifference(videoSnippet.publishedAt);
  const viewCount = getFormattedViewCount(videoStats.viewCount);
  const onResultsPage = usePathname().endsWith("/results");

  return (
    <div className="flex justify-between items-start w-full overflow-hidden">
      <div className="flex gap-3 justify-start items-start">
        {!onResultsPage && (
          <LazyImage
            src={videoSnippet.channel.snippet.thumbnailUrl}
            alt="Channel Thumbnail"
            className="rounded-full flex-shrink-0"
            width={40}
            height={40}
          />
        )}
        <div className="flex flex-col">
          {onResultsPage ? (
            <>
              <h2 className="font-medium line-clamp-1 ">
                {videoSnippet.title}
              </h2>
              <p className="text-sm text-neutral-400">
                {viewCount} views • {timeSinceUpload} ago
              </p>
              <div className="flex items-center gap-2 my-2">
                <LazyImage
                  src={videoSnippet.channel.snippet.thumbnailUrl}
                  alt="Channel Thumbnail"
                  className="rounded-full flex-shrink-0"
                  width={24}
                  height={24}
                />
                <p className="text-sm text-neutral-400 line-clamp-1">
                  {videoSnippet.channel.snippet.title}
                </p>
              </div>
              <p
                className={`
                  hidden sm:block text-sm text-neutral-400 line-clamp-2
                `}
              >
                {videoSnippet.description.slice(0, 100)}
              </p>
            </>
          ) : (
            <>
              <h2 className="font-medium line-clamp-2">{videoSnippet.title}</h2>
              <div className="mt-1">
                <p className="text-sm text-neutral-400 line-clamp-1">
                  {videoSnippet.channel.snippet.title}
                </p>
                <p className="text-sm text-neutral-400">
                  {viewCount} views • {timeSinceUpload} ago
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="w-4 flex-shrink-0 flex justify-end">
        {showMoreBtn && <FiMoreVertical className="text-lg" />}
      </div>
    </div>
  );
};

export default VideoDetails;
