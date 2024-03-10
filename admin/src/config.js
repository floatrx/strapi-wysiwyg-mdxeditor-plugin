/**
 * Detect the current Strapi admin theme (light or dark)
 * This function also adds the theme class to the body
 * that required for the editor dark theme
 */

// This value can be changed to match the default STRAPI admin background color
export const LIGHT_THEME_BACKGROUND_COLOR = 'rgb(246, 246, 249)';

export const wysiwygConfig = {
  enableMenu: true,
  // MdxEditor syntax highlighting languages
  mdxCodeBlockLanguages: [
    '', // empty string means default language -> don't remove this
    'javascript',
    'typescript',
    'jsx',
    'tsx',
    'html',
    'css',
    'scss',
    'json',
    'yaml',
    'shell',
    'markdown',
  ],
};
