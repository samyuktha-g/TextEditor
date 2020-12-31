// const elements = document.querySelectorAll('btn');

// console.log("in js script file");
// console.log(elements);
// //console.log(element);
// elements.forEach(element => {
//     console.log("enetered the loop");
//     element.addEventListener('click', () => {
//         let command = elements.dataset['cmd'];
//         console.log("command: ", command);
//         document.execCommand(command, true, null)
//     });
// });
function alignLeft() {
    document.getElementById('content').style.textAlign = "left";
}

function alignRight() {
    document.getElementById('content').style.textAlign = "right";
}

function alignFully() {
    document.getElementById('content').style.textAlign = "justify";
}

function alignCenter() {
    document.getElementById('content').style.textAlign = "center";
}

function bold() {

    // var para = document.querySelector('p');
    document.getElementById('content').para.style.fontWeight = "900";
}

function italic() {
    document.getElementById('content').para.style.fontStyle = "italic";
}

function underline() {
    document.getElementById('content').style.textDecoration = "underline";
}

function image() {

    var request = new XMLHttpRequest();
    request.open('GET', 'image/city.jpg', true);
    request.responseType = 'blob';
    console.log("request: ", request);
    // When the request loads, check whether it was successful

    request.onload = function() {
        if (request.status === 200) {
            console.log("success");

        } else {
            // If it fails, reject the promise with a error message
            reject(new Error('Image didn\'t load successfully; error code:' + request.statusText));
        }
    };

    request.onerror = function() {
        // Also deal with the case when the entire request fails to begin with
        // This is probably a network error, so reject the promise with an appropriate message
        reject(new Error('There was a network error.'));
    };

    // Send the request
    request.send();

    console.log("response2: ", request.response);



    if (!'indexedDB' in window) {
        console.log(" your browser doesnt support indexDB");
        // return;
    }

    const databaseName = "imageDB";
    const storeName = 'store0';
    const DBname = window.indexedDB.open(databaseName);
    DBname.onupgradeneeded = () => {
        console.log("In indexed DB code: ");
        let db = DBname.result;
        let store = db.createObjectStore("img", { autoIncrement: true });

        console.log("store: ", store, "db: ", db);
        // let store = db.createObjectStore("Files", { autoIncrement: true });
        let index = store.createIndex("filename", "fileeName", { unique: false });
        console.log("index; ", index);
        // put method
        console.log("req: ", request.response);
        store.add(request.response);
        // let blob = req.response;
        let myImage = new Image();
        let bloburl = URL.createObjectURL(request.response);
        myImage.src = bloburl;
        document.getElementById('content').appendChild(myImage);
        console.log("bloburl: ", bloburl);



    }


}

async function open() {
    // let fileHandle;

    // Destructure the one-element array.
    const handle = window.showOpenFilePicker();
    console.log("fileHandler:  ", handle); // <-- "fileHandle" Returns the file name

    //********************************Reads/Returns the contents of the file**************************************************** */
    const file = await handle.getFile();
    const contents = await file.text();
    console.log("contents: ", contents);
    document.getElementById("content").textContent = contents;


}



function save() {
    const handle = window.showSaveFilePicker();
    console.log("handle: ", handle);
    return handle;
}