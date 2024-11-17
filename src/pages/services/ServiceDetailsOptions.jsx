import { useEffect, useRef, useState } from "react";
import CategoryItem from "./components/CategoryItem";

const isVisible = function (ele, container) {
  const eleTop = ele.offsetTop;
  const eleBottom = eleTop + ele.clientHeight;

  const containerTop = container.scrollTop;
  const containerBottom = containerTop + container.clientHeight;

  // The element is fully visible in the container
  return (
    (eleTop >= containerTop && eleBottom <= containerBottom) ||
    // Some part of the element is visible in the container
    (eleTop < containerTop && containerTop < eleBottom) ||
    (eleTop < containerBottom && containerBottom < eleBottom)
  );
};

const ServiceDetailsOptions = ({
  data,
  activeCategory,
  setActiveCategory,
  activeCategoryTab,
  setActiveCategoryTab,
  isScrolling,
}) => {
  console.log("ServiceDetailsOptions", data);
  const containerRef = useRef();
  const sections = useRef();

  const handleScroll = (isScrolling) => {
    // handleEndScroll();
    if (!isScrolling) {
      const elements = Array.from(sections.current);
      elements?.forEach((element) => {
        if (isVisible(element, containerRef.current)) {
          setActiveCategory(null);
          setActiveCategoryTab(Number(element?.dataset?.categoryItem));
        }
      });
    }
  };

  useEffect(() => {
    sections.current = document.querySelectorAll("[data-category-item]");
  }, []);

  return (
    <>
      <div
        className="overflow-y-scroll scroll-smooth h-[600px]"
        id="no-scroll-bar"
        onScroll={() => handleScroll(isScrolling)}
        ref={containerRef}
      >
        {data?.map((type, index) => {
          return (
            <CategoryItem
              activeCategory={activeCategory}
              key={type?.id}
              data={type}
            />
          );
        })}
      </div>
    </>
  );
};

export default ServiceDetailsOptions;
