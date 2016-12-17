     var gifs = "";
     var giphy = "";
     var topics = ["computers", "biology", "chemistry", "physics", "magnets", "engineering"]

     $("#hints").hide();   // hide hints that are available with a button
          
     showmeButtons();   // show the initial buttons on load

     $(".topics-button").on("click", function() { 

          var giffinder = $(this).attr("data-name");

          console.log(giffinder)

          var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + giffinder + "&api_key=dc6zaTOxFJmzC";
      
          console.log("query = " + queryURL)

        // need still url 
        // moving url
        // data state
        // picture

          $.ajax({
          url: queryURL,
          method: "GET"
          }).done(function(response) {


          $("#giphy-view").text(JSON.stringify(response));
   
          });
       

      });

      // Function for displaying movie data
     function showmeButtons() {
          $("#buttons-view").empty();
          for (var i = 0; i < topics.length; i++) {
               var a = $("<button>");
               a.addClass("topics-button");
               a.attr("data-name", topics[i]);
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

      // // Generic function for displaying the movieInfo
      // $(document).on("click", ".movie", displayMovieInfo);

     $(".gif").on("click", function() {

          console.log("clicked on .gif")
    
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

     $("#button-hints-show").on("click", function() {
          
          $("#hints").show();
          // var buttonlabel = $("#button.hints").attr("text");

          // console.log(buttonlabel)


          // if(buttonlabel == "Show Hints") {
          //      $("#button.hints").text("Hide Hints")
          // }
          // else {
          //       $("#button.hints").text("Show Hints")
          // }

     })  // end of hints button
   
