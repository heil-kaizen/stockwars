/**
 * Executes a secure clipboard write operation.
 * Utilizing the modern navigator API ensures proper permission handling in modern browsers.
 */
export const execute_clipboard_copy = async (text_payload: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text_payload);
    return true;
  } catch (error) {
    console.error("Clipboard write operation failed. Ensure context is secure (HTTPS).", error);
    return false;
  }
};
