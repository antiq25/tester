const linkSections = { 
  "DNS, CDN, DDOS": [
    ["Cloudflare", "https://www.cloudflare.com", "DNS CDN DDOS"]
  ],
  "Development": [
    ["WebDev", "https://webdevhome.github.io", "Dev Homepage"],
    ["Dev.to", "https://dev.to", "Dev Social"],
    ["DevURLs", "https://devurls.com", "Dev News"],
    ["OpenSource", "https://awesomeopensource.com", "FOSS Dev"],
    ["FreeDev", "https://free-for.dev", "Free Dev"]
    // Add other Development links
  ],
  "Web Server": [
    ["NGINXConf", "https://www.digitalocean.com/community/tools/nginx", "Web Server"],
    ["NGINXDocker", "https://nginxproxymanager.com", "Web Server"],
    ["NGINXGuide", "https://github.com/trimstray/nginx-admins-handbook", "Web Server"]
    // Add other Web Server links
  ],
  "Code": [
    ["svgCode", "red", "-HEAD-"],
    ["Cheat.sh", "https://cheat.sh", "Cheat Sheet"],
    ["CheatSheet", "https://lecoupa.github.io/awesome-cheatsheets/", "Cheat Sheet"],
    ["Cheat-Sheet", "https://lzone.de/cheat-sheet.html", "Cheat Sheet"],
    ["DevRoadmap", "https://roadmap.sh", "Learning Guides"],
    ["FastDesign", "https://www.fast.design", "Code Packages"],
    ["Libraries", "https://libraries.io", "Code Packages"],
    ["Word2HTML", "https://word2cleanhtml.com", "HTML Convert"],
    ["RequestBin", "https://requestbin.com", "Dev Tools"],
    ["GeekTool", "https://gf.dev/toolbox", "Dev Tools"],
    ["GitHub", "https://github.com/trending?since=monthly", "Code Colab"],
    ["GitLab", "https://gitlab.com", "Code Colab"],
    ["Repl.it", "https://repl.it", "Code Colab"],
    ["SharePad", "https://www.sharepad.io", "Code Colab"],
    ["CodePen", "https://codepen.io", "Explore Code"],
    ["CodeSandbox", "https://codesandbox.io/search", "Explore Code"],
    ["DevDocs", "https://devdocs.io", "WebDev Docs"],

    ],
  "Fonts": [
    ["NerdFonts", "https://nerdfonts.com", "Fonts"],
    ["GoogleFont", "https://google-webfonts-helper.herokuapp.com", "Fonts"],
  ]
};

// Add other sections and their links
let isAddingLink = false;
let linkName = "";
let linkUrl = "";


function displayLinks() {
  const terminal = document.getElementById("terminal");
  let linksHTML = "";

  // Iterate over link sections and create the links HTML string
  for (const section in linkSections) {
    linksHTML += `<div class="section-title">${section}</div>`;
    linkSections[section].forEach(link => {
      linksHTML += `<div data-url="${link[1]}" class="link">${link[0]}</div>`;
    });
  }

  // Add the links HTML to the terminal
  terminal.innerHTML = linksHTML;

  // Add event listener to each link
  const links = terminal.getElementsByClassName("link");
  for (const link of links) {
    link.addEventListener("keydown", handleInput);
  }
}

function addLink() {
  const terminal = document.getElementById("terminal");
  const inputField = document.querySelector("#commandInput");

  terminal.innerHTML += "<div>Please enter the name of the link:</div>";

  function handleLinkNameInput(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const linkName = inputField.value.trim();

      terminal.innerHTML += "<div>URL for link:</div>";

      // Remove event listener for link name input
      inputField.removeEventListener("keydown", handleLinkNameInput);

      // Listen for Enter key to capture link URL
      inputField.addEventListener("keydown", handleLinkUrlInput);

      function handleLinkUrlInput(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          const linkUrl = inputField.value.trim();

          // Save the link to local storage
          saveUserLink(linkName, linkUrl);

          // Display confirmation message
          terminal.innerHTML += `
            <div>Link added:</div>
            <div>${linkName}: ${linkUrl}</div>
          `;

          // Clear the input field
          inputField.value = "";

          // Reset the flag and remove the event listener
          isAddingLink = false;
          inputField.removeEventListener("keydown", handleLinkUrlInput);

          // Set the prompt to the default value
          currentPrompt = "> ";
          promptElement.innerText = currentPrompt;
        }
      }
    }
  }

  // Add event listener for link name input
  inputField.addEventListener("keydown", handleLinkNameInput);
}


function navigateLinkSelection(direction) {
  const terminal = document.getElementById("terminal");
  const linkElements = terminal.querySelectorAll(".link");

  if (linkElements.length === 0) return;

  linkElements[selectedLinkIndex].classList.remove("selected-link");

  if (direction === "up") {
    selectedLinkIndex = (selectedLinkIndex - 1 + linkElements.length) % linkElements.length;
  } else if (direction === "down") {
    selectedLinkIndex = (selectedLinkIndex + 1) % linkElements.length;
  }

  linkElements[selectedLinkIndex].classList.add("selected-link");
  linkElements[selectedLinkIndex].scrollIntoView({ behavior: "smooth", block: "nearest" }); //make the screen follow when selecting links
}

function handleCommandInput(event) {
  const inputField = document.querySelector("#commandInput");
  const command = inputField.value.trim();

  if (event.key === "Enter") {
    if (isAddingLink) {
      handleLinkInput(command);
    } else {
      handleRegularCommand(command);
    }
  }
}

function handleLinkInput(command) {
  const terminal = document.getElementById("terminal");
  const inputField = document.querySelector("#commandInput");

  if (linkName === "") {
    linkName = command;
    terminal.innerHTML += "<div>URL for link:</div>";
    inputField.value = "";
  } else if (linkUrl === "") {
    linkUrl = command;
    saveUserLink(linkName, linkUrl);
    terminal.innerHTML += `
      <div>Link added:</div>
      <div>${linkName}: ${linkUrl}</div>
    `;
    inputField.value = "";
    isAddingLink = false;
    linkName = "";
    linkUrl = "";
  }
}




function saveUserLink(name, url) {
  let userLinks = localStorage.getItem("userLinks");

  if (userLinks) {
    userLinks = JSON.parse(userLinks);
    userLinks[name] = url;
  } else {
    userLinks = { [name]: url };
  }

  localStorage.setItem("userLinks", JSON.stringify(userLinks));
}


document.addEventListener("keydown", handleCommandInput);