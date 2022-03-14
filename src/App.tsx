import {useEffect, useState} from "react";
import CheckboxMy from "./components/CheckboxMy";
import InputText from "./components/InputText";
import LoaderMy from "./components/LoaderMy";
import Header from "./components/Header";
import clsx from "clsx";


type Post = {
    "userId": number;
    "id": number;
    "title": string;
    "body": string;
}


export default function Home() {
    const [textValue, setTextValue] = useState<string>("init");
    const [checkboxValue, setCheckboxValue] = useState<boolean>(false);
    const [customColorName, setCustomColorName] = useState<string>("blue");
    const [listElement, setListElement] = useState<any>([]);
    const [isVisible, setIsVisible] = useState(false);


useEffect(()=>{
    let list:any[] = [...listElement];
    if (textValue!== 'init'){
        if(checkboxValue){
            list = listElement.filter((item:Post)=>item.title.includes(textValue));
            setListElement(list);
        }else {
           handleSubmit();
        }
    }
},[checkboxValue])

    function handleSubmit() {
        const list: any [] = [];
        let post: Post;
        setIsVisible(false);
        fetch(`https://jsonplaceholder.typicode.com/posts`)
            .then(response => response.json())
            .then(data => {
                data.map((item: Post) => {
                    post = {
                        userId: item.userId,
                        id: item.id,
                        title: item.title,
                        body: item.body
                    };
                    list.push(post);
                })
                console.log(list);
                setListElement(list);
                setIsVisible(true);
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div>
            <Header
                customColorName={customColorName}
                textValue={textValue}
                checkboxValue={checkboxValue}
            />
            <div className="flex gap-3 my-3 items-center justify-center">
                <button
                    onClick={() => setCustomColorName("green")}
                    className="bg-slate-300 rounded-md p-1.5"
                >
                    set green
                </button>
                <button
                    onClick={() => setCustomColorName("blue")}
                    className="bg-slate-300 rounded-md p-1.5"
                >
                    set blue
                </button>


                {/*<button className="bg-slate-300 rounded-md p-1.5"*/}
                {/*        onClick={() => setCheckboxValue(!checkboxValue)}>*/}
                {/*    <span className="bg-yellow-300">TODO: toggle checkbox</span>*/}
                {/*</button>*/}
            </div>

            <div className="flex flex-col gap-5 mb-3 justify-center">
                <CheckboxMy
                    color={customColorName}
                    checkboxValue={checkboxValue}
                    setCheckboxValue={setCheckboxValue}

                />
                {/*Test</CheckboxMy>*/}
                <InputText
                    color={customColorName}
                    value={textValue}
                    placeholder={'Standard'}
                    setTextValue={setTextValue}
                />
                <div className="flex justify-center gap-2">
                    <button className="bg-slate-300 rounded-md p-1.5"
                            onClick={handleSubmit}
                    >
                        <span className="bg-yellow-300">form submit</span>
                    </button>
                </div>
                <div className="font-bold text-center">Results:</div>
                <div className="text-center">
          <span className="bg-yellow-300">
             {listElement.length === 0 ? '' :
                 isVisible ?
                     listElement.map((item: Post, index: number) =>
                         <div key={`id#${index}`}>
                             <h5>{item.title}</h5>
                             <p>{item.body}</p>
                         </div>
                     ) : <LoaderMy/>
             }
          </span>
                </div>
            </div>

            {/*<ol className="list-decimal pl-5 ml-2 mt-5">*/}
            {/*  <li>*/}
            {/*    Clicking on toggle checkbox button should toggle checkbox state.{" "}*/}
            {/*    <br />*/}
            {/*    <code className="bg-purple-400">checkboxValue</code> and checkbox*/}
            {/*    state should be two way synced*/}
            {/*  </li>*/}
            {/*  <li>*/}
            {/*    Clicking on 'set input value' button should change input current*/}
            {/*    value. <br />*/}
            {/*    <code className="bg-green-400">textValue</code> and input state should*/}
            {/*    be two way synced*/}
            {/*  </li>*/}
            {/*  <li>*/}
            {/*    Input border bottom in focus state should change to green instead of*/}
            {/*    blue when <code className="bg-cyan-400">customColorName</code>{" "}*/}
            {/*    variable is green (changes on 'set green' button click)*/}
            {/*  </li>*/}
            {/*  <li>*/}
            {/*    Checkbox and Input should implement <code>value</code> and{" "}*/}
            {/*    <code>onChange</code> callbacks*/}
            {/*  </li>*/}
            {/*  <li>*/}
            {/*    Implement react hook form:*/}
            {/*    <ul className="list-disc pl-5">*/}
            {/*      <li>Implement submit button and wrap everything in form</li>*/}
            {/*      <li>*/}
            {/*        Validate checkbox. required value: <code>true</code>.*/}
            {/*      </li>*/}
            {/*      <li>*/}
            {/*        Validate Input value. minLength: 4, maxLength: 8, only latin*/}
            {/*        letters*/}
            {/*      </li>*/}
            {/*      <li>Show error messages only after submitting</li>*/}
            {/*      <li>*/}
            {/*        Make get request to `https://jsonplaceholder.typicode.com/posts`*/}
            {/*      </li>*/}
            {/*      <li>Show loader before http request and hide it after</li>*/}
            {/*    </ul>*/}
            {/*  </li>*/}
            {/*  <li>*/}
            {/*    Filter response by <code>title</code> key based on input value and*/}
            {/*    render it*/}
            {/*  </li>*/}
            {/*  <li>Add typing - bonus</li>*/}
            {/*</ol>*/}
            {/*<div className="font-bold mt-2">References:</div>*/}
            {/*<ul className="list-disc pl-5">*/}
            {/*  <li>*/}
            {/*    <a href="https://tailwindcss.com/">Tailwind CSS Docs</a>*/}
            {/*  </li>*/}
            {/*  <li>*/}
            {/*    <a href="https://react-hook-form.com/">React hook form docs</a>*/}
            {/*  </li>*/}
            {/*</ul>*/}
        </div>
    );
}
