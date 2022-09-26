import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Transaction from '../components/transaction'
import '../assets/styles/style.css'

const IncomingTransactions = () => {
  return (
    <div className="tblContainer d-flex mt-4 flex-column">
        <Transaction />
      </div>
  )
}

export default IncomingTransactions