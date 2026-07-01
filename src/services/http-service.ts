import apiClient from "./api-client";

interface Entity {
  id: number;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    // browser API that lets you cancel in-flight fetch/axios requests
    const controller = new AbortController();

    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  delete(id: number) {
    const request = apiClient.delete(this.endpoint + "/" + id);

    return { request };
  }

  create<T>(entity: T) {
    const request = apiClient.post(this.endpoint, entity);

    return { request };
  }

  updateUser<T extends Entity>(entity: T) {
    const request = apiClient.patch(this.endpoint + "/" + entity.id, entity);

    return { request };
  }
}

const create = (endpoing: string) => new HttpService(endpoing);

export default create;
