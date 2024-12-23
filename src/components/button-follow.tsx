import { useEffect } from "react";

const TwitterFollowButton = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <a
        href="https://twitter.com/Mesascout?ref_src=twsrc%5Etfw"
        className="twitter-follow-button"
        data-show-count="false"
      >
        Follow @Mesascout
      </a>
    </div>
  );
};

export default TwitterFollowButton;