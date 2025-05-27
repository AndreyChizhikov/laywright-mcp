import { APIRequestContext } from "@playwright/test";
import { getApiClient } from "./apiClient";
import { API_URLS } from "./utls";

export async function getCarsData(request: APIRequestContext): Promise<any> {
    const apiClient = await getApiClient(request);
    const response = await apiClient.get(API_URLS.cars.get);
    const responseData = await response.json(); 

    if (!response.ok()) {
        throw new Error(`Failed to add car: ${response.status()} Message: ${responseData.message}`);
    }
   
    return responseData.data;
}

export async function addCar(request: APIRequestContext, carData: any): Promise<any> {
    const apiClient = await getApiClient(request);
    const response = await apiClient.post(API_URLS.cars.post, carData);
    const responseData = await response.json(); 
   
    if (!response.ok()) {
        throw new Error(`Failed to add car: ${response.status()} Message: ${responseData.message}`);
    }
    
    return responseData.data;
}

export async function updateCar(request: APIRequestContext, carId: string, carData: any): Promise<any> {
    const apiClient = await getApiClient(request);
    const response = await apiClient.put(API_URLS.cars.put(carId), carData);
    const responseData = await response.json(); 

    if (!response.ok()) {
        throw new Error(`Failed to add car: ${response.status()} Message: ${responseData.message}`);
    }
  
    return responseData.data;
}

export async function deleteCar(request: APIRequestContext, carId: string): Promise<void> {
    const apiClient = await getApiClient(request);
    const response = await apiClient.delete(API_URLS.cars.delete(carId));
    const responseData = await response.json(); 

    if (!response.ok()) {
         throw new Error(`Failed to add car: ${response.status()} Message: ${responseData.message}`);
    }
}
