$(document).ready(() => {})
const url = 'https://tranquil-tundra-87782.herokuapp.com/notes/'
// const url = 'http://localhost:3000/notes/'
$.get(url, function(cardsData) {
  makeCards(cardsData)
})

$('#addNote').click(function() {
  sendPostRequest()
  $('').modal('toggle')
})
$('#editNote').click(function() {
  let editId = $('.noteId').val()
  $(`#card${editId}`).remove()
  sendPutRequest()
  $('#modal').modal('toggle')
})

$('.cards-group').click(function(event) {
  const destroy = $(event.target).attr('data-id')
  $.ajax({
    url: url + destroy,
    type: 'DELETE',
    success: function(result) {
      $(`#span${destroy}`).fadeOut()
      $(`#card${destroy}`).fadeOut()
    }
  })
})

function sendPostRequest(event) {
  let recipientForm = $('.recipientForm').val()
  let noteForm = $('.noteForm').val()
  let dateForm = $('.dateForm').val()
  let priorityForm = $('.priorityForm').val()
  var newPost = {
    note: noteForm,
    fam: recipientForm,
    date: dateForm,
    priority: priorityForm
  }
  $.post(url, newPost)
    .then((resPost) => {
      $.get(url + resPost, function(cardsData) {
        makeCard(cardsData)
      })
    })
}

function sendPutRequest(event) {
  let editId = $('.noteId').val()
  let recipientFormPut = $('.recipientForm2').val()
  let noteFormPut = $('.noteForm2').val()
  let dateFormPut = $('.dateForm2').val()
  let priorityFormPut = $('.priorityForm2').val()
  var newPost2 = {
    note: noteFormPut,
    fam: recipientFormPut,
    date: dateFormPut,
    priority: priorityFormPut
  }
  $.ajax({
    url: url + editId,
    type: 'PUT',
    data: newPost2,
    success: function(result) {
      $.get(url + result, function(cardsData) {
        makeCard(cardsData)
      })
    }
  })
}

function makeCard(cardsData) {
  $('.cards-group').append(
    `<div class="card card-outline-warning mb-3 text-center" id="card${cardsData.id}">
    <div class="card-block" style="height: 40vh;">
    <div class ="top">
    <button type="button" data-id="${cardsData.id}" class="close" id="delete${cardsData.id}"aria-label="Close">
    <span aria-hidden="true" data-id="${cardsData.id}" id="span${cardsData.id}">&times;</span> </button>
    </div>
    <h4 class="card-title">${cardsData.fam}</h4>
    <p class="card-text">${cardsData.note} </p>
    <p class="card-text"><small class="text-muted">${cardsData.priority}<br>${cardsData.date.slice(0,10)}</p></small>
    <div class="footerButton" style=""><p class="noteId">Note Id: ${cardsData.id}</p>
  </div>
  </div>`
  )
}

function makeCards(cardsData) {
  for (var i = 0; i < cardsData.length; i++) {
    $('.cards-group').append(
      `<div class="card card-outline-warning mb-3 text-center" id="card${cardsData[i].id}">
              <div class="card-block" style="height: 40vh;">
              <div class ="top">
              <button type="button" data-id="${cardsData[i].id}" class="close" id="delete${cardsData[i].id}"aria-label="Close">
              <span aria-hidden="true" data-id="${cardsData[i].id}" id="span${cardsData[i].id}">&times;</span> </button>
              </div>
              <h4 class="card-title">${cardsData[i].fam}</h4>
              <p class="card-text">${cardsData[i].note} </p>
              <p class="card-text"><small class="text-muted">${cardsData[i].priority}<br>${cardsData[i].date.slice(0,10)}</p></small>
              <div class="footerButton" style=""><p class="noteId">Note Id: ${cardsData[i].id}</p>
            </div>
            </div>`
    )
  }
}
