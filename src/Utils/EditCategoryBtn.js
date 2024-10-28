import React, { useEffect, useState } from "react";

const EditCategoryBtn = ({ val, selectedCategory, handleSelected }) => {
    const [activeCategory, setActiveCategory] = useState(false);

    useEffect(() => {
        const isSelected = selectedCategory.some(
            (v) => v.category === val.category
        );
        setActiveCategory(isSelected);
    }, [selectedCategory, val.category]);

    return (
        <div>
          <ul>
            <li
              onClick={() => {
                handleSelected({
                  id: val.id,
                  catagory: val.catagory,
                  emoji: val.emoji,
                });
              }}
              className={`text-base max-sm:text-sm cursor-pointer flex items-center gap-2 font-medium text-white rounded-lg px-4 py-2 max-sm:py-1 ${
                activeCatagory
                  ? "bg-purple-600 border-purple-300 border-2"
                  : "bg-purple-400"
              } `}
            >
              <span className=" text-2xl max-sm:text-lg">{val.emoji}</span>
              {val.catagory}
            </li>
          </ul>
        </div>
      );
    };
    
    export default EditCategoryBtn;
