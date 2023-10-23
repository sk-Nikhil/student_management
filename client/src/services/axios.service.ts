import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})

export class AxiosService {
  private axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
  });

  constructor(private router:Router) {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        else{
          console.log("unexpected error occured")
          this.router.navigate(['/login'])
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  get(url: string) {
    return this.axiosInstance.get(url);
  }

  post(url: string, data: any) {
    return this.axiosInstance.post(url, data);
  }

  patch(url: string, data: any) {
    return this.axiosInstance.patch(url, data)
  }

  delete(url :string) {
    return this.axiosInstance.delete(url)
  }
}