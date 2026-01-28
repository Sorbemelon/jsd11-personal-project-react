import {
  FileText,
  Database
} from "lucide-react";

export default function StoredRecordsTable() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Database size={18} /> Stored JSON Records
      </h2>
      <table className="w-full text-sm">
        <thead className="border-b text-slate-500">
          <tr>
            <th className="text-left p-3">Document</th>
            <th className="text-left p-3">Chunks</th>
            <th className="text-left p-3">Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-slate-50">
            <td className="p-3 flex items-center gap-2">
              <FileText size={16} /> report-2025.pdf
            </td>
            <td className="p-3">128</td>
            <td className="p-3">2 min ago</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}