import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

export default function BreadcrumbPath({ activePath }) {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {activePath.map((node, idx) => (
          <BreadcrumbItem key={node.id}>
            <BreadcrumbLink href="#">{node.name}</BreadcrumbLink>
            {idx < activePath.length - 1 && (
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