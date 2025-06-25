import React, { useState } from 'react';
import data from '../../data/data.json'; // Adjust the path as needed
import { Table } from '../table/table';
import type { CompanyProps } from '../table/table';
import styles from "./filter.module.scss";

const Filter: React.FC = () => {
    const [query, setQuery] = useState('');
    const [areacode, setAreacode] = useState<string>('');
    const [results, setResults] = useState<CompanyProps[]>([]);
    const [submitted, setSubmitted] = useState(false);

    // Extract unique areacodes from data
    const areacodeOptions = Array.from(
        new Set(
            (data.files ?? [])
                .map((item: any) => item.areacode)
                .filter((code) => typeof code === 'string' || typeof code === 'number')
        )
    ).sort((a, b) => String(a).localeCompare(String(b)));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleAreacodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAreacode(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const filtered = (data.files ?? [])
            .filter(
                (item: any) =>
                    typeof item.company === 'string' &&
                    typeof item.cuit === 'string' &&
                    typeof item.pdfs !== 'undefined' &&
                    typeof item.description === 'string' &&
                    typeof item.id !== 'undefined' &&
                    typeof item.country === 'string'
            )
            .filter(
                (item) =>
                    (item.company.toLowerCase().includes(query.toLowerCase()) ||
                    item.cuit.toLowerCase().includes(query.toLowerCase())) &&
                    (areacode === '' || String(item.areacode) === areacode)
            )
            .map((item) => ({
                ...item,
                areacode: typeof item.areacode === 'string' ? Number(item.areacode) : item.areacode,
                pdfs: Array.isArray(item.pdfs)
                    ? item.pdfs
                    : Object.values(item.pdfs ?? {}).flat(),
            }));
        setResults(filtered);
    };

    // State to hold submitted values
    const [submittedQuery, setSubmittedQuery] = useState('');
    const [submittedAreacode, setSubmittedAreacode] = useState<string>('');

    // Save input values on submit
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmittedQuery(query);
        setSubmittedAreacode(areacode);
        setSubmitted(true);

        const filtered = (data.files ?? [])
            .filter(
                (item: any) =>
                    typeof item.company === 'string' &&
                    typeof item.cuit === 'string' &&
                    typeof item.pdfs !== 'undefined' &&
                    typeof item.description === 'string' &&
                    typeof item.id !== 'undefined' &&
                    typeof item.country === 'string'
            )
            .filter(
                (item) =>
                    (item.company.toLowerCase().includes(query.toLowerCase()) ||
                    item.cuit.toLowerCase().includes(query.toLowerCase())) &&
                    (areacode === '' || String(item.areacode) === areacode)
            )
            .map((item) => ({
                ...item,
                areacode: typeof item.areacode === 'string' ? Number(item.areacode) : item.areacode,
                pdfs: Array.isArray(item.pdfs)
                    ? item.pdfs
                    : Object.values(item.pdfs ?? {}).flat(),
            }));
        setResults(filtered);
    };

    const renderForm = () => (
        <form className={styles.formFilter} onSubmit={handleFormSubmit}>
            <h4>Buscar compañía</h4>
            <input
                name='search'
                type="text"
                placeholder="Introducir compañía o CUIT"
                value={query}
                onChange={handleInputChange}
            /> <h4>Buscar rubro</h4>
            <select
                name="areacode"
                value={areacode}
                onChange={handleAreacodeChange}
                className={styles.areacodeDropdown}
            >
                <option value="">Seleccionar codigo</option>
                {areacodeOptions.map((code) => (
                    <option key={code} value={code}>
                        {code}
                    </option>
                ))}
            </select>
            <button
                type="submit"
                className='searchButton'
            >
                Buscar
            </button>
            {submitted && (
                results.length > 0 ? (
                    <div className={styles.filterContainer}>
                        <h3> Resultados de búsqueda:&nbsp;  
                          <span>{submittedQuery ? `para la compañía "${submittedQuery}"` : 'todas las compañías'}</span>&nbsp;
                          <span>{submittedAreacode ? `del rubro ${submittedAreacode}` : 'de todos los rubros'}</span>
                        </h3>
                        <Table data={results} />
                    </div>
                ) : (
                    <div className={styles.filterContainer}>
                        <h3>No encontramos resultados para la compañía <span>{`"`+submittedQuery+`"` || 'todas'}</span>&nbsp;
                            <span>{submittedAreacode ? `del rubro ${submittedAreacode}` : 'en ningún rubro'} </span>
                        </h3>
                    </div>
                )
            )}
        </form>
    );

    return (
        <div className={styles.filterContainer}>
            {renderForm()}
        </div>
    );
};

export default Filter;