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
        let name = document.getElementById('userinput').value
        let url = "http://localhost:3000/users?username="+name
        postData(url, "POST")
        .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
            document.getElementById("player").innerHTML = data["name"]
            document.getElementById("total").innerHTML = "total games :" + data["total_games"]
            document.getElementById("win").innerHTML = "total wins of X :" + data["total_wins"]
            document.getElementById("lose").innerHTML = "total lose of O :" + data["total_loses"]
            document.getElementById("draw").innerHTML = "total draws :" + data["total_draw"]
            document.getElementById("user-btns").style.display = "block";
            document.getElementById("myModal").style.display = "none";
        });
        
    };
    
    // Hangling backend call for Edit user
    editUserName = () => {
        let name = document.getElementById("player").innerHTML
        let new_name = document.getElementById('new_name').value
        let url = "http://localhost:3000/users/:id?username="+name+"&&new_name="+new_name
        postData(url, "PUT")
        .then(data => {
            document.getElementById("player").innerHTML = data["name"]
            document.getElementById("total").innerHTML = "total games :" + data["total_games"]
            document.getElementById("win").innerHTML = "total wins :" + data["total_wins"]
            document.getElementById("lose").innerHTML = "total lose :" + data["total_loses"]
            document.getElementById("draw").innerHTML = "total draw :" + data["total_draw"]
            document.getElementById("user-btns").style.display = "block";
            document.getElementById("edit-modal").style.display = "none";

        })

    };
    
    // Hangling backend call for Delete user
    deleteUserName = () => {
        let name = document.getElementById("player").innerHTML
        let url =  "http://localhost:3000/users/:id?username="+name+"&&new_name="+new_name;
        postData(url, "DELETE")
        .then(data => {
            document.getElementById("player").innerHTML = ''
            document.getElementById("user-btns").style.display = "none";
            document.getElementById("myModal").style.display = "block";

        })
    };
    
    // Hangling backend call for Save Game
    SaveScore = () => {
        let name = document.getElementById("player").innerHTML
        let url = "http://localhost:3000/scores?username="+name+"&&status="+statusDiv.innerHTML;
        postData(url, "POST")
        .then(data => {
            document.getElementById("player").innerHTML = data["name"]
            document.getElementById("total").innerHTML = "total games :" + data["total_games"]
            document.getElementById("win").innerHTML = "total wins :" + data["total_wins"]
            document.getElementById("lose").innerHTML = "total lose :" + data["total_loses"]
            document.getElementById("draw").innerHTML = "total draw :" + data["total_draw"]
            document.getElementById("save-score-modal").style.display = "none";

        })
    };
}
async function postData(url = '', type = "POST") {
    // Default options are marked with *
    const response = await fetch(url, {
    method: type, // *GET, POST, PUT, DELETE, etc.
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    });
    return response.json(); // parses JSON response into native JavaScript objects
}