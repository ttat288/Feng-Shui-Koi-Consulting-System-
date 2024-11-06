import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Định nghĩa interface cho các props
interface BlogEditorProps {
  content: string;
  onContentChange: (value: string) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({
  content,
  onContentChange,
}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image", "video"], // Media buttons
      ["clean"], // Clear formatting
    ],
  };

  const formats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
    "video",
  ];

  return (
    <div>
      <ReactQuill
        value={content} // Dùng value thay vì content
        onChange={onContentChange} // Sử dụng onChange với props
        modules={modules}
        formats={formats}
        style={{ height: "500px" }} // Tùy chỉnh chiều cao của editor
      />
    </div>
  );
};

export default BlogEditor;
