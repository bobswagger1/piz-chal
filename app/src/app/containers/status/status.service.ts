import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';


@Injectable()
export class StatusService {

    constructor(private http: HttpClient) {}

    getOrders() {
       return this.http.get(`/api/getOrders`);
    }

    setStatus(item) {
        return this.http.post('/api/setStatus', item);
    }
}
