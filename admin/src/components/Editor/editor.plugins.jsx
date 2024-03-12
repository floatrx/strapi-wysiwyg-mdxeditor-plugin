import React from 'react';
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  codeMirrorPlugin,
  CodeToggle,
  CreateLink,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor';

import { MdxStrapiImageGallery } from '../MediaLib';
import { StrapiInsertVideo } from '../Video';

import { wysiwygConfig } from '../../config';

/**
 * Get the markdown editor plugins
 * @param initialValue
 * @returns list of MdxEditor plugins
 */
export const getMarkdownEditorPlugins = (initialValue) =>
  [
    listsPlugin(),
    quotePlugin(),
    headingsPlugin({ allowedHeadingLevels: [1, 2, 3, 4, 5, 6] }),
    linkPlugin(),
    linkDialogPlugin({}),
    tablePlugin(),
    thematicBreakPlugin(),
    frontmatterPlugin(),
    codeBlockPlugin({ defaultCodeBlockLanguage: 'javascript' }),
    codeMirrorPlugin({
      codeBlockLanguages: wysiwygConfig.mdxCodeBlockLanguages.reduce((acc, language) => {
        acc[language] = language;
        return acc;
      }, {}),
    }),
    markdownShortcutPlugin(),
    diffSourcePlugin({ diffMarkdown: initialValue, viewMode: 'rich-text' }),
    imagePlugin({
      imageUploadHandler: undefined,
      disableImageResize: true,
    }),
  ].concat(
    toolbarPlugin({
      toolbarContents: () => {
        const _ = wysiwygConfig.toolbar;
        return (
          <DiffSourceToggleWrapper>
            {_.type && <BlockTypeSelect />}
            {_.history && <UndoRedo />}
            {_.style && <BoldItalicUnderlineToggles />}
            {_.code && <CodeToggle />}
            {_.link && <CreateLink />}
            {_.list && <ListsToggle />}
            {_.table && <InsertTable />}
            {_.line && <InsertThematicBreak />}
            {_.image && <MdxStrapiImageGallery />}
            {_.video && <StrapiInsertVideo />}
          </DiffSourceToggleWrapper>
        );
      },
    }),
  );
