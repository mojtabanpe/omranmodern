export interface Material {
    id: number;
    name: string;
    slug: string;
    explain: string;
    categoris_id: Array<number>;
    images: string;
    unit_id: number;
    brand_id: number;
    type: string;
    status: string;
    user_id: number;
    variables: Array<string>;
    attributes: Array<any>;
    category_attributes: Array<number>;
}
