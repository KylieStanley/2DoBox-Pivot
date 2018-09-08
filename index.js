$(document).ready(getTask);

$('.bottom-box').on('click', eventDelegator);
$('.save-btn').on('click', saveTask);
$('.search-input').on('keyup', searchTask);
$('.title-input').on('keyup', enableSave)
$('.body-input').on('keyup', enableSave)

// Create HTML on page called by saveTask function
function createHTML(task) {
  var newTask =  `<div data-id="${task.id}"class="task-container">
                    <h2 contenteditable="true" class="title-of-task edit">${task.title}</h2>
                    <button class="delete-button"></button>
                    <p contenteditable="true" class="body-of-task edit">${task.body}</p>
                    <button class="upvote"></button>
                    <button class="downvote"></button>
                    <p class="quality">quality: 
                    <span class="qualityVariable">${task.quality}</span></p>
                    <hr>
                    </div>`;
  $( ".bottom-box" ).prepend(newTask);
  localStoreTask(task);
  $('.edit').on('keypress', editTaskEnter);
  $('.edit').on('focusout', editTaskClick);
};



//Constructor
function TaskObject(title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = Date.now();
}


//Get task from local storage
function getTask() {
  for (var i = 0; i < localStorage.length; i++) {
      var retrievedTask = localStorage.getItem(localStorage.key(i));
      var taskData = JSON.parse(retrievedTask);
      createHTML(taskData);
  }
};


//Stores task into local storage
function localStoreTask(obj) {
  var taskString = JSON.stringify(obj);
  localStorage.setItem(obj.id, taskString);
}


//On save click, creates the new task
function saveTask(event) {
  var title = $('.title-input').val();
  var body = $('.body-input').val();
  var newTask = new TaskObject(title, body)
  event.preventDefault();
  createHTML(newTask); 
  localStoreTask(newTask);
  $('form')[0].reset();
};


function eventDelegator(event) {
 if ($(event.target).hasClass('delete-button')) {
   deleteIdea(event);
 }
 if ($(event.target).hasClass('upvote')) {
   $($(event.target).siblings('.quality').children()[0]).text(upVote(event));
   voteStorage(event);
 }
 if ($(event.target).hasClass('downvote')) {
   $($(event.target).siblings('.quality').children()[0]).text(downVote(event));
   voteStorage(event);
 }
};

function eventDelegatorEdit(event) {
 if ($(event.target).hasClass('title')) {
   editContent();
 }
 if ($(event.target).hasClass('idea-details')) {
   editContent();
 }
};

function deleteIdea(e) {
  var id = $(event.target).closest('.task-container').data('id');
  $(event.target).parent().remove();
  localStorage.removeItem(id);
}



// Upvote/donvote/something


function upVote(event) {
  var qualityArray = ['swill', 'plausible', 'genius'];
  var currentQuality = $($(event.target).siblings('.quality').children()[0]).text();
  for (var i = 0; i < qualityArray.length; i++) {
    if (currentQuality === qualityArray[i]){
      return currentQuality = qualityArray[i+1];
    }
  }
}

function downVote(event) {
  var qualityArray = ['swill', 'plausible', 'genius'];
  var currentQuality = $($(event.target).siblings('.quality').children()[0]).text();
  for (var i = 0; i < qualityArray.length; i++) {
    if (currentQuality === qualityArray[i]){
     return currentQuality = qualityArray[i-1];
    }
  }
}

function voteStorage(event) {
  var retrieveTask = JSON.parse(localStorage.getItem($(event.target).parents('.task-container').attr('data-id')));
  retrieveTask.quality = $($(event.target).siblings('.quality').children()[0]).text();
  localStoreTask(retrieveTask);
}

function editTaskEnter(event) {
  if (event.keyCode === 13) {
    var parseObj = JSON.parse(localStorage.getItem($(event.target).parents('.task-container').attr('data-id')));
    parseObj.title = $('.title-of-task').html();
    parseObj.body = $('.body-of-task').html();
    localStoreTask(parseObj);
    document.activeElement.blur();
  } 
}

function editTaskClick(event) {
  var parseObj = JSON.parse(localStorage.getItem($(event.target).parents('.task-container').attr('data-id')));
  parseObj.title = $('.title-of-task').html();
  parseObj.body = $('.body-of-task').html();
  localStoreTask(parseObj);
}

// search function
function searchTask() {
   var value = $(this).val().toLowerCase();
   $(".task-container").filter(function() {
     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
   });
 };




//NEED function to disable/enable save button
function enableSave() {
  if ($('.title-input').val().length === 0 || $('.body-input').val().length === 0) {
    $('.save-btn').prop('disabled', true)
    } else {
      $('.save-btn').prop('disabled', false)
    }  
};
