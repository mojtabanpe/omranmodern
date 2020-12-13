export interface Category {
    id: number,
    name: string,
    slug: string,
    explain: string,
    type: boolean,
    images: Array<string>,
    childs_id: Array<number>,
    deep: number,
    position: number,
    is_active: boolean,
    units: Array<number>,
    related: {
        categories: Array<number>,
        services: Array<number>,
        materials: Array<number>
    }
}