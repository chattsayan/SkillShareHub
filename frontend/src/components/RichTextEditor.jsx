import { Editor } from '@tinymce/tinymce-react';

const RichTextEditor = ({ input, setInput }) => {
  const handleEditorChange = (content) => {
    setInput({ ...input, description: content });
  };

  return (
    <Editor
      apiKey="your-tinymce-api-key" // You can get a free API key from https://www.tiny.cloud/
      init={{
        height: 400,
        menubar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
      value={input.description || ''}
      onEditorChange={handleEditorChange}
    />
  );
};

export default RichTextEditor;
