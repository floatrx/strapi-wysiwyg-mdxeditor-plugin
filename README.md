# Strapi plugin wysiwyg
This plugin is a WYSIWYG editor for Strapi. It uses the `@tiptap` editor and `@tiptap/starter-kit` to provide a rich text editor for Strapi.

Allows you to replace default Strapi WYSIWYG editor with a MdxEditor.

Plugin boilerplate generated by `strapi generate:plugin wysiwyg`.

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

- [ ] Youtube embed video

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
          }
        }
      }
    }
    // ... other middlewares
  ];
};
```

### How to render markdown on client

See examples [markdown.md](./markdown.md)

> [!NOTE]
> 
> Thank to MDXEditor for the great work.
> 
> 👋 Regards, floatrx!

