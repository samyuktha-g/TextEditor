class Model {
    constructor() {}
}

class View {
    constructor() {
        console.log("ENtered View: ");
        this.app = this.getElement('#Fetch_image')

        // fetch Image and display the image on page
        this.submitButton = this.createElement('button', "FI")
        this.submitButton.textContent = 'Fetch_Image'
        console.log("submit button: ", this.submitButton);
        this.submitButton.addEventListener('click',
            function() {
                // class imagefetching {

                //     static imagefunc() {
                console.log("Entered the image function");
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


                // calling Indexdb funcion to store the image file in indexeddb.
                //     imagefetching.indexedDB(request);
                // }
                // static indexedDB(req) {
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
                        document.getElementById('here').appendChild(myImage);
                        console.log("bloburl: ", bloburl);


                    }
                    // console.log("items: ", items);
            }

            //}
            //    } // class imagefetching {

        );
        this.app.append(this.submitButton)


        // Fetch URL
        this.app = this.getElement('#Fetch_url')
        this.FUsubmitButton = this.createElement('button', "FU");
        this.FUsubmitButton.textContent = 'Fetch_URL'
        console.log("submit button2: ", this.FUsubmitButton);
        this.FUsubmitButton.addEventListener('click',
            async function() {
                let response = await fetch('https://api.github.com/users/chriscoyier/repos');
                // .then(response => response.blob());

                let blob = await response.blob(); // download as Blob object
                console.log("response: ", response);
                console.log("blob: ", blob);
                // create <img> for it

                // a.href = 'position:fixed;top:10px;left:10px;width:100px';
                // document.body.append(a);

                // show it
                let url = URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.innerText = 'blob link';
                // a.download = name;
                document.body.appendChild(a);

                setTimeout(() => { // hide after three seconds
                    a.remove();
                    URL.revokeObjectURL(a.src);
                }, 3000);
                //store in IndexedDB
                //fetchingData.indexedDB(blob);
                //console.log("BLOB-", blob);
                // }
                // static indexedDB(req) {
                if (!'indexedDB' in window) {
                    console.log(" your browser doesnt support indexDB");
                    // return;
                }
                const databaseName = "FetchURL";
                const DBname = window.indexedDB.open(databaseName);
                DBname.onupgradeneeded = () => {
                    let db = DBname.result;
                    let store = db.createObjectStore("URL", { autoIncrement: true });
                    // let store = db.createObjectStore("Files", { autoIncrement: true });
                    let index = store.createIndex("Fetch-filename", "fileeName", { unique: false });
                    console.log("index; ", index);
                    // put method
                    console.log("req: ", blob);
                    store.add(blob);
                }
            }
        );
        this.app.append(this.FUsubmitButton)

        //Create or save the File
        this.app = this.getElement('#CreateOrSave_File')
        this.CSsubmitButton = this.createElement('button', "CS");
        this.CSsubmitButton.textContent = 'Create/Save File'
        console.log("submit button3: ", this.CSsubmitButton);
        this.CSsubmitButton.addEventListener('click',
            function() {

                const handle = window.showSaveFilePicker();
                console.log("handle: ", handle);
                return handle;

            });
        this.app.append(this.CSsubmitButton);


        // Read File
        this.app = this.getElement('#Read_File')
        this.RFsubmitButton = this.createElement('button', "RF");
        this.RFsubmitButton.textContent = 'Read File';
        console.log("button 4: ", this.RFsubmitButton);
        this.RFsubmitButton.addEventListener('click',
            async function() {
                let fileHandle;
                [fileHandle] = await window.showOpenFilePicker();
                console.log("fileHandler:  ", fileHandle); // <-- "fileHandle" Returns the file name

                //********************************Reads/Returns the contents of the file**************************************************** */
                const file = await fileHandle.getFile();
                const contents = await file.text();
                console.log("contents: ", contents);
                document.getElementById("here").textContent = contents;
            });
        this.app.append(this.RFsubmitButton);


        // OpenFile
        this.app = this.getElement('#Open_File')
        this.OFsubmitButton = this.createElement('button', "OF");
        this.OFsubmitButton.textContent = 'Open File';
        console.log("button 5: ", this.OFsubmitButton);
        this.OFsubmitButton.addEventListener('click',
            async function() {
                let fileHandle;
                [fileHandle] = await window.showOpenFilePicker();
            });
        this.app.append(this.OFsubmitButton);

        //click


    }
    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className)

        return element
    }

    // Retrieve an element from the DOM
    getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }
}

class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }
}

const app = new Controller(new Model(), new View())
    //const app = new Controller(new Model(), new View())