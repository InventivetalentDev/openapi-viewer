import SwaggerUI from "swagger-ui";
import 'swagger-ui/dist/swagger-ui.css';
import './style.css'

const definition = window.location.hash.substr(1);

if (!definition) {
    const wrapper = document.getElementById("input-wrapper");
    wrapper.style.display = "";
    const input = document.getElementById("input");
    input.addEventListener("change", () => {
        window.location.hash = input.value;
        load(input.value);
    });
} else {
    load(definition);
}

function load(definition) {
    window.ui = SwaggerUI({
        dom_id: "#ui",
        url: definition
    });
}
