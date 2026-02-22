"use client";

import Image from "next/image";
import posthog from "posthog-js";

const ExploreBtn = () => {
  const handleClick = () => {
    console.log("Explore Button");
    posthog.capture("explore_events_clicked");
  };

  return (
    <button
      id="explore-btn"
      className="mt-7 mx-auto"
      type="button"
      onClick={handleClick}
    >
      <a href="#events">
        Explore Events
        <Image
          src="/icons/arrow-down.svg"
          alt="arrow-down"
          width={24}
          height={24}
        />
      </a>
    </button>
  );
};
export default ExploreBtn;
