import React from "react";

import PropTypes from "prop-types";
import DataTable from "examples/Tables/DataTable";
// import DefaultCell from "views/programs/components/DefaultCell";

function TableExport({ data, columns, ...rest }) {
  const tableColumns = [];

  columns.map((column) => {
    // const cell = (value) => useMemo(() => <DefaultCell value={value} />, [value]);

    tableColumns.push({
      Header: column.title,
      accessor: column.name,
      // Cell: ({ value }) => cell(value),
    });
    return 0;
  });
  return <DataTable table={{ columns: tableColumns, rows: data }} {...rest} />;
}

// typechecking props for TableExport
TableExport.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TableExport;
