import React from "react";

const Dropdown = ({ title, options, func }) => {
    return (
        <div className="select">
            <select defaultValue="0" onChange={func} name="format" id="format">
                <option value="0" disabled>
                    {title}
                </option>
                {options.map((o, i) => (
                    <option key={i} value={o}>
                        {o === "all" ? "ALL" : o.toUpperCase()} {/* Display 'ALL' when value is 'all' */}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
