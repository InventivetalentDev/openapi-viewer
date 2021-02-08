import SwaggerUI from "swagger-ui";
import 'swagger-ui/dist/swagger-ui.css';

const definition = window.location.hash.substr(1);

const ui = SwaggerUI({
    dom_id: "#ui",
    url: definition
});
