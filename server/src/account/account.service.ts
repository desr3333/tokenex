import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  async getAll(): Promise<any> {
    return {
      data: [],
    };
  }

  async getByKey(key: string): Promise<any> {
    return {};
  }

  async create(data: any): Promise<any> {
    return {};
  }

  async update(key: string): Promise<any> {
    return {};
  }
  async delete(key: string): Promise<any> {
    return {};
  }
}
