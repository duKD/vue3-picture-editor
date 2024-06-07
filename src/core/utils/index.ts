import { SelectMode } from "../type";

export const callWithErrorHandling = (fn: Function, ...args: unknown[]) => {
  try {
    fn(...(args ?? []));
  } catch (err) {
    console.error(err);
  }
};

export function generateUUIDBasedOnTime(): string {
  const timeLow = (
    (Date.now() & 0xffffffff) * 10000 +
    Math.floor(Math.random() * 10000)
  ).toString(16);
  const timeMid = ((Math.random() * 0xffff) | 0).toString(16).padStart(4, "0");
  const timeHiAndVersion = (
    (((Math.random() * 0x0fff) | 0) & 0x0fff) |
    0x4000
  ).toString(16);
  const clockSeqHiAndReserved = (
    (((Math.random() * 0x3f) | 0) & 0x3f) |
    0x80
  ).toString(16);
  const clockSeqLow = Math.random().toString(16).substring(2, 4);
  const node = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 0x10000).toString(16)
  ).join("");

  return `${timeLow}-${timeMid}-${timeHiAndVersion}-${clockSeqHiAndReserved}${clockSeqLow}-${node}`;
}

export const isTextType = (type: string) =>
  ["i-text", "textbox", "text"].includes(type);

export const isImageType = (type: string) => ["image"].includes(type);

export const isGroupType = (type: string) => ["group"].includes(type);

export const isMultipleType = (type: string) => SelectMode.MULTI === type;

export function downFile(fileStr: string, fileType: string) {
  const anchorEl = document.createElement("a");
  anchorEl.href = fileStr;
  anchorEl.download = `${generateUUIDBasedOnTime()}.${fileType}`;
  document.body.appendChild(anchorEl); // required for firefox
  anchorEl.click();
  anchorEl.remove();
}
