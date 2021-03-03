//POC: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#updating_the_version_of_the_database
function indexDB(file) {
    let db = null;
    let objectStore = null;
    //Opens DB
    let DBOpenReq = indexedDB.open('Ehh_development', 6);

    DBOpenReq.addEventListener('error', (err) => {
        //Error occurred while trying to open DB
        console.warn(err);
    });
    DBOpenReq.addEventListener('success', (ev) => {
        //DB has been opened... after upgradeneeded
        db = ev.target.result;
        console.log('success', db);
    });
    DBOpenReq.addEventListener('upgradeneeded', (ev) => {

        console.log('upgrade', db);
        if (!db.objectStoreNames.contains('Ehh_developmentStore')) {
            objectStore = db.createObjectStore('Ehh_developmentStore', {
                keyPath: 'id',
            });
        }
    });

//call to Transactions which have three available modes: readonly, readwrite, and versionchange.
    let tx = makeTX('Ehh_developmentStore', 'readwrite');
    tx.oncomplete = (ev) => {
        console.log(ev);
        
    };

    //adds the content to db through store.add(), where file as input given
    let store = tx.objectStore('Ehh_developmentStore');
    //add data/file to store : Ehh_developmentStore
    let request = store.add(file);

    request.onsuccess = (ev) => {
        console.log('successfully added an object');
    };
    request.onerror = (err) => {
        console.log('error in request to add');
    };
    //}
    //);

    function makeTX(storeName, mode) {
        let tx = db.transaction(storeName, mode);
        tx.onerror = (err) => {
            console.warn(err);
        };
        return tx;
    }
};


