import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, tap, last, catchError} from 'rxjs/operators';


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
  createCategory(category: any): any {
    return this.http.post(this.baseUrl + 'dokkoon/categories', category);
  }

  getCategory(id: number): any {
    return this.http.get(this.baseUrl + 'dokkoon/category_one/' + id);
  }
}
