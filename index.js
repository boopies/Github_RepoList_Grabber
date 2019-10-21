//random all breeds
let userSearch;

function getUserRepo(selectedUser, selectedOrder, resultsNumber){
    fetch (`https://api.github.com/users/${selectedUser}/repos${selectedOrder}${resultsNumber}`)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert('We are having some issues.'));
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#searched-user').append(`${userSearch}`);
    //replace the existing image with the new one
    if (responseJson.message === 'Not Found'){
        $('#results-list').append(`<li><h3 id="no-user">User ${userSearch} does not exist</h3></li>`)
    } else {
        for (let i = 0; i < responseJson.length; i++){
            $('#results-list').append(
              `<li><h3>${i + 1}. ${responseJson[i].name}</h3>
              <p><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p>
              <p>Description: ${responseJson[i].description}</a></p>
              </li>`
            )};
    }
    //display the results section
    $('#results').removeClass('hidden');
  }


function watchForm() {
    $('form').submit(event =>{
        event.preventDefault();
        $('#results-list').empty();
        $('#searched-user').empty();
        let selectedUser = document.getElementById("js-search-term").value;
        let ascdescOrder = document.getElementById('asc-desc').value;
        let maxResults = document.getElementById('js-max-results').value;
        let selectedOrder = `?direction=${ascdescOrder}`
        let resultsNumber = `&per_page=${maxResults}`
        userSearch = selectedUser
        getUserRepo(selectedUser, selectedOrder, resultsNumber);
    })
}


$(function(){
    console.log('App loaded! Waiting for submit!');
    watchForm();
});
