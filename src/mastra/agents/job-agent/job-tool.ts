import { createTool } from "@mastra/core/tools";
import { z } from "zod";

const CategoryEnum = z.enum([
  "software-dev",
  "customer-support",
  "design",
  "marketing",
  "sales-business",
  "product",
  "project-management",
  "data",
  "devops",
  "finance-legal",
  "hr",
  "qa",
  "writing",
  "all-others",
]);

interface RawRemotiveJob {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo?: string;
  category: string;
  job_type?: string;
  publication_date: string;
  candidate_required_location: string;
  salary?: string;
  description: string;
}

interface RemotiveResponse {
  jobs: RawRemotiveJob[];
}

export const jobTool = createTool({
  id: "get-jobs",
  description:
    "Fetch job listings from Remotive using category, company_name, search, and limit filters; optionally filter by location client-side.",
  inputSchema: z.object({
    category: CategoryEnum.optional().describe("One of the supported category slugs"),
    company_name: z
      .string()
      .optional()
      .describe("Filter by company name (partial, case-insensitive)"),
    search: z
      .string()
      .optional()
      .describe("Search term for title/description (partial match)"),
    limit: z
      .number()
      .int()
      .positive()
      .optional()
      .describe("Max number of results to return from API"),
    location: z
      .string()
      .optional()
      .describe("Client-side filter on candidate_required_location"),
  }),
  outputSchema: z.object({
    "0-legal-notice": z.string(),
    "job-count": z.number(),
    jobs: z.array(
      z.object({
        id: z.number(),
        url: z.string().url(),
        title: z.string(),
        company_name: z.string(),
        company_logo: z.string().url().optional(),
        category: z.string(),
        job_type: z.string().optional(),
        publication_date: z.string(),
        candidate_required_location: z.string(),
        salary: z.string().optional(),
        description: z.string(),
      })
    ),
  }),
  execute: async ({ context }) => {
    const { category, company_name, search, limit, location } = context;
    const params = new URLSearchParams();
    if (category)     params.append("category", category);
    if (company_name) params.append("company_name", company_name);
    if (search)       params.append("search", search);
    if (limit)        params.append("limit", String(limit));

    const url = `https://remotive.com/api/remote-jobs?${params.toString()}`;
    const resp = await fetch(url);
    const data = (await resp.json()) as RemotiveResponse;

    // Optional client-side location filter
    const filtered = data.jobs.filter(job =>
      location
        ? job.candidate_required_location.toLowerCase().includes(location.toLowerCase())
        : true
    );

    return {
      "0-legal-notice": "Remotive API Legal Notice",
      "job-count": filtered.length,
      jobs: filtered,
    };
  },
});
