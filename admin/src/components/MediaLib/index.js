import React, { useCallback, useState } from 'react';
import { insertMarkdown$, rootEditor$, useCellValues, usePublisher } from '@mdxeditor/editor';
import { prefixFileUrlWithBackendUrl, useLibrary } from '@strapi/helper-plugin';

import { ImageIcon } from './ImageIcon';

/**
 * Override the default MdxEditor ImageDialog with the Strapi media-library
 * Just add this component to the toolbar
 * @example
 *  toolbarPlugin({
 *   toolbarContents: () =>
 *       <>
 *         <UndoRedo />
 *          ...
 *         <MdxStrapiImageGallery />
 *       </>
 *  });
 */
export const MdxStrapiImageGallery = () => {
  // Editor
  // -- Get the active editor
  const [activeEditor] = useCellValues(rootEditor$);

  // -- Use the publisher to insert markdown
  const insertMarkDown = usePublisher(insertMarkdown$);

  // Media library

  // -- Control visibility of the media-library component
  const [isOpen, setOpen] = useState(false);

  // -- Use the media-library component from the Strapi
  const { components } = useLibrary();
  const MediaLibraryDialog = components['media-library'];

  const handleSelectAssets = useCallback(
    (files) => {
      const formattedFiles = files.map((f) => ({
        alt: f.alternativeText || f.name,
        url: prefixFileUrlWithBackendUrl(f.url),
        mime: f.mime,
      }));

      // Close the media-library
      setOpen(false);

      if (!formattedFiles.length) return;

      // Editor -> Insert images from the media-library

      // Focus the editor (required for update)
      activeEditor.focus();

      // Insert image nodes as markdown
      activeEditor.update(() => {
        const imagesHtml = formattedFiles.map((f) => `<img style="max-width: 100%" alt="${f.alt}" src="${f.url}"/>`).join('');

        // Insert generated the markdown
        insertMarkDown(imagesHtml);
      });
    },
    [setOpen, activeEditor, insertMarkDown],
  );

  return (
    <>
      {isOpen && <MediaLibraryDialog onClose={() => setOpen(false)} onSelectAssets={handleSelectAssets} />}
      <button type="button" onClick={() => setOpen(true)}>
        <ImageIcon />
      </button>
    </>
  );
};
