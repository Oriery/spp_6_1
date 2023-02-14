let debts = [
  {id: '1', name: 'Debt 1', amount: 1000, status: 'pending'},
  {id: '2', name: 'Debt 2', amount: 2000, status: 'pending'},
  {id: '3', name: 'Debt 3', amount: 3000, status: 'payed'},
  {id: '4', name: 'Debt 4', amount: 4000, status: 'payed'},
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
  const {status, id} = req.body

  const debt = debts.find((debt) => debt.id === id)

  if (debt) {
    debt.status = status
    res.status(200).json(debt)
  } else {
    res.status(404).json({message: 'Debt not found.'})
  }

  res.redirect('/debts')
} 