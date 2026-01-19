export class ApiClient {
    constructor(request) {
        this.request = request;
    }
    async get(endpoint) {
        return await this.request.get(endpoint);
    }

    async post(endpoint, body) {
        return await this.request.post(endpoint, {
            data: body 
        });
    }

    async put(endpoint, body) {
        return await this.request.put(endpoint, {
            data: body 
        });
    }   
    async delete(endpoint) {
        return await this.request.delete(endpoint);
    }
}