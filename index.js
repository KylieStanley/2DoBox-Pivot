
$('.bottom-box').on('click', eventDelegator);
// $('.bottom-box').on('keyup', eventDelegatorEdit);
$('.save-btn').on('click', saveTask);
// var title = $('#title-input').val();
// var body = $('#body-input').val();
// // var id = 0;
// var qualityVariable = "swill";


// Create HTML on page called by saveTask function
function createHTML(task) {
    var newTask =  `<div data-id="${task.id}"class="task-container">
                    <h2 class="title-of-task">${task.title}</h2>
                    <button class="delete-button"></button>
                    <p class="body-of-task">${task.body}</p>
                    <button class="upvote"></button>
                    <button class="downvote"></button>
                    <p class="quality">quality: 
                    <span class="qualityVariable">${task.quality[0]}</span></p>
                    <hr>
                    </div>`;
    $( ".bottom-box" ).prepend(newTask);
    localStoreTask(task);
};



//Constructor
function TaskObject(title, body) {
  this.title = title;
  this.body = body;
  this.quality = ['swill', 'plausible', 'genius'];
  this.id = Date.now();
}


//Get task from local storage
function getItem() {
  $.each(localStorage, function(key) {
      var retrievedTask = localStorage.getItem(key);
      var taskData = JSON.parse(retrievedTask);
      createHTML(taskData);
  });  
}


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
   upVote(event);
 }
 if ($(event.target).hasClass('downvote')) {
   downVote(event);
 }
};


function deleteIdea(e) {
  var id = $(event.target).closest('.task-container').data('id');
  $(event.target).parent().remove();
  localStorage.removeItem(id);
    }



// Upvote/donvote/something

$(".bottom-box").on('click', functionFunction) 

 function functionFunction() {

    var taskHTML = $(event.target).closest('.task-container');
    var taskHTMLId = taskHTML[0].id;
    var taskObjectInJSON = localStorage.getItem(taskHTMLId);
    var taskObjectInJS = JSON.parse(taskObjectInJSON);
  

    var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
    var qualityVariable;





    if (event.target.className === "upvote" || event.target.className === "downvote"){

        if (event.target.className === "upvote" && currentQuality === "plausible"){
            qualityVariable = "genius";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "upvote" && currentQuality === "swill") {
            qualityVariable = "plausible";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "downvote" && currentQuality === "plausible") {
            qualityVariable = "swill"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "genius") {
            qualityVariable = "plausible"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "swill") {
            qualityVariable = "swill";
        
        } else if (event.target.className === "upvote" && currentQuality === "genius") {
            qualityVariable = "genius";
        }



    taskObjectInJS.quality = qualityVariable;

    var newtaskJSON = JSON.stringify(taskObjectInJS);
    localStorage.setItem(taskHTMLId, newtaskJSON);
    }
   
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
