var maxN = 0;

function add() 
{
    a = document.getElementById("list");

    b =  document.createElement("div");

    field = document.createElement("input");
    field.setAttribute("type","text");
    field.setAttribute("placeholder","From");
    field.setAttribute("id","from" + maxN);

    field1 = document.createElement("input");
    field1.setAttribute("type","text");
    field1.setAttribute("placeholder","to");
    field1.setAttribute("id","to" + maxN);

    field2 = document.createElement("input");
    field2.setAttribute("type","number");
    field2.setAttribute("placeholder","Cost");
    field2.setAttribute("id","cost" + maxN);

    b.appendChild(field);
    b.appendChild(field1);
    b.appendChild(field2);
    a.appendChild(b);

    maxN++;
}

let myMap = function() {
    this.collection = {};
    this.count = 0;
    this.size = function() {
        return this.count;
    };
    this.set = function(key, value) {
        this.collection[key] = value;
        this.count++;
    };
    this.has = function(key) {
        return (key in this.collection);
    };
    this.get = function(key) {
        return (key in this.collection) ? this.collection[key] : null;
    };
    this.delete = function(key) {
        if (key in this.collection) {
            delete this.collection[key];
            this.count--;
        }
    };
    this.values = function() {
        let result = new Array();
        for (let key of Object.keys(this.collection)) {
            console.log(key);
            result.push(this.collection[key]);
        };
        return (result.length > 0) ? result : null;
    };
    this.clear = function() {
        this.collection = {};
        this.count = 0;
    };
};

var map;
var positive;
var negative;
var ans;
function extract()
{
    map       = new myMap();
    positive  = new Array();
    negative  = new Array();
    ans       = new Array();
    for (var i = 0; i < maxN; i++) 
    {
        var from = document.getElementById("from" + i).value;
        var to   = document.getElementById("to"   + i).value;
        var cost = document.getElementById("cost" + i).value;
        cost = parseInt(cost);
        
        if(map.has(from))
        {
            let tmp = parseInt(map.get(from));
            map.delete(from);
            tmp = tmp + cost;
            map.set(from,tmp);
        }
        else
            map.set(from,cost);
        
        if(map.has(to))
        {
            let tmp = parseInt(map.get(to));
            map.delete(to);
            tmp = tmp - cost;
            map.set(to,tmp);
        }
        else
            map.set(to,-cost);
    }

    for (let key of Object.keys(map.collection)) {
        let val = map.collection[key];
        if(val > 0)
            positive.push({key,val});
        if(val < 0){
            val = -val;
            negative.push({key,val});
        }
    };
    function decending( a, b ) {
      if ( a.val > b.val )
        return -1;
      if ( a.val < b.val )
        return 1;
      return 0;
    }
    positive.sort(decending);
    negative.sort(decending);
    let l = 0,r = 0;
    let pos = positive.length;
    let neg = negative.length;

    while(l<pos && r<neg)
    {
        let cost = Math.min(positive[l].val,negative[r].val);
        positive[l].val = positive[l].val - cost;
        negative[r].val = negative[r].val - cost;

        let from = positive[l].key;
        let to = negative[r].key;

        ans.push({to,from,cost});

        if(positive[l].val==0)
            l++;
        if(negative[r].val==0)
            r++;
    }
    for(let i=0;i < ans.length;i++)
    {
        a = document.getElementById("ansList");
        b =  document.createElement("div");

        field  = document.createTextNode(ans[i].from + " -> ");
        field1 = document.createTextNode(ans[i].to + " : ");
        field2 = document.createTextNode(ans[i].cost);

        b.appendChild(field);
        b.appendChild(field1);
        b.appendChild(field2);

        a.appendChild(b);
    }
}
