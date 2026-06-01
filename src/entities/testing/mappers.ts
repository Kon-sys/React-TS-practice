import { endDates, locations, startDates } from './constants';

import type { DummyJsonProduct } from './dto';
import type { DashboardData, MedicineRow } from './types';

export function mapProductToMedicine(
    product: DummyJsonProduct,
    index: number,
): MedicineRow {
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
            green: Math.max(
                10,
                100 -
                Math.round(product.rating * 8) -
                Math.round(product.discountPercentage),
            ),
        },
    };
}

export function buildDashboardData(products: DummyJsonProduct[]): DashboardData {
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const highRatedProducts = products.filter(
        (product) => product.rating >= 4.5,
    ).length;
    const lowStockProducts = products.filter(
        (product) => product.stock < 20,
    ).length;

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