import { useState } from "react";

export default function useBreadcrumb(rootNode) {
  const [activePath, setActivePath] = useState([rootNode]);

  const updatePath = (path) => {
    setActivePath(path);
  };

  return {
    activePath,
    setActivePath: updatePath
  };
}