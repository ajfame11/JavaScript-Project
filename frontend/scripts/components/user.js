class User {
    // User's constructor 
    constructor () {

        const username_btn = document.getElementById("submit-btn")
        username_btn.addEventListener('click', this.addUserName);

        const edit_username = document.getElementById("edit-submit-btn");
        edit_username.addEventListener('click', this.editUserName);

        const delete_username = document.getElementById("delete-btn");
        delete_username.addEventListener('click', this.deleteUserName);

        const save_score = document.getElementById("save-score");
        save_score.addEventListener('click', this.SaveScore);
    }

    // Hangling backend call for creating new user
    addUserName = () => {
        var name = document.getElementById('userinput').value
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const json_object = JSON.parse(this.responseText)
                document.getElementById("player").innerHTML = json_object["name"]
                document.getElementById("total").innerHTML = "total games :" + json_object["total_games"]
                document.getElementById("win").innerHTML = "total wins of X :" + json_object["total_wins"]
                document.getElementById("lose").innerHTML = "total wins of O :" + json_object["total_loses"]
                document.getElementById("draw").innerHTML = "total draws :" + json_object["total_draw"]
                document.getElementById("user-btns").style.display = "block";
                document.getElementById("myModal").style.display = "none";
            }
            else{
            }
        };
        xhttp.open("POST", "http://localhost:3000/users?username="+name, true);
        xhttp.send();
    };
    
    // Hangling backend call for Edit user
    editUserName = () => {
        var name = document.getElementById("player").innerHTML
        var new_name = document.getElementById('new_name').value
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const json_object = JSON.parse(this.responseText)
                document.getElementById("player").innerHTML = json_object["name"]
                document.getElementById("total").innerHTML = "total games :" + json_object["total_games"]
                document.getElementById("win").innerHTML = "total wins :" + json_object["total_wins"]
                document.getElementById("lose").innerHTML = "total lose :" + json_object["total_loses"]
                document.getElementById("draw").innerHTML = "total draw :" + json_object["total_draw"]
                document.getElementById("user-btns").style.display = "block";
                document.getElementById("edit-modal").style.display = "none";
            }
            else{
            }
        };
        xhttp.open("PUT", "http://localhost:3000/users/:id?username="+name+"&&new_name="+new_name, true);
        xhttp.send();
    };
    
    // Hangling backend call for Delete user
    deleteUserName = () => {
        var name = document.getElementById("player").innerHTML
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("player").innerHTML = ''
                document.getElementById("user-btns").style.display = "none";
            }
        };
        debugger;
        xhttp.open("DELETE", "http://localhost:3000/users/:id?username="+name+"&&new_name="+new_name, true);
        const r = xhttp.send();
        document.getElementById("myModal").style.display = "block";
    };
    
    // Hangling backend call for Save Game
    SaveScore = () => {
        var name = document.getElementById("player").innerHTML
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const json_object = JSON.parse(this.responseText)
            document.getElementById("player").innerHTML = json_object["name"]
            document.getElementById("total").innerHTML = "total games :" + json_object["total_games"]
            document.getElementById("win").innerHTML = "total wins :" + json_object["total_wins"]
            document.getElementById("lose").innerHTML = "total lose :" + json_object["total_loses"]
            document.getElementById("draw").innerHTML = "total draw :" + json_object["total_draw"]
            document.getElementById("save-score-modal").style.display = "none";
        }
        };
        xhttp.open("POST", "http://localhost:3000/scores?username="+name+"&&status="+statusDiv.innerHTML, true);
        xhttp.send();
    };
}