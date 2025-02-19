// var variables were function scope: are available within the function they declared in
// const and let are block scoped : within the closest set of { curly braces }
const obj={a:1,b:2};
const {a,b}=obj;
const array=[1,2,3,4,5];
const [zerothEle,firstEle]=array;
