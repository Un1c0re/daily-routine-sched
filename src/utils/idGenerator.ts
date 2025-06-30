import { customAlphabet } from 'nanoid';

const nanoidNumeric = customAlphabet('1234567890', 15);

export const generateId = (): number => {
    return Number(nanoidNumeric());
};
