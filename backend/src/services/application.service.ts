import { ApplicationRepository } from '../repositories/application.repository.js';
import { Application, ApplicationWithJob } from '../types/index.js';

const appRepo = new ApplicationRepository();

export class ApplicationService {
  async getAllApplications(): Promise<ApplicationWithJob[]> {
    return await appRepo.findAll();
  }

  async getApplicationById(id: number): Promise<ApplicationWithJob | null> {
    return await appRepo.findById(id);
  }

  async createApplication(data: Omit<Application, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<number> {
    return await appRepo.create(data);
  }

  async updateApplicationStatus(id: number, status: Application['status']): Promise<boolean> {
    return await appRepo.updateStatus(id, status);
  }
}
