import React, { useState } from "react";
import { classNames } from "~/utilities/classNames";

const Tabs = ({ tabs, equalTab = true, setActiveIndex, activeIndex, addonElement }) => {
  const [activeTab, setActiveTab] = useState(activeIndex || 0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (setActiveIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex sticky w-full lg:justify-between lg:items-center">
        {/* Tab Buttons */}
        <div className="flex w-full border-b sticky">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={classNames(
                index === activeTab
                  ? "border-b-2 border-primary text-primary"
                  : "border-b border-transparent text-gray",
                "px-4 py-2 focus:outline-none text-base font-semibold",
                equalTab && "flex-1"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {addonElement && typeof addonElement === "function" && React.createElement(addonElement)}
      </div>

      {/* Tab Content */}
      <div className="mt-4 px-0.5">{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
