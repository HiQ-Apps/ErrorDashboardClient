import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "components/ui/table";

interface LogTableProps<T> {
  data: T[];
}

const LogTable = <T extends object>({ data }: LogTableProps<T>) => {
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="container pr-4 font-mono">
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <div className="max-h-96 overflow-y-auto">
          <Table className="min-w-full leading-normal">
            <TableHeader>
              <TableRow className="bg-gray-200">
                {columns.map((column, index) => (
                  <TableHead
                    key={index}
                    className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((log, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={`${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className="px-5 py-2 border-b border-gray-200 text-2xs text-gray-700"
                    >
                      {String(log[column as keyof T])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="px-5 py-1 border-t text-right text-xs text-gray-600"
            >
              Showing {data.length} entries
            </TableCell>
          </TableRow>
        </TableFooter>
      </div>
    </div>
  );
};

export default LogTable;
