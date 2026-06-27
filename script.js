// Make the main DIV element draggable if present:
var mainScreen = document.getElementById("main");
if (mainScreen) dragElement(mainScreen);

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
    // Step 2: Set up variables to keep track of the element's position.
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

    // Step 3: Check if there is a special header element associated with the draggable element.
    if (document.getElementById(element.id + "header")) {
        // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
        // This allows you to drag the window around by its header.
        document.getElementById(element.id + "header").onmousedown = startDragging;
    } else {
        // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
        // This allows you to drag the window by holding down anywhere on the window.
        element.onmousedown = startDragging;
    }

    // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();
        // Step 7: Get the mouse cursor position at startup.
        initialX = e.clientX;
        initialY = e.clientY;
        // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
        document.onmouseup = stopDragging;
        document.onmousemove = dragElement;
    }

    // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
    function dragElement(e) {
        e = e || window.event;
        e.preventDefault();
        // Step 10: Calculate the new cursor position.
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }

    // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
function closeWindow(element) {
    if (!element) return;
    element.classList.add('hidden');
}

function openWindow(element) {
    if (!element) return;
    element.classList.remove('hidden');
}
// Query controls and other app shells
var mainScreenClose = document.querySelector("#mainclose");
var mainScreenOpen = document.querySelector("#mainopen");

var hobby = document.querySelector("#hobby");
var project = document.querySelector("#project");
var bulletin = document.querySelector("#bulletin");

var hobbyOpen = document.querySelector("#hobbyopen");
var projectOpen = document.querySelector("#projectopen");
var hobbyClose = document.querySelector("#hobbyclose");
var projectClose = document.querySelector("#projectclose");
var bulletinOpen = document.querySelector("#bulletinopen");
var bulletinClose = document.querySelector("#bulletinclose");

// Make hobby and project draggable if present
if (hobby) dragElement(hobby);
if (project) dragElement(project);
if (bulletin) dragElement(bulletin);

if (mainScreenClose) {
    mainScreenClose.addEventListener("click", function () {
        closeWindow(mainScreen);
    });
} else {
    console.warn("#mainclose not found — close handler not attached");
}

if (mainScreenOpen) {
    mainScreenOpen.addEventListener("click", function () {
        openWindow(mainScreen);
    });
} else {
    console.warn("#mainopen not found — open handler not attached");
}

if (hobbyClose) {
    hobbyClose.addEventListener('click', function () { closeWindow(hobby); });
}
if (projectClose) {
    projectClose.addEventListener('click', function () { closeWindow(project); });
}
if (bulletinClose) {
    bulletinClose.addEventListener('click', function () { closeWindow(bulletin); });
}

if (hobbyOpen) {
    hobbyOpen.addEventListener('click', function () { openWindow(hobby); });
}
if (projectOpen) {
    projectOpen.addEventListener('click', function () { openWindow(project); });
}
if (bulletinOpen) {
    bulletinOpen.addEventListener('click', function () { openWindow(bulletin); });
}

// Shutdown: attempt to close the current tab/window. Browsers often block this
// unless the window was opened by script; provide a graceful fallback message.
var shutdownOpen = document.querySelector('#shutdownopen');
if (shutdownOpen) {
    shutdownOpen.addEventListener('click', function () {
        try {
            window.open('', '_self');
            window.close();
            setTimeout(function () {
                document.body.innerHTML = '<div style="color:white;padding:16px;font-family:Helvetica, Noto Sans, sans-serif">Shutdown blocked by browser. Close this tab manually.</div>';
            }, 100);
        } catch (e) {
            document.body.innerHTML = '<div style="color:white;padding:16px;font-family:Helvetica, Noto Sans, sans-serif">Shutdown blocked by browser. Close this tab manually.</div>';
        }
    });
}

document.addEventListener("keydown", function (event) {
    if (event.altKey && event.key === "F1") {
        event.preventDefault();

        // Close all page-wrap windows
        var allWindows = document.querySelectorAll(".page-wrap");
        allWindows.forEach(function (window) {
            window.classList.add("hidden");
        });
    }
});

document.addEventListener("keydown", function (event) {
    if (event.altKey && event.key === "F2") {
        event.preventDefault();
        document.querySelectorAll(".page-wrap").forEach(function (win) {
            win.classList.add("hidden");
        });
    }

    if (event.altKey && event.key.toLowerCase() === "h") {
        event.preventDefault();
        var hobbyWindow = document.getElementById("hobby");
        if (hobbyWindow) hobbyWindow.classList.remove("hidden");
    }

    if (event.altKey && event.key.toLowerCase() === "p") {
        event.preventDefault();
        var projectWindow = document.getElementById("project");
        if (projectWindow) projectWindow.classList.remove("hidden");
    }

    if (event.altKey && event.key.toLowerCase() === "m") {
        event.preventDefault();
        var mainWindow = document.getElementById("main");
        if (mainWindow) mainWindow.classList.remove("hidden");
    }

    if (event.altKey && event.key.toLowerCase() === "m") {
        event.preventDefault();
        var mainWindow = document.getElementById("main");
        if (mainWindow) mainWindow.classList.remove("hidden");
    }


});