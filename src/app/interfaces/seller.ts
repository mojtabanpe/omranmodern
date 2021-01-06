import { Service, SellerService } from './service';
import { Address } from './address';
import { Material, SellerMaterial } from './material';

export interface Seller {
    id: number;
    name: string;
    explain: string;
    status: string;
    stars: {};
    type: string;
    image: string;
    provider_type: string;
    phones: Array<any>;
    site: string;
    addresses: Array<Address>;
    working_time: any;
    coverages: Array<any>;
    materials: Array<SellerMaterial>;
    services: Array<SellerService>;
}