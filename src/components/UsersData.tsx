import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from "styled-components";
import '../index.css';
import { User } from "./Model";
import { ColDef, GridOptions, GridReadyEvent, IRowNode } from "ag-grid-community";

const StyledDiv = styled.div`
    height: 400px;
    width: 100%;
    padding-right: 250px;
    border-radius: 5px;
`;

const SearchDivStyle = styled.div`
    background-color: white;
    padding: 15px 15px;
    border: 1px solid lightgray;
    border-radius: 5px;
`;

const SearchInput = styled.input`
    width: 100%;
    height: 30px;
    font-size: 100%;
    border: 1px solid lightgray;
    border-radius: 5px;
`;

const UsersData = React.forwardRef((props, ref) => {
    const [users, setUsers] = useState<User[] | []>([]);
    const gridRef = useRef<AgGridReact<User>>(null);
    var minAge: number = 0;
    var maxAge: number = 0;

    function refineSearch(minimumAge: number, maximumAge: number) {
        if (users.length == 0) {
            fetchData();
        }
        externalFilterChanged(minimumAge, maximumAge);
    }
    React.useImperativeHandle(ref, () => ({ refineSearch }));

    const externalFilterChanged = useCallback((minimumAge: number, maximumAge: number) => {
        minAge = minimumAge;
        maxAge = maximumAge;
        gridRef.current?.api?.onFilterChanged();
    }, []);

    const columnDefs: ColDef[] = [
        { field: 'name', sortable: true },
        { field: 'age', sortable: true }
    ];

    const gridOptions: GridOptions<User> = {
        columnDefs: columnDefs,
        defaultColDef: {
            flex: 1,
            minWidth: 100,
            maxWidth: 500,
            resizable: true,
            cellClass: 'grid-cell-centered'
        },
        animateRows: true
    };

    const isExternalFilterPresent = useCallback((): boolean => {
        return minAge != null;
    }, []);

    const doesExternalFilterPass = useCallback((node: IRowNode<User>): boolean => {
        if (node.data) {
            return node.data.age >= minAge && node.data.age <= maxAge;
        }
        return true;
    }, [minAge]);

    const fetchData = () => {
        const urls = {
            kids: 'http://localhost:8099/users/kids',
            adults: 'http://localhost:8099/users/adults',
            seniors: 'http://localhost:8099/users/seniors'
        };

        Promise.all([
            fetch(urls.kids).then(response => response.json()),
            fetch(urls.adults).then(response => response.json()),
            fetch(urls.seniors).then(response => response.json())
        ])
            .then(([data1, data2, data3]) => {
                let mappedUsers: User[] = [];
                [...data1.data, ...data2.data, ...data3.data].forEach((item) => {
                    mappedUsers.push(new User(item.name.firstName + ' ' + item.name.lastName, item.age));
                });
                return mappedUsers
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .sort((a, b) => (a.age > b.age ? -1 : 1));
            })
            .then((data) => {
                setUsers((usersData) => ([...usersData, ...data]));
            })
            .catch(error => {
                alert('Not able to get the data from the server!');
            });
    };

    function onGridReady(event: GridReadyEvent<User>) {
        event.api.setHeaderHeight(40);
    }

    function onFilterTextChange(event: ChangeEvent<HTMLInputElement>): void {
        gridRef.current?.api?.setQuickFilter(event.target.value);
    }

    return (
        <StyledDiv className='ag-theme-apline'>
            <SearchDivStyle>
                <SearchInput type="text" placeholder="Search Users" onChange={onFilterTextChange} />
            </SearchDivStyle>
            <AgGridReact<User>
                ref={gridRef}
                rowHeight={40}
                onGridReady={onGridReady}
                gridOptions={gridOptions}
                rowData={users}
                doesExternalFilterPass={doesExternalFilterPass}
                isExternalFilterPresent={isExternalFilterPresent} />
        </StyledDiv>
    );
});

export default UsersData;

