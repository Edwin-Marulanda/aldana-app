function mayuscula(){
    var veditor="";
    veditor=document.getElementById("editores").value.toUpperCase();

    document.getElementById("editores").value=veditor;
}

function minuscula(){
    var veditor="";
    veditor=document.getElementById("editores").value.toLowerCase();

    document.getElementById("editores").value=veditor;
}

function negrilla() {
    document.form1.editor.style.fontWeight="bold";
}
function cursiva() {
    document.form1.editor.style.fontStyle="italic";
}
function subrayada() {
    document.form1.editor.style.textDecoration="underline";
}
function formato() {
    var color_texto;
    color_texto = document.getElementById("color").value;
    document.form1.editor.style.color=color_texto
}