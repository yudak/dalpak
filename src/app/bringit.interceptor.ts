import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler,HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class BringitInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req.headers);
        var reqClone = req.clone();
        // Access-Control-Allow-Origin
        var origin = req.headers.get("Origin")
        reqClone.headers.set("Access-Control-Allow-Origin", origin);
        reqClone.headers.set("Vary", "Origin");
        console.log(reqClone.headers);
        var aaa = reqClone.withCredentials
        return next.handle(reqClone);
    }
}