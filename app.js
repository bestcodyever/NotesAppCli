$(document).ready(()=>{
})

$.get('https://tranquil-tundra-87782.herokuapp.com/notes',(data)=>{
  console.log(data);
  for (var i = 0; i < data.length; i++) {
          $('.card-group').append(
            `<div class="card card-outline-warning mb-3 text-center">
              <div class="card-block" style="height: 40vh;">
              <div class ="top">
              <button type="button" data-id="${data[i].id}" class="close" aria-label="Close">
              <span aria-hidden="true">&times;</span> </button>
              </div>
              <h4 class="card-title">${data[i].fam}</h4>
              <p class="card-text">${data[i].note} </p>
              <p class="card-text"><small class="text-muted">${data[i].priority}<br>${data[i].date.slice(0,10)}</p></small>
              <div class="footerButton" style="">
            </div>
            </div>`
          )
  }
})
