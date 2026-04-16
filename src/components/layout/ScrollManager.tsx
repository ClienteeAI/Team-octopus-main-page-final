import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Small timeout to ensure the DOM is ready and any page transitions are complete
    const timeoutId = setTimeout(() => {
      if (hash) {
        // Handle encoded hashes (like %C5%99e%C5%A1en%C3%AD)
        const targetId = decodeURIComponent(hash.replace("#", ""));
        const element = document.getElementById(targetId);
        
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          // Fallback to top if hash element not found
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        // No hash? Go to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, hash]);

  return null;
}
