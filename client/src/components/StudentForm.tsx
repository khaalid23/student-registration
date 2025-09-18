import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../lib/api";

const schema = z.object({
  firstName: z.string().min(2, "At least 2 characters"),
  lastName: z.string().min(2, "At least 2 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  dateOfBirth: z.string().min(1, "Required"), // yyyy-mm-dd
  address: z.string().optional(),
  program: z.enum(["CS", "IT", "EE", "ME", "BA"]),
});

type FormValues = z.infer<typeof schema>;
export default function StudentForm({ onCreated }: { onCreated: () => void }) {
const { register, handleSubmit, reset, formState: { errors, isSubmitting } }
= useForm<FormValues>({
resolver: zodResolver(schema),
defaultValues: { program: "CS" }
});
const onSubmit = async (values: FormValues) => {
await api.post("/students", values);
reset({ program: "CS" });
onCreated();
};
return (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-6 bg-white p-8 rounded-3xl shadow-lg max-w-xl mx-auto"
  >
    <h2 className="text-2xl font-bold mb-4 bg-black item-center text-red-800">Register Student</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
        <input
          {...register("firstName")}
          className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.firstName && (
          <p className="text-xs text-red-600 mt-1">{errors.firstName.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
        <input
          {...register("lastName")}
          className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.lastName && (
          <p className="text-xs text-red-600 mt-1">{errors.lastName.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          {...register("phone")}
          className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
        <input
          type="date"
          {...register("dateOfBirth")}
          className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.dateOfBirth && (
          <p className="text-xs text-red-600 mt-1">{errors.dateOfBirth.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
        <select
          {...register("program")}
          className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="CS">Computer Science</option>
          <option value="IT">Information Tech</option>
          <option value="EE">Electrical Eng</option>
          <option value="ME">Mechanical Eng</option>
          <option value="BA">Business Admin</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <input
          {...register("address")}
          className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    <button
      disabled={isSubmitting}
      className="w-full px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
    >
      {isSubmitting ? "Saving..." : "Save"}
    </button>
  </form>
);
}
