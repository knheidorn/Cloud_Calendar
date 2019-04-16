const eventsUrl = "http://localhost:3000/events"
const today = new Date()
const currentYear = today.getFullYear()
const currentMonth = today.getMonth()
const currentHour = today.getHours()
const currentMinute = today.getMinutes()
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



document.addEventListener('DOMContentLoaded', () => {
  renderCalendar(currentYear, currentMonth)
  // renderCalendar(2019, 5)

  fetch(eventsUrl)
    .then(response => response.json())
    .then(data => {allAppointments(data)})

})

function renderCalendar(year, month) {
  let startOfMonth = new Date(year, month).getDay()
  let numOfDays = 32 - new Date(year, month, 32).getDate()
  let renderNum = 1

  let tableBody = document.getElementById('table-body')
  let renderMonth = document.getElementById('month')
  let renderYear = document.getElementById('year')
  let leftArrow = document.getElementById('l-arrow')
  let rightArrow = document.getElementById('r-arrow')

  renderMonth.textContent = months[`${month}`]
  renderYear.textContent = year

  tableBody.innerHTML = ""

  leftArrow.addEventListener('click', (ev) => {
    ev.preventDefault()
    previousMonth(year, month)
  })

  rightArrow.addEventListener('click', (ev) => {
    ev.preventDefault()
    nextMonth(year, month)
  })

  for (i=0; i<6; i++) {
    let row = document.createElement('tr')
    for (c=0; c<7; c++) {
      if (i===0 && c<startOfMonth) {
        let td = document.createElement('td')
        td.classList.add('empty')
        row.append(td)
      } else if (renderNum > numOfDays) {
        break
      } else {
        let td = document.createElement('td')
        td.textContent = renderNum
        row.append(td)
        renderNum++
      }
    }
    tableBody.append(row)
  }
}

function nextMonth(year, month) {
  let nextM = month + 1
  if (nextM === 12) {
    let newM = 0
    let nextY = year + 1
    renderCalendar(nextY, newM)
  } else {
    renderCalendar(year, nextM)
  }
}

function previousMonth(year, month) {
  let previousM = month - 1
  if (previousM === -1) {
    let newPM = 11
    let previousY = year - 1
    renderCalendar(previousY, newPM)
  } else {
    renderCalendar(year, previousM)
  }
}

function allAppointments(appts) {
  appts.forEach(appointment => {
    renderAppointment(appointment)
  })
}

function renderAppointment(appointment) {
  const main = document.getElementById('event-zoom')
  const zoomAppt = document.createElement('div')
  const updateB = document.createElement('button')
  const deleteB = document.createElement('button')
  const exitB = document.createElement('button')
  const h3 = document.createElement('h3')
  const p = document.createElement('p')
  const ul = document.createElement('ul')

  const {id, title, description, date,
    w_internal_meeting, w_client_meeting, w_party, networking,
    p_meeting, p_party, p_wellness,
    s_reminder, all_day_reminder, birthday
  } = appointment

  exitB.classList.add('exit')
  exitB.id = `exit-${id}`
  zoomAppt.classList.add('card')
  ul.id = `ul-${id}`

  h3.textContent = title
  p.textContent = description
  exitB.textContent = '⤫'
  updateB.textContent = 'Edit'
  deleteB.textContent = 'Delete'
  main.append(zoomAppt)
  zoomAppt.append(exitB, ul, h3, p, updateB, deleteB)

  workMeetings(w_internal_meeting, w_client_meeting, w_party, networking, id)
  personalMeetings(p_meeting, p_party, p_wellness, birthday, title, id)
  generalReminders(s_reminder, all_day_reminder, id)
}

function workMeetings(internal, client, party, networking, id) {
  let ul = document.getElementById(`ul-${id}`)
  if (internal) {
    ul.classList.add('w_internal_meeting')
    ul.textContent = "Internal Meeting"
  } else if (client) {
    ul.classList.add('w_client_meeting')
    ul.textContent = "Client Meeting"
  } else if (party) {
    ul.classList.add('w_party')
    ul.textContent = "Work Event"
  } else if (networking) {
    ul.classList.add('networking')
    ul.textContent = "Networking"
  } else {
    return
  }
}

function personalMeetings(meeting, party, wellness, birthday, title, id) {
  let ul = document.getElementById(`ul-${id}`)
  if (meeting) {
    ul.classList.add('p_meeting')
    ul.textContent = "Personal Appointment"
  } else if (party) {
    ul.classList.add('p_party')
    ul.textContent = "Personal Event"
  } else if (wellness) {
    ul.classList.add('p_wellness')
    ul.textContent = title
  } else if (birthday) {
    ul.classList.add('birthday')
    ul.textContent = title
  } else {
    return
  }
}

function generalReminders(reminder, all_day, id) {
  let ul = document.getElementById(`ul-${id}`)
  if (reminder) {
    ul.classList.add('s_reminder')
    ul.textContent = 'Reminder'
  } else if (all_day) {
    ul.classList.add('all_day_reminder')
    ul.textContent = 'All Day Event'
  } else {
    return
  }
}
