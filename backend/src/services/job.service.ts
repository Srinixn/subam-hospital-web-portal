import { JobRepository } from '../repositories/job.repository.js';
import { Job } from '../types/index.js';

const jobRepo = new JobRepository();

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export class JobService {
  async getAllJobs(includeDrafts: boolean = false): Promise<Job[]> {
    return await jobRepo.findAll(includeDrafts);
  }

  async getJobById(id: number): Promise<Job | null> {
    return await jobRepo.findById(id);
  }

  async getJobBySlug(slug: string): Promise<Job | null> {
    return await jobRepo.findBySlug(slug);
  }

  async createJob(data: {
    title: string;
    description: string;
    requirements: string;
    location: 'Sun Srishti Speciality Hospital' | 'Sunsrishti Fertility Center' | 'Subam Hospital';
    employmentType: 'Full-time' | 'Part-time' | 'Contract';
    status: 'Draft' | 'Published' | 'Closed';
    linkedinJobUrl: string;
  }): Promise<number> {
    let slug = generateSlug(data.title);
    let count = 1;
    while (await jobRepo.findBySlug(slug)) {
      slug = `${generateSlug(data.title)}-${count}`;
      count++;
    }

    return await jobRepo.create({
      ...data,
      slug,
    });
  }

  async updateJob(id: number, data: Partial<Omit<Job, 'id' | 'createdAt' | 'updatedAt' | 'slug'>>): Promise<boolean> {
    let slug: string | undefined = undefined;
    
    if (data.title) {
       slug = generateSlug(data.title);
       let count = 1;
       let existingJob = await jobRepo.findBySlug(slug);
       while (existingJob && existingJob.id !== id) {
         slug = `${generateSlug(data.title)}-${count}`;
         existingJob = await jobRepo.findBySlug(slug);
         count++;
       }
    }

    return await jobRepo.update(id, { ...data, slug });
  }

  async deleteJob(id: number): Promise<boolean> {
    return await jobRepo.delete(id);
  }
}
