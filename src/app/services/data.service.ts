import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryModel} from "../components/models/category.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://192.168.18.15:8282/categories'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) { }

  getData(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.apiUrl);
  }
}
