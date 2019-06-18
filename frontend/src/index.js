const eventsUrl = "http://localhost:3000/events"
const today = new Date()
const currentYear = today.getFullYear()
const currentMonth = today.getMonth()
const currentHour = today.getHours()
const currentMinute = today.getMinutes()
const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
const shortMon = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const main = document.getElementById('event-zoom')

document.addEventListener('DOMContentLoaded', () => {
  renderCalendar(currentYear, currentMonth)
})

function renderCalendar(year, month) {
  let startOfMonth = new Date(year, month).getDay()
  let numOfDays = 32 - new Date(year, month, 32).getDate()
  let renderNum = 1
  let pMonth = month - 1
  let nMonth = month + 1

  let tableBody = document.getElementById('table-body')
  let renderMonth = document.getElementById('month')
  let renderYear = document.getElementById('year')
  let leftArrow = document.getElementById('l-arrow')
  let rightArrow = document.getElementById('r-arrow')
  let monthJump = document.getElementById('jumpMonth')
  let yearJump = document.getElementById('jumpYear')
  let minYear = 1990;
  let diffMaxMin = 51;


  if (pMonth === -1){
    let pMonth = 11
    leftArrow.textContent = shortMon[`${pMonth}`]
    rightArrow.textContent = shortMon[`${nMonth}`]
  } else if (nMonth === 12) {
    let nMonth = 0
    leftArrow.textContent = shortMon[`${pMonth}`]
    rightArrow.textContent = shortMon[`${nMonth}`]
  } else {
    leftArrow.textContent = shortMon[`${pMonth}`]
    rightArrow.textContent = shortMon[`${nMonth}`]
  }

  renderMonth.textContent = months[`${month}`]
  renderYear.textContent = year

  tableBody.innerHTML = ""
  yearJump.innerHTML = ""
  monthJump.innerHTML = ""


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
    row.id = `tr-${i}`
    for (c=0; c<7; c++) {
      if (i===0 && c<startOfMonth) {
        let td = document.createElement('td')
        td.classList.add('empty')
        row.append(td)
      } else if (renderNum > numOfDays) {
        let td = document.createElement('td')
        td.classList.add('empty')
        row.append(td)
      } else {
        let td = document.createElement('td')
        let calButton = document.createElement('button')
        calButton.textContent = renderNum
        calButton.classList.add('cal-button')
        calButton.setAttribute('type', 'button')
        calButton.setAttribute('data-toggle', 'modal')
        calButton.setAttribute('data-target', "#AllEvents")
        calButton.setAttribute('onclick', 'allAppointments(this.id)')
        calButton.id = `${year}-${month + 1}-${renderNum}`
        td.classList.add('table-bordered')
        td.append(calButton)
        row.append(td)
        renderNum++
      }
    }
    tableBody.append(row)
  }

  for (i=0; i<diffMaxMin; i++) {
    let yearJump = document.getElementById('jumpYear')
    if (i===0) {
      let option = document.createElement('option')
      option.textContent = minYear
      option.value = minYear
      yearJump.append(option)
      minYear++
    } else if (minYear === year) {
      let option = document.createElement('option')
      option.textContent = minYear
      option.value = minYear
      option.setAttribute('selected', 'selected')
      yearJump.append(option)
      minYear++
    } else {
      let option = document.createElement('option')
      option.textContent = minYear
      option.value = minYear
      yearJump.append(option)
      minYear++
    }
  }



  for (i=0; i<12; i++) {
    if (i=== month) {
      let monthJump = document.getElementById('jumpMonth')
      let option = document.createElement('option')
      option.textContent = shortMon[`${i}`]
      option.value = `${i}`
      option.setAttribute('selected', 'selected')
      monthJump.append(option)

    } else {
      let monthJump = document.getElementById('jumpMonth')
      let option = document.createElement('option')
      option.textContent = shortMon[`${i}`]
      option.value = `${i}`
      monthJump.append(option)
    }

  }
}

function toggleCalendar() {
  let monthJump = document.getElementById('jumpMonth')
  let yearJump = document.getElementById('jumpYear')
  let tYear = parseInt(yearJump.value);
  let tMonth = parseInt(monthJump.value);
  renderCalendar(tYear, tMonth)
}

//toggling for next month
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

 //toggling for previous month
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

//storing new events/Appointments - Triggering event on submit
// let submitB = document.getElementById('submit-btn')
// submitB.addEventListener('click', (ev) => {
//   console.log('ive been pushed')
//   ev.preventDefault()
//   storeNewEvent()
// })

//compiling data for fetch request to add new event

