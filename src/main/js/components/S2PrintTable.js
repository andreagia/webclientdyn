import React from 'react';
import Table from 'rc-table';

const S2PrintTable = (props) => {

    /* const onRowClick = (record, index, event) => {
         console.log(`Click nth(${index}) row of parent, record.name: ${record.rna} ${record.rnu}`);
         // See https://facebook.github.io/react/docs/events.html for original click event details.
         if (event.shiftKey) {
             console.log('Shift + mouse click triggered.');
         }
     };

     const onRowDoubleClick = (record, index) => {
         console.log(`Double click nth(${index}) row of parent, record.name: ${record.rna} ${record.rnu}`);
     };*/

    const columns = [{
        title: 'Residue number', dataIndex: 'rna', key:'rna', width: 200,
    }, {
        title: 'S2 Value', dataIndex: 'rnu', key:'rnu', width: 100
    }];

    console.log('Printchains---> ',props.s2pass);
    let data = [];
    if (props.s2pass) {

        data = props.s2pass.resid.map((atom, index) => {
            return ({
                    key: index,
                    rna: atom,
                    rnu: props.s2pass.s2[index]
                }
            );

        })
    }
    console.log('DATA --->',data);

    return(
        <Table columns={columns}
               data={data}
               onRow={(record, index) => ({
                   // onClick: onRowClick.bind(null, record, index),
                   // onDoubleClick: onRowDoubleClick.bind(null, record, index),
                   onClick: props.sclick.bind(null, record, index),
                  // onDoubleClick: props.dclick.bind(null, record, index)

               })}
        />
    )

};

export default S2PrintTable;