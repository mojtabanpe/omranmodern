import { Attribute } from './attribute';
export interface Material {
    id: number;
    name: string;
    explain: string;
    category: any;
    mothers: Array<any>;
    sellers: Array<any>;
    images: Array<string>;
    brand_id: number;
    quality: string;
    status: string;
    user_id: number;
    variables: Array<string>;
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
