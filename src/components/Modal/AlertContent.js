/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export const AlertContent = ({
  title,
  setTitle,
  content,
  setContent,
  type,
  setType,
  showModal,
  operation,
}) => {
  useEffect(() => {
    if (operation === "add") {
      setTitle("");
      setContent("");
      setType("");
    }
  }, [showModal]);
  return (
    <div>
      <div className="relative px-6 flex-auto">
        <input
          name="title"
          placeholder={"Alert Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 rounded border-gray-600 p-1    my-[8px] text-slate-500 text-lg leading-relaxed"
        />
      </div>
      <div className="relative px-6 flex-auto">
        <input
          name="content"
          placeholder={"Content"}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border-2 rounded border-gray-600 p-1    my-[8px] text-slate-500 text-lg leading-relaxed"
        />
      </div>
      <div className="relative px-6 flex-auto">
        <input
          name="type"
          placeholder={"Type"}
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border-2 rounded border-gray-600 p-1    my-[8px] text-slate-500 text-lg leading-relaxed"
        />
      </div>
    </div>
  );
};