"use client";

import React, { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

export function QuillEditor({
  value,
  onChange,
  title = "Company Policies",
}) {
  const editorRef = useRef(null);
  const toolbarRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) return; // Avoid initializing twice (StrictMode)

    let quillInstance;
    let isCancelled = false;

    (async () => {
      const QuillModule = await import("quill");
      const Quill = QuillModule.default || QuillModule;

      if (!editorRef.current || !toolbarRef.current || isCancelled) return;

      quillInstance = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: toolbarRef.current,
        },
      });

      quillRef.current = quillInstance;

      if (value) {
        quillInstance.root.innerHTML = value;
      }

      const handleChange = () => {
        const html = quillInstance.root.innerHTML;
        onChange && onChange(html);
      };
      quillInstance.on("text-change", handleChange);
      // 🔥 Handler image
      const toolbar = quillInstance.getModule("toolbar");
      toolbar.addHandler("image", () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = () => {
          const file = input.files && input.files[0];
          if (!file) return;

          const reader = new FileReader();
          reader.onload = () => {
            const range = quillInstance.getSelection(true);
            const position = range ? range.index : 0;
            quillInstance.insertEmbed(
              position,
              "image",
              reader.result, // base64
              "user"
            );
            quillInstance.setSelection(position + 1);
          };
          reader.readAsDataURL(file);
        };
      });
    })();

    return () => {
      isCancelled = true;
      if (quillInstance) {
        quillInstance.off("text-change");
      }
      quillRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (quillRef.current && value !== undefined) {
      if (quillRef.current.root.innerHTML !== value) {
        quillRef.current.root.innerHTML = value;
      }
    }
  }, [value]);

  return (
    <div className="relative w-full mx-auto ">
      {/* Card */}
      <div className="bg-[#f3f3f3] border border-gray-300 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#d9d9d9] border-b border-gray-300 py-2 text-center font-bold text-xl text-gray-800">
          {title}
        </div>

        {/* Quill content */}
        <div
          ref={editorRef}
          className="min-h-[380px] max-h-[460px] overflow-y-auto bg-white px-4 py-3 text-sm text-gray-800"
        />
      </div>

      {/* Toolbar butto*/}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-6">
        <div
          ref={toolbarRef}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 shadow-lg px-4 py-2"
        >
          {/* Text style + link */}
            <button
              type="button"
              className="ql-bold cursor-pointer w-6 h-4  rounded-md hover:bg-gray-100"
            />
            <button
              type="button"
              className="ql-italic cursor-pointer w-6 h-4  rounded-md hover:bg-gray-100"
            />
            <button
              type="button"
              className="ql-underline cursor-pointer w-6 h-4  rounded-md hover:bg-gray-100"
            />
            <button
              type="button"
              className="ql-link cursor-pointer w-6 h-4  rounded-md hover:bg-gray-100"
            />


          {/* List */}
            <button
              type="button"
              className="ql-list cursor-pointer w-6 h-4  rounded-md hover:bg-gray-100"
              value="bullet"
            />
            <button
              type="button"
              className="ql-list cursor-pointer w-6 h-4  rounded-md hover:bg-gray-100"
              value="ordered"
            />


          {/* Align */}
            <button
              type="button"
              className="ql-align cursor-pointer w-6 h-4  rounded-md hover:bg-gray-100"
              value=""
            />
            <button
              type="button"
              className="ql-align cursor-pointer w-6 h-4 rounded-md hover:bg-gray-100"
              value="center"
            />
            <button
              type="button"
              className="ql-align cursor-pointer w-6 h-4 rounded-md hover:bg-gray-100"
              value="right"
            />

          {/* Image */}
          <span className="ql-formats  gap-1">
            <button
              type="button"
              className="ql-image cursor-pointer w-6 h-4 rounded-md hover:bg-gray-100"
            />
          </span>
        </div>
      </div>
    </div>
  );
}
