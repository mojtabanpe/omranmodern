import { Seller } from './../interfaces/seller';
import { Service, MotherService } from './../interfaces/service';
import { Material, MotherMaterial } from './../interfaces/material';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, tap, last, catchError} from 'rxjs/operators';
import { stat } from 'fs';


@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  baseUrl = environment.apiUrl;
  category;
  constructor(private http: HttpClient) { }

  uploadImage(image): any {
    return this.http.post(this.baseUrl + 'upload/', image, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getEventMessage(event)));
  }
  private getEventMessage(event: HttpEvent<any>): any {
    if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        return {
          mode: 'progress',
          percent: percentDone
        };
    } else if (event.type === HttpEventType.Sent) {
      return {
        mode: 'init',
      };
    }
   else if (event.type === HttpEventType.Response) {
    return {
      mode: 'finish',
      message: event.body
    };
  }
}

  createMaterial(material: Material): any {
    return this.http.post(this.baseUrl + 'dokkoon/materials', material);
  }
  getMaterials(): any {
    return this.http.get(this.baseUrl + 'dokkoon/materials');
  }
  getMaterialsByStatus(status: string): any {
    return this.http.get(this.baseUrl + 'dokkoon/materials_by_status/' + status);
  }
  getMotherMaterialsByStatus(status: string): any {
    return this.http.get(this.baseUrl + 'dokkoon/mother_materials_by_status/' + status);
  }
  createMotherMaterial(motherMaterial: MotherMaterial): any {
    return this.http.post(this.baseUrl + 'dokkoon/mother_materials', motherMaterial);
  }

  createService(service: Service): any {
    return this.http.post(this.baseUrl + 'dokkoon/services', service);
  }
  getService(serviceId): any {
    return this.http.get(this.baseUrl + 'dokkoon/service_one/' + serviceId);
  }
  getServices(): any {
    return this.http.get(this.baseUrl + 'dokkoon/services');
  }
  getServicesByStatus(status: string): any {
    return this.http.get(this.baseUrl + 'dokkoon/services_by_status/' + status);
  }
  getMotherServicesByStatus(status: string): any {
    return this.http.get(this.baseUrl + 'dokkoon/mother_services_by_status/' + status);
  }
  createMotherService(motherService: MotherService): any {
    return this.http.post(this.baseUrl + 'dokkoon/mother_services', motherService);
  }
  createCategory(category: any): any {
    return this.http.post(this.baseUrl + 'dokkoon/categories', category);
  }

  updateCategory(category: any, groupId): any {
    return this.http.put(this.baseUrl + 'dokkoon/category_one/' + groupId , category);
  }

  getCategory(id: number): any {
    return this.http.get(this.baseUrl + 'dokkoon/category_one/' + id);
  }
  getTopDeepCategories(deep: number): any {
    return this.http.get(this.baseUrl + 'dokkoon/top_deep_categories/' + deep);
  }
  GetCagtegoriesByDeep(deep: number): any {
    return this.http.get(this.baseUrl + 'dokkoon/partial_categories/' + deep);
  }
  GetChildCagtegories(categoryId: number): any {
    return this.http.get(this.baseUrl + 'dokkoon/child_categories/' + categoryId);
  }

  UpdateParentsWithThisChild(parents: any, categoryId: number): any {
    return this.http.post(this.baseUrl + 'dokkoon/update_parents_childs/' + categoryId, parents);
  }

  changeCategoryActivity(id: number): any {
    return this.http.get(this.baseUrl + 'dokkoon/change_categoriy_activity/' + id);
  }
  changeCategoryPosition(id: number, position: number): any {
    return this.http.get(this.baseUrl + 'dokkoon/change_categoriy_position/' + id + '/' + position);
  }
  createCategoryAttribute(attribute: any): any {
    return this.http.post(this.baseUrl + 'dokkoon/category_attributes', attribute);
  }
  getCategoryAttributes(categoryId: number): any {
    return this.http.get(this.baseUrl + 'dokkoon/attributes/' + categoryId);
  }

  updateAttribute(attribute): any {
    return this.http.put(this.baseUrl + 'dokkoon/category-attribute_one/' + attribute.id, attribute);
  }
  deleteAttribute(attributeId: number): any {
    return this.http.delete(this.baseUrl + 'dokkoon/category-attribute_one/' + attributeId);
  }
  getCategoryParentsByIDs(categoryId): any{
    return this.http.get(this.baseUrl + 'dokkoon/parent_categories/' + categoryId);
  }
  getClusters(): any {
    return this.http.get(this.baseUrl + 'dokkoon/cluster_categories/');
  }
  getUnitsOfCategory(categoryId): any {
    return this.http.get(this.baseUrl + 'dokkoon/category_units/' + categoryId);
  }



  getMotherMaterials(clusterId): any {
    return this.http.get(this.baseUrl + 'dokkoon/mother_materials_by_cluster/' + clusterId);
  }
  getAttributesForMaterial(clusterId): any {
    return this.http.get(this.baseUrl + 'dokkoon/material_attributes/' + clusterId);
  }

  getMotherServices(clusterId): any {
    return this.http.get(this.baseUrl + 'dokkoon/mother_services_by_cluster/' + clusterId);
  }
  getServicesByMother(motherId: number): any {
    return this.http.get(this.baseUrl + 'dokkoon/services_by_mother/' + motherId);
  }
  getAttributesForService(clusterId): any {
    return this.http.get(this.baseUrl + 'dokkoon/service_attributes/' + clusterId);
  }
  createBrand(brand): any {
    return this.http.post(this.baseUrl + 'dokkoon/brands', brand);
  }
  getAllBrands(): any {
    return this.http.get(this.baseUrl + 'dokkoon/brands');
  }
  getAllUnits(): any {
    return this.http.get(this.baseUrl + 'dokkoon/units');
  }
  createUnit(brand): any {
    return this.http.post(this.baseUrl + 'dokkoon/units', brand);
  }
  getAllCoverages(): any {
    return this.http.get(this.baseUrl + 'dokkoon/get_coverages');
  }
  createSeller(seller: Seller): any {
    return this.http.post(this.baseUrl + 'dokkoon/sellers', seller);
  }
  updateSeller(seller: Seller, id): any {
    return this.http.put(this.baseUrl + 'dokkoon/seller_one/' + id, seller);
  }
  getNewestSellers(): any {
    return this.http.get(this.baseUrl + 'dokkoon/newest_sellers');
  }
  updateSellerMaterialPriceAndStatus(seller, sellerId): any {
    return this.http.put(this.baseUrl + 'dokkoon/update-seller-material-price-and-status/' + sellerId , seller);
  }
  updateSellerServicePriceAndStatus(seller, sellerId): any {
    return this.http.put(this.baseUrl + 'dokkoon/update-seller-service-price-and-status/' + sellerId , seller);
  }
  getSellerServiceAttributes(motherServiceId): any {
    return this.http.get(this.baseUrl + 'dokkoon/seller_service_attributes/' + motherServiceId);
  }
  addServicesToSeller(services, sellerId): any {
    return this.http.post(this.baseUrl + 'dokkoon/add_services_to_seller/' + sellerId, services);
  }
}
