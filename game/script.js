// hi
let level = window.localStorage.getItem('level');

if(level == null)
    window.location.href = '../level/index.html';

let lastElement;

let matrix = [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
];
let matrix2 = [
    [6,2,5,3,4,1,7,9,8],
    [4,9,8,6,7,2,3,1,5],
    [3,7,1,5,9,8,4,2,6],
    [8,5,2,1,6,7,9,3,4],
    [1,4,9,8,3,5,6,7,2],
    [7,3,6,4,2,9,5,8,1],
    [5,8,7,9,1,6,2,4,3],
    [2,6,3,7,8,4,1,5,9],
    [9,1,4,2,5,3,8,6,7]
];
let matrix3 = [
    [5,4,2,9,8,7,6,1,3],
    [8,9,6,4,3,1,5,2,7],
    [7,3,1,6,5,2,9,8,4],
    [4,2,5,3,1,9,7,6,8],
    [1,8,3,2,7,6,4,5,9],
    [6,7,9,5,4,8,2,3,1],
    [3,1,4,7,2,5,8,9,6],
    [2,6,7,8,9,3,1,4,5],
    [9,5,8,1,6,4,3,7,2]
];
let myMatrixs = [matrix,matrix2,matrix3];
let randNum = Math.floor(Math.random()*3);
let randMat = myMatrixs[randNum];

let matForAgain = [];


// מדפיסה את המטריצה על הלוח
function printOnScreen(matrix){
    for (let i = 0; i < 9; i++) {
        let arrForAgain = [];
        for (let j = 0; j < 9; j++) {
           let element= document.getElementById(`${i},${j}`);
           element.innerHTML = matrix[i][j];
            arrForAgain.push(matrix[i][j]);
           element.addEventListener('click', () => {
            updateSelectedElement(element); 
           })
        }
        matForAgain.push(arrForAgain);
    }
}
printOnScreen(randMat);
// console.log(matForAgain);


// מעלימה את הכמות הנצרכת של התאים בסודוקו
function removePartOfTable(){
    let a = 0;
        while(a < level*20){
            let i = Math.floor(Math.random()*9);
            let j = Math.floor(Math.random()*9);
            element = document.getElementById(`${i},${j}`);
            if(element.innerHTML != ''){
                element.innerHTML = '';
                matForAgain[i][j] = '';
                element.setAttribute('class', 'empty');
                a++;
            }
        }
}
removePartOfTable();
// console.log(matForAgain);


//selected class מסירה מהאלמנט את
function removeClassOfSelected(el){
    // console.log(el.className);
    if(el.className == 'numbers')
        return;
    let fClass = el.className.substring(0, el.className.indexOf(' '));
    // console.log(fClass);
    el.setAttribute('class', fClass);
}

//classמעדכנת מה האלמנט שנבחר ואת ה
function updateSelectedElement(el){
    if(lastElement != null)
        removeClassOfSelected(lastElement);
    lastElement = el;
    if(lastElement.className == 'numbers')
        return;
    lastElement.setAttribute('class', `${lastElement.className} selected`);
    console.log(lastElement); 
}

// הכנסת ערך לתא
let board = document.getElementById('body');
board.addEventListener('keydown', e => {
    if(e.key < '1' || e.key > '9')
        return;
    if(lastElement.className.indexOf('empty') == -1)
        return;
    lastElement.innerHTML = e.key;
})

// מחזירה את הלוח לתחילת משחק
function refresh(){
    printOnScreen(matForAgain);
}

// function checkSudoku(){
//     for(let i = 0;i < 9;i++)
//         for(let j = 0;j < 9;j++){
//             let box = document.getElementById(`${i},${j}`).innerHTML;
//             if(box != randMat[i][j])
//                 throw 'error';
//         }
//         alert(true);
//             return;
// }


// פונקציה שבודקת שורה לפי תנאי סודוקו
function rowForSudoku(arr){
    for(let i = 0;i < arr.length;i++)
        for(let j = i+1;j < arr.length;j++){
            if(arr[j] == '')
                return false;
            if(arr[i] == arr[j])
                return false;
        }
    return true;
}

function checkBlock(mat){
    for(let i = 0;i < 9;i+=3)
        for(let j = 0;j < 9;j+=3){
            let myBlock = [mat[i][j],mat[i][j+1],mat[i][j+2],
                           mat[i+1][j],mat[i+1][j+1],mat[i+1][j+2],
                            mat[i+2][j],mat[i+2][j+1],mat[i+2][j+2]];
            if(rowForSudoku(myBlock) == false)
                return false;
        }
    return true;
}

function checkCol(mat){
    for(let i = 0,j = 0;j < mat.length;j++){
        let myCol = [mat[i][j],mat[i+1][j],mat[i+2][j],
                     mat[i+3][j],mat[i+4][j],mat[i+5][j],
                     mat[i+6][j],mat[i+7][j],mat[i+8][j]];
        if(rowForSudoku(myCol) == false)
            return false;
        }
    return true;
}

// בודקת את כל לוח הסודוקו האם תקין
function checkMySudoku(){
    let newMat = [];
    for(let i = 0;i < 9;i++){
        let arr = [];
        for(let j = 0;j < 9;j++){
        arr.push(document.getElementById(`${i},${j}`).innerHTML);
        }
        newMat.push(arr);
    }
    console.log(newMat);
    // debugger;
    for(let i = 0;i < newMat.length;i++)
        if(rowForSudoku(newMat[i]) == false){
            alert('error');
            window.location.href = '../level/index.html';
            return;
        }    
    if(checkCol(newMat) == false){
        alert('error');
        window.location.href = '../level/index.html';
        return;
    }    
    if(checkBlock(newMat) == false){
        alert('error');
        window.location.href = '../level/index.html';
        return;
    }    
    alert('succes');
    window.location.href = '../level/index.html';
    return;
}