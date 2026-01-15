//constant:
export const WORDS = [
  "PRODUCT PHOTOGRAPHY",
  "ARSIPAN",
  "BERSATU",
  "BP TAPERA",
  "DIGITAL MENTAL COACH",
  "GATI",
  "STOVINED MEDIA",
  "USS",
] as const;

//array utils to get prev & next index
export function getPrevIndex(currentIndex: number, arrayLength: number): number {
  return currentIndex === 0 ? arrayLength - 1 : currentIndex - 1;
}

export function getNextIndex(currentIndex: number, arrayLength: number): number {
  return currentIndex === arrayLength - 1 ? 0 : currentIndex + 1;
}