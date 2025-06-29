import { useEffect, useState } from "react";

export default function useImagesLoaded(deps: any[]) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const checkImages = async () => {
      const imgs = document.querySelectorAll("img");
      const promises = Array.from(imgs).map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) resolve();
            else {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }
          })
      );

      await Promise.all(promises);
      if (!isCancelled) setLoaded(true);
    };

    checkImages();

    return () => {
      isCancelled = true;
    };
  }, deps);

  return loaded;
}
