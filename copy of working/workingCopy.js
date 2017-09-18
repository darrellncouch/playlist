//playlist page
$(document).ready(function(){
  $.get("https://lit-fortress-6467.herokuapp.com/object", function(data){

    let main = data.results;


    var imgCont = $("#imgContainer");

    //puts album are on page
    for (let i = 0; i < main.length; i++){
      let imgCreate = $("<img class='imgSizing'></img>");
      $(imgCreate).attr('src', main[i].cover_art);
      $(imgCont).append(imgCreate);
    }

    let imgBtn = $(".imgSizing");
    var boxCont = $("<p></p>");
    var infoCont = $("#info");

    //Stores raw clicked data into an array
    var rawPlaylistArray = [];


    //makes images clickable and pushes ablbum info into the raw array
    $(imgBtn).click(function(){
      $(this).click(function(){
        $(infoCont).empty();
        for (let i = 0; i < main.length; i++){
          if($(this).attr('src') === main[i].cover_art){
            rawPlaylistArray.push(main[i].artist.concat(": ").concat(main[i].title));
            filter();
            }
          }
      })
    })

    //filter raw data to get rid of repeats
    var sortedArray = rawPlaylistArray.slice().sort();
    var filteredPlaylistArray = [];
    function filter(){
    for (let i = 0; i < rawPlaylistArray.length; i++){
      if(sortedArray[i + 1] === sortedArray[i]){

        }else{
          filteredPlaylistArray.push(sortedArray[i]);
          pushToPage();
          console.log(sortedArray);
        }
      }
    }



    //puts info on page.
    function pushToPage(){
      for (let j = 0; j < filteredPlaylistArray.length;j++){
        var boxCont = $("<p></p>");
        $(boxCont).attr("class", "rm");
        $(boxCont).text(filteredPlaylistArray[j]);
        $(infoCont).append(boxCont);
      }
    }


    //gets clear button
    let clear = $("#clear");

    //set an attribute to data to grab it
    var rm = $('.rm');

    //grabs info box data and removes it on clear button
    $(clear).click(function(){
        rawPlaylistArray = [];
        $(infoCont).children().remove();
    })

    //gets the submit button
    let submit = $('#submit');

    //send playlist to server.
    $(submit).click(function (){
      $.post('https://lit-fortress-6467.herokuapp.com/post', rawPlaylistArray, success());
    })

    function success(){
      console.log("Post request Successful");
    }


  })
})
