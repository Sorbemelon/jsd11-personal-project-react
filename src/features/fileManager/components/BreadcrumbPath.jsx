import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

export default function BreadcrumbPath({ activePath = [] }) {
  if (!Array.isArray(activePath) || activePath.length === 0) {
    return null;
  }

  return (
    <div className="flex mb-4">
      <p className="text-sm font-semibold px-2 mb-1">Current Folder:</p>

      <Breadcrumb>
        <BreadcrumbList className="text-black">
          {activePath
            .filter(Boolean)
            .map((node, idx) => (
              <span key={node._id} className="flex items-center">
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">
                    {node.name ?? "Unnamed"}
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {idx < activePath.length - 1 && (
                  <BreadcrumbSeparator>
                    <ChevronRight size={14} />
                  </BreadcrumbSeparator>
                )}
              </span>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
