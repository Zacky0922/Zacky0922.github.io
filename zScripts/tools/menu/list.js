


class setUl{
    #ul = document.createElement("ul");

    constructor() {

    }
    setID(id) {
        this.#ul.id = id;
    }
    setClass(cl) {
        this.#ul.classList.add(cl);
    }
    add(inner) {
        let li = document.createElement("li");
        li.appendChild(inner);
        this.#ul.appendChild(li);
    }
    add_innerHTML(inner) {
        let li = document.createElement("li");
        li.innerHTML = inner;
        this.#ul.appendChild(li);
    }
    get() {
        return this.#ul;
    }
}

class setLinkList extends setUl {

    addLink(tx, href, target = "_self", description = null) {
        let a = document.createElement("a");
        a.href = href;
        a.target = target;
        li.appendChild(a);
        if (description != null) {
            li.appendChild(document.createElement(br));
            li.appendChild(document.createTextNode(description));
        }
        //this.super(#ul).appendChild(li);
    }
}






