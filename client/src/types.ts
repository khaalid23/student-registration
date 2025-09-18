export type Program = "CS" | "IT" | "EE" | "ME" | "BA";
export interface Student {
id: number;
firstName: string;
lastName: string;
email: string;
phone?: string | null;
dateOfBirth: string; // ISO string from server
address?: string | null;
program: Program;
createdAt: string;
updatedAt: string;
}
