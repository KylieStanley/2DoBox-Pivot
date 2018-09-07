$('.save-btn').on('click', saveTask);
// var title = $('#title-input').val();
// var body = $('#body-input').val();
// // var id = 0;
var qualityVariable = "swill";


// Create HTML on page called by saveTask function
function createHTML(task) {
    var newTask =  `<div id="${task.id}"class="task-container">
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
  this.quality = qualityVariable;
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
  localStorage.setItem('task' + obj.id , taskString);
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



// Upvote/donvote/something
$(".bottom-box").on('click', function(event){
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

    var taskHTML = $(event.target).closest('.task-container');
    var taskHTMLId = taskHTML[0].id;
    var taskObjectInJSON = localStorage.getItem(taskHTMLId);
    var taskObjectInJS = JSON.parse(taskObjectInJSON);

    taskObjectInJS.quality = qualityVariable;

    var newtaskJSON = JSON.stringify(taskObjectInJS);
    localStorage.setItem(taskHTMLId, newtaskJSON);
    }
   
    else if (event.target.className === "delete-button") {
        var taskHTML = $(event.target).closest('.task-container').remove();
        var taskHTMLId = taskHTML[0].id;
        localStorage.removeItem(taskHTMLId);
    }
});
      








//NEED function to disable/enable save button

  // if ($('#title-input').val() === "" || $('#body-input').val() === "") {
  //    return false;
  // };  
