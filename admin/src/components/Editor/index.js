import React from 'react';
import { MDXEditor } from '@mdxeditor/editor';
import { getMarkdownEditorPlugins } from './editor.plugins';

// Styles
import '@mdxeditor/editor/style.css';
import '../../styles/prose.css';
import '../../styles/editor.css';

import { getStrapiTheme } from '../../utils/getStrapiTheme';

const Editor = ({ onChange, name, value }) => {
  return (
    <MDXEditor
      className={`${getStrapiTheme()}-editor`}
      name={name}
      onChange={(value) => {
        onChange({ target: { name, value } });
      }}
      contentEditableClassName={`${getStrapiTheme()}-editor prose dark:prose-invert lg:prose-xl`}
      markdown={value}
      placeholder="Write your text here..."
      plugins={getMarkdownEditorPlugins('default', value)}
    />
  );
};

export default Editor;
