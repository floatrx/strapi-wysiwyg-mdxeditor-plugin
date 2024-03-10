# Render markdown on client

### Example:

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

## React-markdown also supports handling render custom components:

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
