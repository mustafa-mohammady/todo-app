// Tailwind classes used by more than one component.
// Always write full class names here: Tailwind can't find classes that are built from pieces.

// Popups (EditTodoModal, DeleteTodoModal)
export const MODAL_WRAPPER =
  "fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center";
export const MODAL_BACKDROP =
  "absolute inset-0 bg-slate-900/50 backdrop-blur-sm";
export const MODAL_PANEL =
  "relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200";
export const MODAL_TITLE = "text-lg font-semibold text-slate-900";
export const MODAL_ACTIONS =
  "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end";

// Buttons with text. Add a background color, e.g. `${BTN} bg-red-600 hover:bg-red-700`.
export const BTN =
  "h-10 cursor-pointer rounded-lg px-4 text-sm font-medium text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";
// White button with a grey border, used for Cancel.
export const BTN_SECONDARY =
  "h-10 cursor-pointer rounded-lg px-4 text-sm font-medium text-slate-600 ring-1 ring-slate-200 transition-colors hover:bg-slate-50";

// Square buttons with only an icon. Add the text and hover colors.
export const ICON_BTN =
  "inline-flex size-10 cursor-pointer items-center justify-center rounded-lg transition-colors";

// Text inputs. Add a width, padding, and INPUT_NORMAL or INPUT_ERROR.
export const INPUT =
  "h-10 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2";
export const INPUT_NORMAL =
  "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20";
export const INPUT_ERROR =
  "border-red-600 focus:border-red-600 focus:ring-red-500/20";
