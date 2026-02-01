import { useState } from "react";

export default function useBreadcrumb() {
  const [activePath, setActivePath] = useState([]);
  const [activeFolder, setActiveFolder] = useState(null);

  const updatePath = (path = []) => {
    const safePath = path.filter(Boolean);

    setActivePath(safePath);
    setActiveFolder(safePath[safePath.length - 1] ?? null);
  };

  return {
    activePath,
    activeFolder,
    setActivePath: updatePath
  };
}
