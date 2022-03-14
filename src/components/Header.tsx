import React from 'react';
type propsType = {
    customColorName: string;
    textValue:string
    checkboxValue:boolean;
}


const Header = ({customColorName, textValue, checkboxValue}: propsType) => {
    return (
        <div>
            <div className="flex flex-col gap-2 my-2 ml-1">
                <div>
                    <code className="bg-cyan-400">customColorName</code> = "
                    {customColorName}""
                </div>
                <div>
                    <code className="bg-green-400">textValue</code> = "{textValue}"
                </div>
                <div>
                    <code className="bg-purple-400">checkboxValue</code> = "
                    {checkboxValue.toString()}"
                </div>
            </div>
        </div>
    );
};

export default Header;