const getData = async () => {
    let res = await fetch('https://jsonplaceholder.typicode.com/users')
    let data = await res.json()
    console.log(data)
    data.map(d => {
        console.log(d.name)
    })
}

getData()