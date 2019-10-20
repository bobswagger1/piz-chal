import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';


@Injectable()
export class DashboardService {

    constructor(private http: HttpClient) {}

    getReport() {
        return this.http.get(`/api/getReport`);
     }
}
