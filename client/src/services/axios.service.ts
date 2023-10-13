import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})

export class AxiosService {
  private axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
  });

  constructor() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `${token}`;
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