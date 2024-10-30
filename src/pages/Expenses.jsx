import { useLoaderData } from "react-router-dom";
import Table from "../components/Table";
import { fetchData, deleteItem } from "../helpers";
import { toast } from "react-toastify"




export const expensesAction = async ({request}) => {
  const data = await request.formData()
  const formData = Object.fromEntries(data)

    const work = formData._action;

    if(work == 'deleteExpense') {
      try {
          deleteItem({
              key: "expenses",
              id: formData.expenseId,
          })
          return toast.success(`Expense deleted`)
      } catch (e) {
          throw new Error("There was a problem deleting your expense.")
      }
  }
}


const Expenses = () => {
    const { expenses } = useLoaderData();
    
    return (
        <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
          <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses.sort((a, b) => (b.createdAt - a.createdAt))} />
        </div>
      ) : (
          <p>No Expenses to show</p>
        )}
    </div>
  );
};

export default Expenses;



export function expensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}