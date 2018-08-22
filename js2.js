
  // Initialize Firebase
  var config = {
    apiKey: "",
    authDomain: "kriger-website.firebaseapp.com",
    databaseURL: "https://kriger-website.firebaseio.com",
    projectId: "kriger-website",
    storageBucket: "kriger-website.appspot.com",
    messagingSenderId: "246030514172"
  };
  firebase.initializeApp(config);



  firebase.database().ref(`/Posts/`).limitToLast(500).once('value').then(snapshot =>{
        var postId = "";
		var uid1="";
		var pname="";
		var docid="";
		var name_again="";
        snapshot.forEach(function(snap){
    pname = snap.child("author").val();
   var ptext = snap.child("text").val();
    docid = snap.child("document_id").val();
    uid1= snap.child("uid").val();
 
   var html8 = ' ';
   
   
   if(snap.child("image_url").exists())
{  var pimg = snap.child("image_url").val();
//console.log(pimg);
var html8=' <br><img src='+pimg+ ' height="200px" align="center" display= "block" margin-left="auto" margin-right ="auto"';
		 	

} 
   
   var dt1= snap.child("timestamp").val();
   var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
   var dt2 = new Date(dt1.replace(pattern,'$1-$2-$3T$4:$5:$6Z'));
   var dt = dt1.replace(pattern,'$3-$2-$1 $4:$5:$6');
   
   var plike= snap.child("count_like").val();
   var pcomment= snap.child("count_comment").val();
   var cl = docid+'1'; // for comment
     var img1 = docid+'2'; //dp for post
	 var img3= docid+'3'; // dp for commet box

   var html1 = ( '<div class="w3-container w3-content" style="max-width:1400px;margin-top:80px"> <div class="w3-row"> <div class="abc w3-card  w3-white w3-round w3-margin unique w3-half"> <a   href="profile.html?id='+uid1+'&name='+pname+'" id='+img1+'></a> <span class="w3-right w3-opacity">' + dt +  '</span> <a <a   href="profile.html?id='+uid1+'&name='+pname+'"><h4>');
   var html2 =   ( '</h4></a><br> <hr class="w3-clear"> <p>');
   var html3=( ' <br></p> <div class="w3-row-padding" style="margin:0 -16px"> <div class="w3-half"> </div> </div> </div>' );
   var html4=('<div><div class= "efg w3-card  w3-white w3-round w3-margin unique w3-half"><a href="profile.html?id='+uid1+'&name='+pname+'"   id='+img3+'></a><span class="w3-right w3-opacity">' +dt +'</span><a  href="profile.html?id='+uid1+'&name='+pname+'"  id="username"><h4>' + pname + '</h4></a><br><hr><a href="#"><button id="like" type="button" style="float:left" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i></button>' + plike +'<br><br><button type="button"  style="float:left" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i></button>' + pcomment +'<br><br><div id='+cl+'> </div></div></div>');
    
      	 $(".table_body").append(html1+ pname + html2 + ptext + html8+ html3 + html4);
		
	/*	for comments */
	  firebase.database().ref('/Comments/'+snap.key).once('value').then(snapshot1=>{
		snapshot1.forEach(function(snap1){
		//console.l5og(snap1.val());
	    var cm1 = snap1.child("username").val()+": "+snap1.child("string").val();
	    html5 = "<div>"+cm1+"</div>";
		 
	  	$("#"+cl).append(html5); 
		 
		});
	  });
	  // for dp of post box and comment box
	  firebase.database().ref('/UserDetails/'+uid1).once('value').then(snap2=>{
	 	var img2 = snap2.child("thumb").val();
	     
		 var test= img2+snap2.child("name").val();
			var html6 = '<img src='+img2+' alt="Avatar" class="w3-left w3-circle w3-margin-right"   width="70" height="70"> ';
			var html7='<img src='+img2+' alt="Avatar" class="w3-left w3-circle w3-margin-right"   width="70" height="70"> ';
		 	 $("#"+img1).append(html6); 
			  $("#"+img3).append(html7);
		
		 
		 });
		 
    
	   
		 
	

	 
	
	     
	  
});
  
	  
});

