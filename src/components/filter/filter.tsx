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

    // Extract unique areacodes from data and normalize to string
    const areacodeOptions = Array.from(
        new Set(
            (data.files ?? [])
                .map((item: any) => String(item.areacode))
                .filter((code) => !!code)
        )
    ).sort((a, b) => a.localeCompare(b));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleAreacodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAreacode(e.target.value);
    };
    // State to hold submitted values
    const [submittedQuery, setSubmittedQuery] = useState('');
    const [submittedAreacode, setSubmittedAreacode] = useState<string>('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 20;

    // Save input values on submit
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmittedQuery(query);
        setSubmittedAreacode(areacode);
        setSubmitted(true);
        setCurrentPage(1);

        const filtered = (data.files ?? [])
            .filter(
                (item: any) =>
                    typeof item.name === 'string' &&
                    typeof item.cuit === 'string' &&
                    typeof item.pdfs !== 'undefined' &&
                    typeof item.description === 'string' &&
                    typeof item.id !== 'undefined' &&
                    typeof item.country === 'string'
            )
            .filter(
                (item) =>
                    (item.name.toLowerCase().includes(query.toLowerCase()) ||
                    item.cuit.toLowerCase().includes(query.toLowerCase())) &&
                    (areacode === '' || item.areacode === areacode)
            )
            .map((item) => {
                const pdfs = Array.isArray(item.pdfs)
                    ? item.pdfs
                    : Object.values(item.pdfs ?? {}).flat();

                // Map source fields to the shape expected by CompanyProps/table
                return {
                    // keep original useful fields
                    name: item.name,
                    cuit: item.cuit,
                    description: item.description,
                    country: item.country,
                    id: item.id,
                    pdfs,

                    // fields required by CompanyProps
                    company: item.name,
                    area: String(item.areacode),
                    areacode: String(item.areacode),
                    // date: item.date ?? '',
                    // status: typeof item.status !== 'undefined' ? item.status : (item.public ? 'public' : 'private'),
                    public: item.public,
                };
            });

        // Cast to CompanyProps[] to satisfy the state setter if needed
        setResults(filtered as unknown as CompanyProps[]);
    };

    // Pagination logic
    const paginatedResults = results.slice(
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
    );
    const totalPages = Math.ceil(results.length / resultsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const renderForm = () => (
        <form className={styles.formFilter} onSubmit={handleFormSubmit}>
            <div className={styles.search}>
               
                <h4>
                    <span> Buscar rubro</span>
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
                </select></h4>
                 <h4><span> Buscar compañía </span>
                <input
                    name='search'
                    type="text"
                    placeholder="Introducir compañía o CUIT"
                    value={query}
                    onChange={handleInputChange}
                /> </h4>
                <button
                    type="submit"
                    className='searchButton'
                >
                    Buscar
                </button>
            </div>

            {submitted && (
                results.length > 0 ? (
                    <div className={styles.resultsContainer}>
                        <h3> Resultados de búsqueda:&nbsp;  
                          <span>{submittedQuery ? `para la compañía "${submittedQuery}"` : 'todas las compañías'}</span>&nbsp;
                          <span>{submittedAreacode ? `del rubro ${submittedAreacode}` : 'de todos los rubros'}</span>
                        </h3>
                        <Table data={paginatedResults} />
                        {totalPages > 1 && (
                            <div className={styles.pagination}>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={currentPage === i + 1 ? styles.activePage : ''}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
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