// Shared blur placeholder used across Next/Image usages.
// Tiny base64 PNG (6x6) colored in the brand cream (#EFE9DC). Browsers scale it
// up and blur it, so a single constant covers every product/theme thumbnail.
// Swapping the PNG here updates the whole catalog's loading look.

export const CREAM_BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAI0lEQVR42mP8//8/AyUYi4GBgYGBgYEBIhhHAxg1gSEMAAD1wAWgwuY1xwAAAABJRU5ErkJggg==";

export const WARM_BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAIElEQVR42mP8//8/AyUYi4GBgYGBgYEBIhhHAxhNYAgDABq6AxugH6j4AAAAAElFTkSuQmCC";
