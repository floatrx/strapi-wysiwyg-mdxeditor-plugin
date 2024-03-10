import React from 'react';
import {
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
import { wysiwygConfig } from '../../config';

export const getMarkdownEditorPlugins = (mode, initialValue) =>
  [
    listsPlugin(),
    quotePlugin(),
    headingsPlugin({ allowedHeadingLevels: [1, 2, 3, 4, 5, 6] }),
    linkPlugin(),
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
    mode === 'view'
      ? []
      : [
          toolbarPlugin({
            toolbarContents: () =>
              mode === 'default' && (
                <>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <CodeToggle />
                  <CreateLink />
                  <ListsToggle />
                  <InsertTable />
                  <InsertThematicBreak />
                  <MdxStrapiImageGallery />
                  <DiffSourceToggleWrapper>
                    <UndoRedo />
                  </DiffSourceToggleWrapper>
                </>
              ),
          }),
        ],
  );
