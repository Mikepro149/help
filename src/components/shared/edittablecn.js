import { useState } from "react";

export default function EditableTable({ title, columns, data, setData, newRow, setNewRow }) {
  const [adding, setAdding] = useState(false);

  const handleSave = () => {
    const vacio = Object.values(newRow).some(
      (v) => v === null || v === undefined || String(v).trim() === ""
    );

    if (vacio) {
      alert(`Completa todos los campos de ${title}`);
      return;
    }

    setData([...data, newRow]);
    setNewRow(Object.fromEntries(Object.keys(newRow).map((k) => [k, ""])));
    setAdding(false);
  };

  return (
    <section>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <table className="w-full table-auto border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col} className="p-2">
                {/* Capitalizar solo la primera letra */}
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </th>
            ))}
            <th className="p-2 text-right">
              <button
                className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
                onClick={() => setAdding(true)}
                disabled={adding}
              >
                ➕
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t">
              {columns.map((col) => (
                <td key={col} className="p-2">{row[col]}</td>
              ))}
            </tr>
          ))}

          {adding && (
            <tr className="border-t bg-gray-50">
              {columns.map((col) => (
                <td key={col} className="p-2">
                  <input
                    className="w-full p-1 border rounded"
                    value={newRow[col]}
                    placeholder={col.charAt(0).toUpperCase() + col.slice(1)}
                    onChange={(e) => setNewRow({ ...newRow, [col]: e.target.value })}
                  />
                </td>
              ))}
              <td className="p-2 flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setAdding(false)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Cancelar
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
