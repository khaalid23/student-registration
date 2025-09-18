import { useRef } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
export default function App() {
const tableRef = useRef<{ reload?: () => void } | null>(null);
// Simple pattern: re-render table by changing key after create
// (Or you can lift state and pass a reload callback.)
return (
<div className="min-h-screen bg-gray-100">
<div className="max-w-5xl mx-auto p-6 space-y-6">
<header className="flex items-center justify-between">
<h1 className="text-2xl font-bold">Student Registration</h1>
<a className="text-sm underline" href="http://localhost:4000/api/
health" target="_blank">API Health</a>
</header>
<StudentForm onCreated={() => window.location.reload()} />
<StudentTable />
</div>
</div>
);
}
