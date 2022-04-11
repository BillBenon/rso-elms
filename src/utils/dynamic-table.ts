export type DynamicColumns = {
    headerClassNames: string[]
}
export const getDynamicColumns = (num: number) => {
    const obj: DynamicColumns = { 
        headerClassNames: ['col-span-3', 'col-span-3', 'col-span-4']
    }
}