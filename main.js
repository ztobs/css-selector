loadForm();



function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "-header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        elmnt.style.right = "unset";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


let prevQuery = "tobi";
let list = document.querySelector('#css-selector #result');

function go() {
    let query = document.querySelector('#css-selector-value').value;
    if(query.toString().trim() === '') {
        return false;
    }

    // remove old selector
    prevQueryElems = document.querySelectorAll(prevQuery);
    if(prevQueryElems.length > 0) {
        prevQueryElems.forEach((ele, cc) => {
            ele.classList.remove('csz_selected');
        })
    }


    let listString = '';
    let cc = 0;
    queryElems = document.querySelectorAll(query);
    if(queryElems.length > 0) {
        document.querySelectorAll(query).forEach((ele)=>{
            ele.classList.add('csz_selected');
            listString += '<div class="csz_list" data-value="' + generateSelector(ele) + '">' + generateSelector(ele) + ',</div>';
            cc++;
        });
    }
    list.innerHTML = '<div  class="cs_class"></div><h4>' + cc + ' matches</h4></div>' + listString;
    prevQuery = query;
}






// Create the dom elements
function loadForm() {
    let box = document.createElement("div");
    box.id = "css-selector";

    let header = document.createElement("div");
    header.id = "css-selector-header";
    header.innerText = "Input Selector";

    let body = document.createElement("div");
    body.id = "css-selector-body";

    let inputContainer = document.createElement("div");
    inputContainer.className = "input";

    let input = document.createElement("input");
    input.type = "text";
    input.id = "css-selector-value";

    let goBtn = document.createElement("button");
    goBtn.id = "css-selector-go";
    goBtn.onclick = "go();";
    goBtn.innerText = "GO";

    inputContainer.appendChild(input);
    inputContainer.appendChild(goBtn);

    let result = document.createElement("div");
    result.id = "result"

    body.appendChild(inputContainer);
    body.appendChild(result);

    box.appendChild(header);
    box.appendChild(body);

    document.body.appendChild(box);

    // Make draggable:
    dragElement(box);


    document.querySelector('#css-selector #css-selector-value').addEventListener('keypress', (e)=>{
    if (e.key == 'Enter') {
            go();
        }
    });
}

// helper functions
function generateSelector(context) {
    let index, pathSelector, localName;

    if (context == "null") throw "not an dom reference";
    // call getIndex function
    index = getIndex(context);

    while (context.tagName) {
        // selector path
        pathSelector = context.localName + (pathSelector ? ">" + pathSelector : "");
        context = context.parentNode;
    }
    // selector path for nth of type
    pathSelector = pathSelector + `:nth-of-type(${index})`;
    return pathSelector;
}

// get index for nth of type element
function getIndex(node) {
    let i = 1;
    let tagName = node.tagName;

    while (node.previousSibling) {
        node = node.previousSibling;
        if (
            node.nodeType === 1 &&
            tagName.toLowerCase() == node.tagName.toLowerCase()
        ) {
            i++;
        }
    }
    return i;
}