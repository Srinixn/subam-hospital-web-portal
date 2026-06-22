import { Request, Response } from 'express';
import { ApplicationService } from '../services/application.service.js';
import { ApiResponse, ApplicationWithJob, Application } from '../types/index.js';
import path from 'path';
import fs from 'fs';

const appService = new ApplicationService();

export class ApplicationController {
  // Public
  async submitApplication(req: Request, res: Response) {
    try {
      const { jobId } = req.params;
      const { firstName, lastName, email, phone, experienceYears } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ success: false, message: 'Resume file is required' });
      }

      if (!firstName || !lastName || !email || !phone || experienceYears === undefined) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }

      // Compute relative path
      const rootStorageDir = path.join(process.cwd(), 'storage', 'resumes');
      const relativePath = path.relative(rootStorageDir, file.path);

      const newId = await appService.createApplication({
        jobId: Number(jobId),
        firstName,
        lastName,
        email,
        phone,
        experienceYears: Number(experienceYears),
        resumeFilePath: relativePath,
        resumeOriginalName: file.originalname,
      });

      res.status(201).json({ success: true, message: 'Application submitted successfully', data: { id: newId } });
    } catch (error: any) {
      console.error('Error submitting application:', error);
      res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
  }

  // Admin
  async getAllApplications(req: Request, res: Response) {
    try {
      const apps = await appService.getAllApplications();
      const response: ApiResponse<ApplicationWithJob[]> = { success: true, data: apps };
      res.json(response);
    } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async getApplicationById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const app = await appService.getApplicationById(Number(id));
      if (!app) {
        return res.status(404).json({ success: false, message: 'Application not found' });
      }
      const response: ApiResponse<ApplicationWithJob> = { success: true, data: app };
      res.json(response);
    } catch (error) {
      console.error('Error fetching application:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
         return res.status(400).json({ success: false, message: 'Status is required' });
      }

      const updated = await appService.updateApplicationStatus(Number(id), status as Application['status']);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Application not found' });
      }
      res.json({ success: true, message: 'Application status updated' });
    } catch (error) {
      console.error('Error updating application status:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async downloadResume(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const app = await appService.getApplicationById(Number(id));
      
      if (!app) {
        return res.status(404).json({ success: false, message: 'Application not found' });
      }

      const filePath = path.join(process.cwd(), 'storage', 'resumes', app.resumeFilePath);
      
      if (!fs.existsSync(filePath)) {
         return res.status(404).json({ success: false, message: 'Resume file not found on server' });
      }

      res.download(filePath, app.resumeOriginalName);
    } catch (error) {
      console.error('Error downloading resume:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}
