import { sha256 } from 'js-sha256';

export const hashMacId = (classId: string, macId: string): string => {
  console.log(`hash ${classId} ${macId} = ${sha256(classId + macId)}`);
  // TODO: re add the original hash this is for debugging

  return macId.toUpperCase();
};

export default {
  hashMacId,
};
