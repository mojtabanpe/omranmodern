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
  baseUrl = environment.serverUrl;
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
  getMaterial(materialId): any {
    return this.http.get(this.baseUrl + 'dokkoon/material_one/' + materialId);
  }
  getMotherMaterial(materialId): any {
    return this.http.get(this.baseUrl + 'dokkoon/mother_material_one/' + materialId);
  }
  deleteMaterial(materialId): any {
    return this.http.delete(this.baseUrl + 'dokkoon/material_one/' + materialId);
  }
  deleteMotherMaterial(materialId): any {
    return this.http.delete(this.baseUrl + 'dokkoon/mother_material_one/' + materialId);
  }
  updateMaterial(materialId, material): any {
    return this.http.put(this.baseUrl + 'dokkoon/material_one/' + materialId, material);
  }
  changeSellerProductStatus(type, id, status): any {
    return this.http.get(this.baseUrl + 'dokkoon/change_seller_product_status/' + type + '/' + id + '/' + status);
  }
  changeSellerProductStatusOfMother(type, id, status): any {
    return this.http.get(this.baseUrl + 'dokkoon/change_seller_product_status_of_mother/' + type + '/' + id + '/' + status);
  }
  updateMotherMaterial(materialId, material): any {
    return this.http.put(this.baseUrl + 'dokkoon/mother_material_one/' + materialId, material);
  }
  getMaterials(): any {
    return this.http.get(this.baseUrl + 'dokkoon/materials');
  }
  getMaterialsByStatus(status: string): any {
    return this.http.get(this.baseUrl + 'dokkoon/materials_by_status/' + status);
  }
  getMaterialsByMother(motherId: number): any {
    return this.http.get(this.baseUrl + 'dokkoon/materials_by_mother/' + motherId);
  }
  getSellersOfMaterial(materialId): any {
    return this.http.get(this.baseUrl + 'dokkoon/sellers-of-material/' + materialId);
  }
  getMotherMaterialsByStatus(status: string): any {
    return this.http.get(this.baseUrl + 'dokkoon/mother_materials_by_status/' + status);
  }
  createMotherMaterial(motherMaterial: MotherMaterial): any {
    return this.http.post(this.baseUrl + 'dokkoon/mother_materials', motherMaterial);
  }
  changeChildNameInMothers(productId, type): any {
    return this.http.get(this.baseUrl + 'dokkoon/change_child_name_in_mothers/' + productId + '/' + type);
  }
  changeMotherNameInChilds(productId, type): any {
    return this.http.get(this.baseUrl + 'dokkoon/change_mother_name_in_childs/' + productId + '/' + type);
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
  getMotherService(serviceId): any {
    return this.http.get(this.baseUrl + 'dokkoon/mother_service_one/' + serviceId);
  }
  deleteService(serviceId): any {
    return this.http.delete(this.baseUrl + 'dokkoon/service_one/' + serviceId);
  }
  deleteMotherService(serviceId): any {
    return this.http.delete(this.baseUrl + 'dokkoon/mother_service_one/' + serviceId);
  }
  updateService(serviceId, service): any {
    return this.http.put(this.baseUrl + 'dokkoon/service_one/' + serviceId, service);
  }
  updateMotherService(serviceId, service): any {
    return this.http.put(this.baseUrl + 'dokkoon/mother_service_one/' + serviceId, service);
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

  deleteCategory(id: number): any {
    return this.http.delete(this.baseUrl + 'dokkoon/category_one/' + id);
  }

  getTopDeepCategories(deep: number): any {
    return this.http.get(this.baseUrl + 'dokkoon/top_deep_categories/' + deep);
  }
  GetCagtegoriesByDeep(deep: number): any {
    return this.http.get(this.baseUrl + 'dokkoon/deep_categories/' + deep);
  }
  GetChildCagtegories(categoryId: number): any {
    return this.http.get(this.baseUrl + 'dokkoon/child_categories/' + categoryId);
  }
  getCategoriesSelect(): any {
    return this.http.get(this.baseUrl + 'dokkoon/categories_select/');
  }
  getRelatedCategoriesSelect(categoryId: number): any {
    return this.http.get(this.baseUrl + 'dokkoon/related_categories_select/' + categoryId);
  }

  UpdateParentsWithThisChild(parents: any, categoryId: number): any {
    return this.http.post(this.baseUrl + 'dokkoon/update_parents_childs/' + categoryId, parents);
  }

  changeProductsCategoryName(clusterId): any {
    return this.http.get(this.baseUrl + 'dokkoon/change_products_category_name/' + clusterId);
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
    return this.http.put(this.baseUrl + 'dokkoon/category_attribute_one/' + attribute.id, attribute);
  }
  deleteAttribute(attributeId: number): any {
    return this.http.delete(this.baseUrl + 'dokkoon/category_attribute_one/' + attributeId);
  }
  getCategoryParentsByIDs(categoryId): any{
    return this.http.get(this.baseUrl + 'dokkoon/parent_categories/' + categoryId);
  }
  getClusters(type): any {
    return this.http.get(this.baseUrl + 'dokkoon/cluster_categories/' + type);
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

  createPermutationChilds(data): any {
    return this.http.post(this.baseUrl + 'dokkoon/create_permutation_childs', data);
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
  getAllAreas(): any {
    return this.http.get(this.baseUrl + 'dokkoon/get_areas');
  }
  createSeller(seller: Seller): any {
    return this.http.post(this.baseUrl + 'dokkoon/sellers', seller);
  }
  getSeller(id): any {
    return this.http.get(this.baseUrl + 'dokkoon/seller_one/' + id);
  }
  updateSeller(seller: any, id): any {
    return this.http.put(this.baseUrl + 'dokkoon/seller_one/' + id, seller);
  }
  deleteSeller(id): any {
    return this.http.delete(this.baseUrl + 'dokkoon/seller_one/' + id);
  }
  getNewestSellers(): any {
    return this.http.get(this.baseUrl + 'dokkoon/newest_sellers');
  }
  updateSellerMaterial(sellerMaterial, sellerMaterialId): any {
    return this.http.put(this.baseUrl + 'dokkoon/seller_material_one/' + sellerMaterialId , sellerMaterial);
  }
  updateSellerService(sellerService, sellerServiceId): any {
    return this.http.put(this.baseUrl + 'dokkoon/seller_service_one/' + sellerServiceId , sellerService);
  }
  getSellerServiceAttributes(motherServiceId): any {
    return this.http.get(this.baseUrl + 'dokkoon/seller_service_attributes/' + motherServiceId);
  }
  addServicesToSeller(services): any {
    return this.http.post(this.baseUrl + 'dokkoon/seller_services', services);
  }
  getSellerMaterialAttributes(motherMaterialId): any {
    return this.http.get(this.baseUrl + 'dokkoon/seller_material_attributes/' + motherMaterialId);
  }
  createSellerMaterials(materials): any {
    return this.http.post(this.baseUrl + 'dokkoon/seller_materials' , materials);
  }

  // tslint:disable-next-line: variable-name
  changeStatusSellerProducts(seller_id: number, status): any {
    return this.http.get(this.baseUrl + 'dokkoon/change_status_seller_products/' + seller_id + '/' + status);
  }

  editUserProfile(profile, id): any {
    return this.http.put(this.baseUrl + 'dokkoon/user_profile_one/' + id , profile);
  }
  getUsers(): any {
    return this.http.get(this.baseUrl + 'dokkoon/user_profiles');
  }

  createUser(user): any {
    return this.http.post(this.baseUrl + 'dokkoon/user_profiles' , user);
  }

  getComments(): any {
    return this.http.get(this.baseUrl + 'dokkoon/unapproved_comments');
  }
  deleteComment(id): any {
    return this.http.delete(this.baseUrl + 'dokkoon/unapproved_comment_one/' + id);
  }
  approveComment(comment): any {
    return this.http.post(this.baseUrl + 'dokkoon/approve_comment', comment);
  }

  arrangeMenu(): any {
    return this.http.get(this.baseUrl + 'dokkoon/arrange_menu');
  }

}
