const shoppingList = document.querySelector("ul");
const addButton = document.querySelector("button");
const entryInput = document.querySelector("input");
const main = document.querySelector("div");
const colorArray = ["red", "orange", "yellow", "green", "light-blue", "blue", "purple"]; //colors added as classes - specified in the css file. needs to be a list of 7 colors to work properly (if title text will remain unchanged)

addButton.addEventListener("click", createItem);


function createItem () {
        if (!entryInput.value.trim()) { //removes whitespace from entries
            disableEntry();
            const warning = document.createElement("div");
            warning.setAttribute("class", "warning");
            warning.textContent = "Nothing was submitted to your list - please, try again";
            main.appendChild(warning);
    
            setTimeout(() => {
                warning.remove();
                addButton.classList.remove("no-click"); //disables entry/input interaction while the warning is present
                entryInput.classList.remove("no-click")
            }, 2000);
            
            return;
        } 
    
    const listItem = document.createElement("li");

        const itemText = document.createElement("span");
        itemText.textContent = entryInput.value.trim();
        listItem.appendChild(itemText);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        listItem.appendChild(deleteButton);
    
            deleteButton.addEventListener("click", () => {
                listItem.classList.add("fade-out");
                setTimeout(() => {
                    listItem.remove();
                    updateListItemColors(); //will update colors of items in the list, keeping the correct color order
                }, 200);
    
            });

    shoppingList.appendChild(listItem);
    entryInput.value = "";
    updateListItemColors();

    const allListItems = document.querySelectorAll("li");
    const count = allListItems.length;

    if (count === 7) {
        disableEntry();
        updateTitleWithRainbow("My shopping list", "RAINBOW", colorArray); //base title is meant to be 3 words long for the rest of the function to work as intended

        const rainbow = document.createElement("img");
        rainbow.src = "/rainbow.webp";
        shoppingList.appendChild(rainbow);
        
        const allDeleteButtons = shoppingList.querySelectorAll("li button");
        allDeleteButtons.forEach(button => {
            button.classList.add("no-click");
        })
    }
}

function updateListItemColors () {
    const listItems = Array.from(document.querySelectorAll("li"));

    listItems.forEach((item, index) => {
        item.classList.remove(...colorArray); //removes all (if any) color classes (that are present in the specified array) that were already applied
        item.classList.add(colorArray[index]); //assigns a color based on the index of the item
    });
}

function disableEntry () {
    addButton.classList.add("no-click");
    entryInput.classList.add("no-click");
}

function updateTitleWithRainbow(baseTitle, rainbowWord, colorArray) {
    const title = document.querySelector("h1");
    title.innerHTML = '';
    
    const dividedTitle = baseTitle.split(" ");
    const firstWord = document.createElement("span");
    firstWord.textContent = dividedTitle[0];
    title.appendChild(firstWord);
    title.appendChild(document.createTextNode(" ")); //adds spaces between the words in the title
    
    const rainbowArray = rainbowWord.split("");
    rainbowArray.forEach((letter, index) => {
        const letterSpan = document.createElement("span");
        letterSpan.textContent = letter;
        letterSpan.classList.add(colorArray[index]);
        title.appendChild(letterSpan);
    });
    
    const secondWord = document.createElement("span");
    secondWord.textContent = dividedTitle[1];
    
    const thirdWord = document.createElement("span");
    thirdWord.textContent = dividedTitle[2];

    title.append(document.createTextNode(" "), secondWord, document.createTextNode(" "), thirdWord); //adds in the rest of the title
}