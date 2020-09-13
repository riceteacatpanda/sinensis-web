import React, { memo } from "react";
import debounce from 'lodash/debounce';

import Card from "../Card/Card";
import { ReactComponent as SearchIcon } from "../../svg/search.svg";
import { ReactComponent as Spinner } from "../../svg/spinner.svg";
import "./Search.scss";

const Search = ({
    placeholder = "Search...",
    isLoading = false,
    onChange = () => {}
}) => {
    const handleChange = debounce(onChange, 300);

    return (
        <Card className="search" shadow="small">
            <input type="search" placeholder={placeholder} onChange={e => handleChange(e.target.value.trim())} />
            { isLoading ? <Spinner /> : <SearchIcon /> }
        </Card>
    );
};

export default memo(Search);