function storeNewEvent() {
  console.log('in store event')
  let title = document.getElementById('f-title')
  let description = document.getElementById('f-description')
  let date = document.getElementById('f-date')
  let appt = document.getElementById('f-classification')
  let apptType = appt.value

  let body = {
    "user_id": 1,
    "title": title.value,
    "description": description.value,
    "date": date.value
  }
  body[apptType] = true

  let config = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json", Accept: "application/json"
    },
    body: JSON.stringify(body)
  }
  fetch (eventsUrl, config)
    .then(response => response.json())
    .then(data => renderAppointment(data))
}

//fetch request to get event data
function allAppointments(id) {
  fetch (eventsUrl)
    .then(response => response.json())
    .then(data => popUpAppointment(data, id))
}

function popUpAppointment(appts, id) {
  //clears the modal of previous appointment data
  main.innerHTML = ""
  //travers all the individual appointment data
  appts.forEach(appointment => {
    renderAppointment(appointment, id)
  })
}

//building out the individual appointments on the event Modal
//triggered by the date button on the calendar
function renderAppointment(appointment, idDay) {
  fullDate = appointment.date.split('T')[0]
  fullTime = appointment.date.split('T')[1]
  remZeroDate = fullDate.replace(/-0+/g, '-')

  //make sure that the appointment date matches the day on the calendar
  //if it does match, build a card onto the Modal
  if (remZeroDate === idDay) {
    const card = document.createElement('div')
    const zoomAppt = document.createElement('div')
    const h6Title = document.createElement('h6')
    const h6Time = document.createElement('h6')
    const p = document.createElement('p')
    const ul = document.createElement('ul')
    const deleteB = document.createElement('button')
    const editB = document.createElement('button')
    const eventTitle = document.getElementById('allEventsTitle')
    const {id, title, description, date,
      w_internal_meeting, w_client_meeting, w_party, networking,
      p_meeting, p_party, p_wellness,
      s_reminder, all_day_reminder, birthday
    } = appointment

    // edit button added to each appointment
    editB.classList.add('btn-primary')
    editB.setAttribute('type', 'button')
    editB.setAttribute('data-toggle', 'modal')
    editB.setAttribute('data-target', '#EditEvent')
    editB.setAttribute('data-dismiss', 'modal')
    editB.id = 'edit-event'
    editB.textContent = "Edit"
    editB.addEventListener('click', (ev) => {
      ev.preventDefault();
      popUpEventModal(appointment);
    })

    // delete button added to each appointment
    deleteB.classList.add('btn-secondary')
    deleteB.setAttribute('type', 'button')
    deleteB.id = 'delete-event'
    deleteB.textContent = "Delete"
    deleteB.addEventListener('click', (ev) => {
      ev.preventDefault()
      deleteEvent(id);
    })

    //building the card
    card.classList.add('card')
    card.id = id
    ul.id = `ul-${id}`

    //getting content from JSON data to populate the card
    h6Title.textContent = title
    h6Time.textContent = `Starts at ${fullTime}`
    p.textContent = description
    eventTitle.textContent = `Appointments for ${idDay}`

    //appending the card to the Modal
    main.append(card)
    card.append(zoomAppt)
    zoomAppt.append(ul, h6Title, h6Time, p, editB, deleteB)

    //getting the color bars to differentiate event types
    workMeetings(w_internal_meeting, w_client_meeting, w_party, networking, id)
    personalMeetings(p_meeting, p_party, p_wellness, birthday, title, id)
    generalReminders(s_reminder, all_day_reminder, id)

    //if there are no events on a date, populate the modal with the correct date
  } else {
    const eventTitle = document.getElementById('allEventsTitle')
    eventTitle.textContent = `Appointments for ${idDay}`
    return
  }
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

function popUpEventModal(appt) {
  let title = document.getElementById('e-title')
  let description = document.getElementById('e-description')
  let date = document.getElementById('e-date')
  // let appt = document.getElementById('e-classification')
  let id = appt.id
  let eTitle = appt.title
  eDesc = appt.description
  let eDate = appt.date

  title.value = eTitle
  description.value = eDesc
  date.value = eDate

  let subEditB = document.getElementById('sub-edit')
  subEditB.addEventListener('click', (ev) => {
    ev.preventDefault();
    editEvent(id)
  })
}



//edit event fetch request
function editEvent(id) {
  let title = document.getElementById('e-title')
  let description = document.getElementById('e-description')
  let date = document.getElementById('e-date')
  let appt = document.getElementById('e-classification')
  let apptType = appt.value

  let body = {
    "user_id": 1,
    "title": title.value,
    "description": description.value,
    "date": date.value
  }
  body[apptType] = true

  let config = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json", Accept: "application/json"
    },
    body: JSON.stringify(body)
  }
  fetch (eventsUrl + '/' + id, config)
    .then(response => response.json())
}

//delete event from HTML and data file
function deleteEvent(id) {
  let divId = document.getElementById(id)
  let config = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }
  fetch(eventsUrl + '/' + id, config)
    .then(response => response.json())

  divId.remove()
}


$('#displayModal').modal('show');
