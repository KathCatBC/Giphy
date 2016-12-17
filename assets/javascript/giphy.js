     var gifs = "";
     var giphy = "";
     var topics = ["computers", "biology", "chemistry", "physics", "magnets", "engineering"]

     $("#hints").hide();   // hide hints that are available with a button
          
     showmeButtons();   // show the initial buttons on load

     $(".topics-button").on("click", function() { 

          var giffinder = $(this).attr("data-name");

          console.log(giffinder)

       var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + giffinder + "&api_key=dc6zaTOxFJmzC&limit=10&rating=y&rating=pg-13&rating=g&rating=pg";   

          console.log("query = " + queryURL)


          $.ajax({
          url: queryURL,
          method: "GET"
          }).done(function(response) {

            $(".giphy-view").empty();

          
           for (i=0; i<response.data.length; i++){
                  var g = $("<img>");
                     g.addClass("gif");
                  g.attr("src", response.data[i].images.original_still.url);
                  g.attr("data-still", response.data[i].images.original_still.url);
                  g.attr("data-animate", response.data[i].images.original.url);
                  g.attr("data-state", "still")
               
                  
               $(".giphy-view").append(g);
               $(".giphy-view").append("Rating:  " + response.data[i].rating);
            }
           
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

     $("#button-hints-show").on("click", function() {
          
          $("#hints").show();
          

     })  // end of hints button
   
