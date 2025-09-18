import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
5
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
// Zod validation schemas
const ProgramEnum = z.enum(["CS", "IT", "EE", "ME", "BA"]);
const studentCreateSchema = z.object({
firstName: z.string().min(2),
lastName: z.string().min(2),
email: z.string().email(),
phone: z.string().optional().nullable(),
dateOfBirth: z.string(), // YYYY-MM-DD from client
address: z.string().optional().nullable(),
program: ProgramEnum
});
const studentUpdateSchema = studentCreateSchema.partial();
app.get("/api/health", (_req, res) => {
res.json({ status: "ok" });
});
// List all students
app.get("/api/students", async (_req, res) => {
const students = await prisma.student.findMany({ orderBy: { createdAt:
"desc" } });
res.json(students);
});
// Get one student by id
app.get("/api/students/:id", async (req, res) => {
const id = Number(req.params.id);
if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
const student = await prisma.student.findUnique({ where: { id } });
if (!student) return res.status(404).json({ error: "Not found" });
res.json(student);
});
// Create student
app.post("/api/students", async (req, res) => {
const parsed = studentCreateSchema.safeParse(req.body);
if (!parsed.success) {
return res.status(400).json({ error: parsed.error.flatten() });
}
const data = parsed.data;
try {
const created = await prisma.student.create({
data: {
firstName: data.firstName,
lastName: data.lastName,
email: data.email,
phone: data.phone || undefined,
dateOfBirth: new Date(data.dateOfBirth),
address: data.address || undefined,
program: data.program as any
}
});
res.status(201).json(created);
} catch (e: any) {
if (e.code === "P2002") {
return res.status(409).json({ error: "Email already exists" });
}
console.error(e);
res.status(500).json({ error: "Internal server error" });
}
});
// Update student
app.put("/api/students/:id", async (req, res) => {
const id = Number(req.params.id);
if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
const parsed = studentUpdateSchema.safeParse(req.body);
if (!parsed.success) return res.status(400).json({ error:
parsed.error.flatten() });
const data = parsed.data;
try {
const updated = await prisma.student.update({
where: { id },
data: {
...("firstName" in data ? { firstName: data.firstName } : {}),
...("lastName" in data ? { lastName: data.lastName } : {}),
...("email" in data ? { email: data.email } : {}),
...("phone" in data ? { phone: data.phone ?? undefined } : {}),
...("dateOfBirth" in data ? { dateOfBirth: new
Date(String(data.dateOfBirth)) } : {}),
...("address" in data ? { address: data.address ?? undefined } : {}),
...("program" in data ? { program: data.program as any } : {})
}
});
res.json(updated);
} catch (e: any) {
if (e.code === "P2002") {
return res.status(409).json({ error: "Email already exists" });
}
if (e.code === "P2025") {
7
return res.status(404).json({ error: "Not found" });
}
console.error(e);
res.status(500).json({ error: "Internal server error" });
}
});
// Delete student
app.delete("/api/students/:id", async (req, res) => {
const id = Number(req.params.id);
if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
try {
await prisma.student.delete({ where: { id } });
res.status(204).send();
} catch (e: any) {
if (e.code === "P2025") return res.status(404).json({ error: "Not found" });
console.error(e);
res.status(500).json({ error: "Internal server error" });
}
});
app.listen(PORT, () => {
console.log(`API listening on http://localhost:${PORT}`);
});