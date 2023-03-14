import "./App.css";
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

// const initialExpenses = [
//   { id: uuidv4(), charge: "rent", amount: 1600 },
//   { id: uuidv4(), charge: "car payment", amount: 400 },
//   { id: uuidv4(), charge: "credit card bill", amount: 1200 },
// ];
const initialExpenses = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : [];
function App() {
  //usestate 
  const [expense, setExpense] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
//useeffect
useEffect(()=>{
 console.log("we ccalled useEffect")
 localStorage.setItem('expenses',JSON.stringify(expense))
})


  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let list = expense.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpense(list);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const singleExpense = { id: uuidv4(), charge, amount };
        setExpense([...expense, singleExpense]);
        handleAlert({ type: "success", text: "item added" });
      }

      setAmount("");
      setCharge("");
    } else {
      handleAlert({
        type: "danger",
        text: `charge can't be empty value and amount has to be bigger than zero`,
      });
    }
  };
  //clear all items
  const clearItems = () => {
    setExpense([]);
    handleAlert({ type: "danger", text: "all items deleted" });
  };
  //delete
  const handleDelete = (id) => {
    let del = expense.filter((item) => item.id !== id);
    setExpense(del);
    handleAlert({ type: "danger", text: "item deleted" });
    setId(id);
  };
  //edit
  const handleEdit = (id) => {
    let edit = expense.find((item) => item.id === id);
    let { charge, amount } = edit;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert && <Alert type={alert.type} text={alert.text} />}
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleSubmit={handleSubmit}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          edit={edit}
        />
        <ExpenseList
          expense={expense}
          clearItems={clearItems}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </main>
      <h1>
        total amount :{" "}
        <span className="total">
          $
          {expense.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
