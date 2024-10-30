import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { createExpense, deleteItem, getAllMatchingItems } from '../helpers'
import BudgetItem from '../components/BudgetItem'
import AddExpenseForm from '../components/AddExpenseForm'
import Table from '../components/Table'
import { toast } from 'react-toastify'


export const budgetPageLoader = ({params}) => {

    const budget = getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: params.id,
    })[0]

    if(!budget) {
        throw new Error("No budget found")
    }

    const expenses = getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id,
    })
    return { budget, expenses }
}



export const  budgetPageAction = async ({request}) => {

    const data = await request.formData()
    const formData = Object.fromEntries(data)

    const work = formData._action;

    if(work == 'createExpense') {
        try {
            createExpense({
                name: formData.newExpense,
                amount: formData.newExpenseAmount,
                budgetId: formData.newExpenseBudget,
            })
            return toast.success(`Expense created`)
        } catch (e) {
            throw new Error("There was a problem creating your expense.")
        }
    }


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




function BudgetPage() {

  const { budget, expenses } = useLoaderData()
  


  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} showBudget= {false} />
        </div>
      )}
    </div>
  )
}

export default BudgetPage