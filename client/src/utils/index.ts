export const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

export const calculateSum = (numbers: number[]): number => {
    return numbers.reduce((acc, curr) => acc + curr, 0);
};

export const generateRandomId = (): string => {
    return Math.random().toString(36).substr(2, 9);
};