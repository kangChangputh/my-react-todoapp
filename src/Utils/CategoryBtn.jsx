import React, { useState, useEffect } from "react";

const CategoryBtn = ({ val, selectedCategory, handleSelected }) => {
    const [activeCategory, setActiveCategory] = useState(false);

    useEffect( () => {
        const isSelectd = selectedCategory.some((v) => (
            v.category === val.category
        ))
        setActiveCategory(isSelectd)
    }, [selectedCategory, val.category])

    return (
        <li
        onClick={(e) => {
            handleSelected({
                id: val.id,
                category: val.category,
                emoji: val.emoji
            });
        }}
        className={`text-base max-sm:text-sm cursor-pointer flex items-center gap-2 font-medium text-white rounded-lg px-4 py-2 max-sm:py-1 
            ${activeCategory
                ? "bg-purple-600 border-purple-300 border-2"
                : "bg-purple-400"
                
            }`}
        >
            <span className="text-2xl max-sm:text-lg">{val.emoji}</span>
            {val.category}
        </li>
    );
};

export default CategoryBtn;