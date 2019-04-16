const eventsUrl = "http://localhost:3000/events"

document.addEventListener('DOMContentLoaded', () => {
  fetch(eventsUrl)
    .then(response => response.json())
    .then(data => {allAppointments(data)})
})

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
