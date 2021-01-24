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
    status: string;
    is_suggested: false;
    user_id: number;
    attributes: Array<Attribute>;
    seller_attributes: Array<number>;
}

export interface MotherMaterial {
    id: number;
    name: string;
    explain: string;
    category: any;
    childs: Array<any>;
    images: Array<string>;
    status: string;
    user_id: number;
    attributes: Array<Attribute>;
    seller_attributes: Array<number>;
}

export interface SellerMaterial {
    material: {
        id: number;
        name: string;
        image: string;
        status: boolean
    };
    min_orderable: number;
    max_orderable: number;
    wholesale_threshold: number;
    stack: boolean;
    prices: Array<any>;
    supply_time: number;
    sell_types: Array<string>;
    condition: boolean;
    is_suggested: boolean;
    disscounts: Array<any>;
    attributes: Array<any>;
}

