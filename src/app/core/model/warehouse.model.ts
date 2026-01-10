export interface Warehouse{
    id: number;
    name: string;
    city: string;
    address: string;
    isActive: boolean;
    managerId?: number;
    managerName?: string;
    totalProducts?: number;
}

export interface WarehouseRequestDTO{
    name: string;
    city: string;
    address: string;
    managerId?: number;
}

export interface WarehouseResponseDTO{
    id: number;
    name: string;
    address: string;
    city: string;
    managerName: string;
    isActive: boolean;
    totalProducts?: number;
}