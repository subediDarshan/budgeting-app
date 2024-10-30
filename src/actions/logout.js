import { redirect } from "react-router-dom";
import { deleteItem } from "../helpers"
import { toast } from "react-toastify";

export const logoutAction = () => {
    deleteItem({key: "userName"});
    deleteItem({key: "budgets"})
    deleteItem({key: "expenses"})
    toast.success("Account deleted")
    return redirect('/')
}