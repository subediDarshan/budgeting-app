// Local Storage

export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key)) 
}

export const deleteItem = ({key, id}) => {
    if(id) {
      const data = fetchData(key) ?? [];
      const newData = data.filter((item) => (item.id !== id))
      return storeData(key, newData)
    }
    localStorage.removeItem(key)
}

export const storeData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}


const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
  }

export const createBudget = ({name, amount}) => {
    const newBudget = {
        id: crypto.randomUUID(),
        name,
        amount: +amount,
        createdAt: Date.now(),
        color: generateRandomColor(),
    }
    const existingBudgets = fetchData("budgets") ?? []
    
    storeData("budgets", [...existingBudgets, newBudget])
}


export const createExpense = ({name, amount, budgetId}) => {
    const newExpense = {
        id: crypto.randomUUID(),
        name,
        amount: +amount,
        createdAt: Date.now(),
        budgetId
    }
    const existingExpenses = fetchData("expenses") ?? []
    
    storeData("expenses", [...existingExpenses, newExpense])
}


export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
      if (expense.budgetId !== budgetId) return acc
      return acc += expense.amount
    }, 0)
    return budgetSpent;
  }
  
  
  // FORMATTING
  export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

  
  // Formating percentages
  export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 0,
    })
  }
  
  // Format currency
  export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
      style: "currency",
      currency: "USD"
    })
  }


  export const getAllMatchingItems = ({category, key, value}) => {
    const allItems = fetchData(category) ?? []
    return allItems.filter((item) => (item[key] === value))
  }


