import apiClient from "./api-client";

export interface User {
  id: number;
  name: string;
}

class UserService {
  getAllUsers() {
    const controller = new AbortController();

    const request = apiClient.get<User[]>("/users", {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  deleteUser(id: number) {
    const request = apiClient.delete("/users/" + id);

    return { request };
  }

  addUser(newUser: User) {
    const request = apiClient.post("/users", newUser);

    return { request };
  }

  updateUser(updatedUser: User) {
    const request = apiClient.patch("/users/" + updatedUser.id, updatedUser);

    return { request };
  }
}

export default new UserService();
