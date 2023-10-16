import React, { useState } from 'react'
import DataTable from 'react-data-table-component';

export const DataTableComponent = () => {

    const columns = [
        {
            name: 'Total',
            selector: row => row.total,
        },
        {
            name: 'Pago',
            selector: row => row.pago,
        },
    ];
    
    const data = [
        {
            id: 1,
            total: '450',
            pago: '1',
        },
        {
            id: 2,
            total: '350',
            pago: '2',
        },
        {
            id: 3,
            total: '250',
            pago: '3',
        },
        {
            id: 4,
            total: '150',
            pago: '4',
        },
    ]

    const [pagos, setPagos] = useState(data);

    const handleFilter = (e) => {
        const newPayment = pagos.filter(row => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase());
        })
        setPagos(newPayment);
    }

  return (

    <div className='container'>
        <div className="input-div">
            <input type="text" onChange={handleFilter} />
            <input type="date" onChange={handleFilter} />
        </div>

        <DataTable
            columns={columns}
            data={pagos}
            selectableRows
        />
    </div>

  );

}
