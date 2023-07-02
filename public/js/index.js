fetch("http://localhost:9000/api/clients")
.then(res => res.json())
.then(data =>{
    for (let obj in data){
        document.getElementById('root').innerHTML += `
        <div class="list">
            <p>NAME: ${JSON.stringify(data[obj].first_name)}</p>
            <p>SURNAME: ${JSON.stringify(data[obj].last_name)}</p>
            <p>ADDRESS: ${JSON.stringify(data[obj].address)}</p>
            <p>EMAIL: ${JSON.stringify(data[obj].email)}</p>
            <p>COUNTRY: ${JSON.stringify(data[obj].coutry)}</p>
        </div>
        `
    }
}).catch(e => {
    console.log(e)
    })