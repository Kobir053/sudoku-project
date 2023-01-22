function checkUser() {
    let userName1 = document.getElementById('userName').value;
    let password1 = document.getElementById('password').value;
    let usernameCorrect;
    let passwordCorrect;
   

    if (userName1 != 'abcd' && userName1 != 'ABCD') {
        let text1=document.getElementById('t1')
        text1.innerHTML = '*username is incorrect';
        usernameCorrect=false
    }
    else{
        let text1=document.getElementById('t1')
        text1.innerHTML = '';
        usernameCorrect=true
    }
    if (password1 != 1234) {
        let text2 = document.getElementById('t2')
        text2.innerHTML = '*password is incorrect';
        passwordCorrect=false
    } else{
        let text2=document.getElementById('t2')
        text2.innerHTML = '';
        passwordCorrect=true
    }

    if(usernameCorrect && passwordCorrect)
        window.location.href='../level/index.html';

}