export interface Category {
    id: number;
    name: string;
    slug: string;
    is_cluster: boolean;
    explain: string;
    type: boolean;
    image: string;
    parents_id: Array<number>;
    childs_id: Array<number>;
    units_id: Array<number>;
    deep: number;
    position: number;
    is_active: boolean;
    units: Array<number>;
    related: {
        categories: Array<number>,
        services: Array<number>,
        materials: Array<number>
    };
}
