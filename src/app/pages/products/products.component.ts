import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, ProductResponse, Review } from '../../services/product.service';

interface Product extends ProductResponse {
    imageUrl: string;
}

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    products: Product[] = [];
    filteredProducts: Product[] = [];

    // Search and Filter controls
    searchTerm = '';
    selectedCategory = 'All';
    maxPrice = 50000;

    categories = ['All', 'Electronics', 'Fashion', 'Footwear', 'Food'];

    // Quick View Modal
    selectedProduct: Product | null = null;
    isModalOpen = false;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts() {
        this.productService.getAllProducts().subscribe({
            next: (data) => {
                this.products = data.map(item => ({
                    ...item,
                    imageUrl: item.imageUrl || this.getImageByCategory(item.category)
                }));
                this.filterProducts();
            },
            error: (error) => {
                console.error('Error fetching products:', error);
                // Fallback for demo purposes if backend isn't running
                this.loadMockData();
            }
        });
    }

    loadMockData() {
        // Keep mock data as fallback in case backend is down during development
        const mockProducts = [
            {
                id: 1,
                name: 'Premium Smartwatch',
                price: 24999,
                description: 'Advanced health tracking, GPS, and 7-day battery life. The ultimate companion for your active lifestyle.',
                category: 'Electronics',
                subCategory: 'Wearables',
                brand: 'TechPro',
                stockQuantity: 15,
                reviews: [
                    { id: 101, userId: 1, userName: 'John D.', rating: 5, comment: 'Amazing battery life!', date: '2023-12-01' }
                ],
                imageUrl: 'images/product-watch.png'
            },
            {
                id: 2,
                name: 'Wireless Headphones',
                price: 12999,
                description: 'Active noise cancellation and studio-quality sound.',
                category: 'Electronics',
                subCategory: 'Audio',
                brand: 'SoundMax',
                stockQuantity: 42,
                reviews: [],
                imageUrl: 'images/electronics.png'
            },
            {
                id: 3,
                name: 'Designer Hoodie',
                price: 8999,
                description: '100% organic cotton with a relaxed fit.',
                category: 'Fashion',
                subCategory: 'Apparel',
                brand: 'UrbanStyle',
                stockQuantity: 100,
                reviews: [],
                imageUrl: 'images/fashion.png'
            },
            {
                id: 4,
                name: 'Gourmet Food Basket',
                price: 3499,
                description: 'A curated selection of fine cheeses and chocolates.',
                category: 'Food',
                subCategory: 'Gift Sets',
                brand: 'Delish',
                stockQuantity: 20,
                reviews: [],
                imageUrl: 'images/food.png'
            }
        ];
        this.products = mockProducts;
        this.filterProducts();
    }

    filterProducts() {
        this.filteredProducts = this.products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                product.brand.toLowerCase().includes(this.searchTerm.toLowerCase());

            const categoryName = (typeof product.category === 'string' ? product.category : (product.category as any)?.name || '');
            const matchesCategory = this.selectedCategory === 'All' || categoryName === this.selectedCategory;

            const matchesPrice = product.price <= this.maxPrice;

            return matchesSearch && matchesCategory && matchesPrice;
        });
    }

    getImageByCategory(category: any): string {
        const catName = (typeof category === 'string' ? category : category?.name || '').toLowerCase();

        if (catName.includes('electronic')) return 'images/electronics.png';
        if (catName.includes('fashion') || catName.includes('cloth')) return 'images/fashion.png';
        if (catName.includes('foot') || catName.includes('shoe')) return 'images/footwear.png';
        if (catName.includes('food')) return 'images/food.png';
        if (catName.includes('watch')) return 'images/product-watch.png';

        return 'images/electronics.png';
    }

    openProductDetails(product: Product) {
        this.selectedProduct = product;
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
        this.selectedProduct = null;
    }

    getRatingStars(rating: number): string {
        return '⭐'.repeat(Math.round(rating));
    }

    getAverageRating(reviews: Review[]): number {
        if (!reviews || !reviews.length) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return sum / reviews.length;
    }
}
