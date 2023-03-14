import React from "react";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

const ExpenseList = ({ expense , clearItems,handleDelete,handleEdit}) => {
  return (
    <>
      <ul className="list">
        {expense.map((item) => {
          return <ExpenseItem key={item.id} item={item} handleDelete={handleDelete} handleEdit={handleEdit}/>;
        })}
      </ul>
      {expense.length > 0 ? (
        <button className="btn" onClick={clearItems}>
          clear expenses
          <MdDelete className="btn-icon" />
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default ExpenseList;
