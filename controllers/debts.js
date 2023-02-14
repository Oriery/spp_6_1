let debts = [
  {id: '1', name: 'Debt 1', person: "Dave", iOwn: true, amount: 1000, status: 'pending'},
  {id: '2', name: 'Debt 2', person: "Mark", iOwn: false, amount: 2000, status: 'pending'},
  {id: '3', name: 'Debt 3', person: "Julie", iOwn: true, amount: 3000, status: 'paid'},
  {id: '4', name: 'Debt 4', person: "Andrew", iOwn: false, amount: 4000, status: 'paid'},
]

export const debtsPage = (req, res) => {
  renderDebtsPage(res)
}

export const postDebt = (req, res) => {
  if (req.body.id) { setDebtStatus(req, res); return }
  
  const newDebt = {
    id: Date.now().toString(),
    status: 'pending',
    ...req.body,
  }
  debts.push(newDebt)

  renderDebtsPage(res)
}

function setDebtStatus (req, res) {
  const {status, id} = req.body

  const debt = debts.find((debt) => debt.id == id)

  if (debt) {
    debt.status = status
    renderDebtsPage(res)
  } else {
    renderDebtsPage(res, {code: 404, message: 'Debt not found.'})
  }
} 

function renderDebtsPage(res, error) {
  res.render('debts', {title: 'Debts', active: 'debts', debts: debts, error : error})
}