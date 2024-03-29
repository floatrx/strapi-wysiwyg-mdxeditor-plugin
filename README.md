# Strapi plugin wysiwyg

- This plugin is a WYSIWYG editor for Strapi. It uses the `@mdxeditor/editor` to provide a rich text editor for Strapi.

- Allows you to replace default Strapi WYSIWYG editor with a MdxEditor.

![blog](editor.png)

## MdxEditor:
`Home`
https://mdxeditor.dev/

`Live demo`
https://mdxeditor.dev/editor/demo

## Features:
- [x] Rich text editor
- [x] Markdown editor
- [x] Live preview
- [x] Customizable
- [x] Keyboard shortcuts
- [x] Plugins `editor.plugins.jsx`
- [x] Media library (now supports only images)
- [x] Themes
- [x] Extensions
- [x] Supports STRAPI media library

## Todo

- [x] Youtube & Vimeo embed video

## Setup:
1. Install the plugin
```bash
mkdir -pv ./src/plugins/wysiwyg
cd !$
git clone git@github.com:floatrx/strapi-wysiwyg-mdxeditor-plugin.git
```

2. Add the following code to `config/plugins.js`
```javascript
export default ({ env }) => ({
  // ...
  wysiwyg: {
    enabled: true,
    resolve: './src/plugins/wysiwyg',
  },
});
```

3. Update `strapi::security` in `config/middlewares.js`
```javascript
export default ({ env }) => {
  return [
    'strapi::logger',
    'strapi::errors',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'script-src': ["'self'", "'unsafe-eval'"],
            'frame-src': ['youtube.com', 'www.youtube.com', 'vimeo.com', '*.vimeo.com'],
          }
        }
      }
    }
    // ... other middlewares
  ];
};
```

## Render markdown on client

`React-markdown` + `Tailwind CSS` + `TW Typography (prose)`

### Example (React-markdown):

```typescript jsx
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

export type RichTextProps = {
  content?: string;
  className?: string;
};

/**
 * Shared.RichText
 * Supports markdown, gfm, raw html
 *
 * @relation StrapiSharedRichText
 * @param content
 * @param className
 * @constructor
 */
export const RichText = ({ content, className }: RichTextProps) => {
  if (!content) return null;

  return (
    <Markdown className={className} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {content}
    </Markdown>
  );
};
```

### React-markdown also supports rendering custom components.:

```typescript jsx
import Markdown from 'react-markdown';
import { Link } from './Link'; // your custom link component
import { Button } from './Button'; // custom button

const customComponents = {
  a: ({ node, className, ...props }) => {
    const isExternalLink = !!props?.href?.match(/^http/im) || 'blank' in props;
    return (
      <Link
        className={cn(className, 'link')}
        target={isExternalLink ? '_blank' : '_self'}
        rel={isExternalLink ? 'noopener nofollow' : 'follow'}
        {...props}
      />
    );
  },
  button: ({ node, ...props }) => <Button {...props} />,
};

export const RichText = (props: RichTextProps) => {
  if (!content) return null;

  return (
    <Markdown components={customComponents} {...props}>
      {content}
    </Markdown>
  );
};
```

Boilerplate generated by `strapi generate:plugin`.

> [!NOTE]
>
> Thanks to MDXEditor for the great work.
> 
> 👋 Regards, floatrx!

