var maxN = 0;

function add() {

    a = document.getElementById("list");

    b =  document.createElement("div");

    field = document.createElement("input");
    field.setAttribute("type","text");
    field.setAttribute("placeholder","From");
    field.setAttribute("id","t"+(maxN));

    field1 = document.createElement("input");
    field1.setAttribute("type","text");
    field1.setAttribute("placeholder","to");
    field1.setAttribute("id","t"+maxN);

    field2 = document.createElement("input");
    field2.setAttribute("type","number");
    field2.setAttribute("placeholder","Cost");
    field2.setAttribute("id","t"+maxN);

    b.appendChild(field);
    b.appendChild(field1);
    b.appendChild(field2);
    a.appendChild(b);

    maxN++;
}

