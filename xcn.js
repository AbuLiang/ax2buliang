/*-----Promise-----*/
function Promise(cb){
    this._status = "pending";
    this._msg = "";
    cb(this.resolve.bind(this), this.reject.bind(this));
}
Promise.prototype.resolve = function(msg){
    if(this._status==="pending"){
        this._status = "fullfilled";
        this._msg = msg;
    }
}
Promise.prototype.reject = function(msg){
    if(this._status==="pending"){
        this._status = "rejected";
        this._msg = msg;
    }
}
Promise.prototype.then = function(isResolve,isReject){

    if(this._status === 'fullfille{d')
        var _isPromise = isResolve(this._msg);
        if(_isPromise instanceof Promise){  
                return _isPromise;
        }
        //return this;  //省略了其他一些具体情况
    }else if(this._status === 'rejected' && arguments[1]){  
        var err = new TypeError(this._msg);
        var _isPromise = isReject(err);
        if(_isPromise instanceof Promise){  
            return _isPromise;
        }
        //return this;   //省略了其他一些具体情况 
    } 
}

/*-----Vue数据绑定-----*/
class Observer{
    constructor(data){
        this.walk(data);
    }
    walk(data){
        Object.keys(data).forEach(key=>{
            defineReactive(data,key,data[key]);
        })
    }
}

function defineReactive(data, key, val){
    let dep = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get(){
            dep.depend();
            return val;
        },
        set(newVal){
            dep.notify()
            val = newVal;
        }
    })
}

class Dep{
    static target:?Watcher;
    subs:Array<Watcher>;
    addSub (sub: Watcher) {
        this.subs.push(sub)
    }
    depend(){
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }
    notify () {
        for (let i = 0, l = subs.length; i < l; i++) {
          subs[i].update()
        }
    }
}

class Watcher{
    constructor(expOrFn,cb){
        this.getter = expOrFn;
        this.cb = cb;
        this.deps = [];
    }
    get () {
        //pushTarget函数将target设置为该watcher实例
        pushTarget(this)
        const value = this.getter() //就在这一步收集依赖
        popTarget()
        //清理依赖
        this.cleanupDeps()
        return value
    }
    addDep (dep) {
        //这里没有考虑去重
        this.deps.push(dep);
        dep.addSub(this);    
    }
    notify(){
        //实际是调用run(),run中调用get()
        this.get();
    } 
}

/*-----函数防抖-----*/
function debounce(fn) {  
    var timer;
    var _self = fn; 
    return function() {
        clearTimeout(timer);   
        var args = arguments; // fn所需要的参数
        var _me = this; // 当前的this
        timer = setTimeout(function() {
            _self.call(_me, args)
        }, 200);
    }
}

/*-----函数节流-----*/
function throttle(fn, interval) {  
    var _self = fn;  
    var firstTime = true;
    var timer;  
    return function() {   
        var args = arguments;
        var _me = this;
        if (firstTime) {
            _self.call(_me, args)
        }    
        if (timer) { 
            return false;
        }
        timer = setTimeout(function() {
            clearTimeout(timer);
            timer = null;
            _self.call(_me, args);
        }, interval || 500);
    }
}

/*-----深拷贝-----*/ 
function deepCopy(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key]!==null) {
                result[key] = deepCopy(obj[key]);   //递归复制
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}

/*-----存在循环引用的深拷贝-----*/
function deepCopy(obj) {
    // hash表，记录所有的对象的引用关系
    let map = new WeakMap();
    function _dp(obj) {
        let result = null;
        let existobj = null;
  
        existobj = map.get(obj);
        if(existobj) {
            return existobj;
        }
  
        result = {}
        map.set(obj, result);
  
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object' && obj[key]!==null) {
                    result[key] = _dp(obj[key]);   //递归复制
                } else {
                    result[key] = obj[key];
                }
            }
        }
        return result;
    }
    return _dp(obj);
}


/*-----Array.reduce原生实现-----*/ 
Array.prototype.reduce = function(fn , prev) {
    for(let i = 0; i<this.length; i++) {
        if (typeof prev === 'undefined') {
            // prev不存在
            prev = fn(this[i], this[i+1], i+1, this);
            i++;
        } else {
            prev = fn(prev, this[i], i, this);
        }
    }
    return prev;
}


const a = new Promise((resolve,reject)=>{
    console.log("promise1");
    resolve();
}).then(()=>{
    console.log("promise2");
})

const b = new Promise(async (resolve,reject)=>{
    await a;
    console.log("after1");
    await b;
    console.log("after2");
    resolve();
})
console.log("end");


