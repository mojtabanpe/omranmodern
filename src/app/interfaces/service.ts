import { Attribute } from './attribute';
export interface Service {
    id: number;
    name: string;
    explain: string;
    category: any;
    mothers: Array<any>;
    sellers: Array<any>;
    images: Array<string>;
    brand_id: number;
    status: boolean;
    user_id: number;
    attributes: Array<Attribute>;
    seller_attributes: Array<number>;
}

export interface MotherService {
    id: number;
    name: string;
    explain: string;
    category: any;
    images: Array<string>;
    status: boolean;
    user_id: number;
    attributes: Array<Attribute>;
    seller_attributes: Array<number>;
    services_list: Array<any>;
    comments: Array<any>;
}

export interface SellerService {
    service_id: number;
    seller_id: number;
    min_orderable: number;
    max_orderable: number;
    wholesale_threshold: number;
    status: boolean;
    prices: Array<any>;
    supply_time: number;
    stars: any;
    sell_types: Array<string>;
    qualities: Array<string>;
    condition: boolean;
    is_suggested: boolean;
    disscounts: Array<any>;
    attributes: Array<any>;
    read_only: boolean;
}
