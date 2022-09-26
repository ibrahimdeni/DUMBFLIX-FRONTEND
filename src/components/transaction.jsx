import Table from "react-bootstrap/Table";
import "../assets/styles/style.css";
import DropdownTransaction from "./dropdown";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";

const style = {
  approved: {
    color: "green",
  },
  inactive: {
    color: "red",
  },
  pending: {
    color: "orange",
  },
};

function Transaction() {
  const [transactionData, setTransactionData] = useState([]);

  let { data: transaction } = useQuery("transactionCache", async () => {
    const response = await API.get("/transactions");
    setTransactionData(response.data.data);
    return response.data.data;
  });

  console.log("transactionData", transactionData);

  function Duration(dueDate, startDate) {
    const due = new Date(dueDate);
    startDate = new Date();

    let duration;

    if (startDate < due) {
      duration = new Date(due - startDate);
    }

    let years = duration.getFullYear() - 1970;
    let months = duration.getMonth();
    let days = duration.getDate();

    let yearTxt = "year";
    let monthTxt = "month";
    let dayTxt = "day";

    if (years > 1) yearTxt += "s";
    if (months > 1) monthTxt += "s";
    if (days > 1) dayTxt += "s";

    if (years >= 1) {
      duration = `${years} ${yearTxt} ${months} ${monthTxt} ${days} ${dayTxt}`;
    } else if (months >= 1) {
      duration = `${months} ${monthTxt} ${days} ${dayTxt}`;
    } else {
      duration = `${days} ${dayTxt}`;
    }
    return duration;
  }
  return (
    <>
      <h3 style={{ color: "white" }} className="ps-5 pt-2 ms-5 mb-5">
        Incoming Transactions
      </h3>
      <Table
        striped
        bordered
        hover
        variant="dark"
        className="tblTransaction m-auto"
      >
        <thead>
          <tr>
            <th>No</th>
            <th>Fullname</th>
            <th>Email</th>
            <th>Remaining Active</th>
            <th>Status User</th>
            <th>Status Payment</th>
          </tr>
        </thead>
        <tbody>
          {transactionData?.map((item, index) => {
            return (
              <>
                <tr
                  style={{ height: "60px" }}
                  className="text-center"
                  key={index}
                >
                  <td>{index + 1}</td>
                  <td>{item.user.fullname}</td>
                  <td>{item.user.email}</td>
                  {item.status === "success" ? (
                    <td className="text-success">
                      {Duration(item.duedate, item.startdate)}
                    </td>
                  ) : (
                    <td className="text-danger">0 day</td>
                  )}
                  <td
                    className={
                      item.status === "success" ? "text-success" : "text-danger"
                    }
                  >
                    {item.status === "success" ? "Active" : "Not Active"}
                  </td>
                  <td
                    className={
                      item.status === "success"
                        ? "text-success"
                        : item.status === "pending"
                        ? "text-warning"
                        : "text-danger"
                    }
                  >
                    {item.status === "success"
                      ? "Success"
                      : item.status === "pending"
                      ? "Pending"
                      : "Failed"}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Transaction;
