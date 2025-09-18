import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { Student } from "../types";
export default function StudentTable() {
const [students, setStudents] = useState<Student[]>([]);
const [loading, setLoading] = useState(true);
12
const load = async () => {
setLoading(true);
const res = await api.get<Student[]>("/students");
setStudents(res.data);
setLoading(false);
};
useEffect(() => { load(); }, []);
const remove = async (id: number) => {
await api.delete(`/students/${id}`);
setStudents(prev => prev.filter(s => s.id !== id));
};
if (loading) return <p>Loading...</p>;
return (
<div className="bg-white rounded-2xl shadow">
<div className="p-4 border-b">
<h2 className="text-xl font-semibold">Students</h2>
</div>
<div className="overflow-x-auto">
<table className="min-w-full text-sm">
<thead className="bg-gray-50">
<tr>
<th className="text-left p-3">Name</th>
<th className="text-left p-3">Email</th>
<th className="text-left p-3">Program</th>
<th className="text-left p-3">DOB</th>
<th className="text-left p-3">Actions</th>
</tr>
</thead>
<tbody>
{students.map(s => (
<tr key={s.id} className="border-t">
<td className="p-3">{s.firstName} {s.lastName}</td>
<td className="p-3">{s.email}</td>
<td className="p-3">{s.program}</td>
<td className="p-3">{new
Date(s.dateOfBirth).toLocaleDateString()}</td>
<td className="p-3">
<button onClick={() => remove(s.id)} className="px-3 py-1
rounded-lg bg-red-600 text-white hover:opacity-90">Delete</button>
</td>
</tr>
))}
</tbody>
13
</table>
</div>
</div>
);
}
