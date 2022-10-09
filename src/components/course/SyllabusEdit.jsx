import "../editor/styles.css";

import ExampleTheme from "../editor/themes/ExampleTheme";
import AutoLinkPlugin from "../editor/plugins/AutoLinkPlugin";
import ListMaxIndentLevelPlugin from "../editor/plugins/ListMaxIndentLevelPlugin";
import ToolbarPlugin from "../editor/plugins/ToolbarPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { TRANSFORMERS } from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Box, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axios from "../../api/axios";

function Placeholder() {
  return (
    <div className="editor-placeholder">
      The full detailed syllabus goes here ...
    </div>
  );
}

const SyllabusEdit = (props) => {
  const [course, setCourse] = useState(props);
  const [editable, setEditable] = useState(false);
  const [error, setError] = useState();
  const editorStateRef = useRef();

  useEffect(() => {
    setCourse(props);
  }, [props]);

  function handleChange(currentState, editor) {
    editor.update(() => {
      editorStateRef.current = currentState;
    });
  }

  const EnableEditButton = () => {
    const [editor] = useLexicalComposerContext();
    const enableEdit = () => {
      editor.setEditable(true);
      setEditable(true);
    };

    return (
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", paddingRight: 2 }}
      >
        <Button variant="contained" size="medium" onClick={enableEdit}>
          Edit
        </Button>
      </Box>
    );
  };

  const DisableEditButtons = () => {
    const [editor] = useLexicalComposerContext();

    const handleCancel = () => {
      editor.setEditable(false);
      setEditable(false);

      // this is not acceptable beyond MVP
      window.location = process.env.REACT_APP_HOME_URL;
    };

    const handleSave = () => {
      editor.setEditable(false);
      setEditable(false);

      const jsonContent = JSON.stringify(editorStateRef.current.toJSON());  
      let data = {syllabus: jsonContent};
      axios
        .patch(`/api/v1/courses/${course.id}`, data)
        .catch((error) => {
          setError(error);
          console.error(error);
        })
        // this is not acceptable beyond MVP
        .then(() => (window.location = process.env.REACT_APP_HOME_URL));
    };
  
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: 2,
        }}
      >
        <Button
          variant="outlined"
          size="medium"
          sx={{ marginRight: 2 }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button variant="contained" size="medium" onClick={handleSave}>
          Save
        </Button>
      </Box>
    );
  };

  const editorConfig = {
    // The editor theme
    theme: ExampleTheme,
    // Handling of errors during update
    onError(error) {
      throw error;
    },
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
    editorState: props.syllabus,
    // always start the rich text editor with read-only mode
    editable: false,
  };

  if (error)
    return (
      <div>
        <h2>Error in SyllabusEdit.jsx! Look at the browser console for details.</h2>
        <p>{JSON.stringify(error)}</p>
      </div>
    );

  return (
    <Box>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
            />
            <OnChangePlugin onChange={handleChange} />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          </div>
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: 2,
          }}
        >
          {editable ? <DisableEditButtons /> : <EnableEditButton />}
        </Box>
      </LexicalComposer>
    </Box>
  );
};

export default SyllabusEdit;
