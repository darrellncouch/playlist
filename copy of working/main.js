//Splash page logic
$(document).ready(function (){
  $.get("https://lit-fortress-6467.herokuapp.com/object", function(data){


      //radomize album covers on slpash page


      var newArr = data.results;


      console.log(newArr);


      //D.R.Y. up elements
      let topBox = $('#topImg');
      let midBox = $('#midImg');
      let botBox = $('#botImg');


        //keeps track of what hasnt been used
        var editArr;

        //Put fist album on splash page then remove it form the array
        let one = Math.floor(Math.random() * data.results.length);
         $(topBox).attr('src', newArr[one].cover_art);
         editArr = newArr.slice(0, one).concat(newArr.slice(one+1, newArr.length));

         //put second album on splash page then remove it from the array
         let two = Math.floor(Math.random() * editArr.length);
         $(midBox).attr('src', editArr[two].cover_art);
         editArr = editArr.slice(0, two).concat(editArr.slice(two+1, editArr.length));

         //put third album on splash page
        let three = Math.floor(Math.random() * editArr.length);
        $(botBox).attr('src', editArr[three].cover_art);

  })

})
