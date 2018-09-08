$(document).ready(getTask);

$('.bottom-box').on('click', eventDelegator);
$('.save-btn').on('click', saveTask);

// Create HTML on page called by saveTask function
function createHTML(task) {
    var newTask =  `<div data-id="${task.id}"class="task-container">
                    <h2 class="title-of-task">${task.title}</h2>
                    <button class="delete-button"></button>
                    <p class="body-of-task">${task.body}</p>
                    <button class="upvote"></button>
                    <button class="downvote"></button>
                    <p class="quality">quality: 
                    <span class="qualityVariable">${task.quality}</span></p>
                    <hr>
                    </div>`;
    $( ".bottom-box" ).prepend(newTask);
    localStoreTask(task);
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
      // console.log(key);
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
  var title = $('#title-input').val();
  var body = $('#body-input').val();
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


function deleteIdea(e) {
  var id = $(event.target).closest('.task-container').data('id');
  $(event.target).parent().remove();
  localStorage.removeItem(id);
}



// Upvote/donvote/something

// $(".bottom-box").on('click', functionFunction) 

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





      






//Function for editing text
// function eventDelegatorEdit(event) {
//  if ($(event.target).hasClass('‘'title’)) {
//    editContent();
//  }
//  if ($(event.target).hasClass(‘idea-details’)) {
//    editContent();
//  }
// };

//NEED function to disable/enable save button

  // if ($('#title-input').val() === "" || $('#body-input').val() === "") {
  //    return false;
  // };  
