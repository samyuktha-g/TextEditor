// Open the file exploerer to select the file from the list
let fileHandle;
document.getElementById("btn5").addEventListener('click', async() => {
    // Destructure the one-element array.
    [fileHandle] = await window.showOpenFilePicker();
    console.log("fileHandler:  ", fileHandle); // <-- "fileHandle" Returns the file name

    //********************************Reads/Returns the contents of the file**************************************************** */
    const file = await fileHandle.getFile();
    const contents = await file.text();
    console.log("contents: ", contents);
    document.getElementById("here").textContent = contents;
    // or below code can also wok for file reading.
    // document.getElementById('btn2')
    //     .addEventListener('change', function() {

    //         var fr = new FileReader();
    //         fr.onload = function() {
    //             document.getElementById('output')
    //                 .textContent = fr.result;
    //         }

    //         fr.readAsText(this.files[0]);
    //     })

});

// ************************************ Creates a file ************************************//

function CreateFile() {
    // const options = {
    //     types: [{
    //         // description: 'Text Files',
    //         accept: {
    //             'text/plain': ['.txt'],
    //         },
    //     }, ],
    //     // async await
    // };
    const handle = window.showSaveFilePicker();
    console.log("handle: ", handle);
    return handle;
}

//**********************************  Writes a File   ****************************************************** */



async function writeFile() {
    let fileHandle;
    fileHandle = await window.showOpenFilePicker();
    console.log(typeof fileHandle, fileHandle, fileHandle[0].name);
    //let fileName;
    // fileName = fileHandle[0].name;
    // // fileName.write("hello");
    // // write.close();
    // stream = new WritableStream();
    // console.log("fileHandle.createWriter: ", fileHandle.createWriter);
    // const writer = stream.createWriter();
    let data = "Learning how to write in a file."
        // writer.write(data);
        // write.close();
        // Support for Chrome 82 and earlier.
        // // let data = "Learning how to write in a file."
        // const fs = require('fs')

    // // Data which will write in a file. 
    // let data = "Learning how to write in a file."

    // // Write data in 'Output.txt' . 
    // fs.writeFile('hello.txt', data, (err) => {

    //         // In case of a error throw err. 
    //         if (err) throw err;
    //     })
    // if (fileHandle.createWriter) {
    // Create a writer (request permission if necessary).
    // const writer = await stream.createWriter("text.txt"); //fileName.createWriter({ keepExistingData: false });
    // // Write the full length of the contents

    // let contents = "write some data into file";
    // await writer.write(contents);
    // // Close the file and write the contents to disk
    // await writer.close();
    // return;
    //}
    // For Chrome 83 and later.
    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(contents);
    // Close the file and write the contents to disk.
    await writable.close();
}

// var butOpenFile = document.getElementById("btn");

// }