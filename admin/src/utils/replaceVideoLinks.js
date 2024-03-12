export function replaceVideoLinks(link) {
  // Regular expression to match YouTube video links
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)([a-zA-Z0-9_-]{11}))(?:&[^ ]+)?/g;

  // Regular expression to match Vimeo video links
  const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/g;

  // Replace YouTube video links with embedded links
  link = link.replace(youtubeRegex, 'https://www.youtube.com/embed/$1');

  // Replace Vimeo video links with embedded links
  link = link.replace(vimeoRegex, 'https://player.vimeo.com/video/$1?color=000000&byline=0&portrait=0');

  return link;
}
