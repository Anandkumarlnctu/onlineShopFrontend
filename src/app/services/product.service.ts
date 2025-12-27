import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Review {
    id: number;
    userId: number;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

export interface ProductResponse {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string; // Assuming string for now, might be object
    subCategory: string;
    brand: string;
    stockQuantity: number;
    reviews: Review[];
    imageUrl?: string; // Optional as it wasn't in the user's snippet
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private baseUrl = 'http://localhost:8083/api/products';

    constructor(private http: HttpClient) { }

    getAllProducts(): Observable<ProductResponse[]> {
        return this.http.get<ProductResponse[]>(`${this.baseUrl}/getall`);
    }
}
