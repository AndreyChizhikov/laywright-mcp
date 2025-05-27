import { APIRequestContext } from "@playwright/test";
import { loginHelper } from "../helpers/loginHelper";
import { API_URLS } from "./utls";


class ApiClient {

    private request: APIRequestContext;
    private cookies: string;
    private static baseUrl: string = API_URLS.BASE_URL;
    
    constructor(request: APIRequestContext) {
        this.request = request;
    }
    
    async init() {
        const sid = await loginHelper();
        this.cookies = `sid=${sid}`;
    }

    async get(url: string) {
        const response = await this.request.get(`${ApiClient.baseUrl}${url}`, {
            headers: {
                cookie: this.cookies,
            },
        });
        return response;
    }
    
    async post(url: string, data: any) {
        const response = await this.request.post(`${ApiClient.baseUrl}${url}`, {
            headers: {
                cookie: this.cookies,
                'Content-Type': 'application/json',
            },
            data: data,
        });
        return response;
    }
    
    async put(url: string, data: any) {
        const response = await this.request.put(`${ApiClient.baseUrl}${url}`, {
            headers: {
                cookie: this.cookies,
                'Content-Type': 'application/json',
            },
            data: data,
        });
        return response;
    }
    
    async delete(url: string) {
        const response = await this.request.delete(`${ApiClient.baseUrl}${url}`, {
            headers: {
                cookie: this.cookies,
            },
        });
        return response;
    }
}


let apiClient: ApiClient;

export async function getApiClient(request: APIRequestContext): Promise<ApiClient> {
    if (!apiClient) {
        apiClient = new ApiClient(request);
        await apiClient.init().catch(error => {
            console.error("Failed to initialize API client:", error);
        });
    }
    return apiClient;
}
