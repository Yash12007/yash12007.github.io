function my_download(){
    var transaction_id = prompt("Enter your Transaction ID");
    if (transaction_id == ''){
        alert("Fill it first to download");
        my_download();
    }
    if (transaction_id == null){
        alert("Download Cancled!");
    }else{
        alert("Your Download will start if the ID is valid.");
    }
}
