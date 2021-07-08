import SwaggerUI from "swagger-ui";
import 'swagger-ui/dist/swagger-ui.css';
import './style.css'

const definition = window.location.search.substr(1) || window.location.hash.substr(1);

const wrapper = document.getElementById("input-wrapper");
const input = document.getElementById("input");
const darkToggle = document.getElementById("dark-toggle");

let dark = true;

if (!definition) {
    wrapper.style.display = "";

    // URL
    input.addEventListener("change", () => {
        window.history.pushState("", "", `?${ input.value }`);
        load(input.value);
    });

    // File
    input.addEventListener("dragover", e=>{
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
    })
    input.addEventListener("drop", e=>{
        e.stopPropagation();
        e.preventDefault();

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            load(window.URL.createObjectURL(file));
        }
    })
} else {
    load(definition);
}

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
    window.ui = SwaggerUI({
        dom_id: "#ui",
        url: definition,
        docExpansion: "list",
        onComplete: function (api, ui) {
            console.log(api);
            console.log(ui);
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
