import { apiGet } from '@/shared/api/client';

import { eventDetails } from './mock';

import type { DashboardData, EventDetails, MedicineRow } from './types';

type DummyJsonProduct = {
    id: number;
    title: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
    discountPercentage: number;
    brand?: string;
};

type DummyJsonProductsResponse = {
    products: DummyJsonProduct[];
    total: number;
    skip: number;
    limit: number;
};

const locations = [
    'Serenity Health Clinic',
    'Vitality Medical Center',
    'Oasis Medical Institute',
    'Summit Health Institute',
    'Prosperity Medical Practice',
    'Harmony Healthcare Group',
];

const startDates = [
    'Dec 12, 2018',
    'Jan 9, 2019',
    'Sep 4, 2019',
    'Nov 1, 2019',
    'Dec 28, 2019',
    'Feb 12, 2019',
];

const endDates = [
    'Dec 12, 2026',
    'Dec 9, 2022',
    'Dec 4, 2021',
    'Dec 1, 2024',
    'Nov 28, 2021',
    'Nov 30, 2022',
];

function delay<TData>(data: TData): Promise<TData> {
    return new Promise((resolve) => {
        window.setTimeout(() => resolve(data), 300);
    });
}

async function getProducts(): Promise<DummyJsonProduct[]> {
    const data = await apiGet<DummyJsonProductsResponse>('/products?limit=30');

    return data.products;
}

function mapProductToMedicine(product: DummyJsonProduct, index: number): MedicineRow {
    const processTotal = Math.max(product.stock + 120, 140);
    const processCurrent = Math.min(
        processTotal,
        Math.round((product.rating / 5) * processTotal),
    );

    return {
        id: product.id,
        name: `${product.category.includes('vehicle') ? 'Vaccine' : 'Medicine'} #${product.id}`,
        location: locations[index % locations.length],
        startDate: startDates[index % startDates.length],
        endDate: endDates[index % endDates.length],
        successReaction: product.rating >= 4.4,
        processCurrent,
        processTotal,
        status: {
            blue: Math.round(product.rating * 8),
            red: Math.round(product.discountPercentage),
            orange: Math.round(product.price % 20),
            green: Math.max(10, 100 - Math.round(product.rating * 8) - Math.round(product.discountPercentage)),
        },
    };
}

function buildDashboardData(products: DummyJsonProduct[]): DashboardData {
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const highRatedProducts = products.filter((product) => product.rating >= 4.5).length;
    const lowStockProducts = products.filter((product) => product.stock < 20).length;

    return {
        summary: [
            {
                id: 1,
                title: `Medicine #${products[0]?.id ?? 580}`,
                subtitle: 'Awaiting results',
                value: '',
                variant: 'success',
            },
            {
                id: 2,
                title: `${highRatedProducts} vaccines`,
                subtitle: 'Approved reactions',
                value: '',
                variant: 'warning',
            },
            {
                id: 3,
                title: `${lowStockProducts} products`,
                subtitle: 'Out of stock',
                value: '',
                variant: 'danger',
            },
        ],
        totalTests: products.slice(0, 11).map((product, index) => ({
            name: `${String(index + 1).padStart(2, '0')} May`,
            received: Math.round(product.price % 90),
            completed: Math.round(product.rating * 14),
        })),
        testedDrugs: products.slice(0, 7).map((product, index) => ({
            name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index],
            value: Math.round(product.stock % 70),
        })),
        approvalRates: products.slice(0, 7).map((product, index) => ({
            name: `${String(index + 1).padStart(2, '0')} May`,
            value: Math.round(product.rating * 12),
        })),
        testingProcess: [
            {
                name: 'Preclinical testing',
                value: Math.round(totalStock % 80),
            },
            {
                name: 'Clinical trials',
                value: highRatedProducts,
            },
            {
                name: 'Regulatory approval',
                value: Math.max(10, lowStockProducts),
            },
        ],
    };
}

export async function getDashboardData(): Promise<DashboardData> {
    const products = await getProducts();

    return buildDashboardData(products);
}

export async function getMedicines(): Promise<MedicineRow[]> {
    const products = await getProducts();

    return products.slice(0, 6).map(mapProductToMedicine);
}

export function getEventDetails(): Promise<EventDetails> {
    return delay(eventDetails);
}