import { useState, useEffect } from "react";

/**
 * useMediaQuery
 * A hook that listens for changes in a media query.
 *
 * @param {string} query - The media query string.
 * @returns {boolean} - Whether the media query matches.
 */
export function useMediaQuery(query) {
  const getMatches = (query) => {
    // Prevents SSR issues
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState(getMatches(query));

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    try {
      // For modern browsers
      mediaQueryList.addEventListener("change", documentChangeHandler);
    } catch (e1) {
      try {
        // For older browsers
        mediaQueryList.addListener(documentChangeHandler);
      } catch (e2) {
        console.error(e2);
      }
    }

    documentChangeHandler();
    return () => {
      try {
        mediaQueryList.removeEventListener("change", documentChangeHandler);
      } catch (e3) {
        try {
          mediaQueryList.removeListener(documentChangeHandler);
        } catch (e4) {
          console.error(e4);
        }
      }
    };
  }, [query]);

  return matches;
}
