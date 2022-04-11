export type DynamicColumns = {
    headerClassNames: string[];
    subHeaderClassNames: string[];
    markHeaderClassNames: string[];
    dataClassNames: string[];
};


export const getDynamicColumns = (num: number): DynamicColumns => {
    if (num === 3) {
        return <DynamicColumns>{
            headerClassNames: populate('col-span-3', 3),
            subHeaderClassNames: populate('grid grid-cols-3', 3),
            markHeaderClassNames: populate('col-span-3 grid grid-cols-6', 3),
            dataClassNames: populate('col-span-3 grid grid-cols-6', 3)
        };
    }
    return <DynamicColumns>{};
}


const populate = (filler: string, n: number): string[] => {
    return Array(n).fill(filler);
}