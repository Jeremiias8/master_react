import React, { useState } from 'react'
import '../Index.css'

{/*
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
*/}

import { VscAdd } from "react-icons/vsc";
import { VscArchive } from "react-icons/vsc";
import DataTable from 'react-data-table-component';

// import { DataTableComponent } from '../components/DataTableComponent';

export const PagosTotalesComponent = ({selectedDate, setSelectedDate}) => {

    const [totalPago, setTotalPago] = useState(0);
    const [state, setState] = useState([]);

    const totalPayment = () => {
        setTotalPago(totalPago);
    }

    const addPayment = () => {
        // añadir model tipo o pago al dar click
    }
      
    const column = [

        {
            name: 'ID',
            selector: row => row.id
        },
        {
            name: 'Total',
            selector: row => row.total
        },
        {
            name: 'Pago 1',
            selector: row => row.pago1
        },
        {
            name: 'Pago 2',
            selector: row => row.pago2
        },
        {
            name: 'Pago 3',
            selector: row => row.pago3
        }
    ];

    let nextId = 0;

    const data = [
        { id: nextId++, total: [totalPayment], pago1: '', pago2: '', pago3: '' },
        { id: nextId++, total: [totalPayment], pago1: '', pago2: '', pago3: '' },
        { id: nextId++, total: [totalPayment], pago1: '', pago2: '', pago3: '' }
    ];

    const agregarFila = () => {
        const newData = {
            id: data.length + 1,
            total: ''
        };

        setState(prevState => ({
            data: [...prevState.data, newData]
        }));
    }

    const clientPayments = [
        {
            date: '2023-06-24',
            amount: 50,
            details: 'June monthly payment'
        },
        {
            date: '2023-08-14',
            amount: 250,
            details: 'August monthly payment'
        }
    ];

    const showData = () => {
        console.log(clientPayments);
    }

  return (
    <>

        <DataTable
            columns={column}
            data={data}
        ></DataTable>

      <button onClick={showData}>
        Mostrar data
      </button>

      <button onClick={agregarFila}>Agregar Fila</button>

      <button onClick={addPayment}>
        <VscAdd />
      </button>
      &nbsp;
      <button onClick={(id, e) => this.deleteRow(id, e)}>
        <VscArchive />
      </button>


      {/* 
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell className='total-pay'>TOTAL</TableCell>
                <TableCell align="right">PAGO 1</TableCell>
                <TableCell align="right">PAGO 2</TableCell>
                <TableCell align="right">PAGO 3</TableCell>
                <TableCell align="right">PAGO 4</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {row.total}
                    </TableCell>
                    <TableCell align="right">{row.pago1}</TableCell>
                    <TableCell align="right">{row.pago2}</TableCell>
                    <TableCell align="right">{row.pago3}</TableCell>
                    <TableCell align="right">{row.pago4}</TableCell>

                    <button
                        onClick={addPayment}
                    >
                        <VscAdd />
                    </button>
                    
                    &nbsp;

                    <button
                        onClick={(e) => this.deleteRow(id, e)}
                    >
                        <VscArchive />
                    </button>
                    
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    
        */}
    </>
  );

}
