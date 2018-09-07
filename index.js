// var title = $('#title-input').val();
// var body = $('#body-input').val();
// // var numtasks = 0;
var qualityVariable = "swill";



function createHTML(task) {
    var newTask =  `<div id="${task.numtask}"class="task-container">
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
};



function TaskObject(title, body) {
  this.title = title;
  this.body = body;
  this.quality = qualityVariable;
  this.numtasks = 0;
}


$.each(localStorage, function(key) {
    var taskData = JSON.parse(this);
    this.numtasks++;
    createHTML(taskData);

    ;
});


function localStoreTask(object) {
  var taskString = JSON.stringify(object);
  localStorage.setItem('task' + object.numtasks  , taskString);
}



$('.save-btn').on('click', function(event) {
  var title = $('#title-input').val();
  var body = $('#body-input').val();
  var newTask = new TaskObject(title, body)

    
    event.preventDefault();
    if ($('#title-input').val() === "" || $('#body-input').val() === "") {
       return false;
    };  
    newTask.numtasks++;
    createHTML(newTask); 
    localStoreTask(newTask);
    $('form')[0].reset();

});



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
      










