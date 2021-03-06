     var gifs = "";
     var giphy = "";
     searchString = ""
     var topics = ["Bill Nye", "computers", "biology", "chemistry", "physics", "magnets", "engineering"]

     $(".hints").hide();   // hide hints that are available with a button
          
     showmeButtons();   // show the initial buttons on load

     $(document).on("click",".topics-button", function() { 
        var giffinder = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giffinder + "&api_key=dc6zaTOxFJmzC&limit=10&rating=y&rating=pg-13&rating=g&rating=pg";   

        $.ajax({
        url: queryURL,
        method: "GET"
        }).done(function(response) {

            $(".giphy-view").empty();
  
            for (i=0; i<response.data.length; i++){
                var gifDiv = $("<div>");
                gifDiv.addClass("gif-style");
                
                var caption = ("Rating:  " + response.data[i].rating);

                var g = $("<img>");
                g.addClass("gif");
                g.attr("src", response.data[i].images.fixed_height_still.url);
                g.attr("data-still", response.data[i].images.fixed_height_still.url);
                g.attr("data-animate", response.data[i].images.fixed_height.url);
                g.attr("data-state", "still")
         
                var spacer = $("<br>")
                
                gifDiv.append(caption);
                gifDiv.append(spacer);
                gifDiv.append(g);
                $(".giphy-view").append(gifDiv);
                
            }  // end of for loop
           
            if (response.data.length === 0) {        // if the user enters a topic that does
                var badgif = topics.indexOf(giffinder) // not return gifs  - Alert the user
                topics.splice(badgif, 1)               // and remove the button
                showmeButtons()                        // then refresh the button list
                alert("Sorry that search did not work, please try a different search.");
            }

        })
        
    });

    function showmeButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("topics-button btn btn-default");
            searchString = topics[i].replace(/ /g, "+")
            a.attr("data-name", searchString);   
            a.text(topics[i]);
            $("#buttons-view").append(a);
        }
    }

  
    $("#add-giphy").on("click", function(event) {     //adds a button to the topics array and displays it
        event.preventDefault();
        var giphynew = $("#giphy-input").val().trim();
        if(topics.indexOf(giphynew) == -1) {  //only push into an array if it is not in there already
            topics.push(giphynew);
        }
        $("#giphy-input").val("")
        showmeButtons();            // call the function to display the buttons
    });

    

    $(document).on("click", ".gif", function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        } 
        else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    });  // end of still/animate


    // show/hide hints below
    $("#button-hints-show").on("click", function() {
        $(this).hide();
        $(".hints").show();
        $("#button-hints-hide").show()
    })

    $("#button-hints-hide").on("click", function() {
        $(this).hide();
        $(".hints").hide();
        $("#button-hints-show").show()
    })  // end of show/hide hints
   
