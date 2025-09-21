import { useParamsStore } from "@/hooks";
import Icon from "./icon";
import { Button, Shad } from "./ui";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Props = {
  totalPages: number;
};

const Pagination = ({ totalPages }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setParams } = useParamsStore();

  // Get current page from URL or default to 1
  const currentPage = parseInt(searchParams.get("pageNumber") || "1", 10);

  // Function to update URL with new page
  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams);

      if (newPage === 1) {
        params.delete("pageNumber");
      } else {
        params.set("pageNumber", newPage.toString());
      }

      setParams({ pageNumber: newPage });

      const queryString = params.toString();
      const newUrl = queryString ? `?${queryString}` : window.location.pathname;

      router.push(newUrl, { scroll: false });
    },
    [router, searchParams]
  );

  // Helper function to generate page numbers array
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {/* Pagination Controls */}
      <Shad.Pagination>
        <Shad.PaginationContent className="flex items-center gap-1">
          {/* First Page */}
          <Shad.PaginationItem>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="hidden sm:flex"
            >
              <Icon name="ChevronsLeft" size={16} />
            </Button>
          </Shad.PaginationItem>

          {/* Previous Page */}
          <Shad.PaginationItem>
            <Shad.PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={cn(
                "cursor-pointer",
                currentPage === 1 && "pointer-events-none opacity-50"
              )}
            />
          </Shad.PaginationItem>

          {/* Page Numbers */}
          {pageNumbers.map((pageNumber, index) => (
            <Shad.PaginationItem key={index}>
              {pageNumber === "..." ? (
                <Shad.PaginationEllipsis />
              ) : (
                <Shad.PaginationLink
                  onClick={() => handlePageChange(pageNumber as number)}
                  isActive={pageNumber === currentPage}
                  className="cursor-pointer"
                >
                  {pageNumber}
                </Shad.PaginationLink>
              )}
            </Shad.PaginationItem>
          ))}

          {/* Next Page */}
          <Shad.PaginationItem>
            <Shad.PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={cn(
                "cursor-pointer",
                currentPage === totalPages && "pointer-events-none opacity-50"
              )}
            />
          </Shad.PaginationItem>

          {/* Last Page */}
          <Shad.PaginationItem>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="hidden sm:flex"
            >
              <Icon name="ChevronsRight" size={16} />
            </Button>
          </Shad.PaginationItem>
        </Shad.PaginationContent>
      </Shad.Pagination>

      {/* Mobile Page Info */}
      <div className="flex sm:hidden text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
