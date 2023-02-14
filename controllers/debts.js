import axios from 'axios'

const convertStatus = {
  0: 'pending',
  1: 'paid',
  2: 'cancelled'
}

export const debtsPage = (req, res) => {
  renderDebtsPage(res)
}

export const postDebt = (req, res) => {
  if (req.body.id) { setDebtStatus(req, res); return }

  const newDebt = {
    id: Date.now().toString(),
    status: 'pending',
    iOwe: req.body.iOwe === 'true',
    name: req.body.name,
    person: req.body.person,
    amount: req.body.amount
  }
  
  axios.post('http://localhost:4004/user/Debts', newDebt)

  renderDebtsPage(res)
}

async function setDebtStatus (req, res) {
  const {status, id} = req.body

  const debt = await axios.get(`http://localhost:4004/user/Debts/${id}`)

  if (debt) {
    debt.status = status
    renderDebtsPage(res)
  } else {
    renderDebtsPage(res, {code: 404, message: 'Debt not found.'})
  }
} 

async function renderDebtsPage(res, error) {
  res.render('debts', {title: 'Debts', active: 'debts', debts: await getDebts(), error : error})
}

async function getDebts() {
  const response = await axios.get('http://localhost:4004/user/Debts')

  let debts = response.data.value
  // convert to right format
  debts = debts.map(debt => {
    debt.id = debt.ID,
    debt.amount = debt.initAmount
    debt.status = convertStatus[debt.status]

    return debt
  })

  return debts
}