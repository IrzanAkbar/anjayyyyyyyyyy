// Daftar Perintah yang Tersedia
const commands = {
    help: {
      desc: "Show all commands",
      execute: () => `
  Available commands:
  - <span class="command">help</span>       : Show this help
  - <span class="command">about</span>      : About Andi
  - <span class="command">projects</span>   : List of projects
  - <span class="command">time</span>       : Show current time and day
  - <span class="command">clear</span>      : Clear terminal
      `
    },
    about: {
        desc: "About Andi",
        execute: () => `
          Andi Irzan Akbar H.
          14 years old, an aspiring developer from Indonesia
          Skills: HTML, CSS, JavaScript, C++ (beginner)
          Currently diving into: Web Development
          Passionate about technology and always eager to learn more.
        `
      },   
    projects: {
      desc: "List of projects",
      execute: () => `
  1. Cyber Calculator (HTML/CSS/JS)
  2. AI Chat Interface (React/Node.js)
  3. Portfolio Website (HTML/CSS/JS)
      `
    },
    clear: {
      desc: "Clear terminal",
      execute: () => {
          document.getElementById("terminal-output").innerHTML = "";
          return "";
      }
  },
  weather: {
    desc: "Get the current weather of a city",
    execute: async (city) => {
        const weatherData = await getWeather(city);
        return weatherData;
    }
},
  time: {
      desc: "Show current time and day",
      execute: () => {
          const now = new Date();
          const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          const day = days[now.getDay()];
          const hours = now.getHours().toString().padStart(2, "0");
          const minutes = now.getMinutes().toString().padStart(2, "0");
          const seconds = now.getSeconds().toString().padStart(2, "0");

          return `Current time: ${hours}:${minutes}:${seconds} on ${day}`;
      }
  }
};
  
  function typeText(element, text, isHTML = false) {
    let index = 0;
    element.innerHTML = "";
    const cursor = '<span class="blinking-cursor">|</span>';
    
    const interval = setInterval(() => {
      if (index < text.length) {
        if (isHTML) {
          element.innerHTML = text.substring(0, index + 1) + cursor;
        } else {
          element.textContent = text.substring(0, index + 1) + cursor;
        }
        index++;
      } else {
        clearInterval(interval);
        element.innerHTML = text; // Remove cursor
      }
    }, 30);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("terminal-command");
    const output = document.getElementById("terminal-output");
  
    input.addEventListener("keydown", async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const command = input.value.trim().toLowerCase();
        input.value = "";
  
        // Add command line
        const commandLine = document.createElement("p");
        commandLine.textContent = `> ${command}`;
        output.appendChild(commandLine);
  
        // Create response container
        const responseLine = document.createElement("p");
        output.appendChild(responseLine);
  
        if (commands[command]) {
          // Handle special clear command
          if (command === "clear") {
            output.innerHTML = "";
            return;
          }
          
            // Handle HTML responses
            if (command === "weather") {
              // Ambil nama kota dari input perintah
              const city = command.split(' ')[1];
              if (city) {
                  typeText(responseLine, await commands[command].execute(city), true);
              } else {
                  typeText(responseLine, `Please specify a city, e.g. 'weather Jakarta'`, true);
              }
          } else {
              typeText(responseLine, commands[command].execute(), true);
          }
      } else {
          typeText(responseLine, `Command not found. Type <span class="command">help</span> for commands.`, true);
      }

      output.scrollTop = output.scrollHeight;
  }
});
});

  