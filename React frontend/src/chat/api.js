export const list=(token,id)=>{
    return(
    fetch(`http://localhost:8000/users/${id}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
    )
}

export const postMessage=(postedBy,postedTo,text,token)=>{
    return(
        fetch("http://localhost:8000/postMessage",{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({postedBy,postedTo,text})
        })
        .then(response=>{
            return response.json();
        })
        .catch(err=>{
            console.log(err);
        })
    )
}

export const getMessages=(from,to,token)=>{
    return(
        fetch(`http://localhost:8000/getMessages/${from}/${to}`,{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response=>{
            return response.json();
        })
        .catch(err=>{console.log(err);
        })
    )
}
