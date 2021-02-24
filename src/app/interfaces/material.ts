import { Attribute } from './attribute';
export interface Material {
    id: number;
    name: string;
    explain: string;
    category: any;
    mothers: Array<any>;
    sellers: Array<any>;
    images: Array<string>;
    stars: any;
    brand_id: number;
    quality: string;
    status: boolean;
    is_suggested: false;
    user_id: number;
    attributes: Array<Attribute>;
    seller_attributes: Array<number>;
}

export interface MotherMaterial {
    id: number;
    name: string;
    slug?: string;
    explain: string;
    category: any;
    images: any;
    status: boolean;
    user_id: number;
    attributes: Array<Attribute>;
    seller_attributes: Array<number>;
    materials_list: Array<any>;
    comments: Array<any>;
}

export interface SellerMaterial {
    material_id: number;
    seller_id: number;
    min_orderable: number;
    max_orderable: number;
    wholesale_threshold: number;
    stack: boolean;
    status: boolean;
    prices: Array<any>;
    supply_time: number;
    sell_types: Array<string>;
    condition: boolean;
    is_suggested: boolean;
    disscounts: Array<any>;
    attributes: Array<any>;
    read_only: boolean;
}

