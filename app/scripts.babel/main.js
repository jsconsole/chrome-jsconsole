// const emojis = {
//     'heart': '❤️'
// };
const style = {
    color: '#107896',
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: '18px'
};
const LIST = ['angular', 'jQuery','lodash', 'moment', 'react'];
const _js =  function () {
    const _getList = function (name){
        var url = `https://api.cdnjs.com/libraries?search=${name}&fields=version,description,homepage`;
        return fetch(url).then(function(dataJSON){
            return dataJSON.json(); })
    };
    const _cssParser = function(innerStyle = {}){
        const css = `color: ${innerStyle.color || style.color}; font-size: ${innerStyle.fontSize || style.fontSize}; font-weight: ${innerStyle.fontWeight || style.fontWeight}; line-height: ${innerStyle.lineHeight || style.lineHeight};`;
        return css;
    }
    const _isValidURL = function (str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(str);
    }
    const _printList = function(){
        const data = [
            { 'Name' :LIST[0], 'Command': 'js.load(0)'},
            { 'Name' :LIST[1], 'Command': 'js.load(1)'},
            { 'Name' :LIST[2], 'Command': 'js.load(2)'},
            { 'Name' :LIST[3], 'Command': 'js.load(3)'},
            { 'Name' :LIST[4], 'Command': 'js.load(4)'},
            ];
        console.table(data);
    }
    const _print = function(data){
        console.log(`%c${data}`,_cssParser());
    }
    const load = function(value = ''){
        const loadingList = [];
        if(!value.toString().trim()){
            _print('Enter valid value');
            return;
        }
        if(Number.isInteger(value)){
            if(!LIST[value]){
                _print('Enter valid NUMBER_FROM_LIST value, select from below list');
                _printList();
                return;
            }else {
                loadingList.push(_getList(LIST[value.trim()]));
            }
        } else if(_isValidURL(value)){
            loadingList.push(value);
        } else if(Array.isArray(value)){
            console.log(value.length);
            if(value.length === 0){
                _print('Enter a valid value in array');
                return;
            }
            value.forEach(function(singleValue){
                if(_isValidURL(singleValue)){
                    loadingList.push(singleValue);
                } else if(Number.isInteger(singleValue)){
                    if(!LIST[singleValue]){
                        _print('Enter valid NUMBER_FROM_LIST value, select from below list');
                        _printList();
                        return;
                    }else {
                        loadingList.push(_getList(LIST[singleValue]));
                        console.log(index);
                    }
                } else {
                    loadingList.push(_getList(singleValue.trim()));
                }
            });
        } else {
            loadingList.push(_getList(value.trim()));
        }
        Promise.all(loadingList).then(function(data){
            data.forEach(function(singleData){
                const script = document.createElement('script');
                if(singleData !== null && typeof singleData === 'object'){
                   let singleResult;
                    singleData.results.forEach(function(result){
                        if(result.name.toLowerCase() === value.toLowerCase() || result.name.toLowerCase() === (`${value}.js`).toLowerCase()){
                            singleResult = result;
                        }
                    });
                    if (singleResult && singleResult.latest){
                        _print(`Loading... ${singleResult.name} with version ${singleResult.version} from ${singleResult.latest}`);
                        script.onload = function(){
                            _print(`Loading completed for ${singleResult.name}`);
                        };
                        script.onerror = function(){
                            _print(`Some error occur whilte loading ${singleResult.name}`);
                        };
                        script.src = singleResult.latest;
                        (document.head||document.documentElement).appendChild(script);
                    } else {
                        _print('Sorry no exact cdn found for value');
                        _print(`Did you mean "${value}" to be any of the below results`);
                        console.table(singleData.results.slice(0, 10));
                        _print('Try js.find("name")');
                    } 
                } else if(typeof singleData === 'string'){
                    _print(`Loading... ${singleData}`);
                    script.onload = function(){
                        _print(`Loading completed for ${singleData}`);
                    };
                    script.onerror = function(){
                        _print(`Some error occur whilte loading ${singleData}`);
                    };
                    script.src = singleData;
                    (document.head||document.documentElement).appendChild(script);
                }    
            });
        })
        // _getList(value).then(function(data){
        //     let singleResult;
        //     data.results.forEach(function(result){
        //         if(result.name.toLowerCase() === value.toLowerCase() || result.name.toLowerCase() === (`${value}.js`).toLowerCase()){
        //             singleResult = result;
        //         }
        //     });
        //     if (singleResult && singleResult.latest){
        //         const script = document.createElement('script');
        //         _print(`Loading... ${singleResult.name} with version ${singleResult.version} from ${singleResult.latest}`);
        //         script.onload = function(){
        //             _print(`Loading completed for ${singleResult.name}`);
        //         };
        //         script.onerror = function(){
        //             _print(`Some error occur whilte loading ${singleResult.name}`);
        //         };
        //         script.src = singleResult.latest;
        //         (document.head||document.documentElement).appendChild(script);
        //     } else {
        //         _print('Sorry no exact cdn found for value');
        //         _print(`Did you mean "${value}" to be any of the below results`);
        //         console.table(data.results.slice(0, 10));
        //         _print('Try js.find("name")');
        //     }
        // });
    };
    const find = function(value ='', force){
        if(!value.toString().trim()){
            _print('Enter valid value');
            return;
        }
        _print('Searching...');
        _getList(value).then(function(data){
            const result = data.results.filter(function(result){
                return result.name.indexOf(value) > -1
            });
            if (result && result.length > 0){
                _print('Here is the list');
                if(force){
                    console.table(result);
                } else {
                    if(result.length > 10) _print(`Only Top 10 results has been shown below out of ${result.length}, if wanna see all use js.find('${value}', true)`);
                    console.table(result.slice(0, 10));
                }
                
            } else {
                _print(`Sorry no cdn list found for ${value}`);
            }
        });
    }
    const list = function(){
        _printList();
    }
    const result = {
        load,
        find,
        list
    };
    Object.defineProperty(result, 'doc', { get: function() {
        const heading = '                      %cJSconsole (Swiss Knife for JS)';
        const doc = `

%cjs.load(NAME(String) || URL(String) || [NAME, URL, NAME](Array) || NUMBER_FROM_LIST(Number)):
%cLoad the latest library from the internal CDN according to to NAME(S). For NUMBER_FROM_LIST use js.list();

%cjs.find(NAME(String), forceDisplayAll(Boolean)):
%cSearch the top 10 libraries with the given name and if forceDisplayAll is true it will show all the librarires'

%cjs.doc:
%cBASIC Documentation for this Extension!!!!!

%cjs.list():
%cShow number alias for the top libraries.
`;
        console.log(`${heading} ${doc}`, 
        _cssParser(Object.assign({}, style, {fontSize: '18px', lineHeight: '22px'})),
        _cssParser(Object.assign({}, style, {fontSize: '14px', color: '#e5853d'})),_cssParser(style),
        _cssParser(Object.assign({}, style, {fontSize: '14px', color: '#e5853d'})),_cssParser(style),
        _cssParser(Object.assign({}, style, {fontSize: '14px', color: '#e5853d'})),_cssParser(style),
        _cssParser(Object.assign({}, style, {fontSize: '14px', color: '#e5853d'})),_cssParser(style),
        );
        // console.log(heading, {fontSize: '16px'});
    } });
    console.log(result.doc);
    return result;
};
window.js = _js();
// var _getList = async function (name){
//     var url = 'https://api.cdnjs.com/libraries?search=';
//     const dataJSON = await fetch(url + name);
//     const results = await dataJSON.json();
//     let singleResult;
//     for(let i=0;i < results.length; i++) {
//         if(results[i].name === `${name}.js`){
//             singleResult = results[i];
//         }
//     }
//     return singleResult;
// };

// const _js = async function (name) {
//     console.log(name);
//     const data = await getList(name);
//     if (data && data.latest){
//         const script = document.createElement('script');
//         script.src = data.latest;
//         (document.head||document.documentElement).appendChild(script);
//     } else {
//         console.log('Sorry no cdn found for', name);
//     }
// };
// console.log('Loaded', _js);
// window.js = _js;