import SwaggerUI from "swagger-ui";
import 'swagger-ui/dist/swagger-ui.css';
import './style.css'

const definition = window.location.hash.substr(1);

const wrapper = document.getElementById("input-wrapper");
const input = document.getElementById("input");
const darkToggle = document.getElementById("dark-toggle");

let dark = true;

if (!definition) {
    wrapper.style.display = "";
    input.addEventListener("change", () => {
        window.location.hash = input.value;
        load(input.value);
    });
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
        onComplete: function (api, ui) {
            console.log(api);
            console.log(ui);
            wrapper.style.display = "none";
        },
        onFailure: function () {
            wrapper.style.display = "";
        }
    });
}
