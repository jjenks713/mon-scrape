// Grab the articles as a json
$.getJSON("/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + "<a href=" + data[i].link + "></a>" + data[i].link + "</p><br>");
    }
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function () {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        // With that done, add the note information to the page
        .then(function (data) {
            console.log(data);
            // The title of the article
            $("#notes").append("<h2>" + data.title + "</h2><br>");
            // note info
            // $("#notes").append("<h5 class='text-center'>Note Title: " + data.note.title + "</h5>" +
            // "<h5 class='text-center'>Note: " + data.note.body + "</h5><br><br>"
            // );

            $("#notes").append("<h3 class='text-center'>Input a new note</h3><br>");
            // An input to enter a new title
            // A textarea to add a new note body
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<form><input class='bg-dark text-light' id='titleinput' name='title' placeholder='Note Title'><br>" +
                "<textarea class='bg-dark text-light' id='bodyinput' name='body' placeholder='Note Body'></textarea><br>" +
                "<div><button class='btn btn-dark float-left' data-id='" + data._id + "' id='savenote'>Save Note</button></div><br><br>" +
                "<form>"
            );


            // If there's a note in the article
            if (data.note) {
                //   // Place the title of the note in the title input
                //   $("#titleinput").val(data.note.title);
                //   // Place the body of the note in the body textarea
                //   $("#bodyinput").val(data.note.body);
                $("#notes").append("<div class='card p-5'>" +
                    "<div class='card-title'><h5 class='text-center'>Note Title: <br>" + data.note.title + "</h5></div>" +
                    "<div class='card-text'><h5 class='text-center'>Note: <br>" + data.note.body + "</h5>" +
                    "<button class='btn btn-dark float-right' data-id='" + data.note._id + "' id='deletenote'>Delete Note</button></div></div><br><br>"
                );

            }
        });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            // Value taken from title input
            title: $("#titleinput").val(),
            // Value taken from note textarea
            body: $("#bodyinput").val()
        }
    })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});
// When you click the savenote button
$(document).on("click", "#deletenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    console.log("delete note", thisId);
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "DELETE",
        url: "/articles/" + thisId,
        data: {
            _id: thisId
        }
    })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });
});
