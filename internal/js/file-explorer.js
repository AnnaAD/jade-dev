function openFileExplorer(fileSystem, onFileSelected) {
    // Create the file/folder list
    const $fileList = $('#file-list');
    $fileList.empty();

    function buildFileTree(files, parent) {
        files.forEach(item => {
            if (Array.isArray(item)) {
                // Folder
                const folderName = item[0];
                const folderFiles = item[1];
                const $folder = $('<div class="folder"></div>').text(folderName);
                const $subFileList = $('<div></div>').css('padding-left', '10px').hide();

                // Add click behavior to toggle folder
                $folder.click(function() {
                    $subFileList.toggle();
                });

                parent.append($folder);
                parent.append($subFileList);
                buildFileTree(folderFiles, $subFileList);
            } else {
                // File
                const $file = $('<div class="file"></div>').text(item);
                $file.click(function() {
                    onFileSelected(item);
                    closeFileExplorer();
                });
                parent.append($file);
            }
        });
    }

    // Build the file tree UI
    buildFileTree(fileSystem, $fileList);

    // Show the overlay and the file explorer
    $('#file-explorer-overlay').show();
    $('#file-explorer').show().position({
        my: "center",
        at: "center",
        of: window
    });
}

function closeFileExplorer() {
    $('#file-explorer-overlay').hide();
    $('#file-explorer').hide();
}


 // Function to fetch the file system
 function fetchFileSystem() {
    return $.ajax({
        url: '/files',  // Replace with your API endpoint
        method: 'GET',
        dataType: 'json'
    });
}

// Example usage
function loadAndOpenFiles(callback) {
    // Fetch file system and open the file explorer on success
    fetchFileSystem().done(function(fileSystem) {
        console.log(fileSystem);
        openFileExplorer(fileSystem["body"], function(selectedFile) {
            callback(selectedFile);
        });
    }).fail(function() {
        alert('Failed to load file system');
    });
}



