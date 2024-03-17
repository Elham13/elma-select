"use client";

import React, { useEffect, useRef, useState } from "react";
import classes from "./CustomSelect.module.css";
import { ComboBox, SelectPropTypes } from "@/utils/types";

const getValue = (el: string | number | ComboBox) => {
  if (typeof el === "object") return el?.value;

  return el;
};

const getLabel = (el: string | number | ComboBox) => {
  if (typeof el === "object") return el?.label;

  return el;
};

const Select = ({
  options,
  value,
  placeholder,
  className,
  onChange,
}: SelectPropTypes) => {
  const container = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | number>(value || "");

  const handleSelect = (elem: string | number | ComboBox) => {
    if (selected === getValue(elem)) {
      setSelected("");
      setOpen(false);
    } else {
      setSelected(getValue(elem));
      setOpen(false);
    }
  };

  const findSelectedLabel = (val: string | number) => {
    const found = options?.find((el) => val === getValue(el));
    if (!found) return "";
    return getLabel(found);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        container.current &&
        !container.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener<"click">("click", handleClickOutside);

    return () => {
      document.removeEventListener<"click">("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (onChange) onChange(selected);
  }, [selected]);

  const arrowClasses = `border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-black transition-transform ${
    open ? "rotate-180" : "rotate-0"
  }`;

  const btnClasses = `w-full bg-white py-1 px-2 border border-gray-500 rounded-md cursor-pointer flex items-center justify-between outline-none ${className}`;

  const listClasses = `absolute list-none w-full shadow-md bg-white border border-slate-500 rounded mt-1 max-h-[200px] overflow-y-auto transition-all focus-within:shadow-lg focus-within:shadow-green-500 z-50 ${
    classes.container
  } ${
    open ? "scale-y-100 opacity-100 visible" : "scale-y-0 opacity-0 invisible"
  }`;

  return (
    <div ref={container} className={`relative max-w-full text-sm`}>
      <button
        className={btnClasses}
        role="combobox"
        aria-labelledby="select button"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-controls="select-dropdown"
        onClick={() => setOpen((prev) => !prev)}
        onKeyUp={(e) => {
          if (e.key === "Escape" && open) setOpen(false);
        }}
      >
        <span className="text-left mr-2">
          {findSelectedLabel(selected) || placeholder || "Select"}
        </span>
        <span className={arrowClasses} />
      </button>
      <ul className={listClasses} role="listbox">
        {options?.length > 0 ? (
          options?.map((el, ind) => (
            <li
              role="option"
              className={`cursor-pointer px-2 py-1 flex items-center justify-between ${
                selected === el
                  ? "bg-blue-500 text-white"
                  : "hover:bg-slate-200"
              }`}
              key={ind}
              onClick={() => handleSelect(el)}
            >
              {getLabel(el)}
              {selected === getValue(el) && (
                <span className="hover:bg-red-500 hover:text-white p-1 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              )}
            </li>
          ))
        ) : (
          <li
            role="option"
            className="flex items-center justify-center flex-col p-4 text-slate-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
              />
            </svg>
            No Data
          </li>
        )}
      </ul>
    </div>
  );
};

export default Select;
