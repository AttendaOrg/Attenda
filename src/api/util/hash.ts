import { sha256 } from 'js-sha256';

export const hashMacId = (classId: string, macId: string): string => {
  return sha256(classId + macId);
};

export default {
  hashMacId,
};
