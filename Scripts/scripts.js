// function enableEditMode() {
//     RichTextField.document.designMode = 'On';
// }



// function exeCmdd(command) {
//     RichTextField.document.execCommand(command, true, 'blockquote');
// }
function enableEditMode() {
    class Model {
        constructor() {
            console.log("in Model class");

        }
    }

    class View {
        constructor() {

            RichTextField.document.designMode = 'On';

            function exeCmd(command) {
                console.log("command: ", command);
                // var RTF = document.getElementsByClassName('RichTextField');
                RichTextField.document.execCommand(command, false, null);
            }

            function execCommandWithArg(command, arg) {
                console.log("command in arg: ", command, arg);
                RichTextField.document.execCommand(command, false, arg);
            }
            /**************************Drag and Drop starts here**************************************** */
            var targetDiv = document.getElementById('DND');
            // Set the iframe to a blank page
            // document.getElementById("RichTextField").src = "about:blank";
            var iframe = document.getElementById("RichTextField");
            // // Append it to the target
            // document.getElementById("RichTextField").appendChild(iframe);

            // Drag over is when an object is hovering over the div
            // e.preventDefault keeps the page from changing
            targetDiv.addEventListener("dragover", function(e) {
                e.preventDefault();
                e.target.classList.add('drag-over');
                console.log("eneterd into Dragover function");

                // this.className = "RTF";
                loadFile(e.dataTransfer.files[0], iframe);
                console.log("dataTransfer:", e.dataTransfer, e.dataTransfer.files[0]);
            }, false);


            // Drag leave is when the object leaves the div but isn't dropped
            targetDiv.addEventListener("dragleave", function(e) {
                e.preventDefault();
                this.className = "RTF";
            }, false);

            // Drop is when the click is released
            targetDiv.addEventListener("drop", function(e) {
                e.preventDefault();
                this.className = "RTF";
                loadFile(e.dataTransfer.files[0], iframe);
            }, false);

            function loadFile(f, destination) {
                // Make a file reader to interpret the file
                var reader = new FileReader();
                console.log("Load file", f);
                // When the reader is done reading,
                // Make a new image tag and append it to the iFrame
                reader.onload = function(event) {
                    var newImage = document.createElement("iframe");
                    newImage.style.border = "1px solid";
                    newImage.style.borderRadius = "8px";
                    newImage.style.width = "100%";
                    newImage.style.height = "500px";
                    // newImage.setAttribute("type", "file");
                    newImage.src = event.target.result;
                    console.log("newImage: ", newImage);
                    destination.contentWindow.document.getElementsByTagName("body")[0].appendChild(newImage);
                };

                // Tell the reader to start reading asynchrounously
                reader.readAsDataURL(f);
                console.log("reader: ", reader);
            }
            /**************************DnD Ends here******************************************* */
            console.log("in Model class");
            var icons = ['<i class = "fa fa-bold" id="bold"></i>', '<i class = "fa fa-italic"></i>',
                '<i class="fa fa-underline"></i>', '<i class="fa fa-align-justify"></i>',
                '<i class="fa fa-align-left"></i>', '<i class="fa fa-align-right"></i>',
                '<i class="fa fa-folder-open"></i>', '<i class="fa fa-file-image-o"></i>',
                '<i class="fa fa-paragraph"></i>', '<i class="fa fa-link"></i>', '<i class="fa fa-code"></i>',
                '<i class="fa fa-list-ol"></i>', '<i class="fa fa-list-ul"></i>', '<i class="fa fa-undo"></i>',
                '<i class="fa fa-repeat"></i>', '<i class="fa fa-clone"></i>', '<i class="fa fa-chain-broken"></i>'
            ];

            // console.log(icons[1]);
            // let button = this.createElement('button')


            /***********Below code creates button and unique classnames for each button */
            for (var i = 0; i < icons.length; i++) {

                var button = this.createElement('button', (i + 1))
                let chain = document.getElementById('toolbar');
                button.innerHTML = icons[i];
                chain.appendChild(button);
                console.log("button", button);


            }

            /*********************Below iterates through each button element to find the button clicked*************************************************** */
            for (var i = 0; i < icons.length; i++) {
                var btns = document.querySelectorAll('button')
                btns[i].addEventListener("click", function(e) {
                    var cmd = ['bold', 'italic', 'underline', 'justifyCenter', 'justifyLeft', 'justifyRight',
                        'fileopen', 'insertImage', 'insertParagraph', 'createLink', 'insertcode', 'insertOrderedList',
                        'insertUnorderedList', 'undo', 'redo', 'copy', 'unlink'
                    ];
                    var i_values = ["fa fa-bold", "fa fa-italic", "fa fa-underline", "fa fa-align-justify",
                        "fa fa-align-left", "fa fa-align-right", "fa fa-folder-open",
                        "fa fa-file-image-o", "fa fa-paragraph", "fa fa-link", "fa fa-code",
                        "fa fa-list-ol", "fa fa-list-ul", "fa fa-undo", "fa fa-repeat",
                        "fa fa-clone", "fa fa-chain-broken"
                    ];
                    console.log("cmd: ", cmd[i], i, e.target, e.target.className, i_values);
                    let e_var = e.target.className;
                    var tf = i_values.indexOf(e_var);
                    var codeOn = false;
                    var codeOff = true;
                    // var Check_numb = Number.isInteger(e_var);
                    // console.log("----------> TF: ", tf, e_var, Check_numb);
                    // console.log("cmd[e_var - 1]: ", cmd[(e_var - 1)]);
                    if (e_var == "fa fa-folder-open" || e_var == "fa fa-file-image-o" || e_var == "fa fa-quote-right" || e_var == "fa fa-paragraph" || e_var == 9 || e_var == 7 || e_var == 8) {
                        if (e_var == "fa fa-folder-open" || e_var == 7) {
                            //CREATE OR SAVE FILE

                            // const handle = window.showSaveFilePicker();
                            // console.log("handle: ", handle);
                            // return handle;
                            Open_File();

                            //rEAD FILE
                            async function Open_File() {

                                // document.getElementById("upload").addEventListener("click", function() {
                                //     var file = document.getElementById("browsedFile").files[0];
                                //     // loadFile(file, iframe);
                                // }, false);

                                let fileHandle;
                                [fileHandle] = await window.showOpenFilePicker();
                                console.log("fileHandler:  ", fileHandle); // <-- "fileHandle" Returns the file name
                                var destination = document.getElementsByTagName('iframe');
                                //********************************Reads/Returns the contents of the file**************************************************** */
                                const file = await fileHandle.getFile();
                                console.log("file: ", file);
                                var iframew = document.getElementById("RichTextField");
                                const contents = await file.text();
                                console.log("contents: ", contents);
                                console.log(iframew.contentWindow.document);
                                var doc = iframew.contentWindow.document;
                                doc.write(contents);

                            }

                            //OPEN FILE
                            // let fileHandle;
                            // [fileHandle] = await window.showOpenFilePicker();

                        } else if (e_var == "fa fa-file-image-o" || e_var == 8) {


                            /********************************Insert Image***************************** */
                            Open_File();
                            async function Open_File() {

                                // document.getElementById("upload").addEventListener("click", function() {
                                //     var file = document.getElementById("browsedFile").files[0];
                                //     // loadFile(file, iframe);
                                // }, false);

                                let fileHandle;
                                [fileHandle] = await window.showOpenFilePicker();
                                console.log("fileHandler:  ", fileHandle); // <-- "fileHandle" Returns the file name
                                // var destination = document.getElementsByTagName('iframe');
                                //********************************Reads/Returns the contents of the file**************************************************** */
                                const file = await fileHandle.getFile();
                                console.log("file: --> ", file, file.name);
                                var iframe = document.getElementById('RichTextField');
                                loadFile(file, iframe);


                            }

                            function loadFile(f, destination) {
                                // Make a file reader to interpret the file
                                var reader = new FileReader();

                                // When the reader is done reading,
                                // Make a new image tag and append it to the iFrame
                                reader.onload = function(event) {
                                    var newImage = document.createElement("img");
                                    newImage.src = event.target.result;
                                    destination.contentWindow.document.getElementsByTagName("body")[0].appendChild(newImage);
                                    console.log("f.name: ", f.name, newImage.src)
                                        // upload_img(reader);
                                };

                                // Tell the reader to start reading asynchrounously
                                reader.readAsDataURL(f);

                                // console.log("reader", rdr);
                            }


                            /****************************************************************** */
                            //   function upload_img(files) {
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
                                    //document.getElementById('here').appendChild(myImage);
                                    console.log("bloburl: ", bloburl);


                                }
                                //   }

                        } else if (e_var == "fa fa-paragraph" || e_var == 9) {


                            var select_btn = document.createElement('select');
                            var option = document.createElement('option');

                            option.value = "Cursive";
                            option.textContent = "Cursive"
                            select_btn.classList.add('FntName')
                            select_btn.append(option)
                            console.log("select:", select_btn);
                            select_btn.addEventListener("click", function(e) {
                                console.log(option.value);
                                execCommandWithArg("fontName", option.value);
                            });
                            let button = document.getElementsByTagName('button')[8];
                            button.append(select_btn);

                            //--------------------------------------------------------------------
                            // var option_1 = document.createElement('option');
                            // option_1.value = "Calligrapher";
                            // option_1.textContent = "Calligrapher"
                            // select_btn.classList.add('FntName')
                            // select_btn.append(option_1)
                            // console.log("select:", select_btn);
                            // select_btn.addEventListener("click", function(e) {
                            //     console.log("option_value: ", option_1.value);
                            //     execCommandWithArg("fontName", option_1.value);
                            // });
                            // //  let button = document.getElementsByTagName('button')[8];
                            // button.append(select_btn);
                            //-------------------------------------------------------------------------------------------
                            // console.log("select button: ", select_btn);
                            // var html =
                            //     '<select onchange="execCommandWithArg("fontName","this.value")"> <option value="Arial">Arial </option> <option value="Georgia">Georgia </option></select>';
                            // let chain = document.getElementById('editor');
                            // // select_btn.textContent = "Styling";
                            // chain.innerHTML = html;
                            // // chain.appendChild(html);
                            // console.log("button", chain);

                        }

                    } else if (e_var == 10 || e_var == "fa fa-link") {
                        //This is for Creating Link

                        execCommandWithArg('createLink', prompt('Enter a URL', 'http://'));

                    } else if (e_var == 11 || e_var == "fa fa-code") {
                        //Below code is for returing the code in HTML format
                        if (codeOn) {
                            RichTextField.document.getElementsByTagName('body')[0].innerHTML = RichTextField.document.getElementsByTagName('body')[0].textContent;
                            codeOn = false;
                        } else {
                            RichTextField.document.getElementsByTagName('body')[0].textContent = RichTextField.document.getElementsByTagName('body')[0].innerHTML;
                            codeOn = true;
                        }
                    } else {

                        // console.log("*******************icons conatins the command:");

                        if (i_values.indexOf(e_var) >= 0) {
                            exeCmd(cmd[tf]);
                        } else {
                            exeCmd(cmd[(e_var - 1)]);
                        }


                    }
                    // if (e.target.className == i || e.target.className == icons[i].className) {
                    // }


                });
            }
            // var select_btn = this.createElement('select');
            // let chain = document.getElementById('toolbar');
            // select_btn.textContent = "Styling";
            // chain.appendChild(select_btn);
            // console.log("button", select_btn);
            /************************Check if the button is cliced, then take action********************* */
            // var buttons = document.getElementsByTagName("button");

            // var t = 0;



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
}

///////////////////////previousscript

// let button = document.createElement('button')

//"&#xf2b9;";
// console.log(button);
// //let I = document.createElement('i');
// // I.innerHTML = "&#xf2b9;";
// // button.appendChild(I);

// //button.appendChild(chain);
// console.log(button)

// let button2 = document.createElement('button')
//     //  let chain = document.getElementById('icons');
// button2.innerHTML = '<i class = "fa fa-italic"></i>'; //"&#xf2b9;";

// /// let I = document.createElement('i');
// // I.innerHTML = "&#xf2b9;";
// // button.appendChild(I);
// chain.appendChild(button2);
// //button.appendChild(chain);
// console.log(button2)

// //I.innerHTML = "&#xf2b9;";

// // chain.appendChild(button);
// console.log(chain, button););
// console.log(chain, button);