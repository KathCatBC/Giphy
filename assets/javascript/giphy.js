     var gifs = "";
     var giphy = "";
     searchString = ""
     var topics = ["Bill Nye", "computers", "biology", "chemistry", "physics", "magnets", "engineering"]

     $(".hints").hide();   // hide hints that are available with a button
          
     showmeButtons();   // show the initial buttons on load

     $(document).on("click",".topics-button", function() { 
        var giffinder = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + giffinder + "&api_key=dc6zaTOxFJmzC&limit=10&rating=y&rating=pg-13&rating=g&rating=pg";   

        $.ajax({
        url: queryURL,
        method: "GET"
        }).done(function(response) {

            $(".giphy-view").empty();
  
            for (i=0; i<response.data.length; i++){
                var g = $("<img>");
                g.addClass("gif");
                g.attr("src", response.data[i].images.downsized_still.url);
                g.attr("data-still", response.data[i].images.downsized_still.url);
                g.attr("data-animate", response.data[i].images.downsized.url);
                g.attr("data-state", "still")
                
                $(".giphy-view").append(g);
                $(".giphy-view").append("<figcaption> Rating:  " + response.data[i].rating + "</figcaption><br><br>");
            }
           
        });
        
        // Alert("Sorry, there was a problem with that search.  Please try a different search.")
    });

      // Function for displaying movie data
    function showmeButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("topics-button");
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
        $("#giphy-input").empty();  // why won't the text box empty?
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
   
