import React, { useCallback, useRef, useState } from 'react';
import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { Dialog } from '@strapi/design-system/Dialog';
import { TextInput } from '@strapi/design-system/TextInput';
import { Typography } from '@strapi/design-system/Typography';
import { VideoIcon } from './VideoIcon';
import { insertMarkdown$, rootEditor$, useCellValues, usePublisher } from '@mdxeditor/editor';
import { replaceVideoLinks } from '../../utils/replaceVideoLinks';

/**
 * Insert video dialog (only supports YouTube and Vimeo)
 * @param props
 * @returns {Element}
 * @constructor
 */
const VideoDialog = (props) => {
  const { onClose, onSelect } = props;
  const inputRef = useRef(null);

  const handleSelect = useCallback(() => {
    const videoUrl = inputRef.current.input.current?.value;

    if (videoUrl === '' || !videoUrl?.match(/youtube.com|vimeo.com/)) {
      console.log('Invalid video link');
      onClose?.();
      return;
    }

    onSelect?.(replaceVideoLinks(videoUrl));
    onClose?.();
  }, [onSelect, onClose]);

  return (
    <Dialog isOpen title="Insert youtube/vimeo video" id="video-dialog" style={{ padding: 20 }} onClose={onClose}>
      <Box style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 15 }}>
        <TextInput label="URL" ref={inputRef} type="text" placeholder="insert link here..." />
      </Box>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button variant="danger-light" type="button" onClick={() => onClose?.()}>
          Dismiss
        </Button>
        <Button type="button" onClick={handleSelect}>
          Submit
        </Button>
      </div>
      <Typography>Only supports video from youtube and vimeo</Typography>
    </Dialog>
  );
};

/**
 * Custom MdxEditor VideoDialog with the Strapi
 * Just add this component to the toolbar
 * @example
 *  toolbarPlugin({
 *   toolbarContents: () =>
 *       <>
 *         <UndoRedo />
 *          ...
 *         <StrapiInsertVideo />
 *       </>
 *  });
 */
export const StrapiInsertVideo = () => {
  // Editor
  // -- Get the active editor
  const [activeEditor] = useCellValues(rootEditor$);

  // -- Use the publisher to insert markdown
  const insertMarkDown = usePublisher(insertMarkdown$);

  // Media library

  // -- Control visibility of the media-library component
  const [isOpen, setOpen] = useState(false);

  const handleSelectVideo = useCallback(
    (videoUrl) => {
      // Close the media-library
      setOpen(false);

      // Editor -> Insert images from the media-library

      // Focus the editor (required for update)
      activeEditor.focus();

      // Insert image nodes as markdown
      activeEditor.update(() => {
        const html =
          (videoUrl = `<iframe style="max-width:100%;" width="640" height="360" src="${videoUrl}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>&nbsp;</iframe>`);

        // Insert generated the markdown
        insertMarkDown(html);
      });
    },
    [setOpen, activeEditor, insertMarkDown],
  );

  return (
    <>
      {isOpen && <VideoDialog onClose={() => setOpen(false)} onSelect={handleSelectVideo} />}
      <button type="button" onClick={() => setOpen(true)}>
        <VideoIcon />
      </button>
    </>
  );
};
