import React, { useEffect, useState } from "react";
import styles from "./admin.module.scss";

type DataItem = {
	id: number;
	cuit: number;
	areacode: number;
	name: string;
	country: string;
	description: string;
	pdfs: string;
	public: boolean;
	[key: string]: any;
};

const fetchData = async (): Promise<DataItem[]> => {
	const res = await fetch("http://localhost:3001/api/data");
	if (!res.ok) throw new Error("Failed to fetch data");
	return res.json();
};

const addDataItem = async (item: DataItem) => {
	const res = await fetch("http://localhost:3001/api/data", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(item),
	});
	if (!res.ok) throw new Error("Failed to add item");
	return res.json();
};

const updateDataItem = async (id: number, item: DataItem) => {
	const res = await fetch(`http://localhost:3001/api/data/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(item),
	});
	if (!res.ok) throw new Error("Failed to update item");
	return res.json();
};

const deleteDataItem = async (id: number) => {
	const res = await fetch(`http://localhost:3001/api/data/${id}`, {
		method: "DELETE",
	});
	if (!res.ok) throw new Error("Failed to delete item");
	return res.json();
};

  const AdminPanel: React.FC = () => {
	const [data, setData] = useState<DataItem[]>([]);
	const [form, setForm] = useState<Partial<DataItem>>({});
	const [editing, setEditing] = useState<DataItem | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
  fetchData()
    .then((res) => {
      console.log("Fetched data:", res);
      // If API returns { files: [...] }, use that array
      const formattedData = Array.isArray(res) ? res : res.files || [];
      setData(formattedData);
    })
    .catch(() => setError("Failed to fetch data"));
}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const target = e.target as HTMLInputElement | HTMLTextAreaElement;
		const name = target.name;
		// If this is an input of type "number", convert to number; otherwise keep string
		const inputType = (target as HTMLInputElement).type;
		if (inputType === "number") {
			const val = (target as HTMLInputElement).value;
			setForm({ ...form, [name]: val === "" ? undefined : Number(val) });
		} else {
			setForm({ ...form, [name]: target.value });
		}
	};

	const handleAdd = async () => {
		try {
			// Generate a unique id (you can use Date.now() or a better method)
			const newItem = { ...form, id: Date.now() };
			const savedItem = await addDataItem(newItem as DataItem);
			setData((prev) => [...prev, savedItem]);
			setForm({});
			setError(null);
		} catch (err) {
			setError("Failed to add item");
		}
	};


	const handleUpdate = async () => {
		if (!editing) return;
		try {
			const updatedItem = { ...editing, ...form };
			const savedItem = await updateDataItem(editing.id, updatedItem as DataItem);
			setData((prev) =>
				prev.map((item) => (item.id === editing.id ? savedItem : item))
			);
			setEditing(null);
			setForm({});
			setError(null);
		} catch (err) {
			setError("Failed to update item");
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await deleteDataItem(id);
			setData((prev) => prev.filter((item) => item.id !== id));
			setError(null);
		} catch (err) {
			setError("Failed to delete item");
		}
	};

 

	return (
		<div className={styles.adminPanel}>
			<h2>Admin Panel</h2>
			{error && <div className={styles.error}>{error}</div>}

			<div className={styles.editPanel}>
				<h3>{editing ? "Edit Item" : "Add New Item"}</h3>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						editing ? handleUpdate() : handleAdd();
					}}
					className={styles.dataForm}
				>
					{editing && (
						<>
							<input
								name="id"
								type="number"
								placeholder="ID"
								value={form.id ?? ""}
								onChange={handleChange}
								disabled
								required
							/>
							<div className={styles.disclaimer}>ID cannot be changed</div>
						</>
					)}
					<input
						name="name"
						placeholder="Nombre de Compania"
						value={form.name ?? ""}
						onChange={handleChange}
						required
					/>
					<input
						name="cuit"
						type="number"
						placeholder="CUIT"
						value={form.cuit ?? ""}
						onChange={handleChange}
						required
					/>
					<input
						name="country"
						type="text"
						placeholder="Pais"
						value={form.country ?? ""}
						onChange={handleChange}
						required
					/>
					<input
						name="areacode"
						type="number"
						placeholder="Codigo de Area"
						value={form.areacode ?? ""}
						onChange={handleChange}
						required
					/>
					<input
						name="description"
						type="text-area"
						placeholder="Descripcion"
						value={form.description ?? ""}
						onChange={handleChange}
						required
					/>
					<label>
						Publico&nbsp;&nbsp;
						<input
							name="public"
							type="checkbox"
							checked={form.public ?? false}
							onChange={(e) => setForm({ ...form, public: e.target.checked })}
						/>
					</label>
					{/* Add more fields as needed */}
					<button type="submit">{editing ? "Update" : "Add"}</button>
					{editing && (
						<button
							type="button"
							onClick={() => {
								setEditing(null);
								setForm({});
							}}
						>
							Cancel
						</button>
					)}
				</form>
			</div>

			<table className={styles.dataTable}>
				<thead>
					<tr>
						<th>Compañia</th>
						<th>CUIT</th>
						<th>Area</th>
						<th>Pais</th>
						<th>PDFs</th>
						<th>Descripcion</th>
						<th>Publico</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(data) ? (
						data.map((item) => (
							<tr key={item.id}>
								<td>{item.name ?? "Sin Name"}</td>
								<td>{item.cuit ?? "Sin CUIT"}</td>
								<td>{item.areacode ?? "Sin codigo de area"}</td>
								<td>{item.country ?? "Sin pais"}</td>
								<td>
									{item.pdfs ? (
										<a href={item.pdfs} target="_blank" rel="noopener noreferrer">
											Ver PDF
										</a>
									) : (
										"Sin PDF"
									)}
								</td>
								<td className={styles.descripcion}>
									{item.description ?? "Sin descripcion"}
								</td>
								<td>{item.public ? "Si" : "No"}</td>
								<td>
									<button
										type="button"
										onClick={() => {
											setEditing(item);
											setForm(item);
										}}
									>
										Edit
									</button>
									<button type="button" onClick={() => handleDelete(item.id)}>
										Delete
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={8}>No data found</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default AdminPanel;
