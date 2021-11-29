

console.log("Before");
// Call Backs
/*
getUser(2,(user)=>{
    getRepositories(user.gitUsername,(repos)=>{
        getComits(repos[0],(commits)=>{
            console.log(commits);
        })
    })
});

*/

// Promise
getUser(3)
    .then(user => getRepositories(user.gitUsername))
    .then(repos => getComits(repos[0]))
    .then(commits => console.log('Commits',commits))
    .catch(err => console.log('Errors',err.message));

// Async and await
async function displayCommit(){
    try {
        const user = await getUser(4);
        const repos = await getRepositories(user.gitUsername);
        const commits = await getComits(repos[0]);
        console.log(commits);
    } catch (error) {
        console.log('Error',error.message);
    }
}
displayCommit();



console.log("After");


 getUser()
function getUser(id){
  return  new Promise((resolve,reject)=>{
    setTimeout(() =>{
        console.log("Reading the database....");
       resolve({id :id ,gitUsername :"zero"});
    },2000);
});
}

function getRepositories(username){
   return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('Calling GitHub Api');
            resolve(['repo1','repo2','repo3']);
        },2000);
    })
   
}

function getComits(repo){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('Calling GitHub Api');
        resolve(['commit']);
    },2000);
   });
}
