import { FiMoreVertical } from "react-icons/fi";

import { getFormattedDifference, getFormattedViewCount } from "@/lib/utils/abc";
import {
  ThumbnailGroupItemFragmentDoc,
  ThumbnailItemFragmentDoc,
  VideoItemFragment,
} from "@/lib/graphql/client/generated/graphql";
import { useFragment } from "@/lib/graphql/client/generated";
import LazyImage from "../LazyImage";

interface VideoDetailsProps {
  videoSnippet: VideoItemFragment["snippet"];
  videoStats: VideoItemFragment["statistics"];
  showMoreBtn: boolean;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({
  videoSnippet,
  videoStats,
  showMoreBtn,
}) => {
  const timeSinceUpload = getFormattedDifference(videoSnippet.publishedAt);
  const viewCount = getFormattedViewCount(videoStats.viewCount);
  const thumbnails = useFragment(
    ThumbnailGroupItemFragmentDoc,
    videoSnippet.channel.snippet.thumbnails
  );
  const thumbnail = useFragment(ThumbnailItemFragmentDoc, thumbnails.low);

  return (
    <div className="flex justify-between items-start">
      <div className="flex gap-3 items-start">
        <LazyImage
          src={thumbnail.url}
          alt="Channel Thumbnail"
          className="rounded-full flex-shrink-0"
          width={40}
          height={40}
        />
        <div>
          <h2 className="font-medium line-clamp-2">{videoSnippet.title}</h2>
          <p className="text-sm text-neutral-400 line-clamp-1">
            {videoSnippet.channel.snippet.title}
          </p>
          <p className="text-sm text-neutral-400">
            {viewCount} views • {timeSinceUpload} ago
          </p>
        </div>
      </div>
      <div className="w-8 flex justify-end">
        {showMoreBtn && <FiMoreVertical className="text-lg" />}
      </div>
    </div>
  );
};

export default VideoDetails;
