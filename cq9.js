let compile=document.getElementById("compile");
let text=document.getElementById("text");
let language=document.getElementById("lang");
let output=document.getElementById("out");
compile.addEventListener("click",()=>{
    const code=text.value;
    console.log(language.value);
    console.log(code);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://course.codequotient.com/api/executeCode");
    
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify({
        "code": code,
        "langId": language.value
    }));
    xhr.onreadystatechange = function() {
        if ( xhr.readyState == 4) {
            if(xhr.responseText){
            console.log(xhr.response);
            const ans = JSON.parse(xhr.response);
            if(ans.error=="Code is null"){
                output.innerHTML=ans.error;
            }
            else{
            console.log(ans.codeId);
            getdata(ans.codeId);
            }
            }else{
                console.error("Empty or invalid json response");
           }
        }
    }
});

function getdata(codeId){
    function checkresult(){
        let url=`https://course.codequotient.com/api/codeResult/${codeId}`;
            let xmr = new XMLHttpRequest();
            xmr.open("GET", url);
            xmr.send();

            xmr.onreadystatechange = () => {
                if (xmr.readyState == 4) {
                    console.log(xmr.response);
                    let res = JSON.parse(xmr.response);
                    let data=JSON.parse(res.data);
                    console.log(data);
                    if (data.status == "Pending") {
                        console.log("Pending");
                        setTimeout(checkresult, 1000);
                    } else {
                        console.log(res);
                        output.innerHTML = data.output || data.errors;
                    }
                } 
            }
    }
    setTimeout(checkresult,1000);
}