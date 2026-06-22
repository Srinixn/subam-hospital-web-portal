import { Request, Response } from 'express';
import { JobService } from '../services/job.service.js';
import { ApiResponse, Job } from '../types/index.js';

const jobService = new JobService();

export class JobController {
  // Public handlers
  async getPublicJobs(req: Request, res: Response) {
    try {
      const jobs = await jobService.getAllJobs(false);
      const response: ApiResponse<Job[]> = { success: true, data: jobs };
      res.json(response);
    } catch (error) {
      console.error('Error fetching public jobs:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async getPublicJobBySlug(req: Request, res: Response) {
    try {
      const slug = req.params.slug as string;
      const job = await jobService.getJobBySlug(slug);
      if (!job) {
        return res.status(404).json({ success: false, message: 'Job not found' });
      }
      const response: ApiResponse<Job> = { success: true, data: job };
      res.json(response);
    } catch (error) {
      console.error('Error fetching job by slug:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  // Admin handlers
  async getAllJobsAdmin(req: Request, res: Response) {
    try {
      const jobs = await jobService.getAllJobs(true);
      const response: ApiResponse<Job[]> = { success: true, data: jobs };
      res.json(response);
    } catch (error) {
      console.error('Error fetching admin jobs:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async getJobByIdAdmin(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const job = await jobService.getJobById(Number(id));
      if (!job) {
        return res.status(404).json({ success: false, message: 'Job not found' });
      }
      const response: ApiResponse<Job> = { success: true, data: job };
      res.json(response);
    } catch (error) {
      console.error('Error fetching admin job by id:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async createJob(req: Request, res: Response) {
    try {
      const { title, description, requirements, location, linkedinJobUrl, employmentType, status } = req.body;
      if (!title || !description || !location || !linkedinJobUrl) {
         return res.status(400).json({ success: false, message: 'Title, location, linkedinJobUrl, and description are required' });
      }

      const newId = await jobService.createJob({
        title,
        description,
        requirements: requirements || '',
        location,
        linkedinJobUrl,
        employmentType: employmentType || 'Full-time',
        status: status || 'Draft'
      });

      const response: ApiResponse<{ id: number }> = { success: true, data: { id: newId }, message: 'Job created' };
      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating job:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async updateJob(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await jobService.updateJob(Number(id), req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Job not found' });
      }
      res.json({ success: true, message: 'Job updated' });
    } catch (error) {
      console.error('Error updating job:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async deleteJob(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await jobService.deleteJob(Number(id));
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Job not found' });
      }
      res.json({ success: true, message: 'Job deleted' });
    } catch (error: any) {
      console.error('Error deleting job:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}
