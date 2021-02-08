import { Service, SellerService } from './service';
import { Address } from './address';
import { Material, SellerMaterial } from './material';

export interface Seller {
    id: number;
    name: string;
    explain: string;
    status: boolean;
    stars: {};
    type: string;
    image: string;
    provider_type: string;
    phones: Array<any>;
    site: string;
    addresses: Array<Address>;
    working_time: any;
    work_samples: Array<any>;
    coverages: Array<any>;
    materials_list: Array<SellerMaterial>;
    services_list: Array<SellerService>;
}