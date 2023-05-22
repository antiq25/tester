let linkSections = {
  "User Links": [], // Section for user-added links
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
    ["PublicAPI", "https://public-apis.io", "API Info"],
    ["PublicAPI2", "https://github.com/public-apis/public-apis", "API Info"],
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
    ["3V4L", "https://3v4l.org", "Test Code"],
    ["CodePen", "https://codepen.io", "Explore Code"],
    ["CodeSandbox", "https://codesandbox.io/search", "Explore Code"],
  ],
  // Add other sections and their links
};


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
  linkElements[selectedLinkIndex].scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function linkAdd() {
  const inputField = document.querySelector("#commandInput");
  const terminal = document.getElementById("terminal");

  if (!currentPrompt.includes("Link Name")) {
    terminal.innerHTML += "<div>Please enter the name of the link:</div>";
    currentPrompt = "Link Name > ";
    promptElement.innerText = currentPrompt;
  } else {
    const linkName = inputField.value.trim();

    if (linkName.length === 0) {
      terminal.innerHTML += "<div>Link name cannot be empty.</div>";
      return;
    }

    terminal.innerHTML += "<div>Please enter the URL of the link:</div>";
    currentPrompt = "Link URL > ";
    promptElement.innerText = currentPrompt;

    linkPrompt = true;
    lastSearchQuery = linkName;
  }
}

function addLink() {
  const inputField = document.querySelector("#commandInput");
  const terminal = document.getElementById("terminal");

  const linkUrl = inputField.value.trim();
  if (linkUrl.length === 0) {
    terminal.innerHTML += "<div>Link URL cannot be empty.</div>";
    return;
  }

  const linkName = lastSearchQuery;

  let sectionFound = false;
  let foundSection = null;

  // Find the section to add the link or create a new section
  for (const section in linkSections) {
    if (linkSections.hasOwnProperty(section)) {
      const links = linkSections[section];
      for (const link of links) {
        if (link[0].toLowerCase() === linkName.toLowerCase()) {
          link[1] = linkUrl; // Update the link URL
          sectionFound = true;
          foundSection = section;
          break;
        }
      }
      if (sectionFound) {
        break;
      }
    }
  }

  if (!sectionFound) {
    foundSection = "User Links"; // Set the section name for user-added links
    if (!linkSections.hasOwnProperty(foundSection)) {
      linkSections[foundSection] = [];
    }
    linkSections[foundSection].push([linkName, linkUrl]);
  }

  terminal.innerHTML += "<div>Link added successfully.</div>";

  // Clear the input field and reset the prompt
  inputField.value = "";
  currentPrompt = "> ";
  promptElement.innerText = currentPrompt;

  // Print the updated links
  displayLinks();

  // Save linkSections to local storage
  saveLinkSections();
}

function displayLinks() {
  const terminal = document.getElementById("terminal");
  let linksHTML = "";

  for (const section in linkSections) {
    linksHTML += `<div class="section-title">${section}</div>`;
    const links = linkSections[section];
    for (const link of links) {
      linksHTML += `<div class="link" data-url="${link[1]}">${link[0]}</div>`;
    }
  }

  terminal.innerHTML = linksHTML;

  const links = terminal.getElementsByClassName("link");
  for (const link of links) {
    link.addEventListener("keydown", handleInput);
  }
}

// Load linkSections from local storage
function loadLinkSections() {
  const storedLinkSections = localStorage.getItem("linkSections");
  if (storedLinkSections) {
    linkSections = JSON.parse(storedLinkSections);
  }
}

// Save linkSections to local storage
function saveLinkSections() {
  localStorage.setItem("linkSections", JSON.stringify(linkSections));
}

loadLinkSections();
displayLinks();
