import { toast } from "react-toastify"
import { createBudget, createExpense, fetchData, storeData, deleteItem } from "../helpers"


export const  dashboardAction = async ({request}) => {

    const data = await request.formData()
    const formData = Object.fromEntries(data)

    const work = formData._action;

    if(work == 'storeUser') {
        try {
            storeData("userName", formData.userName)
            return toast.success(`Welcome ${formData.userName}`)
        } catch (e) {
            throw new Error("There was a problem creating your account.")
        }
    }
    
    if(work == 'addBudget') {
        try {
            createBudget(
                {
                    name: formData.newBudget,
                    amount: formData.newBudgetAmount,
                }
            )
            return toast.success(`Budget created`)
        } catch (e) {
            throw new Error("There was a problem creating your budget.")
        }
    }

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
