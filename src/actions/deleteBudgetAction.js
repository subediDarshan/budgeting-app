import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers"
import { redirect } from "react-router-dom";


export const deleteBudgetAction = ({ params }) => {
    
    try {
        deleteItem({
            key: "budgets",
            id: params.id
        })

        const expenses = getAllMatchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id,
        })

        expenses.forEach(expense => {
            deleteItem({
                key: "expenses",
                id: expense.id,
            })
        });

        toast.success("Budget deleted")

        return redirect("/")

    } catch (error) {
        throw new Error("Problem deleting budget")
    }

}