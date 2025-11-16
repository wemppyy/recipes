import "./YouTubeFrame.css";

export default function YouTubeFrame({ youtubeUrl }) {
    if (!youtubeUrl) return null;

    const url = new URL(youtubeUrl);
    const videoId = url.searchParams.get("v") || youtubeUrl.split("/").pop();
    const embedUrl = `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`;

    return (
        <iframe
            width="100%"
            height="428"
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="youtube_frame"
        ></iframe>
    );
}
