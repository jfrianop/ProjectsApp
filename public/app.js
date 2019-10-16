var source = document.getElementById("entry-template").innerHTML;
var template = Handlebars.compile(source);

var context = { title: "My New Post", body: "This is my first post!" };
var html = template(context);

const loadProjects = () => {
    $.ajax({
        method: "GET",
        url: "/projects"
    }).done(function (data) {
        data.forEach(project => {
            $("tbody").append(template(project)); // imprimimos la respuesta
        });
    }).fail(function () {
        alert("Algo salió mal");
    });
}

$(document).ready(loadProjects)



$("#submit").on("click", () => {
    let name = $("#name").val();
    let description = $("#description").val();
    $.ajax({
        method: "POST",
        url: "/projects",
        data: JSON.stringify({ name, description }),
        contentType: "application/json"
    }).done(() => {
        $("#name").val("");
        $("#description").val("");
        $("tbody").html("")
        loadProjects();
    });
})