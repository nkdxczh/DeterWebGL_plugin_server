function TreeNode(type, name, father,url){
    this.children = [];
    this.father = father;
    this.url = url;
    this.name = name;
    this.type = type;
}

var root = new TreeNode('dir',null, null,null);
var current = root;

function add(node, path, file, url){
    console.log(path);
    if(path.length == 0){
        console.log(file);
        var newNode = new TreeNode('file', file, node, url);
        node.children.push(newNode);
    }else{
        nextDir = path[0];
        for(var i = 0; i < node.children.length; i++){
            if(node.children[i].name == nextDir && node.children[i].type == 'dir')break;
        }
        if(i == node.children.length){
            var newNode = new TreeNode('dir', nextDir, node, null);
            node.children.push(newNode);
            add(newNode, path.slice(1,path.length), file, url);
        }else{
            add(node.children[i], path.slice(1,path.length), file, url);
        }
    }
}

function FsCd(path){
    if(path == '..'){
        if(current.father != null)current = current.father;
        return true;
    }
    if(path == '.'){
        return true;
    }
    for(var i = 0; i < current.children.length; i++){
        console.log(':'+current.children[i].name+':', ':'+path+':', current.children[i].type);
        if(current.children[i].name == path && current.children[i].type == 'dir'){
            current = current.children[i];
            return true;
        }
    }
    return false;
}

function FsLs(){
    var result = '<p class="prompt">';
    for(var i = 0; i < current.children.length; i++){
        result += current.children[i].name + ' ';
    }
    return result + '</p>';
}

function FsVi(f, ele){
    for(var i = 0; i < current.children.length; i++){
        console.log(current.children[i].name, f, current.children[i].type);
        if(current.children[i].name == f && current.children[i].type == 'file'){
            ele.src = current.children[i].url;
            return '<p class="prompt">Open file</p>';
        }
    }
    return '<p class="prompt">No this file</p>';
}

function buildFS(text){
    root = new TreeNode('dir',null, null,null);
    var files = text.split('\n');
    for(var f = 0; f < files.length-1; f++){
        data = files[f].split(';');
        path = data[0].split('/');
        file = data[1];
        url = data[2];
        add(root, path, file, url);
    }
    current = root;
}

function loadFS(){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "http://zhanhao.org/doc/notes", true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            var allText = rawFile.responseText;
            buildFS(allText);
        }
    }

    rawFile.send();
}
console.log('inject!!!!')