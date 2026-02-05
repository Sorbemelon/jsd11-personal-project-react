import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";

export default function BreadcrumbPath({ activePath = [] }) {
  if (!Array.isArray(activePath) || activePath.length === 0) {
    return null;
  }
  
  // useEffect(() => {
  //   console.log(activePath);
  // }, []);

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList className={`text-black`}>
        <p className="text-sm font-semibold">Current Folder:</p>
        {activePath
          .filter(Boolean) // 👈 IMPORTANT
          .map((node, idx, arr) => (
            <BreadcrumbItem key={node._id}>
              <BreadcrumbLink href="#">
                {node.name ?? "Unnamed"}
              </BreadcrumbLink>

              {idx < arr.length - 1 && (
                <BreadcrumbSeparator>
                  <ChevronRight size={14} />
                </BreadcrumbSeparator>
              )}
            </BreadcrumbItem>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
