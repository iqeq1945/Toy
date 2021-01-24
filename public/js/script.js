// public/js/script.js

$(function(){
    function get2digits (num){
      return ('0' + num).slice(-2);
    }
  
    function getDate(dateObj){
      if(dateObj instanceof Date)
        return dateObj.getFullYear() + '-' + get2digits(dateObj.getMonth()+1)+ '-' + get2digits(dateObj.getDate());
    }
  
    function getTime(dateObj){
      if(dateObj instanceof Date)
        return get2digits(dateObj.getHours()) + ':' + get2digits(dateObj.getMinutes())+ ':' + get2digits(dateObj.getSeconds());
    }
  
    function convertDate(){
      $('[data-date]').each(function(index,element){
        var dateString = $(element).data('date');
        if(dateString){
          var date = new Date(dateString);
          $(element).html(getDate(date));
        }
      });
    }
  
    function convertDateTime(){
      $('[data-date-time]').each(function(index,element){
        var dateString = $(element).data('date-time');
        if(dateString){
          var date = new Date(dateString);
          $(element).html(getDate(date)+' '+getTime(date));
        }
      });
    }
  
    convertDate();
    convertDateTime();
    // enter 방지
    $('input[type="text"]').keydown(function() {
      if (event.keyCode === 13 ) {
          event.preventDefault();
      }
  });
  // recruitment태그 추가 기능
    $('#tag').keydown(function(){
    if(event.keyCode === 13 || event.keyCode === 32){
      var tag = $('#tag').val();
      if(tag){
        var input = document.createElement("input");
        var div = document.createElement("div");

        input.setAttribute("type","hidden");
        input.setAttribute("value",tag);
        input.setAttribute("name","tag");

        div.setAttribute("class","tag");
        div.onclick=function(){del_tag(this);};
        div.innerHTML = tag;
        
        document.getElementById("tag_list").appendChild(div);
        document.getElementById("tag_list").appendChild(input);

        $('#tag').val('');
      }
    }
  });
  // recruitment 태그 삭제 기능
  function del_tag(obj){
    var input = document.getElementsByName("tag");
    input.forEach(function(element){
      if(obj.innerHTML===element.value){
        document.getElementById("tag_list").removeChild(element);
        document.getElementById("tag_list").removeChild(obj);
        return;
      }
    });
  }
  });
