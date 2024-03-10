/**
 * Detect the current Strapi admin theme (light or dark)
 * This function also adds the theme class to the body
 * that required for the editor dark theme
 */
import { LIGHT_THEME_BACKGROUND_COLOR } from '../config';

export const getStrapiTheme = () => {
  if (typeof window !== 'undefined') {
    const bgColor = window.getComputedStyle(document.body).backgroundColor;

    // Detect the theme based on the default STRAPI admin background color
    const theme = bgColor === LIGHT_THEME_BACKGROUND_COLOR ? 'light' : 'dark';

    // [Important!] Add the theme class to the body
    document.body.classList.add(theme);

    return theme;
  }
  return 'unknown';
};
