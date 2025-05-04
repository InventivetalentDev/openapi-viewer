import SwaggerUI from "swagger-ui";
import 'swagger-ui/dist/swagger-ui.css';
import './style.css'

const wrapper = document.getElementById("input-wrapper");
const ui = document.getElementById("ui");
const input = document.getElementById("input");
const homeButton = document.getElementById("home-button");
const darkToggle = document.getElementById("dark-toggle");

let dark = true;

function reload() {
    let definition = undefined;
    if (location.hash.length > 2) {
        definition = location.hash.substring(1);
    } else if (location.search.length > 2) {
        definition = location.search.substring(1);
    } else if (location.pathname.startsWith("/http")) {
        definition = location.pathname.substr(1);
    }

    if (!definition) {
        wrapper.style.display = "";
        ui.style.display = "none";

        // URL
        input.addEventListener("change", () => {
            window.history.pushState({url: input.value}, "", `?${ input.value }`);
            load(input.value);
        });

        // File
        input.addEventListener("dragover", e => {
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = "copy";
        });
        input.addEventListener("drop", e => {
            e.stopPropagation();
            e.preventDefault();

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                load(window.URL.createObjectURL(file));
            }
        });
    } else {
        load(definition);
    }
}

reload();

window.addEventListener('popstate', (event) => {
    console.debug(`location: ${ document.location }, state: ${ JSON.stringify(event.state) }`);
    reload();
});

homeButton.addEventListener("click", (e) => {
    e.preventDefault();

    window.location = "https://rest.wiki";
})

darkToggle.addEventListener("click", (e) => {
    e.preventDefault();

    dark = !dark;
    if (!dark) {
        document.body.classList.remove("dark");
        darkToggle.textContent = "🌚";
    } else {
        document.body.classList.add("dark");
        darkToggle.textContent = "🌞";
    }
})


function load(definition) {
    ui.style.display = "";
    window.ui = SwaggerUI({
        dom_id: "#ui",
        url: definition,
        docExpansion: "list",
        onComplete: function (api, ui) {
            console.log('onComplete', api, ui);
            wrapper.style.display = "none";

            let hash = window.location.hash;
            if (!hash.startsWith("#http")) {
                let idEl = document.querySelector(hash);
                if (idEl) {
                    idEl.querySelector(".opblock-summary").click();
                }
            }
        },
        onFailure: function () {
            wrapper.style.display = "";
        }
    });
}
