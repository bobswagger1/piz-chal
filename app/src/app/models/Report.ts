export interface TimeAndOrders {
    time: string[];
    orders: number[];
}

export interface Report {
    completed: number;
    pendings: number;
    timeAndOrders: TimeAndOrders;
    totalSales: number;
}
