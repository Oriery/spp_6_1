let debts = [
  {id: '1', name: 'Debt 1', amount: 1000, status: 'pending'},
  {id: '2', name: 'Debt 2', amount: 2000, status: 'pending'},
  {id: '3', name: 'Debt 3', amount: 3000, status: 'paid'},
  {id: '4', name: 'Debt 4', amount: 4000, status: 'paid'},
]

export const debtsPage = (req, res) => {
  res.render('debts', {title: 'Debts', active: 'debts', debts: debts})
}

export const createDebt = (req, res) => {
  const newDebt = {
    id: Date.now().toString(),
    ...req.body
  }
  debts.push(newDebt)

  res.redirect('/debts')
}

export const setDebtStatus = (req, res) => {
  const {status} = req.body
  const {id} = req.params

  const debt = debts.find((debt) => debt.id == id)

  if (debt) {
    debt.status = status
    res.redirect('/debts')
  } else {
    res.status(404).json({message: 'Debt not found.'})
  }
} 