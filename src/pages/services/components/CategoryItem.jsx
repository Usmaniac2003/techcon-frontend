import { useEffect, useRef } from "react";
import ServiceOption from "../ServiceOption";

const CategoryItem = ({ data, activeCategory }) => {
  const elemRef = useRef();
console.log("CategoryItem", data);
console.log("activity category", activeCategory);
  useEffect(() => {
    if (activeCategory === data?.id) {
      setTimeout(() => {
        elemRef.current.scrollIntoView();
      }, 200);
    }
  }, [activeCategory]);

  return (
    <div className="mb-6" key={data?.id}>
      <p
        ref={elemRef}
        data-category-item={data?.id}
        className="font-bold bg-secondary p-2 text-xl mb-2"
      >
        {data?.name}
      </p>
      {data?.image_content_type === "image" ? (
        <img src={data?.image} alt="" className="rounded-lg" />
      ) : (
        <></>
      )}

      <div className="mt-8">
        {data?.options?.map((option) => {
          return <ServiceOption option={option} key={option?.id} />;
        })}
      </div>
    </div>
  );
};

export default CategoryItem;
